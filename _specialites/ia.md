---
layout: specialite
title: Intelligence Artificielle
slug: ia
icon: fas fa-brain
ordre: 4
type: tech
color_primary: "#9333EA"
color_secondary: "#C084FC"
careers: true
has_media: true
short_description: "Explorez l'univers fascinant de l'Intelligence Artificielle et apprenez à concevoir des systèmes capables d'apprentissage, de raisonnement et d'adaptation."
description: "Plongez dans le monde captivant de l'Intelligence Artificielle, où vous apprendrez à créer des systèmes qui imitent l'intelligence humaine, résolvent des problèmes complexes et transforment notre façon d'interagir avec la technologie."
---

{% assign specialty_data = site.data.specialities[page.slug] %}

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