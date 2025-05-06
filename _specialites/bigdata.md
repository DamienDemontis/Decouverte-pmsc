---
layout: specialite
title: Big Data & Analytics
type: tech
icon: fas fa-database
ordre: 3
color_primary: "#0EA5E9"
color_secondary: "#38BDF8"
careers: true
has_media: true
short_description: "Apprenez à collecter, stocker, traiter et analyser des volumes massifs de données pour en extraire des informations stratégiques et piloter la prise de décision."
description: "Découvrez comment maîtriser le déluge de données de notre ère digitale grâce aux technologies Big Data, aux architectures distribuées et aux techniques analytiques avancées qui révolutionnent la prise de décision."
---

<!-- ========== INTRO ========= -->
<section id="overview">
  <h2><i class="fas fa-lightbulb"></i> Pourquoi le Big Data ?</h2>
  
  <div class="card-grid">
    <div class="feature-card">
      <h4><i class="fas fa-chart-line"></i> Volume</h4>
      <p>Des quantités massives de données qui dépassent les capacités de traitement traditionnelles.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>Netflix ingère plus de 150 To de données par jour pour alimenter ses systèmes de recommandation.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-bolt"></i> Vitesse</h4>
      <p>La création et le traitement de données à haute fréquence, souvent en temps réel.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>Twitter traite plus de 500 millions de tweets quotidiens, soit près de 6000 tweets par seconde.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-random"></i> Variété</h4>
      <p>Données structurées, semi-structurées et non structurées provenant de sources diverses.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>TikTok analyse vidéos, audio, texte, comportement utilisateur et métadonnées simultanément.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-check-circle"></i> Véracité</h4>
      <p>La fiabilité et la qualité des données, souvent compromise par leur volume même.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>IBM estime que les mauvaises données coûtent 3,1 billions de dollars par an à l'économie américaine.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-gem"></i> Valeur</h4>
      <p>Capacité à transformer les données en insights et en avantages concurrentiels.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>Amazon génère 35% de ses ventes grâce à son système de recommandation basé sur le Big Data.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-brain"></i> Intelligence</h4>
      <p>La capacité à extraire des connaissances et à prendre des décisions automatisées.</p>
      <p class="text-center"><span class="badge badge-primary">Exemple</span></p>
      <p>Les modèles prédictifs de Walmart prévoient les ventes avec une précision de 90% en intégrant 40 PB de données.</p>
    </div>
  </div>
  
  <h3 class="mt-4">Qu'est-ce qui différencie le Big Data de l'analyse traditionnelle ?</h3>
  
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">
        Limitations des bases de données traditionnelles
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>Les SGBDR classiques (MySQL, PostgreSQL) rencontrent plusieurs obstacles face aux Big Data :</p>
          <ul>
            <li><strong>Scaling vertical limité</strong> : Impossible d'ajouter indéfiniment de la RAM ou des CPU</li>
            <li><strong>Jointures coûteuses</strong> : Deviennent prohibitives sur des milliards de lignes</li>
            <li><strong>Schéma rigide</strong> : Difficile d'adapter pour des données semi-structurées</li>
            <li><strong>Licensing onéreux</strong> : Les solutions Oracle/SQL Server deviennent très chères à grande échelle</li>
          </ul>
          <p>En revanche, les technologies Big Data sont conçues pour le <em>scaling horizontal</em> : ajouter des machines plutôt que de la puissance.</p>
        </div>
      </div>
    </div>
    
    <div class="accordion-item">
      <div class="accordion-header">
        Limites du traitement séquentiel
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>Le traitement ligne par ligne devient problématique à l'échelle du Big Data :</p>
          <ul>
            <li><strong>Temps de calcul linéaire</strong> : Un traitement qui prend 1 minute sur 1 GB prendra théoriquement ~17 heures sur 1 TB</li>
            <li><strong>Goulots d'étranglement I/O</strong> : Les disques ne peuvent pas fournir les données assez rapidement</li>
            <li><strong>Limites de mémoire</strong> : Impossible de charger l'ensemble des données dans la RAM</li>
          </ul>
          <p>Les frameworks Big Data comme Spark ou Hadoop distribuent le traitement sur des dizaines ou centaines de nœuds en parallèle.</p>
        </div>
      </div>
    </div>
  </div>
  
  <blockquote class="mt-4">
    <p>"Nous ne sommes plus dans l'ère de l'information. Nous sommes dans l'ère de la gestion de l'information." — Leandro Herrero</p>
  </blockquote>
