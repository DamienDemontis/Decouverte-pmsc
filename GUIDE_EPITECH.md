# 🎓 Guide Epitech - Site de Découverte des Spécialités MSc

> **Documentation simplifiée pour les équipes Epitech**

## 📋 Vue d'Ensemble

Ce site web présente les spécialités MSc Epitech de manière moderne et interactive. Il comprend :

- **15+ spécialités détaillées** (Tech + Business)
- **Assistant conversationnel intelligent** avec test de personnalité
- **Interface responsive** optimisée mobile/desktop
- **Système de gestion de contenu** simple et efficace

**URL de production** : `https://damiendmontis.github.io/Decouverte-pmsc/`

---

## 🚀 Utilisation Quotidienne

### Pour les Conseillers d'Orientation

**Montrer les spécialités aux étudiants :**
1. Ouvrir le site web
2. Utiliser l'**assistant conversationnel** (icône bot en bas à droite)
3. Faire passer le **test de personnalité** à l'étudiant (12 questions)
4. Explorer les **recommandations personnalisées**
5. Cliquer sur les spécialités recommandées pour plus d'infos

**Navigation rapide :**
- **Menu latéral** : Accès direct à toutes les spécialités
- **Page d'accueil** : Vue d'ensemble avec animations interactives
- **Orbite des spécialités** : Clic direct sur les icônes tournantes

### Pour les Équipes Marketing

**Présentation aux événements :**
- Site entièrement **responsive** pour tablettes/smartphones
- **Animations attractives** pour capter l'attention
- **Contenu exhaustif** sur chaque spécialité (projets, carrières, salaires)
- **Test de personnalité** comme outil d'engagement

**Points forts à mettre en avant :**
- Interface **moderne et professionnelle**
- **Guidance personnalisée** via l'IA conversationnelle
- Informations **complètes et actualisées** sur l'alternance
- **Projets concrets** téléchargeables pour chaque spécialité

---

## ✏️ Modification du Contenu

### Modifier une Spécialité Existante

**Étapes simples :**

1. **Aller dans le dossier** `_specialites/`
2. **Ouvrir le fichier** de la spécialité à modifier (ex: `ia.md`)
3. **Éditer le contenu** en Markdown (format simple)
4. **Sauvegarder** le fichier

**Structure d'un fichier spécialité :**
```markdown
---
layout: specialite
title: "Intelligence Artificielle"
slug: ia
icon: fas fa-brain
color_primary: "#7C3AED"
description: "Créez des systèmes intelligents..."
---

## Présentation
Contenu en markdown...

## Projets
Liste des projets...

## Débouchés
Informations carrières...
```

### Ajouter une Nouvelle Spécialité

**Marche à suivre :**

1. **Dupliquer** un fichier existant dans `_specialites/`
2. **Renommer** le fichier (ex: `nouvelle-specialite.md`)
3. **Modifier l'en-tête** (title, slug, icon, color)
4. **Remplir le contenu** en markdown
5. **Ajouter à la navigation** dans `_data/navigation.yml`

**Exemple d'ajout navigation :**
```yaml
- slug: "nouvelle-specialite"
  title: "Nouvelle Spécialité"
  icon: "fas fa-icon"
  order: 16
```

### Modifier l'Assistant Conversationnel

**Fichier principal :** `assets/js/specialty-bot.js`

**Pour modifier les réponses du bot :**
1. Chercher la section `conversationTree`
2. Trouver l'état à modifier (ex: `help_q1`)
3. Modifier le texte dans `messages`

**Ajouter une nouvelle question :**
1. Créer un nouvel état dans `conversationTree`
2. Ajouter les options avec `handleInlineClick`
3. Tester le parcours complet

---

## 🔧 Maintenance Technique

### Démarrage Local (Développement)

**Prérequis :**
- Ruby installé sur votre machine
- Git pour gérer les versions

**Commandes :**
```bash
# 1. Cloner le projet
git clone https://github.com/DamienDemontis/Decouverte-pmsc.git
cd Decouverte-pmsc

# 2. Installer les dépendances
gem install bundler
bundle install

# 3. Lancer le serveur local
bundle exec jekyll serve

# 4. Ouvrir dans le navigateur
# http://localhost:4000/Decouverte-pmsc/
```

### Publication des Modifications

**Workflow GitHub (Automatique) :**

1. **Modifier** les fichiers localement
2. **Commiter** les changements :
   ```bash
   git add .
   git commit -m "Description des modifications"
   ```
3. **Pousser** vers GitHub :
   ```bash
   git push origin main
   ```
4. **Attendre** ~2 minutes : le site se met à jour automatiquement

**⚠️ Important :** Après le push, il n'y aura maintenant qu'**un seul build** (problème résolu).

### Résolution de Problèmes Courants

| Problème | Solution |
|----------|----------|
| Le site ne se charge pas | Vérifier l'URL et attendre la fin du déploiement |
| Le bot ne fonctionne pas | Ouvrir la console navigateur (F12) pour voir les erreurs |
| Une spécialité n'apparaît pas | Vérifier le fichier `_data/navigation.yml` |
| Erreur de build | Vérifier la syntaxe YAML dans l'en-tête des fichiers |

---

## 📊 Test de Personnalité - Guide d'Utilisation

