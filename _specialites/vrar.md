---
layout: specialite
title: Réalité Virtuelle & Augmentée
slug: vrar
type: tech
icon: fas fa-vr-cardboard
ordre: 6
color_primary: "#7C3AED"
color_secondary: "#A78BFA"
careers: true
has_media: true
short_description: "Concevez et développez des expériences immersives en réalité virtuelle et augmentée qui transforment notre façon d'interagir avec le monde."
description: "Plongez dans l'univers des technologies immersives, où vous apprendrez à créer des environnements virtuels et des expériences augmentées qui révolutionnent des secteurs comme la formation, la santé, l'industrie et le divertissement."
---

{% assign specialty_data = site.data.vrar %}

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