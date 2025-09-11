# Plateforme Interactive MSc Epitech - Documentation Technique

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Performances et métriques](#-performances-et-métriques)
- [Architecture technique](#-architecture-technique)
- [Installation et configuration](#-installation-et-configuration)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Gestion du contenu](#-gestion-du-contenu)
- [Maintenance](#-maintenance)
- [Support technique](#-support-technique)

---

## 🎯 Vue d'ensemble

Plateforme web interactive de présentation des 15 spécialités MSc d'Epitech, développée avec Jekyll et optimisée pour la performance et l'engagement utilisateur. Le site intègre un assistant conversationnel intelligent et offre une expérience utilisateur premium sur tous les appareils.

### Caractéristiques principales
- **Bot conversationnel intelligent** avec détection de profil et recommandations personnalisées
- **15 spécialités MSc** présentées de manière détaillée et structurée
- **Animations interactives** et expérience utilisateur immersive
- **Architecture data-driven** avec maintenance centralisée
- **Performance optimale** sur tous les appareils

### Spécialités disponibles

<table>
<tr>
<td><strong>Technologies (6)</strong></td>
<td><strong>Business & Management (9)</strong></td>
</tr>
<tr>
<td>
• Intelligence Artificielle<br/>
• Cybersécurité<br/>
• Big Data & Analytics<br/>
• Cloud Computing<br/>
• Internet of Things (IoT)<br/>
• VR/AR
</td>
<td>
• Strategic Project Management<br/>
• Fintech & Stratégies financières<br/>
• Marketing & Influence<br/>
• IA & Transformation<br/>
• Data Protection & Sécurité<br/>
• Digitalisation RH<br/>
• Santé, IA & IoT<br/>
• Data Science & BI<br/>
• Luxe & Retail Tech
</td>
</tr>
</table>

---

## 📊 Performances et métriques

### Scores Lighthouse actuels
<table>
<tr>
<td><strong>Performance</strong></td>
<td><strong>Accessibilité</strong></td>
<td><strong>Bonnes Pratiques</strong></td>
<td><strong>SEO</strong></td>
</tr>
<tr>
<td align="center">🟢 98/100</td>
<td align="center">🟡 84/100</td>
<td align="center">🟢 100/100</td>
<td align="center">🟢 100/100</td>
</tr>
</table>

### Métriques de performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

### Optimisations implémentées
✅ Compression CSS/JS automatique en production  
✅ Preconnect vers domaines externes  
✅ Lazy loading pour contenu média  
✅ Images optimisées avec favicon personnalisé  
✅ Cache browser optimisé  
✅ Minification HTML automatique  

---

## 🏗️ Architecture technique

### Stack technologique

| Technologie | Version | Utilisation |
|------------|---------|------------|
| **Jekyll** | 3.10.0 | Générateur de site statique |
| **Ruby** | 2.7+ | Environnement d'exécution |
| **Liquid** | 4.0 | Moteur de templating |
| **JavaScript** | ES6+ | Interactivité et animations |
| **CSS3** | Modern | Styling avec CSS Variables |
| **Font Awesome** | 6.4.0 | Bibliothèque d'icônes |

### Architecture du système

```
┌─────────────────────────────────────┐
│         Contenu (Markdown)          │
└────────────┬────────────────────────┘
             ▼
┌─────────────────────────────────────┐
│      Données (YAML Files)           │
│   • navigation.yml                  │
│   • specialities.yml                │
└────────────┬────────────────────────┘
             ▼
┌─────────────────────────────────────┐
│    Templates (Liquid/Jekyll)        │
│   • Layouts                         │
│   • Includes                        │
└────────────┬────────────────────────┘
             ▼
┌─────────────────────────────────────┐
│     Site statique généré            │
│   • HTML optimisé                   │
│   • CSS/JS minifiés                 │
└─────────────────────────────────────┘
```

### Principes de conception
- **Data-Driven**: Contenu centralisé pour maintenance simplifiée
- **Component-Based**: Composants réutilisables via includes
- **Performance-First**: Optimisations automatiques en production
- **Security-Aware**: SRI hashes pour ressources externes

---

## 🚀 Installation et configuration

### Prérequis
- Ruby 2.7+ avec Bundler
- Git pour le versioning
- Éditeur de code moderne (VS Code recommandé)

### Installation

#### 1. Configuration initiale
```bash
# Installer les dépendances Ruby
bundle install

# Vérifier l'installation
bundle exec jekyll --version
```

#### 2. Lancement en développement
```bash
# Serveur avec rechargement automatique
bundle exec jekyll serve --livereload

# Le site sera accessible sur
# http://localhost:4000/Decouverte-pmsc/
```

#### 3. Build de production
```bash
# Générer le site optimisé
JEKYLL_ENV=production bundle exec jekyll build

# Les fichiers sont générés dans _site/
```

### Commandes essentielles

| Commande | Description |
|----------|------------|
| `bundle exec jekyll serve` | Lance le serveur de développement |
| `bundle exec jekyll build` | Génère le site statique |
| `bundle exec jekyll clean` | Nettoie le cache et _site |
| `bundle update` | Met à jour les dépendances |

---

## 📁 Structure du projet

```
Decouverte-pmsc/
│
├── 📄 _config.yml              # Configuration Jekyll
├── 📦 Gemfile                  # Dépendances Ruby
├── 🔒 Gemfile.lock            # Versions verrouillées
│
├── 📊 _data/                   # Données centralisées
│   ├── navigation.yml          # Structure de navigation
│   ├── specialities.yml        # Contenu des spécialités
│   └── [15 fichiers YAML]      # Un par spécialité
│
├── 🎨 _layouts/                # Templates de page
│   ├── default.html            # Layout principal
│   └── specialite.html         # Layout spécialités
│
├── 🧩 _includes/               # Composants réutilisables
│   ├── navigation.html         # Menu latéral
│   ├── specialty-bot.html      # Bot conversationnel
│   └── [15+ composants]        # Sections modulaires
│
├── 📝 _specialites/            # Pages des spécialités
│   └── [15 fichiers .md]       # Une page par spécialité
│
├── 🎨 assets/                  # Ressources statiques
│   ├── css/                    # Styles (3 fichiers)
│   ├── js/                     # Scripts (4 fichiers)
│   └── images/                 # Images et icônes
│
├── 📄 index.markdown           # Page d'accueil
├── 📄 about.markdown           # Page à propos
└── 📄 404.html                # Page d'erreur
```

### Fichiers critiques

| Fichier | Rôle | Lignes |
|---------|------|--------|
| `specialty-bot.js` | Assistant conversationnel | 2000+ |
| `main.css` | Styles principaux | 1700+ |
| `main.js` | Interactions globales | 700+ |
| `_config.yml` | Configuration Jekyll | 96 |

---

## ✨ Fonctionnalités principales

### 1. 🤖 Assistant conversationnel intelligent

Bot interactif avec arbre décisionnel complexe offrant:
- **Détection de profil étudiant** (Bac+2, Bac+3, Bac+4+)
- **Recommandations personnalisées** basées sur le parcours
- **Test de personnalité complet** (12 questions)
- **Navigation contextuelle** vers les spécialités
- **FAQ dynamique** avec réponses instantanées

### 2. 🎨 Animations et interactions

Expérience utilisateur immersive avec:
- **Typewriter effect** sur la page d'accueil
- **Orbite technologique** interactive avec survol dynamique
- **Animations de compteurs** pour les statistiques
- **Transitions fluides** entre sections
- **Parallax effects** subtils

### 3. 📱 Design responsive

| Appareil | Breakpoint | Optimisations |
|----------|------------|---------------|
| Mobile | < 768px | Menu burger, navigation tactile |
| Tablette | 768-1024px | Layout adaptatif, grilles flexibles |
| Desktop | > 1024px | Expérience complète, animations avancées |

### 4. 📊 Architecture data-driven

Système de gestion de contenu centralisé:
- **17 fichiers YAML** pour le contenu structuré
- **15 composants réutilisables** via includes
- **Navigation automatique** générée dynamiquement
- **Maintenance simplifiée** avec un point d'entrée unique

### 5. 🔍 SEO et accessibilité

Optimisations pour le référencement:
- **Meta tags automatiques** avec Jekyll SEO
- **Sitemap XML** et **robots.txt**
- **Structured data** pour rich snippets
- **Open Graph** pour réseaux sociaux
- **Score SEO**: 100/100 Lighthouse

---

## 📝 Gestion du contenu

### Ajouter une nouvelle spécialité

#### Étape 1: Créer la page
Créer un fichier dans `_specialites/nouvelle-specialite.md`:
```yaml
---
layout: specialite
title: "Nom de la Spécialité"
slug: nouvelle-specialite
icon: fas fa-icon-name
type: tech # ou business
---
{% assign specialty_data = site.data.nouvelle-specialite %}
{% include overview-section.html %}
{% include cases-section.html %}
[...]
```

#### Étape 2: Ajouter les données
Créer `_data/nouvelle-specialite.yml` avec la structure complète du contenu.

#### Étape 3: Mettre à jour la navigation
Ajouter dans `_data/navigation.yml` sous la bonne catégorie.

### Modifier le contenu existant

| Type de modification | Fichier à éditer |
|---------------------|------------------|
| Texte d'une spécialité | `_data/[nom-specialite].yml` |
| Ordre du menu | `_data/navigation.yml` |
| Styles globaux | `assets/css/main.css` |
| Comportement du bot | `assets/js/specialty-bot.js` |

### Gestion des médias

- **Images**: Placer dans `assets/images/`, optimiser avant upload
- **Vidéos**: Utiliser des embeds YouTube via les données YAML
- **Icônes**: Font Awesome 6.4.0 disponible

---

## 🔧 Maintenance

### Tâches régulières

#### Mises à jour mensuelles
```bash
# Vérifier et appliquer les mises à jour
bundle outdated
bundle update

# Tester après mise à jour
bundle exec jekyll serve
```

#### Vérifications trimestrielles
- Audit Lighthouse pour maintenir les scores
- Vérification des liens cassés
- Mise à jour du contenu des spécialités
- Test sur différents navigateurs

### Résolution de problèmes

| Problème | Solution |
|----------|----------|
| Build échoue | `bundle exec jekyll clean && bundle install` |
| Navigation cassée | Vérifier cohérence des slugs dans `_data/` |
| Bot non fonctionnel | Inspecter console JavaScript |
| Styles manquants | Vérifier `baseurl` dans `_config.yml` |
| Performance dégradée | Optimiser images, nettoyer CSS inutilisé |

### Points de vigilance

⚠️ **Avant toute mise à jour majeure:**
1. Sauvegarder le site actuel
2. Tester en environnement local
3. Vérifier la compatibilité Jekyll/GitHub Pages
4. Valider les scores Lighthouse

---

## 🛠️ Support technique

### Stack technologique

#### Backend & Build
- **Jekyll** 3.10.0 - Générateur de site statique
- **Ruby** 2.7+ - Environnement d'exécution
- **Liquid** 4.0 - Moteur de templating
- **Bundler** 2.0+ - Gestionnaire de dépendances

#### Frontend
- **JavaScript ES6+** - Vanilla JS, aucun framework
- **CSS3** - Variables CSS, Flexbox, Grid
- **Font Awesome** 6.4.0 - Bibliothèque d'icônes
- **Google Fonts** - Typographie Inter

#### Plugins Jekyll
- `jekyll-seo-tag` - Optimisation SEO
- `jekyll-sitemap` - Génération sitemap XML
- `jekyll-feed` - Flux RSS automatique

### Documentation et ressources

#### Références essentielles
- [Documentation Jekyll](https://jekyllrb.com/docs/)
- [Liquid Templating](https://shopify.github.io/liquid/)
- [Markdown Guide](https://www.markdownguide.org/)

#### Support communautaire
- [Jekyll Forum](https://talk.jekyllrb.com/)
- [Stack Overflow Jekyll](https://stackoverflow.com/questions/tagged/jekyll)

### Guide de dépannage rapide

```bash
# Problèmes fréquents et solutions

# Erreur de build
bundle exec jekyll clean && bundle install

# Problème de dépendances
rm Gemfile.lock && bundle install

# Vérifier la syntaxe YAML
ruby -e "require 'yaml'; YAML.load_file('_config.yml')"

# Serveur qui ne démarre pas
lsof -i :4000  # Vérifier si le port est occupé
```

---

## 📄 Informations légales

### Propriété intellectuelle
Site web développé pour **Epitech** - École de l'innovation et de l'expertise informatique.

### Crédits
- **Conception & Développement**: Damien Demontis
- **Version actuelle**: 2.0
- **Dernière mise à jour**: Septembre 2025
- **Technologies**: Jekyll, Ruby, JavaScript

---

*Documentation technique complète - Version 2.0*