### Nouveautés de la Version 2.0

**Système ultra-sophistiqué :**
- **12 questions approfondies** (vs 5 basiques avant)
- **8 profils professionnels** détaillés avec traits personnalisés
- **5 dimensions comportementales** avec barres visuelles
- **Top 3 spécialités recommandées** cliquables
- **Accès direct** depuis la page d'accueil

### Types de Profils Générés

1. **L'Architecte Technique** 🏗️ → Cloud, Big Data, IoT
2. **L'Innovateur Tech** 💡 → IA, VR/AR, IoT  
3. **Le Gardien Cyber** 🛡️ → Cybersécurité, Data Protection
4. **L'Analyste de Données** 📊 → Data Science BI, Santé IA, Fintech
5. **Le Chef de Projet Tech** 🎯 → Project Management, IA Transformation
6. **Le Stratège Digital** 🧠 → IA Transformation, Project Management, Fintech
7. **Le Catalyseur Business** 🚀 → Marketing, Luxe Retail, RH Digitale
8. **Le Consultant Expert** 🎓 → IA Transformation, Data Protection

### Utilisation Pédagogique

**Avec les étudiants :**
1. Présenter le test comme un **outil d'aide à l'orientation**
2. Expliquer qu'il y a **des questions sur les préférences de travail**
3. Encourager des **réponses sincères** (pas de "bonne" réponse)
4. **Discuter les résultats** et explorer les spécialités recommandées
5. Utiliser comme **point de départ** d'une discussion approfondie

**Interprétation des résultats :**
- Les **barres de dimensions** montrent les tendances comportementales
- Le **Top 3** représente les spécialités les plus adaptées au profil
- Chaque **spécialité est cliquable** pour accéder aux détails complets

---

## 📈 Analytics et Métriques

### Données Disponibles

**GitHub Pages fournit :**
- Nombre de visiteurs uniques
- Pages les plus consultées
- Pays d'origine des visiteurs
- Appareils utilisés (mobile/desktop)

**Pour aller plus loin :**
Le site est prêt pour Google Analytics (code à configurer dans `_config.yml`).

### KPIs Recommandés

**Engagement :**
- Taux d'utilisation du bot conversationnel
- Taux de complétion du test de personnalité
- Pages les plus visitées par spécialité
- Temps passé sur le site

**Performance :**
- Temps de chargement des pages
- Taux de rebond
- Utilisation mobile vs desktop

---

## 🎯 Bonnes Pratiques

### Mise à Jour du Contenu

**Régularité :**
- **Semestre** : Vérifier les informations sur l'alternance et l'admission
- **Annuel** : Mettre à jour les statistiques, salaires et débouchés
- **Ponctuel** : Ajouter nouveaux projets et cas d'usage

**Cohérence :**
- Maintenir le **même format** pour toutes les spécialités
- Utiliser les **mêmes sections** (Présentation, Projets, Débouchés, etc.)
- Respecter les **conventions de nommage** des fichiers

### Communication

**Avec les Étudiants :**
- Présenter le test de personnalité comme **un outil parmi d'autres**
- Encourager l'**exploration** de plusieurs spécialités
- Utiliser les **résultats comme base de discussion**

**Avec les Partenaires Entreprises :**
- Montrer la **qualité de l'interface** et du contenu
- Utiliser les **projets concrets** comme exemples
- Mettre en avant l'**approche moderne** de l'orientation

---

## 📞 Support et Contact

### En Cas de Problème Technique

1. **Vérifier** si le problème persiste en actualisant la page
2. **Consulter** ce guide pour les problèmes courants
3. **Ouvrir** la console navigateur (F12) pour identifier les erreurs
4. **Documenter** le problème avec des captures d'écran

### Pour des Modifications Importantes

Si vous souhaitez :
- Ajouter de **nouvelles fonctionnalités**
- Changer le **design général**
- Intégrer des **services externes** (CRM, Analytics avancées)
- Optimiser les **performances**

Nous recommandons de faire appel à un développeur web expérimenté en Jekyll/Ruby.

### Informations Techniques

**Architecture :** Site statique Jekyll
**Hébergement :** GitHub Pages  
**Performance :** Optimisé pour la vitesse et le SEO
**Compatibilité :** Tous navigateurs modernes
**Responsive :** Mobile, tablette, desktop

---

## ✅ Checklist de Validation

### Avant Mise en Production

- [ ] **Contenu** : Toutes les spécialités sont à jour
- [ ] **Navigation** : Tous les liens fonctionnent
- [ ] **Bot** : Test de personnalité complet
- [ ] **Responsive** : Test sur mobile/tablette/desktop
- [ ] **Performance** : Temps de chargement acceptables
- [ ] **SEO** : Meta descriptions renseignées

### Tests Utilisateur

- [ ] **Parcours complet** du test de personnalité
- [ ] **Navigation** vers toutes les spécialités
- [ ] **Téléchargements** des sujets de projets
- [ ] **Lisibilité** sur différents appareils
- [ ] **Accessibilité** pour les utilisateurs en situation de handicap

---

*Cette documentation est conçue pour être utilisable par les équipes non-techniques d'Epitech. Pour toute question, n'hésitez pas à vous référer à la documentation technique complète dans le fichier `README.md`.*