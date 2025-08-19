---
layout: specialite
title: Marketing Digital & Influence
slug: marketing
type: business
icon: fas fa-bullhorn
ordre: 4
color_primary: "#C026D3"
color_secondary: "#E879F9"
careers: true
has_media: true
short_description: "Développez des stratégies de marketing digital innovantes et exploitez le pouvoir des médias sociaux pour construire une influence significative et générer un impact mesurable."
description: "Maîtrisez les techniques avancées de marketing digital, d'analyse de données comportementales et de création de contenu pour concevoir des stratégies d'influence qui créent de véritables connexions avec les audiences et transforment les intentions en actions."
---

{% assign specialty_data = site.data.marketing %}

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