</section>

<!-- ========== USE‑CASES ========= -->
<section id="cases">
  <h2><i class="fas fa-briefcase"></i> Cas d'usage emblématiques</h2>
  
  <div class="timeline">
    <div class="timeline-item left">
      <div class="timeline-content">
        <h4>Commerce et Marketing</h4>
        <ul>
          <li><strong>Personnalisation</strong> : Amazon analyse l'historique d'achat, le comportement de navigation et les tendances pour personnaliser 35% de ses ventes via son système de recommandation.</li>
          <li><strong>Optimisation des prix</strong> : Les compagnies aériennes ajustent leurs tarifs jusqu'à 100 000 fois par jour en fonction de la demande en temps réel.</li>
          <li><strong>Analyse du parcours client</strong> : Sephora combine données en ligne et en magasin pour créer une vue à 360° de ses 25 millions de clients.</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item right">
      <div class="timeline-content">
        <h4>Santé et Recherche</h4>
        <ul>
          <li><strong>Médecine personnalisée</strong> : Le projet "All of Us" du NIH américain analyse les données génomiques et médicales de plus d'un million de personnes pour révolutionner les traitements.</li>
          <li><strong>Prédiction d'épidémies</strong> : HealthMap a détecté l'épidémie d'Ebola 9 jours avant l'OMS en analysant les médias sociaux et les recherches web.</li>
          <li><strong>Drug discovery</strong> : Atomwise utilise l'IA sur des pétaoctets de données moléculaires pour simuler et tester virtuellement 10 millions de composés par jour.</li>
        </ul>
      </div>
    </div>
  </div>
  
  <h3 class="mt-4">Tendances émergentes</h3>
  
  <div class="card-grid">
    <div class="feature-card">
      <h4><i class="fas fa-robot"></i> IA Générative + Big Data</h4>
      <p>L'explosion des LLMs ouvre de nouvelles perspectives pour naviguer, interroger et résumer des corpus massifs de données en langage naturel.</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-shield-alt"></i> Confidentialité et Souveraineté</h4>
      <p>Les réglementations comme RGPD et les préoccupations liées à la souveraineté des données imposent de nouvelles contraintes et opportunités.</p>
    </div>
  </div>
</section>

<!-- ========== ROADMAP ========= -->
<section id="roadmap">
  <h2><i class="fas fa-map"></i> Parcours d'apprentissage</h2>
  
  <p>Voici une feuille de route progressive pour maîtriser le Big Data, organisée en phases d'apprentissage logiques. Chaque phase s'appuie sur les compétences précédentes.</p>
  
  <h3>Phase 1 : Fondamentaux techniques</h3>
  
  <div class="step-list">
    <li>
      <h4>Bases de programmation</h4>
      <p>Maîtrisez Python, le langage le plus utilisé en data engineering aujourd'hui. Comprenez les structures de données, l'algorithmique et l'orienté objet.</p>
      <p><span class="badge badge-primary">Ressources</span></p>
      <ul>
        <li><a href="https://www.python.org/about/gettingstarted/" target="_blank">Python Official Tutorial</a></li>
        <li><a href="https://www.codecademy.com/learn/learn-python-3" target="_blank">Codecademy - Learn Python</a></li>
      </ul>
    </li>
    
    <li>
      <h4>Manipulation de données</h4>
      <p>Apprenez à nettoyer, transformer et analyser des datasets avec Pandas, la bibliothèque Python incontournable pour la manipulation de données.</p>
      <p><span class="badge badge-primary">Ressources</span></p>
      <ul>
        <li><a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" target="_blank">Pandas Getting Started</a></li>
        <li><a href="https://www.kaggle.com/learn/pandas" target="_blank">Kaggle - Pandas Course</a></li>
      </ul>
    </li>
  </div>
