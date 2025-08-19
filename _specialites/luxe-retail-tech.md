---
layout: specialite
title: Luxe & Retail Tech
slug: luxe-retail-tech
type: business
icon: fas fa-gem
ordre: 9
color_primary: "#A21CAF"
color_secondary: "#D946EF"
careers: true
has_media: true
short_description: "Transformez l'expérience client dans le luxe et le retail grâce aux technologies digitales pour créer des parcours d'achat innovants et personnalisés."
description: "Développez une expertise à l'intersection du luxe, du retail et de la technologie pour concevoir et implémenter des solutions innovantes qui redéfinissent l'expérience client, optimisent les opérations et créent de nouveaux modèles commerciaux."
---

{% assign specialty_data = site.data["luxe-retail-tech"] %}

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