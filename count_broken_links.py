#!/usr/bin/env python3
"""
Advanced Broken Link Detection Tool
Detects both hard 404s and soft 404s with enhanced accuracy
"""

import requests
import re
import json
import time
import csv
import logging
from urllib.parse import urljoin, urlparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
import yaml
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from urllib3.exceptions import InsecureRequestWarning
import warnings

# Suppress SSL warnings
warnings.filterwarnings('ignore', category=InsecureRequestWarning)
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class BrokenLinkDetector:
    def __init__(self, max_workers=15, timeout=15):
        self.max_workers = max_workers
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        
        # Major trusted domains - very conservative about soft 404 detection
        self.trusted_domains = {
            'amazon.com', 'amazon.fr', 'amazon.co.uk', 'amazon.de',
            'google.com', 'googleapis.com', 'google.fr', 'cloud.google.com',
            'colab.research.google.com', 'developers.google.com', 'support.google.com',
            'microsoft.com', 'azure.com', 'office.com', 'azure.microsoft.com',
            'docs.microsoft.com',
            'aws.amazon.com', 'docs.aws.amazon.com',
            'github.com', 'gitlab.com',
            'stackoverflow.com', 'stackexchange.com',
            'coursera.org', 'edx.org', 'udemy.com', 'udacity.com',
            'youtube.com', 'youtu.be',
            'linkedin.com', 'twitter.com', 'facebook.com', 'meta.com',
            'stripe.com', 'paypal.com', 'plaid.com',
            'docker.com', 'kubernetes.io', 'jenkins.io',
            'tensorflow.org', 'pytorch.org', 'huggingface.co',
            'salesforce.com', 'oracle.com', 'ibm.com',
            'mozilla.org', 'w3.org',
            'wikipedia.org', 'wikimedia.org', 'medium.com',
            'snowflake.com', 'tableau.com', 'elastic.co',
            'mailchimp.com', 'brevo.com', 'agorapulse.com',
            'canva.com', 'miro.com', 'figma.com'
        }
        
        # Setup retry strategy
        retry_strategy = Retry(
            total=2,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

    def check_soft_404(self, response, url):
        """
        Enhanced soft 404 detection with very conservative approach for trusted domains
        """
        try:
            # Parse domain for trusted check
            domain = urlparse(url).netloc.lower()
            base_domain = '.'.join(domain.split('.')[-2:]) if '.' in domain else domain
            
            # Very conservative for trusted domains - only detect obvious soft 404s
            is_trusted = any(trusted in domain or trusted in base_domain for trusted in self.trusted_domains)
            
            soup = BeautifulSoup(response.content, 'html.parser')
            text_content = soup.get_text().lower()
            
            # Strong soft 404 indicators only
            strong_indicators = [
                'page not found', 'page does not exist', 'resource not found',
                'file not found', 'content not found', 'document not found',
                'page introuvable', 'page n\'existe pas', 'page nexiste pas',
                'ressource introuvable', 'contenu introuvable', 'document introuvable'
            ]
            
            # Check title for 404
            title = soup.find('title')
            title_text = title.get_text().lower() if title else ""
            
            # Very strict: only flag if multiple strong indicators or obvious title
            confidence = 0
            found_indicators = []
            
            # Strong title indicators (high weight)
            if '404' in title_text and any(word in title_text for word in ['error', 'not found', 'introuvable']):
                confidence += 3
                found_indicators.append('404 error in title')
            
            # Strong content indicators
            for indicator in strong_indicators:
                if indicator in text_content:
                    confidence += 2
                    found_indicators.append(indicator)
                    
            # For trusted domains, require very high confidence
            threshold = 5 if is_trusted else 3
            
            if confidence >= threshold and found_indicators:
                return True, f"High confidence soft 404: {found_indicators[0]}"
                
            return False, ""
            
        except Exception as e:
            logging.debug(f"Error in soft 404 detection for {url}: {e}")
            return False, ""

    def check_url(self, url):
        """Check if a URL is working or broken"""
        result = {
            'url': url,
            'status': 'unknown',
            'status_code': None,
            'is_soft_404': False,
            'soft_404_reason': None,
            'redirect_chain': [],
            'final_url': url,
            'error': None,
            'title': None,
            'response_time': None
        }
        
        start_time = time.time()
        
        try:
            response = self.session.get(
                url, 
                timeout=self.timeout,
                verify=False,
                allow_redirects=True
            )
            
            response_time = time.time() - start_time
            result['response_time'] = round(response_time, 2)
            result['status_code'] = response.status_code
            result['final_url'] = response.url
            
            # Build redirect chain
            if hasattr(response, 'history') and response.history:
                result['redirect_chain'] = [r.url for r in response.history]
            
            # Hard 404s and other clear errors
            if response.status_code == 404:
                result['status'] = 'hard_404'
                result['error'] = 'Hard 404 Not Found'
            elif 400 <= response.status_code < 500:
                result['status'] = 'client_error'
                result['error'] = f'Client error {response.status_code}'
            elif 500 <= response.status_code < 600:
                result['status'] = 'server_error'
                result['error'] = f'Server error {response.status_code}'
            elif response.status_code == 200:
                # Check for soft 404s on 200 responses
                is_soft, reason = self.check_soft_404(response, url)
                if is_soft:
                    result['status'] = 'soft_404'
                    result['is_soft_404'] = True
                    result['soft_404_reason'] = reason
                else:
                    result['status'] = 'ok'
                    
                # Extract title
                try:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    title_tag = soup.find('title')
                    if title_tag:
                        result['title'] = title_tag.get_text().strip()[:100]
                except:
                    pass
            else:
                result['status'] = 'ok'
                
        except requests.exceptions.SSLError:
            result['status'] = 'ssl_error'
            result['error'] = 'SSL Certificate error'
        except requests.exceptions.Timeout:
            result['status'] = 'timeout'
            result['error'] = 'Request timeout'
        except requests.exceptions.ConnectionError:
            result['status'] = 'connection_error'
            result['error'] = 'Connection failed'
        except requests.exceptions.TooManyRedirects:
            result['status'] = 'redirect_loop'
            result['error'] = 'Too many redirects'
        except requests.exceptions.RequestException as e:
            result['status'] = 'request_error'
            result['error'] = str(e)
        except Exception as e:
            result['status'] = 'unknown_error'
            result['error'] = f'Unknown error: {str(e)}'
        
        return result

    def extract_urls_from_yaml_files(self, directory='.'):
        """Extract all URLs from YAML files in _data directory"""
        data_dir = Path(directory) / '_data'
        all_urls = {}
        
        if not data_dir.exists():
            print(f"Warning: {data_dir} directory not found")
            return {}
        
        for yaml_file in data_dir.glob('*.yml'):
            urls = self.extract_urls_from_file(yaml_file)
            for url in urls:
                if url not in all_urls:
                    all_urls[url] = []
                all_urls[url].append(str(yaml_file.name))
            logging.info(f"Found {len(urls)} URLs in {yaml_file.name}")
        
        return all_urls
    
    def extract_urls_from_markdown_files(self, directory='.'):
        """Extract URLs from markdown files"""
        all_urls = {}
        
        # Check main directory for .md files
        for md_file in Path(directory).glob('*.md'):
            urls = self.extract_urls_from_file(md_file)
            for url in urls:
                if url not in all_urls:
                    all_urls[url] = []
                all_urls[url].append(str(md_file.name))
            logging.info(f"Found {len(urls)} URLs in {md_file.name}")
        
        return all_urls

    def extract_urls_from_file(self, file_path):
        """Extract all URLs from a file"""
        urls = set()
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Enhanced URL pattern to catch more variations
            url_patterns = [
                r'https?://[^\s\'"<>)}\]]+[^\s\'"<>)}\]\.,;:]',  # Standard URLs
                r'url:\s*[\'"]?(https?://[^\s\'"<>)}\]]+)[\'"]?',  # YAML url: fields
                r'link:\s*[\'"]?(https?://[^\s\'"<>)}\]]+)[\'"]?',  # YAML link: fields
                r'\[.*?\]\((https?://[^\s)]+)\)',  # Markdown links
                r'href=[\'"]?(https?://[^\s\'"<>)}\]]+)[\'"]?',  # HTML hrefs
            ]
            
            for pattern in url_patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                for match in matches:
                    if isinstance(match, tuple):
                        match = match[0] if match[0] else match[1]
                    if match.startswith(('http://', 'https://')):
                        # Clean up URL
                        clean_url = match.rstrip('.,;:)')
                        if len(clean_url) > 10:  # Reasonable URL length
                            urls.add(clean_url)
                            
        except Exception as e:
            logging.warning(f"Error reading {file_path}: {e}")
            
        return urls

    def detect_broken_links(self, directory='.'):
        """Main method to detect all broken links"""
        print("Advanced Broken Link Detection Tool")
        print("Detecting both hard 404s and soft 404s...\n")
        
        # Extract URLs from all sources
        yaml_urls = self.extract_urls_from_yaml_files(directory)
        md_urls = self.extract_urls_from_markdown_files(directory)
        
        # Combine all URLs
        all_urls = {**yaml_urls}
        for url, sources in md_urls.items():
            if url in all_urls:
                all_urls[url].extend(sources)
            else:
                all_urls[url] = sources
        
        print(f"Found {len(all_urls)} unique URLs to test\n")
        
        if not all_urls:
            print("No URLs found to check!")
            return []
        
        # Test URLs with progress
        results = []
        print(f"Testing URLs with {self.max_workers} concurrent workers...")
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            future_to_url = {executor.submit(self.check_url, url): (url, sources) for url, sources in all_urls.items()}
            
            completed = 0
            start_time = time.time()
            
            for future in as_completed(future_to_url):
                url, sources = future_to_url[future]
                completed += 1
                
                try:
                    result = future.result()
                    result['sources'] = sources
                    results.append(result)
                    
                    # Print issues as they're found
                    if result['status'] != 'ok':
                        status_map = {
                            'hard_404': '[404]',
                            'soft_404': '[SOFT404]',
                            'server_error': '[SERVER ERROR]',
                            'client_error': '[ERROR]',
                            'connection_error': '[CONNECTION ERROR]',
                            'timeout': '[TIMEOUT]',
                            'ssl_error': '[SSL ERROR]',
                            'redirect_loop': '[REDIRECT LOOP]',
                            'request_error': '[REQUEST ERROR]',
                            'unknown_error': '[ERROR]'
                        }
                        
                        status_label = status_map.get(result['status'], '[UNKNOWN]')
                        status_name = result['status'].upper().replace('_', ' ')
                        
                        print(f"{status_label} {status_name}: {url}")
                        if result.get('soft_404_reason'):
                            print(f"    Reason: {result['soft_404_reason']}")
                            
                except Exception as e:
                    print(f"Error checking {url}: {e}")
                    results.append({
                        'url': url,
                        'status': 'unknown_error',
                        'error': str(e),
                        'sources': sources
                    })
                
                # Progress indicator
                if completed % 10 == 0 or completed == len(all_urls):
                    elapsed = time.time() - start_time
                    rate = completed / elapsed if elapsed > 0 else 0
                    print(f"Progress: {completed}/{len(all_urls)} ({completed/len(all_urls)*100:.1f}%) - {rate:.1f} URLs/sec")
        
        return results

    def generate_report(self, results):
        """Generate comprehensive reports"""
        if not results:
            print("No results to generate report from!")
            return False
            
        # Calculate statistics
        stats = {
            'ok': 0,
            'hard_404': 0,
            'soft_404': 0,
            'server_error': 0,
            'client_error': 0,
            'ssl_error': 0,
            'timeout': 0,
            'connection_error': 0,
            'redirect_loop': 0,
            'request_error': 0,
            'unknown_error': 0
        }
        
        broken_links = []
        for result in results:
            status = result.get('status', 'unknown_error')
            if status in stats:
                stats[status] += 1
            else:
                stats['unknown_error'] += 1
                
            if status != 'ok':
                # Add source files information
                result['source_files'] = result.get('sources', ['Unknown'])
                broken_links.append(result)
        
        print(f"\n{'='*80}")
        print(f"COMPREHENSIVE BROKEN LINK ANALYSIS REPORT")
        print(f"{'='*80}")
        print(f"Total URLs tested: {len(results)}")
        print(f"\nSTATUS BREAKDOWN:")
        print(f"[OK] Working URLs: {stats['ok']}")
        print(f"[404] Hard 404s: {stats['hard_404']}")
        print(f"[SOFT404] Soft 404s: {stats['soft_404']}")
        print(f"[SERVER] Server Errors: {stats['server_error']}")
        print(f"[CLIENT] Client Errors: {stats['client_error']}")
        print(f"[SSL] SSL Errors: {stats['ssl_error']}")
        print(f"[TIMEOUT] Timeouts: {stats['timeout']}")
        print(f"[CONNECTION] Connection Errors: {stats['connection_error']}")
        print(f"[REDIRECT] Redirect Loops: {stats['redirect_loop']}")
        print(f"[REQUEST] Request Errors: {stats['request_error']}")
        print(f"[UNKNOWN] Unknown Errors: {stats['unknown_error']}")
        
        total_broken = len(results) - stats['ok']
        if total_broken > 0:
            success_rate = (stats['ok'] / len(results)) * 100
            print(f"\nSuccess Rate: {success_rate:.1f}%")
            print(f"Total Broken Links: {total_broken}")
        else:
            print(f"\nSUCCESS: All links are working! (100% success rate)")
        
        # Generate timestamp for file names
        timestamp = int(time.time())
        
        # Save detailed CSV report
        csv_file = f"broken_links_report_{timestamp}.csv"
        self.save_csv_report(broken_links, csv_file)
        print(f"\nCSV report saved to: {csv_file}")
        
        # Save detailed JSON report
        json_file = f"broken_links_report_{timestamp}.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump({
                'timestamp': timestamp,
                'stats': stats,
                'total_urls': len(results),
                'success_rate': (stats['ok'] / len(results)) * 100 if results else 0,
                'broken_links': broken_links,
                'working_links': [r for r in results if r['status'] == 'ok']
            }, f, indent=2, ensure_ascii=False)
        
        print(f"JSON report saved to: {json_file}")
        
        # Save text summary
        summary_file = f"broken_links_summary_{timestamp}.txt"
        self.save_summary_report(stats, total_broken, len(results), broken_links, summary_file)
        print(f"Summary report saved to: {summary_file}")
        
        # Save simple list for fixing
        if broken_links:
            simple_file = f"broken_links_simple_{timestamp}.txt"
            with open(simple_file, 'w', encoding='utf-8') as f:
                for result in broken_links:
                    f.write(f"{result['status'].upper()}: {result['url']}\n")
                    if result.get('soft_404_reason'):
                        f.write(f"   Reason: {result['soft_404_reason']}\n")
                    if result.get('redirect_chain'):
                        f.write(f"   Redirects: {' -> '.join(result['redirect_chain'])} -> {result['final_url']}\n")
                    f.write(f"   Found in: {', '.join(result.get('source_files', []))}\n\n")
            print(f"Simple list saved to: {simple_file}")
        
        return True

    def save_csv_report(self, broken_links, filename):
        """Save broken links to CSV file"""
        if not broken_links:
            return
            
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['URL', 'Status', 'Status_Code', 'Error', 'Soft_404_Reason', 
                         'Source_Files', 'Title', 'Final_URL', 'Redirect_Chain']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for result in broken_links:
                writer.writerow({
                    'URL': result.get('url', ''),
                    'Status': result.get('status', ''),
                    'Status_Code': result.get('status_code', ''),
                    'Error': result.get('error', ''),
                    'Soft_404_Reason': result.get('soft_404_reason', ''),
                    'Source_Files': '; '.join(result.get('source_files', ['Unknown'])),
                    'Title': result.get('title', ''),
                    'Final_URL': result.get('final_url', ''),
                    'Redirect_Chain': ' -> '.join(result.get('redirect_chain', []))
                })
    
    def save_summary_report(self, stats, total_broken, total_urls, broken_links, filename):
        """Save text summary report"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("BROKEN LINK DETECTION SUMMARY REPORT\n")
            f.write("=" * 50 + "\n\n")
            f.write(f"Total URLs tested: {total_urls}\n")
            f.write(f"Total broken links: {total_broken}\n")
            f.write(f"Success rate: {((total_urls - total_broken) / total_urls * 100):.1f}%\n\n")
            
            f.write("STATUS BREAKDOWN:\n")
            for status, count in stats.items():
                if count > 0:
                    f.write(f"  {status.upper().replace('_', ' ')}: {count}\n")
            
            f.write(f"\nDETAILED BROKEN LINKS:\n")
            f.write("-" * 30 + "\n")
            
            for i, result in enumerate(broken_links, 1):
                f.write(f"\n{i}. {result['url']}\n")
                f.write(f"   Status: {result['status'].upper()}\n")
                if result.get('error'):
                    f.write(f"   Error: {result['error']}\n")
                if result.get('soft_404_reason'):
                    f.write(f"   Soft 404 Reason: {result['soft_404_reason']}\n")
                f.write(f"   Found in: {', '.join(result.get('source_files', []))}\n")
                if result.get('redirect_chain'):
                    f.write(f"   Redirects: {' -> '.join(result['redirect_chain'])} -> {result.get('final_url', '')}\n")

def main():
    """Main execution function"""
    detector = BrokenLinkDetector(max_workers=12, timeout=15)
    results = detector.detect_broken_links('.')
    success = detector.generate_report(results)
    
    if success:
        print(f"\nDetection complete! Check the generated report files for details.")
    else:
        print("Failed to generate reports.")

if __name__ == "__main__":
    main()