</section>

<!-- ========== MINI‑PROJETS ========= -->
<section id="hands-on">
  <h2><i class="fas fa-laptop-code"></i> Projets pratiques</h2>
  
  <p>Ces mini-projets te permettront de découvrir le Big Data par la pratique. Ils sont conçus pour être réalisables en quelques heures ou jours, avec des instructions détaillées pour te guider pas à pas.</p>

  <div class="project-card">
    <h4>Projet 1: TARDIS Bootstrap - Nettoyage et visualisation de données <span class="difficulty beginner">Débutant</span></h4>
    <div class="mb-3">
      <strong>Durée estimée</strong>: 3-4 heures
    </div>
    <div class="mb-3">
      <strong>Objectif</strong>: Explorer, nettoyer et visualiser un jeu de données sur les retards de trains
    </div>
    <div class="mb-3">
      <strong>Description</strong>: 
      <p>Ce projet guidé te permettra d'acquérir les compétences essentielles en préparation et visualisation de données, fondamentales pour tout projet de data science. Tu apprendras à:</p>
      <ul>
        <li>Charger et explorer un jeu de données à l'aide de pandas</li>
        <li>Identifier et résoudre les problèmes courants (valeurs manquantes, doublons, formats incohérents)</li>
        <li>Générer des visualisations pour comprendre les tendances</li>
        <li>Préparer les données pour l'analyse dans le projet principal</li>
      </ul>
      <p>Le projet suit une approche étape par étape, avec des points de contrôle pour valider ta compréhension.</p>
    </div>
    <div class="mb-3">
      <strong>Ressources et outils</strong>:
      <ul>
        <li>Python avec les bibliothèques pandas, matplotlib et seaborn</li>
        <li>Jupyter Notebook pour l'analyse interactive</li>
        <li><a href="{{ '/assets/subjects/bigdata/tardis_bootstrap/G-AIA-210_tardis_bootstrap.pdf' | relative_url }}" target="_blank"><i class="fas fa-file-pdf"></i> Sujet complet (PDF)</a></li>
        <li><a href="{{ '/assets/subjects/bigdata/tardis_bootstrap/dataset.csv' | relative_url }}" target="_blank"><i class="fas fa-file-csv"></i> Dataset</a></li>
      </ul>
    </div>
  </div>

  <div class="project-card">
    <h4>Projet 2: TARDIS - Prédire l'imprévisible <span class="difficulty intermediate">Intermédiaire</span></h4>
    <div class="mb-3">
      <strong>Durée estimée</strong>: 10-15 heures
    </div>
    <div class="mb-3">
      <strong>Objectif</strong>: Analyser et prédire les retards de trains à l'aide de techniques de machine learning
    </div>
    <div class="mb-3">
      <strong>Description</strong>: 
      <p>Ce projet te place dans le rôle d'un analyste de données pour la SNCF. Ta mission est d'analyser les données historiques sur les retards des trains, de découvrir des modèles cachés et de développer un modèle prédictif qui peut prévoir les retards avant qu'ils ne se produisent.</p>
      <p>Le projet se décompose en 4 étapes principales :</p>
      <ol>
        <li><strong>Nettoyage et prétraitement des données</strong> - Gestion des valeurs manquantes, des incohérences et préparation du dataset pour l'analyse.</li>
        <li><strong>Analyse exploratoire (EDA)</strong> - Création de visualisations pertinentes pour comprendre les tendances et corrélations.</li>
        <li><strong>Modélisation prédictive</strong> - Implémentation d'un modèle de machine learning pour prédire les retards des trains.</li>
        <li><strong>Développement d'un dashboard</strong> - Création d'une application web interactive avec Streamlit pour présenter les résultats.</li>
      </ol>
      <p>Un sujet complet détaille chaque étape et les livrables attendus.</p>
    </div>
    <div class="mb-3">
      <strong>Compétences développées</strong>:
      <ul>
        <li>Manipulation de données avec pandas</li>
        <li>Visualisation avec matplotlib et seaborn</li>
        <li>Machine learning avec scikit-learn</li>
        <li>Création d'interfaces utilisateur avec Streamlit</li>
        <li>Développement d'un pipeline complet de data science</li>
      </ul>
    </div>
    <div class="mb-3">
      <strong>Ressources</strong>:
      <ul>
        <li><a href="{{ '/assets/subjects/bigdata/tardis_suite/G-AIA-210_tardis.pdf' | relative_url }}" target="_blank"><i class="fas fa-file-pdf"></i> Sujet complet (PDF)</a></li>
        <li><a href="{{ '/assets/subjects/bigdata/tardis_suite/dataset.csv' | relative_url }}" target="_blank"><i class="fas fa-file-csv"></i> Dataset</a></li>
      </ul>
    </div>
  </div>

  <div class="project-card">
    <h4>Projet 3: Analyse de données massives <span class="difficulty beginner">Débutant</span></h4>
    <div class="mb-3">
      <strong>Durée estimée</strong>: 4-6 heures
    </div>
    <div class="mb-3">
      <strong>Objectif</strong>: Explorer et analyser un jeu de données volumineux pour en extraire des insights
    </div>
    <div class="mb-3">
      <strong>Description</strong>: 
      <p>Dans ce projet, tu vas plonger dans un dataset volumineux du monde réel pour en extraire des tendances et patterns intéressants. Tu suivras une méthodologie structurée:</p>
      <ol>
        <li><strong>Préparation</strong>: Installer les bibliothèques nécessaires (pandas, matplotlib, seaborn) et charger le dataset</li>
        <li><strong>Exploration initiale</strong>: Comprendre la structure des données (types, valeurs manquantes, distributions)</li>
        <li><strong>Nettoyage</strong>: Traiter les valeurs manquantes et aberrantes, standardiser les formats</li>
        <li><strong>Analyse</strong>: Calculer des statistiques descriptives et identifier des relations entre variables</li>
        <li><strong>Visualisation</strong>: Créer au moins 3 types de graphiques différents pour illustrer tes découvertes</li>
        <li><strong>Insights</strong>: Formuler au moins 5 conclusions basées sur ton analyse</li>
      </ol>
      <p>Pour chaque étape, documenter ton raisonnement et justifier tes choix techniques dans un notebook Jupyter.</p>
    </div>
    <div class="mb-3">
      <strong>Jeux de données pour s'entraîner</strong></p>
      <ul>
        <li><a href="https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page" target="_blank">NYC Taxi Trips</a> (Données publiques de millions de trajets de taxi)</li>
        <li><a href="https://www.kaggle.com/datasets/psparks/instacart-market-basket-analysis" target="_blank">Instacart Market Basket</a></li>
        <li><a href="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/information/" target="_blank">Parcoursup</a></li>
      </ul>
    </div>
  </div>
