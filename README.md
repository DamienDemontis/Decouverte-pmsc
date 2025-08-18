# Site de Découverte des Spécialités MSc Epitech

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture technique](#-architecture-technique)
- [Installation et démarrage](#-installation-et-démarrage)
- [Structure des fichiers](#-structure-des-fichiers)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Gestion du contenu](#-gestion-du-contenu)
- [Maintenance et mise à jour](#-maintenance-et-mise-à-jour)
- [Déploiement](#-déploiement)
- [Performances et SEO](#-performances-et-seo)
- [Support technique](#-support-technique)

---

## 🎯 Vue d'ensemble

Ce site web est une plateforme interactive conçue pour présenter les spécialités MSc d'Epitech. Il combine une architecture Jekyll moderne avec des fonctionnalités interactives avancées pour offrir une expérience utilisateur optimale aux futurs étudiants.

### Objectifs du site
- **Découverte guidée** : Aider les étudiants à choisir leur spécialité via un bot conversationnel intelligent
- **Information complète** : Présenter de manière détaillée les 15 spécialités MSc disponibles
- **Engagement utilisateur** : Offrir une expérience immersive avec animations et interactions
- **Performance** : Garantir des temps de chargement rapides et une excellente expérience mobile

### Spécialités couvertes
**Tech (6 spécialités) :**
- Intelligence Artificielle
- Cybersécurité  
- Big Data & Analytics
- Cloud Computing
- Internet of Things (IoT)
- VR/AR

**Business & Management (9 spécialités) :**
- Strategic Project Management
- Fintech & Stratégies financières
- Marketing & Influence
- IA & Transformation des organisations
- Data Protection & Sécurité
- Digitalisation RH
- Santé, IA & IoT
- Data Science & Business Intelligence
- Luxe & Retail Tech

---

## 🏗️ Architecture technique

### Stack technologique
- **Générateur** : Jekyll 3.10.0 (compatibilité GitHub Pages)
- **Langage** : Ruby avec Liquid templating
- **Front-end** : HTML5, CSS3, JavaScript ES6+
- **Styling** : CSS personnalisé avec variables CSS modernes
- **Plugins** : SEO, Sitemap, Feed RSS
- **Hébergement** : Originellement GitHub Pages

### Philosophie architecturale

#### Séparation des préoccupations
```
Content (Markdown) → Data (YAML) → Templates (Liquid) → Styling (CSS)
```

#### Data-Driven Design
- **Contenu centralisé** dans `_data/` pour une maintenance facilitée
- **Navigation automatique** générée depuis les fichiers de données
- **Composants réutilisables** via le système d'includes Jekyll

#### Performance First
- **Assets externes** avec hachage SRI pour la sécurité
- **JavaScript modulaire** avec chargement optimisé
- **Compression CSS/JS** automatique en production
- **Images optimisées** et favicon personnalisé

---

## 🚀 Installation et démarrage

### Prérequis système
```bash
# Ruby (version 2.7+)
ruby --version

# Bundler
gem install bundler

# Git
git --version
```

### Installation rapide
```bash
# 1. Cloner le repository
git clone [URL_DU_REPOSITORY]
cd Decouverte-pmsc

# 2. Installer les dépendances
bundle install

# 3. Lancer le serveur de développement
bundle exec jekyll serve --livereload

# 4. Accéder au site
open http://localhost:4000/Decouverte-pmsc/
```

### Commandes utiles
```bash
# Développement avec rechargement automatique
bundle exec jekyll serve --livereload --port 4000

# Build de production
bundle exec jekyll build --env production

# Nettoyage du cache
bundle exec jekyll clean

# Mise à jour des gems
bundle update
```

### Variables d'environnement
```bash
# Développement local
JEKYLL_ENV=development

# Production
JEKYLL_ENV=production
```

---

## 📁 Structure des fichiers

```
Decouverte-pmsc/
├── 📄 Configuration
│   ├── _config.yml              # Configuration Jekyll principal
│   ├── Gemfile                  # Dépendances Ruby
│   └── Gemfile.lock            # Versions verrouillées
│
├── 📊 Données centralisées
│   ├── _data/
│   │   ├── navigation.yml       # Structure du menu principal
│   │   └── specialities.yml     # Données des spécialités (nouveau)
│   │
├── 🎨 Templates et layouts
│   ├── _layouts/
│   │   ├── default.html         # Layout principal
│   │   └── specialite.html      # Layout des pages spécialité
│   │
│   ├── _includes/               # Composants réutilisables
│   │   ├── navigation.html      # Menu latéral dynamique
│   │   ├── feature-card.html    # Carte de fonctionnalité
│   │   ├── feature-grid.html    # Grille de fonctionnalités
│   │   ├── timeline.html        # Composant timeline
│   │   ├── career-paths.html    # Parcours de carrière
│   │   ├── media-section.html   # Section vidéo
│   │   └── specialty-bot.html   # Bot conversationnel
│   │
├── 📝 Contenu
│   ├── _specialites/            # 15 pages de spécialités + templates
│   │   ├── ia.md               # Intelligence Artificielle (exemple)
│   │   ├── ia-clean.md         # Template moderne (exemple)
│   │   └── ...                 # Autres spécialités
│   │
│   ├── _posts/                  # Articles de blog (optionnel)
│   ├── index.markdown           # Page d'accueil
│   └── about.markdown           # Page à propos
│
├── 🎨 Assets
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css         # Styles principaux (1700+ lignes)
│   │   │   ├── home.css         # Styles page d'accueil
│   │   │   └── specialty-bot.css # Styles bot conversationnel
│   │   │
│   │   ├── js/
│   │   │   ├── main.js          # JavaScript principal
│   │   │   ├── home.js          # Animations page d'accueil
│   │   │   └── specialty-bot.js # Logic bot conversationnel (2000+ lignes)
│   │   │
│   │   ├── images/              # Images et favicons
│   │   └── subjects/            # Sujets de projets pédagogiques
│   │
└── 🔧 Autres
    ├── 404.html                 # Page d'erreur personnalisée
    └── _site/                   # Site généré (ignoré par Git)
```

### Fichiers clés à connaître

#### Configuration (`_config.yml`)
```yaml
# Informations du site
title: Découverte des Spécialités MSc Epitech
baseurl: "/Decouverte-pmsc"
url: "https://DamienDemontis.github.io"

# Collections pour les spécialités
collections:
  specialites:
    output: true
    permalink: /:collection/:name

# Plugins SEO et performance
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed
```

#### Navigation (`_data/navigation.yml`)
Structure centralisée du menu avec catégorisation automatique des spécialités.

#### Données spécialités (`_data/specialities.yml`)
Contenu structuré pour les spécialités, permettant une maintenance centralisée.

---

## ✨ Fonctionnalités principales

### 1. 🤖 Bot conversationnel intelligent

**Localisation** : `assets/js/specialty-bot.js` (2000+ lignes)

**Fonctionnalités** :
- **Détection de profil** : Bac+2, Bac+3 Tech/Business, Bac+4+
- **Guidance personnalisée** : Recommandations basées sur le parcours
- **Quiz de personnalité** : 5 questions pour identifier le profil type
- **Navigation contextuelle** : Liens directs vers les spécialités pertinentes
- **FAQ intégrée** : Réponses aux questions fréquentes

**Arbre conversationnel** :
```javascript
conversationTree: {
  initial → profile_check → [profil détecté] → recommandations
        → help_q1 → [série de questions] → spécialités suggérées
        → explainSpecialties → vue d'ensemble → navigation
        → practical_info → informations pratiques
        → faq → questions fréquentes
}
```

### 2. 🎨 Animations et interactions

**Localisation** : `assets/js/home.js`

**Animations incluses** :
- **Typewriter effect** : Rotation des noms de spécialités
- **Tech orbit** : Icônes en orbite avec interactions au survol
- **Count-up** : Animation des statistiques
- **Scroll animations** : Apparition progressive des éléments
- **Smooth scrolling** : Navigation fluide entre sections

### 3. 📱 Design responsive et moderne

**Breakpoints** :
- Mobile : < 768px
- Tablet : 768px - 1024px  
- Desktop : > 1024px

**Caractéristiques** :
- **Mobile-first** : Optimisation prioritaire mobile
- **Navigation latérale** : Menu coulissant sur mobile
- **Grid flexible** : Adaptation automatique du contenu
- **Touch-friendly** : Interactions optimisées tactile

### 4. 📊 Système de données centralisé

**Avantages** :
- **Maintenance facilitée** : Modification centralisée du contenu
- **Cohérence** : Structure uniforme garantie
- **Performance** : Chargement optimisé
- **Évolutivité** : Ajout simple de nouvelles spécialités

### 5. 🔍 SEO et performance optimisés

**SEO** :
- **Meta tags automatiques** via `jekyll-seo-tag`
- **Sitemap XML** généré automatiquement
- **Feed RSS** pour le référencement
- **Schema markup** ready (structure données)
- **URL canoniques** et breadcrumbs

**Performance** :
- **Compression assets** en production
- **Lazy loading** pour les vidéos YouTube
- **Preconnect** vers domaines externes
- **SRI integrity** pour la sécurité
- **Temps de build** < 2 secondes

---

## 📝 Gestion du contenu

### Ajouter une nouvelle spécialité

#### 1. Créer le fichier Markdown
```markdown
# _specialites/nouvelle-specialite.md
---
layout: specialite
title: "Nouvelle Spécialité"
slug: nouvelle-specialite
icon: fas fa-icon
ordre: 10
type: tech # ou business
color_primary: "#COLOR"
color_secondary: "#COLOR"  
careers: true
has_media: true
description: "Description complète..."
---

## Contenu en Markdown

Votre contenu détaillé ici...
```

#### 2. Ajouter aux données navigation
```yaml
# _data/navigation.yml
categories:
  tech:
    specialities:
      - slug: "nouvelle-specialite"
        title: "Nouvelle Spécialité"
        icon: "fas fa-icon"
        order: 10
```

#### 3. (Optionnel) Ajouter aux données structurées
```yaml
# _data/specialities.yml
nouvelle-specialite:
  title: "Nouvelle Spécialité"
  overview:
    features: [...]
  use_cases: [...]
  career_paths: [...]
```

### Modifier le contenu existant

#### Textes et descriptions
Les modifications se font directement dans les fichiers Markdown des spécialités.

#### Navigation et structure
Modifications centralisées dans `_data/navigation.yml`.

#### Styling et couleurs
Variables CSS dans `:root` du fichier `assets/css/main.css`.

### Ajouter des médias

#### Images
1. Placer dans `assets/images/`
2. Référencer avec `{{ '/assets/images/nom.jpg' | relative_url }}`

#### Vidéos YouTube
Utiliser le composant media-section :
```yaml
# Dans les données spécialité
media:
  - title: "Titre vidéo"
    description: "Description"
    url: "https://www.youtube.com/embed/VIDEO_ID"
```

---

## 🔧 Maintenance et mise à jour

### Tâches régulières

#### Mise à jour des gems
```bash
# Vérifier les mises à jour disponibles
bundle outdated

# Mettre à jour (attention aux breaking changes)
bundle update

# Test après mise à jour
bundle exec jekyll serve
```

#### Vérification SEO
```bash
# Générer sitemap et vérifier
bundle exec jekyll build
cat _site/sitemap.xml

# Tester les meta tags
curl -s http://localhost:4000/Decouverte-pmsc/ | grep "<meta"
```

### Optimisations recommandées

#### Performance
1. **Optimiser images** : Compression et formats modernes (WebP)
2. **Minimiser CSS** : Supprimer styles inutilisés
3. **CDN** : Utiliser un CDN pour les assets statiques
4. **Caching** : Configurer headers cache appropriés

#### Maintenance code
1. **Linting** : Ajouter des outils de linting CSS/JS
2. **Testing** : Tests automatisés des composants critiques
3. **Monitoring** : Outils de monitoring performance (PageSpeed, etc.)

### Résolution problèmes courants

#### Build qui échoue
```bash
# Nettoyer le cache
bundle exec jekyll clean

# Réinstaller les gems
rm Gemfile.lock && bundle install

# Vérifier la syntaxe YAML
ruby -e "require 'yaml'; YAML.load_file('_config.yml')"
```

#### Navigation cassée
Vérifier la cohérence entre :
- Slugs dans `_data/navigation.yml`
- Noms de fichiers dans `_specialites/`
- Frontmatter `slug:` dans les fichiers

#### Bot conversationnel ne fonctionne pas
1. Vérifier le chargement JS dans la console
2. Contrôler que `specialty-bot.html` est inclus
3. Valider la syntaxe JavaScript dans `specialty-bot.js`

---

## 🚀 Déploiement

### GitHub Pages (Recommandé)

#### Configuration automatique
1. **Repository settings** → Pages
2. **Source** : Deploy from a branch
3. **Branch** : `main` / `root`
4. **URL** : `https://[username].github.io/Decouverte-pmsc/`

#### Custom domain (optionnel)
```bash
# Ajouter CNAME file
echo "votre-domaine.com" > CNAME
git add CNAME && git commit -m "Add custom domain"
```

### Netlify

#### Deploy automatique
1. Connecter repository GitHub
2. **Build command** : `bundle exec jekyll build`
3. **Publish directory** : `_site`
4. **Environment variables** :
   ```
   JEKYLL_ENV=production
   ```

### Serveur dédié

#### Via Docker
```dockerfile
FROM ruby:3.1-alpine
WORKDIR /site
COPY Gemfile* ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build --env production
EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
```

#### Build script
```bash
#!/bin/bash
# deploy.sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build
rsync -avz --delete _site/ user@server:/var/www/html/
```

### Variables d'environnement

#### Développement
```yaml
# _config-development.yml
url: "http://localhost:4000"
show_drafts: true
incremental: true
profile: true
```

#### Production
```yaml
# _config-production.yml
url: "https://votre-domaine.com"
google_analytics: "GA_TRACKING_ID"
sass:
  style: compressed
```

---

## ⚡ Performances et SEO

### Métriques actuelles

#### Lighthouse Score (estimé)
- **Performance** : 85-90/100
- **Accessibility** : 88-92/100  
- **Best Practices** : 92-95/100
- **SEO** : 95-100/100

#### Temps de chargement
- **First Contentful Paint** : < 2s
- **Largest Contentful Paint** : < 3s
- **Time to Interactive** : < 4s

### Optimisations implémentées

#### Performance
✅ **External resources** avec preconnect  
✅ **JavaScript modulaire** et externe  
✅ **CSS compression** en production  
✅ **Images optimisées** et favicon  
✅ **Lazy loading** pour vidéos YouTube  

#### SEO
✅ **jekyll-seo-tag** pour meta tags automatiques  
✅ **Sitemap XML** généré  
✅ **Feed RSS** structuré  
✅ **URLs canoniques**  
✅ **Meta descriptions** personnalisées  
✅ **Schema markup** ready  

#### Sécurité
✅ **SRI integrity hashes** pour CDN  
✅ **HTTPS enforce** ready  
✅ **CSP headers** ready  
✅ **XSS protection** via escaping Liquid  

### Recommandations futures

#### Performance avancée
- **Service Worker** pour mise en cache
- **Critical CSS** inline pour above-the-fold
- **WebP images** avec fallback
- **Resource hints** (prefetch, preload)

#### SEO avancé
- **Structured data** JSON-LD pour spécialités
- **Multilingual support** (hreflang)
- **AMP pages** pour mobile
- **Internal linking** optimisé

---

## 🛠️ Support technique

### Technologies utilisées

#### Core Stack
- **Jekyll** 3.10.0 - Générateur site statique
- **Ruby** 2.7+ - Environnement runtime
- **Liquid** - Templating engine
- **Kramdown** - Processeur Markdown
- **Sass** - Préprocesseur CSS

#### Plugins Jekyll
- **jekyll-seo-tag** 2.8.0 - Meta tags automatiques
- **jekyll-sitemap** 1.4.0 - Génération sitemap  
- **jekyll-feed** 0.17.0 - Flux RSS

#### Front-end
- **CSS3** avec Custom Properties
- **JavaScript ES6+** - Vanilla JS, pas de framework
- **Font Awesome** 6.4.0 - Icônes
- **Google Fonts** - Typographie (Inter)

#### External Services
- **YouTube** - Intégration vidéos
- **Google Analytics** - Ready (non configuré)
- **CDNs** - Font Awesome, Animate.css

### Contacts et ressources

#### Documentation officielle
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Documentation](https://shopify.github.io/liquid/)
- [GitHub Pages](https://docs.github.com/en/pages)

#### Community Support  
- [Jekyll Forum](https://talk.jekyllrb.com/)
- [Jekyll GitHub Issues](https://github.com/jekyll/jekyll/issues)
- [Stack Overflow - Jekyll](https://stackoverflow.com/questions/tagged/jekyll)

#### Développement custom
Pour des modifications spécifiques ou des fonctionnalités supplémentaires, nous recommandons de faire appel à un développeur Jekyll/Ruby expérimenté.

### Troubleshooting Quick Guide

| Problème | Solution rapide |
|----------|----------------|
| Build fails | `bundle exec jekyll clean && bundle install` |
| Navigation broken | Vérifier cohérence slugs dans `_data/navigation.yml` |
| Styles not loading | Vérifier `baseurl` dans `_config.yml` |
| Bot not working | Console browser pour erreurs JS |
| SEO tags missing | Vérifier `{% seo %}` dans `default.html` |
| Slow build | Désactiver `incremental: false` temporairement |

---

## 📈 Roadmap et améliorations futures

### Court terme (1-3 mois)
- [ ] **A/B Testing** des parcours bot conversationnel
- [ ] **Analytics avancées** avec Google Analytics 4
- [ ] **Formulaires de contact** intégrés
- [ ] **Newsletter signup** avec intégration email

### Moyen terme (3-6 mois)  
- [ ] **Progressive Web App** (PWA) avec service worker
- [ ] **Recherche full-text** avec lunr.js
- [ ] **Système de favoris** pour spécialités
- [ ] **Mode sombre** avec switch utilisateur

### Long terme (6-12 mois)
- [ ] **Multilingual** (anglais international)
- [ ] **CMS Headless** integration (Strapi, Contentful)
- [ ] **API REST** pour données spécialités  
- [ ] **Mobile app** companion

---

## 📄 Licence et propriété

Ce site web et son code source sont la propriété d'**Epitech** suite à l'acquisition.

**Développeur original** : Damien Demontis  
**Date de création** : 2025  
**Dernière mise à jour** : Août 2025  
**Version** : 2.0 (Post-refactoring Jekyll)

### Utilisation du code
Le code peut être réutilisé et modifié pour les besoins d'Epitech. Pour toute question technique ou modification majeure, référez-vous à ce README ou contactez l'équipe de développement.

---

*Ce README constitue la documentation technique complète du site. Il est recommandé de le tenir à jour lors de modifications importantes de l'architecture ou des fonctionnalités.*