# Guide de Déploiement - Site Découverte MSc Epitech

## 🚀 Options de déploiement

### 1. GitHub Pages (Recommandé - Gratuit)

#### Configuration rapide
1. **Repository GitHub** : Créer ou utiliser repository existant
2. **Settings** → **Pages**
3. **Source** : "Deploy from a branch"
4. **Branch** : `main` / `root`
5. **URL automatique** : `https://[username].github.io/Decouverte-pmsc/`

#### Avec domaine personnalisé
```bash
# Ajouter fichier CNAME à la racine
echo "decouverte-msc.epitech.eu" > CNAME
git add CNAME && git commit -m "Add custom domain"
git push origin main
```

#### Configuration DNS (pour domaine Epitech)
```
Type: CNAME
Name: decouverte-msc
Value: [username].github.io
```

### 2. Netlify (Alternative robuste)

#### Deploy automatique depuis GitHub
1. **Connecter repository** sur Netlify
2. **Build settings** :
   ```
   Build command: bundle exec jekyll build
   Publish directory: _site
   ```
3. **Environment variables** :
   ```
   JEKYLL_ENV=production
   RUBY_VERSION=3.1.0
   ```

#### Configuration avancée
```toml
# netlify.toml
[build]
  command = "bundle exec jekyll build"
  publish = "_site"

[build.environment]
  JEKYLL_ENV = "production"
  RUBY_VERSION = "3.1"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 3. Serveur Epitech (Contrôle total)

#### Via Docker (Recommandé)
```dockerfile
# Dockerfile
FROM ruby:3.1-alpine

RUN apk add --no-cache build-base git

WORKDIR /site
COPY Gemfile* ./
RUN bundle install

COPY . .
RUN JEKYLL_ENV=production bundle exec jekyll build

EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
```

```bash
# Build et run
docker build -t epitech-decouverte .
docker run -p 80:4000 epitech-decouverte
```

#### Nginx + Static Files
```bash
# Build static
JEKYLL_ENV=production bundle exec jekyll build