</section>

<!-- ========== OUTILS ========= -->
<section id="tools">
  <h2><i class="fas fa-tools"></i> Écosystème Big Data</h2>
  
  <p>L'écosystème Big Data est riche et en constante évolution. Voici un panorama des technologies clés organisées par catégorie fonctionnelle.</p>
  
  <div class="mb-4">
    <table>
      <thead>
        <tr>
          <th>Catégorie</th>
          <th>Technologies phares</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Stockage distribué</strong></td>
          <td>HDFS, Amazon S3, Azure Data Lake Storage, Google Cloud Storage, MinIO</td>
          <td>Les data lakes sont devenus le standard pour stocker de grandes quantités de données brutes à faible coût. <strong>S3</strong> a imposé son API comme interface standard.</td>
        </tr>
        <tr>
          <td><strong>Processing batch</strong></td>
          <td>Apache Spark, Apache Hadoop MapReduce, Apache Flink</td>
          <td><strong>Spark</strong> domine largement ce segment grâce à ses performances in-memory et ses APIs variées (SQL, DataFrame, ML).</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- ========== MEDIAS ========== -->
<section id="media">
  <h2><i class="fas fa-play-circle"></i> Médias</h2>
  <p>Découvrez des témoignages et des explications sur le Big Data.</p>
  <div class="card-grid">
    <div class="feature-card media-card">
      <div class="video-embed-container">
        <iframe src="https://www.youtube.com/embed/JCywHkeHqpM" title="Témoignage – David (Alumni Epitech 2018), Staff Data Engineer chez Betclic" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <h4 class="video-title">Témoignage – David (Alumni Epitech 2018)</h4>
      <p class="video-description">Staff Data Engineer chez Betclic.</p>
    </div>
    <div class="feature-card media-card">
      <div class="video-embed-container">
        <iframe src="https://www.youtube.com/embed/xO7M2yfDNoc" title="Le Big Data, c'est quoi ? – Définition et explication en vidéo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <h4 class="video-title">Le Big Data, c'est quoi ?</h4>
      <p class="video-description">Définition et explication en vidéo.</p>
    </div>
  </div>
