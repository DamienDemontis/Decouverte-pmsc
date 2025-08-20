---
layout: specialite
title: Cloud Computing
slug: cloud
type: tech
icon: fas fa-cloud
ordre: 2
color_primary: "#3B82F6"
color_secondary: "#60A5FA"
careers: true
has_media: true
short_description: "Maîtrisez la conception, le déploiement et la gestion d'infrastructures cloud pour créer des applications évolutives, flexibles et résilientes."
description: "Plongez dans l'univers du Cloud Computing pour apprendre à concevoir, déployer et gérer des infrastructures et services cloud modernes, flexibles et sécurisés."
---

{% assign specialty_data = site.data.cloud %}

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