# Copy vers serveur web
rsync -avz --delete _site/ /var/www/html/decouverte-msc/
```

```nginx
# /etc/nginx/sites-available/decouverte-msc
server {
    listen 80;
    server_name decouverte-msc.epitech.eu;
    
    root /var/www/html/decouverte-msc;
    index index.html;
    
    # Compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    
    # Single Page App routing
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

## 🔧 Scripts de déploiement

### Script automatique GitHub Pages
```bash
#!/bin/bash
# deploy-github.sh

set -e

echo "🚀 Deploying to GitHub Pages..."

# Build site
JEKYLL_ENV=production bundle exec jekyll build

# Push to gh-pages branch
git add .
git commit -m "Deploy $(date)"
git push origin main

echo "✅ Deployed! Site will be live in 1-2 minutes."
echo "🌐 URL: https://[username].github.io/Decouverte-pmsc/"
```

### Script déploiement serveur
```bash
#!/bin/bash
# deploy-server.sh

set -e

echo "🚀 Building site for production..."

# Clean previous build
bundle exec jekyll clean

# Install/update dependencies
bundle install --deployment

# Build with production config
JEKYLL_ENV=production bundle exec jekyll build

echo "📦 Uploading to server..."

# Upload via rsync (configure your server details)
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  _site/ user@server.epitech.eu:/var/www/html/decouverte-msc/

echo "✅ Deployment complete!"
echo "🌐 URL: https://decouverte-msc.epitech.eu"
```

### GitHub Actions (CI/CD automatique)
```yaml
# .github/workflows/deploy.yml
name: Deploy Jekyll to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: 3.1
        bundler-cache: true
    
    - name: Build site
      run: |
        bundle exec jekyll build --verbose
      env:
        JEKYLL_ENV: production
    
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

## 🌐 Configuration DNS et domaines

### Pour domaine Epitech principal

#### Sous-domaine (Recommandé)
```
Type: CNAME
Name: decouverte-msc
Value: [deployment-target]
TTL: 3600

Résultat: https://decouverte-msc.epitech.eu
```

#### Répertoire (Alternative)
```
Configuration serveur pour:
https://epitech.eu/decouverte-msc/

Nécessite ajustement baseurl dans _config.yml:
baseurl: "/decouverte-msc"
```

### SSL/HTTPS

#### GitHub Pages
- **SSL automatique** avec Let's Encrypt
- **HTTPS forcé** disponible dans les settings

#### Netlify  
- **SSL automatique** avec Let's Encrypt
- **HTTPS redirection** automatique

#### Serveur personnalisé
```bash
# Avec Certbot (Let's Encrypt)
sudo certbot --nginx -d decouverte-msc.epitech.eu

# Configuration Nginx avec SSL
server {
    listen 443 ssl http2;
    server_name decouverte-msc.epitech.eu;
    
    ssl_certificate /etc/letsencrypt/live/decouverte-msc.epitech.eu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/decouverte-msc.epitech.eu/privkey.pem;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}
```

## 📊 Monitoring et Analytics

### Google Analytics 4
```liquid
<!-- _includes/analytics.html -->
{% if site.google_analytics and jekyll.environment == 'production' %}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.google_analytics }}');
</script>
{% endif %}
```

```yaml
# _config.yml
google_analytics: "G-XXXXXXXXXX"  # À remplacer par l'ID Epitech
```

### Monitoring uptime
- **Pingdom** ou **UptimeRobot** pour surveillance 24/7
- **Alerts email** en cas de downtime
- **Performance monitoring** PageSpeed Insights

## 🔒 Sécurité en production

### Headers de sécurité
```nginx
# Headers sécurité essentiels
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "1; mode=block";  
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com; font-src fonts.gstatic.com cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-src youtube.com";
```

### Backup automatique
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/decouverte-msc"

# Backup files
tar -czf "${BACKUP_DIR}/site_${DATE}.tar.gz" /var/www/html/decouverte-msc/

# Cleanup old backups (keep 30 days)
find ${BACKUP_DIR} -name "site_*.tar.gz" -mtime +30 -delete

# Backup to cloud (optionnel)
# aws s3 cp "${BACKUP_DIR}/site_${DATE}.tar.gz" s3://epitech-backups/
```

## 🎯 Checklist pré-déploiement

### Tests pré-production
- [ ] **Build local** : `bundle exec jekyll build` sans erreur
- [ ] **Liens internes** : Vérifier navigation et routes
- [ ] **Images** : Toutes les images chargent correctement  
- [ ] **Bot conversationnel** : Tester parcours principaux
- [ ] **Responsive** : Test mobile/tablet/desktop
- [ ] **Performance** : Lighthouse score > 85/100

### Configuration production
- [ ] **URLs** : Vérifier `baseurl` et `url` dans `_config.yml`
- [ ] **Analytics** : Configurer Google Analytics ID
- [ ] **SEO** : Meta descriptions et titres optimisés
- [ ] **Sitemap** : Vérifier génération XML
- [ ] **SSL** : HTTPS forcé et certificat valide
- [ ] **Cache** : Headers cache optimisés

### Post-déploiement
- [ ] **Indexation** : Soumettre sitemap à Google Search Console
- [ ] **Monitoring** : Configurer alertes uptime
- [ ] **Documentation** : Transférer README et guides
- [ ] **Accès** : Transférer credentials et accès administrateur
- [ ] **Support** : Briefing équipe technique Epitech

## 📞 Support post-déploiement

### Contacts techniques
- **GitHub** : Accès administrateur au repository
- **DNS** : Accès configuration domaine Epitech
- **Serveur** : Credentials serveur (si applicable)
- **Analytics** : Accès compte Google Analytics

### Maintenance recommandée
- **Hebdomadaire** : Vérification uptime et performance
- **Mensuelle** : Mise à jour dépendances Ruby/Jekyll
- **Trimestrielle** : Audit sécurité et performance
- **Annuelle** : Review complète architecture et contenu

---

Ce guide couvre tous les aspects du déploiement professionnel. Pour toute question spécifique, référez-vous au README.md principal ou à la documentation technique.