</section>

<!-- ========== RESSOURCES ========= -->
<section id="resources">
  <h2><i class="fas fa-book"></i> Ressources d'apprentissage</h2>
  
  <p>Pour maîtriser le Big Data, voici une sélection de ressources de qualité, du niveau débutant à avancé.</p>
  
  <h3>Cours en ligne gratuits ou freemium</h3>
  
  <div class="card-grid">
    <div class="feature-card">
      <h4>Big Data Specialization</h4>
      <p><i class="fas fa-university"></i> UC San Diego sur Coursera</p>
      <p>Série de 6 cours couvrant l'écosystème Hadoop, Spark, NoSQL et les techniques d'analyse.</p>
      <p><a href="https://www.coursera.org/specializations/big-data" target="_blank">Accéder au cours →</a></p>
    </div>
    
    <div class="feature-card">
      <h4>Databricks Academy</h4>
      <p><i class="fas fa-graduation-cap"></i> Databricks</p>
      <p>Formations gratuites sur Spark, Delta Lake et le Lakehouse, par les créateurs de ces technologies.</p>
      <p><a href="https://www.databricks.com/learn/training/lakehouse-fundamentals" target="_blank">Accéder au cours →</a></p>
    </div>
  </div>
</section>

<!-- ========== CARRIÈRES ========= -->
<section id="career">
  <h2><i class="fas fa-briefcase"></i> Perspectives de carrière</h2>
  
  <p>Le domaine du Big Data offre de nombreuses opportunités professionnelles, avec une demande qui continue de croître plus rapidement que l'offre de talents.</p>
  
  <h3>Les métiers du Big Data</h3>
  
  <div class="card-grid">
    <div class="feature-card">
      <h4><i class="fas fa-cogs"></i> Data Engineer</h4>
      <p><strong>Mission</strong> : Construire et maintenir l'infrastructure et les pipelines de données.</p>
      <p><strong>Compétences</strong> : SQL, Python, Spark, cloud, pipelines ETL/ELT, orchestration</p>
      <p><strong>Salaire (France)</strong> : 45-75K€</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-sitemap"></i> Big Data Architect</h4>
      <p><strong>Mission</strong> : Concevoir des architectures data robustes, scalables et sécurisées.</p>
      <p><strong>Compétences</strong> : Architecture distribuée, data modeling, sécurité, gouvernance</p>
      <p><strong>Salaire (France)</strong> : 60-90K€</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-chart-line"></i> Data Analyst</h4>
      <p><strong>Mission</strong> : Analyser les données pour en extraire des insights business et faciliter la prise de décision.</p>
      <p><strong>Compétences</strong> : SQL, Excel, BI (Tableau, Power BI), statistiques, data storytelling</p>
      <p><strong>Salaire (France)</strong> : 40-65K€</p>
    </div>
    
    <div class="feature-card">
      <h4><i class="fas fa-database"></i> Data Scientist</h4>
      <p><strong>Mission</strong> : Créer des modèles prédictifs et extraire de la valeur des données via des algorithmes avancés.</p>
      <p><strong>Compétences</strong> : Python/R, statistiques, machine learning, data mining, modélisation</p>
      <p><strong>Salaire (France)</strong> : 45-80K€</p>
    </div>
  </div>
  
  <h3 class="mt-4">Évolution de carrière</h3>
  
  <div class="timeline">
    <div class="timeline-item left">
      <div class="timeline-content">
        <h4>Début de carrière</h4>
        <ul>
          <li><strong>Junior Data Engineer</strong> - Construction de pipelines ETL et infrastructure data</li>
          <li><strong>BI Analyst</strong> - Création de tableaux de bord et reporting pour le business</li>
          <li><strong>Data Analyst</strong> - Analyse de données et production d'insights</li>
          <li><strong>Database Developer</strong> - Développement et optimisation de bases de données</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item right">
      <div class="timeline-content">
        <h4>Mi-carrière</h4>
        <ul>
          <li><strong>Senior Data Engineer</strong> - Conception d'architectures data complexes</li>
          <li><strong>Data Science Manager</strong> - Supervision d'équipes d'analystes et scientifiques</li>
          <li><strong>Cloud Data Architect</strong> - Conception de solutions data sur le cloud</li>
          <li><strong>Analytics Consultant</strong> - Conseil en stratégie data pour organisations</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item left">
      <div class="timeline-content">
        <h4>Senior</h4>
        <ul>
          <li><strong>Chief Data Officer</strong> - Direction de la stratégie data au niveau exécutif</li>
          <li><strong>VP of Analytics</strong> - Supervision des initiatives analytiques globales</li>
          <li><strong>Data Governance Director</strong> - Établissement des standards et politiques de données</li>
          <li><strong>Data Entrepreneur</strong> - Création de startups innovantes basées sur les données</li>
        </ul>
      </div>
    </div>
  </div>
  
  <h3 class="mt-4">Compétences recherchées</h3>
  
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">
        💻 Compétences techniques
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <ul>
            <li><strong>Langages et requêtes</strong> - SQL, Python, Scala, R, HiveQL, SparkSQL</li>
            <li><strong>Big Data</strong> - Hadoop, Spark, Kafka, HDFS, HBase, Hive, MapReduce</li>
            <li><strong>Cloud Data</strong> - AWS (EMR, Redshift), Azure (Synapse), GCP (BigQuery)</li>
            <li><strong>Data warehousing</strong> - Snowflake, Redshift, BigQuery, Azure Synapse</li>
            <li><strong>Traitement streaming</strong> - Kafka, Flink, Spark Streaming, Kinesis</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="accordion-item">
      <div class="accordion-header">
        📊 Visualisation et BI
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <ul>
            <li><strong>Outils BI</strong> - Tableau, Power BI, Looker, QlikView, ThoughtSpot</li>
            <li><strong>Data viz</strong> - D3.js, matplotlib, ggplot2, Plotly, Bokeh</li>
            <li><strong>Dashboarding</strong> - Conception de tableaux de bord interactifs</li>
            <li><strong>Data storytelling</strong> - Communication efficace des insights via les données</li>
            <li><strong>Reporting automatisé</strong> - Automatisation et distribution de rapports</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="accordion-item">
      <div class="accordion-header">
        🧠 Soft skills et autres compétences
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <ul>
            <li><strong>Pensée analytique</strong> - Résolution de problèmes complexes via les données</li>
            <li><strong>Communication</strong> - Vulgarisation des concepts data pour les non-spécialistes</li>
            <li><strong>Business acumen</strong> - Compréhension des enjeux métier et de la création de valeur</li>
            <li><strong>Data governance</strong> - Conformité, sécurité et éthique des données</li>
            <li><strong>Adaptabilité</strong> - Veille technologique et capacité d'apprentissage continu</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  <h3 class="mt-4">Tendances du marché</h3>
  
  <div class="feature-card">
    <ul>
      <li><strong>+43% de croissance</strong> des offres d'emploi en Big Data et Analytics depuis 2020</li>
      <li><strong>85% des entreprises</strong> déclarent avoir du mal à recruter des profils data qualifiés</li>
      <li><strong>Fortes demandes</strong> dans les secteurs de la santé, finance, retail et industrie 4.0</li>
      <li><strong>Convergence IA/Big Data</strong> créant de nouveaux rôles hybrides à forte valeur ajoutée</li>
      <li><strong>+30% de premium salarial</strong> pour les profils maîtrisant à la fois les technologies data et le cloud</li>
    </ul>
  </div>
</section> 