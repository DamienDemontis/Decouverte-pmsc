---
layout: specialite
title: Digitalisation de la fonction RH (HR Tech)
slug: rh-digitale
type: business
icon: fas fa-users-cog
ordre: 6
color_primary: "#059669"
color_secondary: "#34D399"
careers: true
has_media: true
short_description: "Transformez la gestion des ressources humaines grâce aux technologies digitales pour créer une expérience collaborateur innovante et développer le capital humain."
description: "Maîtrisez les outils et stratégies de la HR Tech pour optimiser les processus, améliorer l'engagement des collaborateurs et développer une culture d'entreprise axée sur l'innovation, la donnée et l'agilité."
---

{% assign specialty_data = site.data["rh-digitale"] %}

<!-- ========== INTRO ========= -->
{% include overview-section.html overview=specialty_data.overview %}

<!-- ========== USE CASES ========= -->
{% include cases-section.html use_cases=specialty_data.use_cases %}

<!-- ========== ROADMAP ========= -->
{% include roadmap-section.html roadmap=specialty_data.roadmap %}

<!-- ========== HANDS-ON ========= -->
{% include hands-on-section.html projects=specialty_data.projects %}

<!-- ========== ECOSYSTEM ========= -->
{% include ecosystem-section.html ecosystem=specialty_data.ecosystem %}

<!-- ========== MEDIA ========= -->
{% include media-section.html media=specialty_data.media %}

<!-- ========== RESOURCES ========= -->
{% include resources-section.html resources=specialty_data.resources %}

<!-- ========== CARRIÈRES ========= -->
{% include career-paths.html careers=specialty_data.career_paths %}

<!-- ========== SUMMARY ========= -->
{% include summary-section.html summary=specialty_data.summary %}