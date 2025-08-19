---
layout: specialite
title: Strategic Project Management & Entrepreneurship
slug: project-management
type: business
icon: fas fa-tasks
ordre: 1
color_primary: "#0D6EFD"
color_secondary: "#6EA8FE"
careers: true
has_media: true
short_description: "Développez les compétences stratégiques et opérationnelles pour mener des projets complexes et créer des entreprises innovantes dans l'écosystème tech."
description: "Maîtrisez les méthodologies de gestion de projet avancées et les stratégies entrepreneuriales pour diriger efficacement des initiatives technologiques d'envergure et transformer des idées innovantes en entreprises prospères."
---

{% assign specialty_data = site.data["project-management"] %}

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