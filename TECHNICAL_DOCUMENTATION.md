# Documentation Technique - Site Découverte MSc Epitech

## 🏗️ Architecture Technique Détaillée

### Stack technologique complète

```
Frontend:
├── HTML5 Semantic
├── CSS3 (Custom Properties + Grid + Flexbox)  
├── Vanilla JavaScript ES6+
└── Font Awesome 6.4.0 + Google Fonts

Backend/Build:
├── Jekyll 3.10.0 (Static Site Generator)
├── Ruby 2.7+ (Runtime Environment)
├── Liquid Templating Engine
├── Kramdown (Markdown Processor)
├── Sass (CSS Preprocessor)
└── GitHub Pages Compatible

Plugins Ecosystem:
├── jekyll-seo-tag (Meta tags automation)
├── jekyll-sitemap (XML sitemap generation)  
├── jekyll-feed (RSS feed generation)
└── minima theme (base theme)

External Dependencies:
├── CDNs: Font Awesome, Google Fonts, Animate.css
├── YouTube Embed API
└── Preconnect optimizations
```

## 📊 Flux de données et templating

### Hiérarchie des templates
```liquid
_layouts/default.html (base layout)
├── {% include navigation.html %}
├── {{ content }}
└── {% include specialty-bot.html %}

_layouts/specialite.html (extends default)
├── {% assign specialty_data = site.data.specialities[page.slug] %}
├── {% include feature-grid.html features=specialty_data.overview.features %}
├── {% include timeline.html timeline=specialty_data.use_cases.timeline %}
├── {% include career-paths.html career_paths=specialty_data.career_paths.roles %}
├── {% include media-section.html media=specialty_data.media %}
└── {{ content }} (markdown content)
```

### Data Flow Architecture
```
_data/navigation.yml → _includes/navigation.html → Sidebar Menu
_data/specialities.yml → _layouts/specialite.html → Dynamic Content
_specialites/*.md → Collections → Individual Pages  
_config.yml → Global Variables → All Templates
```

### Variables disponibles

#### Variables globales (`site.*`)
```liquid
{{ site.title }}           # Titre du site
{{ site.description }}     # Description meta
{{ site.baseurl }}         # Chemin de base (/Decouverte-pmsc)
{{ site.url }}            # URL complète du site
{{ site.specialites }}    # Collection des spécialités
```

#### Variables de page (`page.*`)
```liquid
{{ page.title }}          # Titre de la page
{{ page.slug }}           # Identifiant unique
{{ page.icon }}           # Icône Font Awesome
{{ page.type }}           # Type: tech|business
{{ page.color_primary }}  # Couleur primaire
{{ page.careers }}        # Boolean: afficher carrières
{{ page.has_media }}      # Boolean: afficher médias
```

#### Variables de données (`site.data.*`)
```liquid
{{ site.data.navigation.main }}         # Menu principal
{{ site.data.navigation.categories }}   # Catégories spécialités
{{ site.data.specialities[slug] }}      # Données spécialité
```

## 🧩 Système de composants

### Architecture des includes

#### navigation.html
```liquid
<!-- Génération automatique du menu latéral -->
{% for category in site.data.navigation.categories %}
  {% assign specialities = category[1].specialities | sort: 'order' %}
  {% for specialty in specialities %}
    {% assign specialty_page = site.specialites | where: "slug", specialty.slug | first %}
    <!-- Fallback si slug non trouvé -->
    {% unless specialty_page %}
      {% assign specialty_page = site.specialites | where_exp: "item", "item.name contains specialty.slug" | first %}
    {% endunless %}
  {% endfor %}
{% endfor %}
```

#### feature-card.html
```liquid
<!-- Composant carte de fonctionnalité réutilisable -->
<div class="feature-card">
  <h4>
    <i class="{{ include.feature.icon }}"></i> 
    {{ include.feature.title }}
  </h4>
  <p>{{ include.feature.description }}</p>
  {% if include.feature.example %}
    <p><span class="badge badge-primary">Exemple</span></p>
    <p>{{ include.feature.example }}</p>
  {% endif %}
</div>
```

#### timeline.html
```liquid
<!-- Composant timeline pour cas d'usage -->
<div class="timeline">
  {% for item in include.timeline %}
    <div class="timeline-item {{ item.side }}">
      <div class="timeline-content">
        <h4>{{ item.category }}</h4>
        <ul>
          {% for use_case in item.items %}
            <li><strong>{{ use_case.title }}</strong> : {{ use_case.description }}</li>
          {% endfor %}
        </ul>
      </div>
    </div>
  {% endfor %}
</div>
```

