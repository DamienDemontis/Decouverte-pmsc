---
layout: specialite
title: Data Science & Business Intelligence
slug: data-science-bi
type: business
icon: fas fa-chart-bar
ordre: 8
color_primary: "#0284C7"
color_secondary: "#38BDF8"
careers: true
has_media: true
short_description: "Exploitez le potentiel des données pour générer des insights stratégiques, prendre des décisions éclairées et créer un avantage concurrentiel durable."
description: "Maîtrisez les techniques d'analyse de données avancées et les outils de business intelligence pour transformer les données brutes en connaissances actionnables qui guident la stratégie d'entreprise et optimisent les performances."
---

{% assign specialty_data = site.data["data-science-bi"] %}

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