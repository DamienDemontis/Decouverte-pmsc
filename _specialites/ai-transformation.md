---
layout: specialite
title: IA & Transformation des organisations
slug: ai-transformation
type: business
icon: fas fa-building-user
ordre: 5
color_primary: "#3B82F6"
color_secondary: "#93C5FD"
careers: true
has_media: true
short_description: "Orchestrez la transformation numérique des organisations grâce à l'intelligence artificielle pour optimiser les processus, stimuler l'innovation et créer de la valeur durable."
description: "Développez une expertise stratégique à l'intersection du management et de la technologie pour implémenter des solutions d'intelligence artificielle qui transforment les organisations, en tenant compte des dimensions humaines, éthiques et opérationnelles du changement."
---

{% assign specialty_data = site.data["ai-transformation"] %}

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