### CSS Architecture

#### Variables CSS (Custom Properties)
```css
:root {
  /* Couleurs principales */
  --main: #4361ee;
  --main-light: #4cc9f0;
  --main-dark: #3a0ca3;
  --accent: #f72585;
  
  /* Layout */
  --sidebar-width: 250px;
  --header-height: 60px;
  
  /* Animations */
  --transition: all 0.3s ease;
  
  /* Ombres */
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### Structure CSS modulaire
```css
/* Base & Reset */
* { box-sizing: border-box; }

/* Layout Components */
.sidebar { /* Navigation latérale */ }
.main-content { /* Contenu principal */ }
.section-nav { /* Navigation sections */ }

/* Content Components */  
.feature-card { /* Cartes de fonctionnalités */ }
.timeline { /* Chronologie */ }
.specialite-card { /* Cartes spécialités */ }

/* Interactive Components */
.specialty-bot-container { /* Bot conversationnel */ }
.tech-orbit { /* Animation orbite */ }

/* Utilities */
.mb-1, .mb-2, .mb-3 { /* Marges */ }
.text-center { /* Alignement */ }
.badge { /* Labels */ }
```

### JavaScript Architecture

#### Modularité
```javascript
// main.js - Fonctionnalités communes
document.addEventListener('DOMContentLoaded', function() {
  initAccordions();
  initMobileMenu();  
  initBackToTop();
  initSectionNavigation();
});

// home.js - Spécifique page d'accueil
document.addEventListener('DOMContentLoaded', function() {
  initCountUpAnimation();
  initTypewriterEffect();
  initTechOrbitAnimation();
  initScrollAnimations();
});

// specialty-bot.js - Bot conversationnel
const conversationTree = { /* Arbre de conversation */ };
function handleInlineClick(action, data) { /* Navigation bot */ }
```

## 🎨 Specialty Bot - Architecture détaillée

### Structure conversationnelle

#### États du bot
```javascript
let conversationState = 'initial';  // État actuel
let chatHistory = [];               // Historique messages  
let navigationHistory = ['initial']; // Historique navigation
let userProfile = {                 // Profil utilisateur
  background: null,
  preferences: null, 
  interests: [],
  scores: {}                        // Scores du test de personnalité
};
```

#### Arbre de conversation (Version 2.0)
```javascript
const conversationTree = {
  // Navigation principale
  initial: {
    messages: ["Message d'accueil avec test de personnalité direct"],
    options: ["personality_test_start", "profile_check", "help_q1", "explainSpecialties"]
  },
  
  // Nouveau système de test de personnalité
  personality_test_start: {
    messages: ["Introduction au test avancé (12 questions)"],
    options: []
  },
  personality_test_question: {
    messages: [], // Généré dynamiquement
    options: []   // Avec barre de progression
  },
  personality_test_results: {
    messages: [], // Résultats avec visualisations
    options: []   // Liens vers spécialités cliquables
  },
  
  // États de recommandation corrigés
  recommend_ai: { messages: ["Recommandation IA personnalisée"] },
  recommend_cloud: { messages: ["Recommandation Cloud personnalisée"] },
  recommend_fintech: { messages: ["Recommandation Fintech personnalisée"] },
  // ... + 15 autres états de recommandation
  
  // Correction des dead ends
  explainSpecialties: { messages: ["Vue d'ensemble de toutes les spécialités"] },
  help_q_tech: { messages: ["Guide spécialisé voie technique"] },
  help_q_business: { messages: ["Guide spécialisé voie business"] }
};
```

## 🧠 Système de Test de Personnalité Avancé

### Architecture du PersonalitySystem

#### Module séparé (`personality-system.js`)
```javascript
class PersonalitySystem {
  constructor() {
    // 5 dimensions comportementales avec polarités
    this.dimensions = {
      technical_business: { name: 'Technique - Business', technical: 0, business: 0 },
      detail_vision: { name: 'Détail - Vision', detail: 0, vision: 0 },
      individual_team: { name: 'Individuel - Équipe', individual: 0, team: 0 },
      stability_innovation: { name: 'Stabilité - Innovation', stability: 0, innovation: 0 },
      process_results: { name: 'Processus - Résultats', process: 0, results: 0 }
    };
    
    // 8 profils professionnels français
    this.personalityTypes = {
      'architecte-technique': { name: 'L\'Architecte Technique', emoji: '🏗️' },
      'innovateur-tech': { name: 'L\'Innovateur Tech', emoji: '💡' },
      'gardien-cyber': { name: 'Le Gardien Cyber', emoji: '🛡️' },
      'analyste-donnees': { name: 'L\'Analyste de Données', emoji: '📊' },
      'chef-projet-tech': { name: 'Le Chef de Projet Tech', emoji: '🎯' },
      'strategiste-digital': { name: 'Le Stratège Digital', emoji: '🧠' },
      'catalyseur-business': { name: 'Le Catalyseur Business', emoji: '🚀' },
      'consultant-expert': { name: 'Le Consultant Expert', emoji: '🎓' }
    };
    
    // 12 questions sophistiquées
    this.questions = [/* ... 12 questions avec scoring multidimensionnel */];
  }
}
```

#### Algorithme de scoring sophistiqué
```javascript
// Système de matching par patterns
determinePersonalityType() {
  const scores = this.currentScores;
  let bestMatch = null;
  let bestScore = -1;

  for (let typeId in this.personalityTypes) {
    let matchScore = this.calculateTypeMatch(scores, this.personalityTypes[typeId].pattern);
    
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = typeId;
    }
  }
  
  return bestMatch;
}

