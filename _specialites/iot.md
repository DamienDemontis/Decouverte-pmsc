---
layout: specialite
title: Internet of Things
slug: iot
type: tech
icon: fas fa-wifi
ordre: 5
color_primary: "#059669"
color_secondary: "#10B981"
careers: true
has_media: true
short_description: "Concevez et développez des solutions connectées complètes, du capteur embarqué jusqu'au cloud, pour transformer n'importe quel objet physique en source d'intelligence."
description: "Maîtrisez l'art de créer des systèmes IoT complets, de l'électronique embarquée aux plateformes cloud, en passant par les réseaux de capteurs et l'analyse des données, pour développer des solutions intelligentes dans des domaines variés comme la ville intelligente, l'industrie 4.0 ou la santé connectée."
---

{% assign specialty_data = site.data.iot %}

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