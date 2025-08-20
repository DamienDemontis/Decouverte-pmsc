---
layout: specialite
title: Cybersécurité
slug: cybersecurite
type: tech
icon: fas fa-shield-alt
ordre: 1
color_primary: "#DC2626"
color_secondary: "#EF4444"
careers: true
has_media: true
short_description: "Développez l'expertise nécessaire pour protéger les systèmes d'information contre les menaces numériques et sécuriser les données sensibles des organisations."
description: "Maîtrisez les techniques offensives et défensives de la cybersécurité pour protéger les infrastructures critiques, anticiper les attaques et répondre efficacement aux incidents de sécurité dans un monde de plus en plus connecté."
---

{% assign specialty_data = site.data.cybersecurite %}

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