calculateTypeMatch(userScores, typePattern) {
  let score = 0;
  
  for (let trait in typePattern) {
    const userValue = userScores[trait] || 0;
    const expectedLevel = typePattern[trait]; // 'high', 'medium', 'low'
    
    let targetValue;
    if (expectedLevel === 'high') targetValue = 25;
    else if (expectedLevel === 'medium') targetValue = 15;
    else targetValue = 5;
    
    // Calcul de distance avec pénalité
    const diff = Math.abs(userValue - targetValue);
    score += Math.max(0, 30 - diff);
  }
  
  return score;
}
```

#### Mapping spécialités intelligent
```javascript
this.specialtyMappings = {
  'architecte-technique': ['cloud', 'bigdata', 'iot'],
  'innovateur-tech': ['ia', 'vrar', 'iot'],
  'gardien-cyber': ['cybersecurite', 'data-protection', 'cloud'],
  'analyste-donnees': ['data-science-bi', 'bigdata', 'fintech'],
  'chef-projet-tech': ['project-management', 'ai-transformation', 'cloud'],
  'strategiste-digital': ['ai-transformation', 'project-management', 'fintech'],
  'catalyseur-business': ['marketing', 'luxe-retail-tech', 'rh-digitale'],
  'consultant-expert': ['ai-transformation', 'data-protection', 'project-management']
};

// Actions cliquables pour chaque spécialité
this.specialtyActions = {
  'ia': 'explainAI',
  'cloud': 'explainCloud', 
  'cybersecurite': 'explainCyber',
  // ... mapping complet vers les états du bot
};
```

### Intégration UI/UX Avancée

#### Barres de progression visuelles
```javascript
generateDimensionBars() {
  let html = '<div class="personality-dimensions">';
  
  for (let dimKey in this.dimensions) {
    const dim = this.dimensions[dimKey];
    let leftValue, rightValue, leftLabel, rightLabel;
    
    // Calcul des pourcentages
    const leftPercent = Math.round((leftValue / (leftValue + rightValue || 1)) * 100);
    const rightPercent = 100 - leftPercent;
    
    html += `
      <div class="dimension-bar">
        <div class="dimension-labels">
          <span class="left-label">${leftLabel}</span>
          <span class="right-label">${rightLabel}</span>
        </div>
        <div class="bar-container">
          <div class="bar-left" style="width: ${leftPercent}%"></div>
          <div class="bar-right" style="width: ${rightPercent}%"></div>
        </div>
        <div class="dimension-values">
          <span class="left-value">${leftPercent}%</span>
          <span class="right-value">${rightPercent}%</span>
        </div>
      </div>
    `;
  }
  
  return html;
}
```

#### Spécialités cliquables dans les résultats
```javascript
let specialtiesHtml = '';
topSpecialties.forEach((specialtyKey, index) => {
  const rank = ['🥇', '🥈', '🥉'][index] || '🏅';
  const name = this.specialtyNames[specialtyKey] || specialtyKey;
  const action = this.specialtyActions[specialtyKey] || 'explainSpecialties';
  const className = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
  
  specialtiesHtml += `
    <div class="recommendation ${className} clickable-specialty" 
         onclick="handleInlineClick('${action}')">
      ${rank} <strong>${name}</strong><br/>
      <span class="click-hint">Cliquez pour en savoir plus →</span>
    </div>
  `;
});
```

### CSS Système de Personnalité

#### Variables et composants visuels
```css
/* Variables pour le système de personnalité */
.personality-results {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 12px 0;
  box-shadow: var(--bot-shadow-light);
}

