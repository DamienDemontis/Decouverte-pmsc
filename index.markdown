---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Accueil
---

<header class="home-header">
  <div class="container">
    <h1>Découverte des Spécialités MSc Epitech</h1>
    <p class="lead">
      Explorez les différentes spécialités du cursus MSc d'Epitech pour trouver celle qui correspond à vos aspirations
      et découvrez des projets pratiques pour vous initier à chacune d'elles.
    </p>
  </div>
</header>

<div class="specialite-grid container">
  {% for specialite in site.specialites %}
    <div class="specialite-card" style="--card-color: {{ specialite.color_primary | default: '#4361ee' }}">
      <div class="specialite-icon">
        <i class="{{ specialite.icon | default: 'fas fa-graduation-cap' }}"></i>
      </div>
      <h3>{{ specialite.title }}</h3>
      <p>{{ specialite.short_description }}</p>
      <a href="{{ specialite.url | relative_url }}" class="btn-primary">Découvrir</a>
    </div>
  {% endfor %}
</div>

<section class="home-about container">
  <h2>À propos de ce guide</h2>
  <div class="home-about-content">
    <div class="home-about-text">
      <p>
        Ce guide a été conçu pour vous aider à explorer les différentes spécialités disponibles dans le cursus MSc d'Epitech.
        Chaque section présente une spécialité en détail, avec des explications sur ses concepts fondamentaux, ses cas d'usage,
        son écosystème technique, et des projets pratiques pour vous y initier.
      </p>
      <p>
        Que vous soyez en préMSc et que vous cherchiez à choisir votre future spécialité, ou que vous soyez simplement
        curieux de découvrir de nouveaux domaines, ce guide vous fournira les ressources nécessaires pour
        vous lancer et développer vos compétences.
      </p>
    </div>
    <div class="home-about-image">
      <img src="{{ '/assets/images/Epitech_Official_Logo.png' | relative_url }}" alt="Logo Epitech">
    </div>
  </div>
</section>
