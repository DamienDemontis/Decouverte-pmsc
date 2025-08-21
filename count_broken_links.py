#!/usr/bin/env python3
"""
Quick count of broken links after all fixes
"""

import json
import requests
import yaml
import re
from pathlib import Path
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def test_url(url):
    """Test if a URL is accessible"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        return response.status_code
    except:
        return 'ERROR'

def extract_urls_from_file(file_path):
    """Extract all URLs from a YAML file"""
    urls = set()
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        url_pattern = r'https?://[^\s\'"<>)}\]]+[^\s\'"<>)}\]\.,;]'
        found_urls = re.findall(url_pattern, content)
        for url in found_urls:
            url = url.rstrip('.,;')
            if url.startswith('http'):
                urls.add(url)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return urls

def main():
    """Quick count of broken links"""
    data_dir = Path("_data")
    all_urls = set()
    
    for yaml_file in data_dir.glob("*.yml"):
        file_urls = extract_urls_from_file(yaml_file)
        all_urls.update(file_urls)
    
    print(f"Checking {len(all_urls)} unique URLs...")
    
    broken_count = 0
    working_count = 0
    broken_urls = []
    
    with ThreadPoolExecutor(max_workers=20) as executor:
        future_to_url = {executor.submit(test_url, url): url for url in all_urls}
        
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            status = future.result()
            
            if status == 404:
                broken_count += 1
                broken_urls.append(f"404: {url}")
                print(f"404: {url}")
            elif status in ['ERROR', 'TIMEOUT', 403, 500, 502, 503]:
                broken_count += 1
                broken_urls.append(f"{status}: {url}")
                print(f"{status}: {url}")
            elif status == 200:
                working_count += 1
    
    print(f"\n{'='*60}")
    print(f"FINAL RESULTS:")
    print(f"Working URLs: {working_count}")
    print(f"Broken URLs: {broken_count}")
    print(f"Success rate: {working_count/(working_count+broken_count)*100:.1f}%")
    
    if broken_count == 0:
        print("SUCCESS: No more 404 errors!")
    else:
        print(f"WARNING: {broken_count} URLs still have issues")

if __name__ == "__main__":
    main()