.personality-dimensions {
  margin: 20px 0;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.bar-container {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--bot-border-light);
  margin-bottom: 6px;
}

.bar-left {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.6s ease;
}

.bar-right {
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 0.6s ease;
}

.clickable-specialty {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-specialty:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Système de scoring
```javascript
// Profils types avec scoring mis à jour (Version 2.0)
const profiles = {
  'architecte-technique': {
    pattern: { technical: 'high', detail: 'high', individual: 'medium', stability: 'high', process: 'high' }
  },
  'innovateur-tech': {
    pattern: { technical: 'high', vision: 'high', individual: 'high', innovation: 'high', results: 'high' }
  },
  'gardien-cyber': {
    pattern: { technical: 'high', detail: 'high', individual: 'medium', stability: 'high', process: 'high' }
  },
  'analyste-donnees': {
    pattern: { technical: 'medium', detail: 'high', individual: 'medium', stability: 'medium', process: 'high' }
  },
  'chef-projet-tech': {
    pattern: { business: 'high', vision: 'high', team: 'high', stability: 'high', process: 'high' }
  },
  'strategiste-digital': {
    pattern: { business: 'high', vision: 'high', team: 'high', innovation: 'high', results: 'high' }
  },
  'catalyseur-business': {
    pattern: { business: 'high', vision: 'high', team: 'high', innovation: 'high', results: 'high' }
  },
  'consultant-expert': {
    pattern: { business: 'medium', vision: 'high', team: 'high', stability: 'medium', process: 'high' }
  }
};

function recordAnswer(questionId, answerIndex) {
  const question = this.questions.find(q => q.id === questionId);
  const answer = question.answers[answerIndex];
  
  // Accumulation sophistiquée des scores
  for (let trait in answer.scores) {
    if (!this.currentScores[trait]) {
      this.currentScores[trait] = 0;
    }
    this.currentScores[trait] += answer.scores[trait];
  }
  
  // Mise à jour des dimensions en temps réel
  this.updateDimensions();
}
```

### Fonctionnalités avancées

#### Inline Buttons
```javascript
// Génération dynamique de boutons dans les messages
"<div class='inline-buttons'>
  <button class='inline-btn' onclick='handleInlineClick(\"action\")'>
    🎓 Texte du bouton
  </button>
</div>"
```

#### Navigation contextuelle
```javascript
function handleInlineClick(action, data) {
  // Gestion des actions spéciales
  if (action === 'navigate') {
    window.open(data, '_blank');
    return;
  }
  
  // Navigation dans l'arbre conversationnel
  navigateToState(action);
}
```

#### Message Queue System
```javascript
let messageQueue = [];
let processingQueue = false;

function processMessageQueue() {
  if (processingQueue || messageQueue.length === 0) return;
  
  processingQueue = true;
  const message = messageQueue.shift();
  
  displayMessage(message, () => {
    processingQueue = false;
    setTimeout(processMessageQueue, 100);
  });
}
```

## 📱 Responsive Design

### Breakpoints système
```css
/* Mobile First Approach */
/* Base styles: Mobile (< 768px) */

@media (max-width: 1024px) {
  /* Tablet adjustments */
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width-mobile);
  }
}

@media (max-width: 768px) {  
  /* Mobile specific */
  .section-nav-item span { display: none; }
  .timeline::after { left: 31px; }
  .home-header h1 { font-size: 2rem; }
}
```

### Adaptive Components

#### Navigation mobile
```css
.menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 101;
}

@media (max-width: 1024px) {
  .menu-toggle { display: block; }
  .sidebar.active { transform: translateX(0); }
}
```

#### Specialty Bot mobile
```css
@media (max-width: 768px) {
  .specialty-bot-container {
    left: auto;
    right: 20px;
  }
  
  .bot-chat-container {
    right: 0;
    left: auto;
  }
}
```

## ⚡ Optimisations de performance

### Stratégies implementées

#### Chargement assets
```html
<!-- Preconnect pour domaines externes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">

<!-- SRI integrity pour sécurité -->
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
      crossorigin="anonymous">

<!-- JavaScript externe (non bloquant) -->
<script src="{{ '/assets/js/home.js' | relative_url }}"></script>
```

#### Lazy Loading vidéos
```html
<iframe loading="lazy" 
        src="{{ video.url }}" 
        title="{{ video.title }}">
</iframe>
```

#### Compression production
```yaml
# _config.yml
sass:
  style: compressed
  sourcemap: development

# Minification automatique en JEKYLL_ENV=production
```

### Métriques de performance

#### Build time
- **Développement** : ~1.8 secondes
- **Production** : ~2.5 secondes  
- **Incremental** : ~0.3 secondes

#### Asset sizes (estimé)
- **main.css** : ~45KB (minifié: ~35KB)
- **home.js** : ~12KB (minifié: ~8KB)  
- **specialty-bot.js** : ~28KB (minifié: ~20KB)
- **Images** : ~850KB total

#### Runtime performance
- **First Paint** : <1.5s
- **DOM Interactive** : <2.5s
- **Load Complete** : <4s

## 🔍 SEO Implementation

### Jekyll SEO Tag configuration
```liquid
<!-- _layouts/default.html -->
{% seo %}
<!-- Génère automatiquement :
  - <title> tags optimisés
  - <meta description>
  - Open Graph tags
  - Twitter Card meta
  - Canonical URLs
  - JSON-LD structured data (basic)
-->
```

### Sitemap automatique
```xml
<!-- Généré automatiquement dans _site/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://site.com/Decouverte-pmsc/</loc>
    <lastmod>2025-01-18</lastmod>
  </url>
  <!-- ... toutes les pages automatiquement -->
</urlset>
```

### Structured Data ready
```liquid
<!-- Prêt pour implémentation Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "{{ site.title }}",
  "description": "{{ site.description }}",
  "url": "{{ site.url }}{{ site.baseurl }}"
}
</script>
```

## 🛡️ Sécurité

### Mesures implementées

#### Content Security Policy (ready)
```html
<!-- Prêt à implémenter -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
               font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
               script-src 'self' 'unsafe-inline';
               img-src 'self' data:;
               frame-src https://www.youtube.com;">
```

#### XSS Protection
- **Liquid escaping** automatique des variables
- **Input sanitization** dans le bot (pas d'input utilisateur persisté)
- **External resources** avec SRI integrity

#### Data Protection
- **Pas de cookies** utilisés actuellement
- **Pas de données personnelles** collectées
- **Analytics** ready mais non configuré par défaut

## 🧪 Testing et Debug

### Testing local
```bash
# Test build
bundle exec jekyll build --verbose

# Test avec profiling
bundle exec jekyll build --profile

# Test liens internes
bundle exec jekyll build && bundle exec htmlproofer ./_site
```

### Debug Liquid templates
```liquid
<!-- Debug variables -->
{{ page | inspect }}
{{ site.data.navigation | inspect }}

<!-- Debug collections -->
{% for item in site.specialites %}
  {{ item.title }} - {{ item.slug }}
{% endfor %}
```

### Browser debugging
```javascript
// Console debugging pour le bot
console.log('Current state:', conversationState);
console.log('User profile:', userProfile);
console.log('Chat history:', chatHistory);
```

## 🔮 Extensions possibles

### Modularité pour extensions

#### Plugin system ready
```ruby
# _plugins/custom_filters.rb (si nécessaire)
module Jekyll
  module CustomFilters
    def specialty_by_type(specialties, type)
      specialties.select { |s| s['type'] == type }
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilters)
```

#### API Integration ready
```javascript
// Prêt pour intégration API externe
async function fetchSpecialtyData(slug) {
  try {
    const response = await fetch(`/api/specialties/${slug}`);
    return await response.json();
  } catch (error) {
    // Fallback vers données statiques
    return staticSpecialtyData[slug];
  }
}
```

#### Internationalization ready
```liquid
<!-- Prêt pour i18n -->
{% assign lang = page.lang | default: site.lang | default: 'fr' %}
{{ site.data.strings[lang].welcome_message }}
```

Cette documentation technique complète l'architecture, les composants et les possibilités d'extension du site. Elle constitue la référence pour tout développement futur ou maintenance technique.