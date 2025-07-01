/**
 * Specialty Bot - Interactive assistant for exploring EPITECH MSC specialties
 * Enhanced version with guided orientation flow and richer content.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Bot elements
  const botContainer = document.getElementById('specialty-bot-container');
  const botAvatar = document.getElementById('bot-avatar');
  const botChatContainer = document.getElementById('bot-chat-container');
  const botMessagesContainer = document.getElementById('bot-messages-container');
  const closeBotButton = document.getElementById('close-bot');
  
  // Track conversation state
  let isOpen = false;
  let conversationState = 'initial';
  let messageQueue = [];
  let processingQueue = false;
  let chatHistory = [];

  // Conversation tree - Enhanced for guidance and rich content
  const conversationTree = {
    // --- INITIAL & MAIN NAVIGATION ---
    initial: {
      messages: ["Bonjour ! Je suis l'assistant d'orientation des MSc Epitech.", "Je peux vous aider à trouver la spécialité qui vous correspond. Comment souhaitez-vous commencer ?"],
      options: [
        { text: "<i class='fas fa-magic'></i> M'aider à choisir", next: "help_q1" },
        { text: "<i class='fas fa-list'></i> Voir toutes les spécialités", next: "explainSpecialties" },
        { text: "<i class='fas fa-cogs'></i> La différence Tech / Business ?", next: "categorizeSpecialties" },
      ]
    },
    explainSpecialties: {
      messages: ["Voici l'ensemble de nos spécialités MSc. Chacune est une porte d'entrée vers un domaine d'avenir. Laquelle vous intrigue le plus ?"],
      options: [
        { type: "title", text: "<i class='fas fa-laptop-code'></i> Spécialités Expertes Technologiques" },
        { text: "Cybersécurité", next: "explainCyber" },
        { text: "Cloud Computing", next: "explainCloud" },
        { text: "Intelligence Artificielle", next: "explainAI" },
        { text: "Big Data & Analytics", next: "explainBigData" },
        { text: "Internet of Things", next: "explainIoT" },
        { text: "Réalité Virtuelle & Augmentée", next: "explainVR" },
        { type: "title", text: "<i class='fas fa-briefcase'></i> Spécialités Digital, Business & Management" },
        { text: "Strategic Project Management", next: "explainProjectManagement" },
        { text: "Fintech & Stratégies financières", next: "explainFintech" },
        { text: "Marketing & Influence", next: "explainMarketing" },
        { text: "IA & Transformation des organisations", next: "explainAITransformation" },
        { text: "Data, Protection & Sécurité", next: "explainDataProtection" },
        { text: "Digitalisation de la fonction RH", next: "explainRH" },
        { text: "Santé, IA & IoT", next: "explainSante" },
        { text: "Data Science & Business Intelligence", next: "explainDataScienceBI" },
        { text: "Luxe & Retail Tech", next: "explainLuxe" },
        { text: "Retour à l'accueil", next: "initial" }
      ]
    },
    categorizeSpecialties: {
      messages: [
        "Nos spécialités se divisent en deux grandes familles, chacune avec son propre focus :",
        "<strong><i class='fas fa-laptop-code'></i> Expertes Technologiques</strong> : Idéal si vous voulez devenir un expert technique de haut niveau, capable de construire, sécuriser et innover sur les technologies de pointe (IA, Cloud, Cybersécurité...).",
        "<strong><i class='fas fa-briefcase'></i> Digital, Business & Management</strong> : Parfait si vous voulez être le chef d'orchestre, celui qui pilote la stratégie, applique la technologie pour transformer un secteur et gère des projets complexes (Marketing, Fintech, Management de projet...).",
        "Souhaitez-vous explorer une de ces familles ?"
      ],
      options: [
        { text: "Explorer les Spécialités Tech", next: "listTechSpecialties" },
        { text: "Explorer les Spécialités Business", next: "listBusinessSpecialties" },
        { text: "M'aider à choisir plus précisément", next: "help_q1" },
        { text: "Retour", next: "initial" }
      ]
    },
    listTechSpecialties: {
        messages: ["Voici nos spécialités pour ceux qui veulent maîtriser la technologie :"],
      options: [
            { text: "Cybersécurité", next: "explainCyber" },
            { text: "Cloud Computing", next: "explainCloud" },
            { text: "Intelligence Artificielle", next: "explainAI" },
            { text: "Big Data & Analytics", next: "explainBigData" },
            { text: "Internet of Things", next: "explainIoT" },
            { text: "Réalité Virtuelle & Augmentée", next: "explainVR" },
            { text: "Voir les spécialités Business", next: "listBusinessSpecialties" },
            { text: "Retour", next: "categorizeSpecialties" }
        ]
    },
    listBusinessSpecialties: {
        messages: ["Voici nos spécialités pour ceux qui veulent piloter la transformation :"],
      options: [
            { text: "Strategic Project Management", next: "explainProjectManagement" },
            { text: "Fintech & Stratégies financières", next: "explainFintech" },
            { text: "Marketing & Influence", next: "explainMarketing" },
            { text: "IA & Transformation des organisations", next: "explainAITransformation" },
            { text: "Data, Protection & Sécurité", next: "explainDataProtection" },
            { text: "Digitalisation de la fonction RH", next: "explainRH" },
            { text: "Santé, IA & IoT", next: "explainSante" },
            { text: "Data Science & Business Intelligence", next: "explainDataScienceBI" },
            { text: "Luxe & Retail Tech", next: "explainLuxe" },
            { text: "Voir les spécialités Tech", next: "listTechSpecialties" },
            { text: "Retour", next: "categorizeSpecialties" }
        ]
    },

    // --- GUIDED CHOICE FLOW ---
    help_q1: {
        messages: ["Parfait ! Pour mieux vous cerner, dites-moi ce qui vous motive le plus :"],
      options: [
          { text: "Construire et sécuriser la technologie elle-même.", next: "help_q_tech" },
          { text: "Utiliser la tech pour innover et transformer un secteur.", next: "help_q_business" },
          { text: "J'hésite, montrez-moi la différence.", next: "categorizeSpecialties" }
        ]
    },

    // Tech Path
    help_q_tech: {
        messages: ["Très bien, vous avez l'âme d'un bâtisseur. Quel type de défi technique vous parle le plus ?"],
      options: [
          { text: "Protéger les systèmes des menaces.", next: "recommend_cyber" },
          { text: "Créer des mondes virtuels immersifs.", next: "recommend_vrar" },
          { text: "Connecter des objets physiques à internet.", next: "recommend_iot" },
          { text: "Bâtir des infrastructures cloud scalables.", next: "recommend_cloud" },
          { text: "Faire 'penser' les machines avec les données.", next: "help_q_tech_ai_data" }
        ]
    },
    help_q_tech_ai_data: {
        messages: ["Fascinant ! Le domaine de l'intelligence des données est vaste. Quelle est votre approche préférée ?"],
      options: [
            { text: "Développer les algorithmes d'IA eux-mêmes.", next: "recommend_ai" },
            { text: "Gérer et analyser des volumes de données massifs.", next: "recommend_bigdata" },
            { text: "Retour aux défis techniques", next: "help_q_tech" }
        ]
    },

    // Business Path
    help_q_business: {
        messages: ["Excellent choix. La stratégie est essentielle. Quel type d'impact voulez-vous avoir ?"],
      options: [
          { text: "Gérer des projets et créer de nouvelles entreprises.", next: "recommend_project" },
          { text: "Disrupter un secteur d'activité qui vous passionne.", next: "help_q_business_industry" },
          { text: "Optimiser le fonctionnement interne d'une société.", next: "help_q_business_internal" },
          { text: "Utiliser la data pour la stratégie et la conformité.", next: "help_q_business_data" },
        ]
    },
    help_q_business_industry: {
        messages: ["Ambitieux ! Quel secteur souhaitez-vous réinventer ?"],
      options: [
            { text: "La banque et les services financiers.", next: "recommend_fintech" },
            { text: "Le luxe, la mode et le retail.", next: "recommend_luxe" },
            { text: "La santé et le bien-être.", next: "recommend_sante" },
            { text: "La communication et les médias.", next: "recommend_marketing" },
            { text: "Retour", next: "help_q_business" }
        ]
    },
    help_q_business_internal: {
        messages: ["Très stratégique. Quelle fonction de l'entreprise voulez-vous transformer en priorité ?"],
      options: [
            { text: "Les processus et la stratégie globale grâce à l'IA.", next: "recommend_ai_transfo" },
            { text: "Les ressources humaines et l'expérience des employés.", next: "recommend_rh" },
            { text: "Retour", next: "help_q_business" }
        ]
    },
    help_q_business_data: {
        messages: ["La data est un levier puissant. Quelle est votre priorité ?"],
      options: [
            { text: "Créer des dashboards pour guider la prise de décision.", next: "recommend_ds_bi" },
            { text: "Garantir la sécurité et la conformité (RGPD, etc.).", next: "recommend_data_protection" },
            { text: "Retour", next: "help_q_business" }
        ]
    },

    // --- RECOMMENDATION STATES ---
    recommend_cyber: {
      messages: ["Votre profil de protecteur numérique est très recherché. La spécialité suivante semble parfaite pour vous :"],
      options: [ { text: "Me parler de la Cybersécurité", next: "explainCyber" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_vrar: {
      messages: ["Créer de nouvelles réalités... Un projet passionnant ! Cette spécialité est faite pour vous :"],
      options: [ { text: "Me parler de la VR/AR", next: "explainVR" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_iot: {
      messages: ["Connecter le monde physique au digital est un défi majeur. Cette spécialité est au cœur de cette révolution :"],
      options: [ { text: "Me parler de l'Internet of Things", next: "explainIoT" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_cloud: {
      messages: ["Bâtir les fondations du futur numérique est essentiel. La spécialité suivante est la clé de voûte de la tech moderne :"],
      options: [ { text: "Me parler du Cloud Computing", next: "explainCloud" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_ai: {
      messages: ["Votre intérêt pour la création d'intelligence est au cœur de l'innovation. Cette spécialité est faite pour vous :"],
      options: [ { text: "Me parler de l'Intelligence Artificielle", next: "explainAI" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_bigdata: {
      messages: ["Dompter le déluge de données est un pouvoir immense. Cette spécialité vous donnera les clés :"],
      options: [ { text: "Me parler du Big Data & Analytics", next: "explainBigData" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_project: {
      messages: ["Votre âme d'entrepreneur et de chef d'orchestre vous guidera. Cette spécialité semble parfaite pour vous :"],
      options: [ { text: "Me parler du Strategic Project Management", next: "explainProjectManagement" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_fintech: {
      messages: ["Vous voulez bousculer le monde de la finance ? Cette spécialité est pour les innovateurs comme vous :"],
      options: [ { text: "Me parler de la Fintech", next: "explainFintech" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_luxe: {
      messages: ["Allier technologie et raffinement est un art. Cette spécialité est faite pour les esprits créatifs et stratégiques :"],
      options: [ { text: "Me parler du Luxe & Retail Tech", next: "explainLuxe" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_sante: {
      messages: ["Mettre la technologie au service de la santé est une mission à fort impact. Cette spécialité est au cœur de cette révolution :"],
      options: [ { text: "Me parler de Santé, IA & IoT", next: "explainSante" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_marketing: {
      messages: ["Comprendre et capter l'attention dans le monde digital est un défi majeur. Cette spécialité vous donnera les clés :"],
      options: [ { text: "Me parler du Marketing & Influence", next: "explainMarketing" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_ai_transfo: {
      messages: ["Piloter la transformation par l'IA est un rôle de leader. Cette spécialité est conçue pour ces profils :"],
      options: [ { text: "Me parler de l'IA & Transformation des organisations", next: "explainAITransformation" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_rh: {
      messages: ["Placer l'humain au cœur de la transformation digitale est votre priorité. Cette spécialité est faite pour vous :"],
      options: [ { text: "Me parler de la Digitalisation de la fonction RH", next: "explainRH" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_ds_bi: {
      messages: ["Transformer la donnée brute en décisions éclairées est un super-pouvoir. La spécialité suivante est idéale :"],
      options: [ { text: "Me parler de Data Science & Business Intelligence", next: "explainDataScienceBI" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },
    recommend_data_protection: {
      messages: ["Devenir le gardien de la confiance numérique est un rôle crucial. Cette spécialité est faite pour vous :"],
      options: [ { text: "Me parler de Data, Protection & Sécurité", next: "explainDataProtection" }, { text: "Recommencer le questionnaire", next: "help_q1" }, { text: "Voir toutes les spécialités", next: "explainSpecialties" }]
    },


    // --- ENHANCED EXPLAIN STATES ---
    explainCyber: {
      messages: [
        "<h3><i class='fas fa-shield-alt'></i> Cybersécurité</h3>",
        "Forme les experts de la défense numérique, capables de protéger les systèmes d'information contre les menaces complexes.",
        "<strong>Compétences clés :</strong><ul><li>Pentesting & analyse de vulnérabilités</li><li>Sécurité des réseaux et du cloud</li><li>Gestion des incidents et réponse</li></ul>",
        "<strong>Débouchés :</strong> Architecte Sécurité, Pentester, Analyste SOC, Consultant Cyber."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/cybersecurite" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainCloud: {
      messages: [
        "<h3><i class='fas fa-cloud'></i> Cloud Computing</h3>",
        "Forme les architectes des infrastructures de demain, capables de concevoir et gérer des applications scalables, résilientes et performantes.",
        "<strong>Compétences clés :</strong><ul><li>Maîtrise des plateformes (AWS, Azure, GCP)</li><li>Infrastructure as Code (Terraform)</li><li>Conteneurisation (Docker, Kubernetes)</li></ul>",
        "<strong>Débouchés :</strong> Architecte Cloud, Ingénieur DevOps, Ingénieur SRE."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/cloud" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainAI: {
      messages: [
        "<h3><i class='fas fa-brain'></i> Intelligence Artificielle</h3>",
        "Plonge au cœur des algorithmes pour créer des systèmes capables d'apprendre, de raisonner et d'imiter l'intelligence humaine.",
        "<strong>Compétences clés :</strong><ul><li>Deep Learning (PyTorch, TensorFlow)</li><li>Traitement du Langage Naturel (NLP)</li><li>Vision par Ordinateur (Computer Vision)</li></ul>",
        "<strong>Débouchés :</strong> ML Engineer, Data Scientist, AI Research Scientist."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/ia" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainBigData: {
      messages: [
        "<h3><i class='fas fa-database'></i> Big Data & Analytics</h3>",
        "Forme des experts capables de gérer et d'analyser des volumes de données massifs pour en extraire des insights stratégiques.",
        "<strong>Compétences clés :</strong><ul><li>Écosystème Hadoop & Spark</li><li>Architectures Data (Data Lake, Warehouse)</li><li>Pipelines de données (ETL/ELT)</li></ul>",
        "<strong>Débouchés :</strong> Data Engineer, Architecte Big Data, Data Analyst."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/bigdata" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainIoT: {
      messages: [
        "<h3><i class='fas fa-microchip'></i> Internet of Things</h3>",
        "Fait le pont entre le monde physique et le digital en concevant des solutions complètes, du capteur embarqué à la plateforme cloud.",
        "<strong>Compétences clés :</strong><ul><li>Électronique et systèmes embarqués</li><li>Réseaux basse consommation (LoRaWAN)</li><li>Architectures IoT</li></ul>",
        "<strong>Débouchés :</strong> Ingénieur IoT, Architecte de solutions IoT, Développeur embarqué."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/iot" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainVR: {
      messages: [
        "<h3><i class='fas fa-vr-cardboard'></i> Réalité Virtuelle & Augmentée</h3>",
        "Crée des expériences immersives qui transforment notre manière d'interagir avec l'information et le monde.",
        "<strong>Compétences clés :</strong><ul><li>Développement 3D (Unity, Unreal)</li><li>Design d'interaction spatiale (UX/UI)</li><li>Optimisation temps réel</li></ul>",
        "<strong>Débouchés :</strong> Développeur XR, UX Designer 3D, Artiste technique."
      ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/vrar" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    
    explainProjectManagement: {
      messages: [
        "<h3><i class='fas fa-tasks'></i> Strategic Project Management & Entrepreneurship</h3>",
        "Forme des leaders capables de piloter des projets technologiques complexes et de transformer des idées en entreprises viables.",
        "<strong>Compétences clés :</strong><ul><li>Méthodologies Agiles & Classiques</li><li>Lean Startup & Business Modeling</li><li>Leadership et gestion d'équipe</li></ul>",
        "<strong>Débouchés :</strong> Chef de Projet, Product Manager, Entrepreneur, Consultant en innovation."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/project-management" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainFintech: {
      messages: [
        "<h3><i class='fas fa-chart-bar'></i> Fintech & Stratégies financières</h3>",
        "À la croisée de la finance et de la tech pour réinventer les services financiers, du paiement à l'investissement.",
        "<strong>Compétences clés :</strong><ul><li>Technologies de paiement</li><li>Blockchain & Finance Décentralisée (DeFi)</li><li>Réglementation financière (DSP2, MiCA)</li></ul>",
        "<strong>Débouchés :</strong> Product Manager Fintech, Analyste Quantitatif, Consultant en transformation financière."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/fintech" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainMarketing: {
      messages: [
        "<h3><i class='fas fa-bullhorn'></i> Marketing & Influence</h3>",
        "Maîtrise les stratégies digitales pour construire des marques fortes et engager des communautés à l'ère des réseaux sociaux.",
        "<strong>Compétences clés :</strong><ul><li>Marketing de contenu & SEO/SEA</li><li>Gestion de campagnes d'influence</li><li>Analyse de données marketing (Analytics)</li></ul>",
        "<strong>Débouchés :</strong> Digital Marketing Manager, Responsable Influence, Growth Hacker."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/marketing" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainAITransformation: {
      messages: [
        "<h3><i class='fas fa-brain'></i> IA & Transformation des organisations</h3>",
        "Forme des chefs d'orchestre capables de piloter l'intégration stratégique de l'IA pour optimiser et réinventer les entreprises.",
        "<strong>Compétences clés :</strong><ul><li>Stratégie IA & cas d'usage</li><li>Conduite du changement</li><li>Gouvernance de l'IA & éthique</li></ul>",
        "<strong>Débouchés :</strong> Consultant en transformation IA, Chef de Projet IA, Product Manager IA."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/ai-transformation" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainDataProtection: {
      messages: [
        "<h3><i class='fas fa-shield-alt'></i> Data, Protection & Sécurité</h3>",
        "Forme des experts de la confiance numérique, un rôle crucial pour garantir la conformité et protéger les données des organisations.",
        "<strong>Compétences clés :</strong><ul><li>Maîtrise du RGPD</li><li>Gestion des risques & conformité</li><li>Gouvernance des données</li></ul>",
        "<strong>Débouchés :</strong> Délégué à la Protection des Données (DPO), Consultant RGPD, Chef de projet cybersécurité."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/data-protection" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
     explainRH: {
      messages: [
        "<h3><i class='fas fa-users-cog'></i> Digitalisation de la fonction RH</h3>",
        "Transforme la gestion des ressources humaines pour améliorer l'expérience collaborateur et piloter le capital humain par la donnée.",
        "<strong>Compétences clés :</strong><ul><li>Gestion de projet SIRH</li><li>HR Analytics & Data-driven RH</li><li>Marketing RH & marque employeur</li></ul>",
        "<strong>Débouchés :</strong> Chef de Projet SIRH, HR Data Analyst, Responsable Expérience Collaborateur."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/rh-digitale" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
     explainSante: {
      messages: [
        "<h3><i class='fas fa-heartbeat'></i> Santé, IA & IoT</h3>",
        "Applique les technologies de pointe pour révolutionner le secteur de la santé, de la prévention au traitement.",
        "<strong>Compétences clés :</strong><ul><li>Réglementation des données de santé</li><li>Gestion de projet en e-santé</li><li>Connaissance des dispositifs médicaux connectés</li></ul>",
        "<strong>Débouchés :</strong> Chef de Projet E-santé, Product Manager Santé, Consultant en transformation du système de santé."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/sante-ia-iot" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainDataScienceBI: {
      messages: [
        "<h3><i class='fas fa-chart-bar'></i> Data Science & Business Intelligence</h3>",
        "Forme des experts capables de transformer les données en insights visuels et en décisions stratégiques pour l'entreprise.",
        "<strong>Compétences clés :</strong><ul><li>Data Visualisation (Tableau, Power BI)</li><li>SQL & analyse de données</li><li>Compréhension des enjeux business</li></ul>",
        "<strong>Débouchés :</strong> Data Analyst, BI Analyst, Analytics Engineer, Consultant BI."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/data-science-bi" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    explainLuxe: {
      messages: [
        "<h3><i class='fas fa-gem'></i> Luxe & Retail Tech</h3>",
        "Combine technologie et connaissance du marché pour réinventer l'expérience client dans les secteurs exigeants du luxe et du retail.",
        "<strong>Compétences clés :</strong><ul><li>Expérience client omnicanale</li><li>CRM & personnalisation</li><li>Technologies immersives (AR/VR)</li></ul>",
        "<strong>Débouchés :</strong> Chef de Projet E-commerce, Retail Innovation Manager, Client Experience Manager."
        ],
      options: [ { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/luxe-retail-tech" }, { text: "Autres spécialités", next: "explainSpecialties" }, { text: "Retour à l'accueil", next: "initial" } ]
    },
    
  }; // End of conversationTree

  // Initialize bot
  function initBot() {
    botAvatar.addEventListener('click', toggleChat);
    closeBotButton.addEventListener('click', closeChat);
    botChatContainer.style.display = 'none';
      renderConversationState(conversationState);
  }
  
  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      botChatContainer.style.display = 'flex';
      setTimeout(() => botChatContainer.classList.add('open'), 10);
    } else {
      botChatContainer.classList.remove('open');
      setTimeout(() => botChatContainer.style.display = 'none', 300);
    }
  }

  function closeChat() {
    isOpen = false;
    botChatContainer.classList.remove('open');
    setTimeout(() => botChatContainer.style.display = 'none', 300);
  }

  async function processMessageQueue() {
    if (processingQueue || messageQueue.length === 0) return;
    processingQueue = true;
    while (messageQueue.length > 0) {
      const message = messageQueue.shift();
      await displayMessage(message);
    }
    processingQueue = false;
  }
  
  function displayMessage(message) {
    return new Promise(resolve => {
      const messageElement = document.createElement('div');
      messageElement.className = 'bot-message';
      messageElement.innerHTML = message;
      botMessagesContainer.appendChild(messageElement);
      chatHistory.push({ type: 'bot', content: message });
      scrollToBottom();
      setTimeout(resolve, 500); // Delay for better readability
    });
  }
  
  function renderOptions(options) {
    removeOptions();
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bot-options';
    options.forEach(option => {
      if (option.type === 'title') {
        const titleElement = document.createElement('div');
        titleElement.className = 'category-title';
        titleElement.innerHTML = option.text;
        optionsContainer.appendChild(titleElement);
      } else {
      const optionButton = document.createElement('button');
      optionButton.className = 'bot-option';
        optionButton.innerHTML = option.text;
      optionButton.addEventListener('click', () => handleOptionClick(option));
      optionsContainer.appendChild(optionButton);
      }
    });
    botChatContainer.appendChild(optionsContainer);
  }
  
  function handleOptionClick(option) {
    const userResponse = document.createElement('div');
    userResponse.className = 'user-message';
    userResponse.innerHTML = option.text;
    botMessagesContainer.appendChild(userResponse);
    chatHistory.push({ type: 'user', content: option.text });
    removeOptions();
    showTypingIndicator();
    scrollToBottom();
    
    setTimeout(() => {
        if (option.action === 'navigate') {
            window.open(option.url, '_blank'); // Open in new tab
            removeTypingIndicator();
            renderConversationState('after_navigate'); // Show follow-up options
        } else if (option.next) {
            conversationState = option.next;
            renderConversationState(conversationState);
        } else {
            removeTypingIndicator();
        }
    }, 1000); // Simulate bot "thinking"
  }

  // Define a state to show after navigation
  conversationTree.after_navigate = {
      messages: ["J'ai ouvert la page pour vous. Puis-je vous aider avec autre chose ?"],
      options: [
          { text: "M'aider à choisir une autre spé", next: "help_q1" },
          { text: "Explorer toutes les spécialités", next: "explainSpecialties" },
          { text: "C'est tout, merci !", next: "goodbye" }
      ]
  };

  conversationTree.goodbye = {
    messages: ["De rien ! N'hésitez pas si vous avez d'autres questions. Bonne exploration !"],
    options: [
        { text: "Retour à l'accueil", next: "initial" }
    ]
  };

  function removeOptions() {
    const oldOptions = botChatContainer.querySelector('.bot-options');
    if (oldOptions) {
      botChatContainer.removeChild(oldOptions);
    }
  }
  
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'bot-message typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    botMessagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
      const indicator = botMessagesContainer.querySelector('.typing-indicator');
      if (indicator) {
          botMessagesContainer.removeChild(indicator);
      }
  }

  function scrollToBottom() {
      botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
  }
  
  function renderConversationState(stateKey) {
    const state = conversationTree[stateKey];
    if (!state) {
      console.error(`State "${stateKey}" not found`);
      removeTypingIndicator();
      return;
    }
    removeTypingIndicator();
    messageQueue = [...(state.messages || [])];
    processMessageQueue().then(() => {
      removeTypingIndicator();
      if (state.options && state.options.length > 0) {
        renderOptions(state.options);
        scrollToBottom();
      }
    });
  }
  
  initBot();
}); 