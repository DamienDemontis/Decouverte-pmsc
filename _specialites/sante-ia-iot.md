---
layout: specialite
title: Santé, IA & IoT
slug: sante-ia-iot
type: business
icon: fas fa-heartbeat
ordre: 13
color_primary: "#E11D48" # Rose-600
color_secondary: "#F472B6" # Rose-400
careers: true
has_media: true
short_description: "Pilotez la transformation du secteur de la santé grâce à l'intelligence artificielle et aux objets connectés."
description: "Développez une expertise à l'intersection de la santé, de l'IA et de l'IoT pour concevoir des solutions innovantes qui révolutionnent les parcours de soins, améliorent l'efficacité des systèmes de santé et permettent une médecine plus personnalisée et proactive."
---

{% assign specialty_data = site.data["sante-ia-iot"] %}

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