/**
 * Specialty Bot - Interactive assistant for exploring EPITECH MSC specialties
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

  // Conversation tree - defines all possible conversation paths
  const conversationTree = {
    initial: {
      messages: ["Bonjour ! Je suis votre assistant pour découvrir les spécialités MSC EPITECH. Comment puis-je vous aider ?"],
      options: [
        { text: "Explorer les spécialités", next: "explainSpecialties" },
        { text: "Comment choisir ma spécialité ?", next: "choosingHelp" },
        { text: "Comparer deux spécialités", next: "compareSpecialties" },
        { text: "Tendances du marché tech", next: "marketTrends" }
      ]
    },
    explainSpecialties: {
      messages: ["EPITECH MSC propose plusieurs spécialités de pointe dans le domaine des technologies numériques. Laquelle vous intéresse ?"],
      options: [
        { text: "Cybersécurité", next: "explainCyber" },
        { text: "Cloud Computing", next: "explainCloud" },
        { text: "Intelligence Artificielle", next: "explainAI" },
        { text: "Big Data & Analytics", next: "explainBigData" },
        { text: "Digital Transformation", next: "explainDigital" },
        { text: "Internet of Things", next: "explainIoT" },
        { text: "Réalité Virtuelle & Augmentée", next: "explainVR" },
        { text: "Retour", next: "initial" }
      ]
    },
    
    // Cybersécurité
    explainCyber: {
      messages: [
        "La spécialité Cybersécurité vous forme à protéger les systèmes d'information contre les menaces numériques.",
        "Vous développerez des compétences en sécurité offensive (pentesting), défensive, analyse des risques et gestion des incidents de sécurité."
      ],
      options: [
        { text: "Compétences développées", next: "cyberSkills" },
        { text: "Cas d'usage", next: "cyberUseCases" },
        { text: "Débouchés professionnels", next: "cyberCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/cybersecurite" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Cloud Computing
    explainCloud: {
      messages: [
        "La spécialité Cloud Computing vous forme à la conception, déploiement et gestion d'infrastructures et services cloud.",
        "Vous maîtriserez les principales plateformes (AWS, Azure, GCP), les architectures distribuées et les techniques d'automatisation."
      ],
      options: [
        { text: "Compétences développées", next: "cloudSkills" },
        { text: "Cas d'usage", next: "cloudUseCases" },
        { text: "Débouchés professionnels", next: "cloudCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/cloud" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Intelligence Artificielle
    explainAI: {
      messages: [
        "La spécialité Intelligence Artificielle vous forme aux algorithmes et modèles qui permettent aux machines d'apprendre et de prendre des décisions.",
        "Vous explorerez le machine learning, le deep learning, le NLP et la vision par ordinateur."
      ],
      options: [
        { text: "Compétences développées", next: "aiSkills" },
        { text: "Cas d'usage", next: "aiUseCases" },
        { text: "Débouchés professionnels", next: "aiCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/ia" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Big Data & Analytics
    explainBigData: {
      messages: [
        "La spécialité Big Data & Analytics vous forme aux technologies et méthodologies pour collecter, stocker, analyser et visualiser de grands volumes de données.",
        "Vous maîtriserez les outils comme Hadoop, Spark, et des langages comme Python pour l'analyse de données complexes."
      ],
      options: [
        { text: "Compétences développées", next: "bigDataSkills" },
        { text: "Cas d'usage", next: "bigDataUseCases" },
        { text: "Débouchés professionnels", next: "bigDataCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/bigdata" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Digital Transformation
    explainDigital: {
      messages: [
        "La Transformation Digitale concerne l'intégration des technologies numériques dans tous les aspects d'une entreprise.",
        "Vous développerez des compétences en stratégie numérique, expérience utilisateur, conduite du changement et optimisation des processus."
      ],
      options: [
        { text: "Compétences développées", next: "digitalSkills" },
        { text: "Cas d'usage", next: "digitalUseCases" },
        { text: "Débouchés professionnels", next: "digitalCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/dit" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Internet of Things
    explainIoT: {
      messages: [
        "L'Internet des Objets (IoT) vous forme à connecter des objets physiques à Internet pour collecter et échanger des données.",
        "Vous apprendrez à concevoir des systèmes embarqués, des réseaux de capteurs, et des plateformes de gestion de données IoT."
      ],
      options: [
        { text: "Compétences développées", next: "iotSkills" },
        { text: "Cas d'usage", next: "iotUseCases" },
        { text: "Débouchés professionnels", next: "iotCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/iot" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Réalité Virtuelle & Augmentée
    explainVR: {
      messages: [
        "La Réalité Virtuelle et Augmentée vous forme à la création d'expériences immersives et interactives.",
        "Vous maîtriserez des outils comme Unity, Unreal Engine, et les technologies de capteurs et d'affichage pour créer des mondes virtuels et enrichir le monde réel."
      ],
      options: [
        { text: "Compétences développées", next: "vrSkills" },
        { text: "Cas d'usage", next: "vrUseCases" },
        { text: "Débouchés professionnels", next: "vrCareers" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/vr" },
        { text: "Autres spécialités", next: "explainSpecialties" }
      ]
    },

    // Aide au choix de spécialité
    choosingHelp: {
      messages: ["Choisir sa spécialité est une décision importante. Voici quelques approches qui peuvent vous guider :"],
      options: [
        { text: "Selon mes centres d'intérêt", next: "interestsBased" },
        { text: "Selon les perspectives d'emploi", next: "careerProspects" },
        { text: "Selon mes compétences actuelles", next: "skillsNeeded" },
        { text: "Faire un test d'orientation", next: "orientationTest" },
        { text: "Retour", next: "initial" }
      ]
    },
    
    // COMPÉTENCES POUR CHAQUE SPÉCIALITÉ
    
    // Cybersécurité - Compétences
    cyberSkills: {
      messages: [
        "En Cybersécurité, vous développerez ces compétences essentielles :",
        "• Analyse de vulnérabilités et ethical hacking",
        "• Sécurité des réseaux et systèmes d'exploitation",
        "• Protection des données et cryptographie",
        "• Investigation numérique (forensics)",
        "• Gestion des crises et réponse aux incidents",
        "• Mise en place de SOC (Security Operations Center)",
        "• Conformité et réglementations (RGPD, ISO 27001)"
      ],
      options: [
        { text: "Cas d'usage", next: "cyberUseCases" },
        { text: "Outils et technologies", next: "cyberTools" },
        { text: "Débouchés professionnels", next: "cyberCareers" },
        { text: "Retour", next: "explainCyber" }
      ]
    },
    
    // Cloud Computing - Compétences
    cloudSkills: {
      messages: [
        "En Cloud Computing, vous développerez ces compétences clés :",
        "• Architecture cloud et multi-cloud",
        "• Virtualisation et containerisation (Docker, Kubernetes)",
        "• Infrastructure as Code (Terraform, CloudFormation)",
        "• DevOps et CI/CD pipelines",
        "• Sécurité cloud et gestion des identités",
        "• Services managés et serverless",
        "• Optimisation des coûts et performance"
      ],
      options: [
        { text: "Cas d'usage", next: "cloudUseCases" },
        { text: "Plateformes et certifications", next: "cloudPlatforms" },
        { text: "Débouchés professionnels", next: "cloudCareers" },
        { text: "Retour", next: "explainCloud" }
      ]
    },
    
    // Intelligence Artificielle - Compétences
    aiSkills: {
      messages: [
        "En Intelligence Artificielle, vous développerez ces compétences fondamentales :",
        "• Programmation avancée en Python",
        "• Apprentissage automatique (scikit-learn, TensorFlow, PyTorch)",
        "• Deep learning et réseaux de neurones",
        "• Traitement du langage naturel (NLP)",
        "• Vision par ordinateur",
        "• MLOps et déploiement de modèles",
        "• IA éthique et explicable"
      ],
      options: [
        { text: "Cas d'usage", next: "aiUseCases" },
        { text: "Frameworks et bibliothèques", next: "aiTools" },
        { text: "Débouchés professionnels", next: "aiCareers" },
        { text: "Retour", next: "explainAI" }
      ]
    },
    
    // Big Data - Compétences
    bigDataSkills: {
      messages: [
        "En Big Data & Analytics, vous développerez ces compétences essentielles :",
        "• Ingénierie de données et ETL (Extract, Transform, Load)",
        "• Technologies Hadoop et écosystème (HDFS, MapReduce)",
        "• Traitement en temps réel (Spark, Kafka)",
        "• Data warehousing et data lakes",
        "• SQL et NoSQL à grande échelle",
        "• Visualisation et storytelling avec les données",
        "• Gouvernance des données"
      ],
      options: [
        { text: "Cas d'usage", next: "bigDataUseCases" },
        { text: "Outils et plateformes", next: "bigDataTools" },
        { text: "Débouchés professionnels", next: "bigDataCareers" },
        { text: "Retour", next: "explainBigData" }
      ]
    },
    
    // Digital Transformation - Compétences
    digitalSkills: {
      messages: [
        "En Transformation Digitale, vous développerez ces compétences transversales :",
        "• Stratégie et roadmap digitale",
        "• User Experience (UX) et customer journey",
        "• Gestion de projets agiles",
        "• Marketing digital et analytics",
        "• CRM et automatisation des processus",
        "• Conduite du changement et culture digitale",
        "• Business models innovants"
      ],
      options: [
        { text: "Cas d'usage", next: "digitalUseCases" },
        { text: "Méthodes et frameworks", next: "digitalMethods" },
        { text: "Débouchés professionnels", next: "digitalCareers" },
        { text: "Retour", next: "explainDigital" }
      ]
    },
    
    // IoT - Compétences
    iotSkills: {
      messages: [
        "En Internet of Things, vous développerez ces compétences techniques :",
        "• Programmation de systèmes embarqués",
        "• Protocoles de communication (MQTT, CoAP, LoRaWAN)",
        "• Plateformes cloud IoT",
        "• Edge computing et passerelles",
        "• Sécurité des objets connectés",
        "• Analyse de données IoT en temps réel",
        "• Intégration IoT dans l'écosystème digital"
      ],
      options: [
        { text: "Cas d'usage", next: "iotUseCases" },
        { text: "Technologies et standards", next: "iotTech" },
        { text: "Débouchés professionnels", next: "iotCareers" },
        { text: "Retour", next: "explainIoT" }
      ]
    },
    
    // VR/AR - Compétences
    vrSkills: {
      messages: [
        "En Réalité Virtuelle & Augmentée, vous développerez ces compétences créatives et techniques :",
        "• Développement 3D (Unity, Unreal Engine)",
        "• Design d'interactions et d'expériences",
        "• Modélisation et création d'assets 3D",
        "• Intégration de capteurs et interfaces",
        "• Optimisation des performances graphiques",
        "• Audio spatial et immersif",
        "• Réalité mixte et technologies XR"
      ],
      options: [
        { text: "Cas d'usage", next: "vrUseCases" },
        { text: "Matériel et logiciels", next: "vrTech" },
        { text: "Débouchés professionnels", next: "vrCareers" },
        { text: "Retour", next: "explainVR" }
      ]
    },
    
    // CAS D'USAGE POUR CHAQUE SPÉCIALITÉ
    
    // Cybersécurité - Cas d'usage
    cyberUseCases: {
      messages: [
        "La Cybersécurité s'applique dans de nombreux contextes critiques :",
        "• Protection des infrastructures critiques (énergie, santé)",
        "• Sécurisation des transactions financières et bancaires",
        "• Protection des données personnelles et sensibles",
        "• Sécurité du cloud et des environnements multi-cloud",
        "• Détection et réponse aux attaques APT (Advanced Persistent Threats)",
        "• Sécurité des environnements industriels (OT/ICS)"
      ],
      options: [
        { text: "Compétences développées", next: "cyberSkills" },
        { text: "Tendances émergentes", next: "cyberTrends" },
        { text: "Débouchés professionnels", next: "cyberCareers" },
        { text: "Retour", next: "explainCyber" }
      ]
    },
    
    // Cloud Computing - Cas d'usage
    cloudUseCases: {
      messages: [
        "Le Cloud Computing transforme de nombreux secteurs :",
        "• Migration et modernisation des applications legacy",
        "• Scaling automatique pour des charges de travail variables",
        "• Déploiement de sites haute disponibilité et disaster recovery",
        "• Environnements DevOps et déploiement continu",
        "• Data lakes et analytics à grande échelle",
        "• Infrastructures multi-cloud et hybrides"
      ],
      options: [
        { text: "Compétences développées", next: "cloudSkills" },
        { text: "Plateformes principales", next: "cloudPlatforms" },
        { text: "Débouchés professionnels", next: "cloudCareers" },
        { text: "Retour", next: "explainCloud" }
      ]
    },
    
    // IA - Cas d'usage
    aiUseCases: {
      messages: [
        "L'Intelligence Artificielle révolutionne de nombreux domaines :",
        "• Systèmes de recommandation personnalisés (e-commerce, streaming)",
        "• Assistants virtuels et chatbots intelligents",
        "• Diagnostic médical et détection précoce de maladies",
        "• Prévision de maintenance industrielle",
        "• Détection de fraudes financières",
        "• Véhicules autonomes et systèmes d'aide à la conduite",
        "• IA générative (images, textes, musique)"
      ],
      options: [
        { text: "Compétences développées", next: "aiSkills" },
        { text: "Défis éthiques", next: "aiEthics" },
        { text: "Débouchés professionnels", next: "aiCareers" },
        { text: "Retour", next: "explainAI" }
      ]
    },
    
    // Big Data - Cas d'usage
    bigDataUseCases: {
      messages: [
        "Le Big Data transforme la prise de décision dans de nombreux secteurs :",
        "• Analyse prédictive du comportement client (retail)",
        "• Détection de fraudes en temps réel (finance)",
        "• Optimisation de la chaîne logistique",
        "• Recherche pharmaceutique et médecine personnalisée",
        "• Smart cities et gestion urbaine",
        "• Analyse des réseaux sociaux et tendances",
        "• Optimisation des campagnes marketing multicanales"
      ],
      options: [
        { text: "Compétences développées", next: "bigDataSkills" },
        { text: "Architecture big data", next: "bigDataArchitecture" },
        { text: "Débouchés professionnels", next: "bigDataCareers" },
        { text: "Retour", next: "explainBigData" }
      ]
    },
    
    // Digital Transformation - Cas d'usage
    digitalUseCases: {
      messages: [
        "La Transformation Digitale s'applique à l'ensemble des secteurs :",
        "• Digitalisation de l'expérience client (retail, banque)",
        "• Industrie 4.0 et usines connectées",
        "• E-santé et télémédecine",
        "• Smart buildings et gestion énergétique intelligente",
        "• Plateformes d'apprentissage en ligne et EdTech",
        "• Digital workplace et nouveaux modes de travail",
        "• Marketplaces et nouveaux business models numériques"
      ],
      options: [
        { text: "Compétences développées", next: "digitalSkills" },
        { text: "Méthodologies de transformation", next: "digitalMethods" },
        { text: "Débouchés professionnels", next: "digitalCareers" },
        { text: "Retour", next: "explainDigital" }
      ]
    },
    
    // IoT - Cas d'usage
    iotUseCases: {
      messages: [
        "L'Internet des Objets crée de nouvelles possibilités dans de nombreux domaines :",
        "• Smart home et domotique",
        "• Maintenance prédictive industrielle",
        "• Agriculture connectée et irrigation intelligente",
        "• Wearables et suivi santé",
        "• Flottes de véhicules connectés",
        "• Smart retail et expérience client augmentée",
        "• Gestion environnementale et qualité de l'air"
      ],
      options: [
        { text: "Compétences développées", next: "iotSkills" },
        { text: "Défis de l'IoT", next: "iotChallenges" },
        { text: "Débouchés professionnels", next: "iotCareers" },
        { text: "Retour", next: "explainIoT" }
      ]
    },
    
    // VR/AR - Cas d'usage
    vrUseCases: {
      messages: [
        "La Réalité Virtuelle et Augmentée transforme l'expérience utilisateur dans de nombreux secteurs :",
        "• Formation professionnelle immersive",
        "• Thérapies par exposition et rééducation",
        "• Visualisation architecturale et conception 3D",
        "• Maintenance assistée et remote expertise",
        "• Marketing expérientiel et showrooms virtuels",
        "• Tourisme virtuel et patrimoine culturel",
        "• Collaboration à distance en espace partagé"
      ],
      options: [
        { text: "Compétences développées", next: "vrSkills" },
        { text: "Technologies immersives", next: "vrTech" },
        { text: "Débouchés professionnels", next: "vrCareers" },
        { text: "Retour", next: "explainVR" }
      ]
    },

    // DÉBOUCHÉS PROFESSIONNELS POUR CHAQUE SPÉCIALITÉ
    
    // Cybersécurité - Carrières
    cyberCareers: {
      messages: [
        "Les carrières en Cybersécurité sont très recherchées :",
        "• Pentester / Ethical Hacker (55-90k€)",
        "• Analyste SOC (Security Operations Center) (45-65k€)",
        "• Architecte Sécurité (70-110k€)",
        "• RSSI (Responsable Sécurité des Systèmes d'Information) (80-130k€)",
        "• Expert en forensics et investigation numérique (60-85k€)",
        "• Consultant en cybersécurité (50-90k€)",
        "La demande dépasse l'offre avec plus de 3,5 millions de postes non pourvus dans le monde."
      ],
      options: [
        { text: "Certifications recherchées", next: "cyberCertifications" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/cybersecurite" },
        { text: "Retour", next: "explainCyber" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Cloud Computing - Carrières
    cloudCareers: {
      messages: [
        "Les carrières dans le Cloud Computing offrent d'excellentes perspectives :",
        "• Architecte Cloud (70-110k€)",
        "• DevOps Engineer (55-90k€)",
        "• SRE (Site Reliability Engineer) (65-100k€)",
        "• Cloud Security Specialist (60-95k€)",
        "• Cloud Solutions Architect (75-120k€)",
        "• Multi-cloud Manager (80-120k€)",
        "Le marché du cloud continue sa forte croissance avec +25% par an."
      ],
      options: [
        { text: "Certifications recherchées", next: "cloudCertifications" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/cloud" },
        { text: "Retour", next: "explainCloud" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Intelligence Artificielle - Carrières
    aiCareers: {
      messages: [
        "Les carrières en Intelligence Artificielle sont parmi les mieux rémunérées :",
        "• Data Scientist / ML Engineer (65-110k€)",
        "• AI Research Engineer (70-120k€)",
        "• NLP Specialist (60-100k€)",
        "• Computer Vision Engineer (65-105k€)",
        "• AI Product Manager (70-115k€)",
        "• AI Ethics Consultant (60-90k€)",
        "La demande pour ces profils a augmenté de plus de 300% ces 5 dernières années."
      ],
      options: [
        { text: "Compétences les plus recherchées", next: "aiTopSkills" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/ia" },
        { text: "Retour", next: "explainAI" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Big Data - Carrières
    bigDataCareers: {
      messages: [
        "Les métiers du Big Data & Analytics offrent d'excellentes opportunités :",
        "• Data Engineer (60-95k€)",
        "• Data Architect (70-110k€)",
        "• Big Data Developer (55-85k€)",
        "• Analytics Manager (65-100k€)",
        "• Chief Data Officer (100-150k€)",
        "• Data Governance Specialist (60-90k€)",
        "Le marché est en forte croissance avec une pénurie de profils qualifiés."
      ],
      options: [
        { text: "Évolution de carrière", next: "bigDataEvolution" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/bigdata" },
        { text: "Retour", next: "explainBigData" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Digital Transformation - Carrières
    digitalCareers: {
      messages: [
        "Les métiers de la Transformation Digitale sont très diversifiés :",
        "• Chief Digital Officer (90-150k€)",
        "• Digital Transformation Consultant (60-100k€)",
        "• Product Owner / Product Manager (55-85k€)",
        "• UX/UI Designer (45-75k€)",
        "• Growth Hacker (50-80k€)",
        "• Digital Marketing Manager (55-90k€)",
        "Ces profils sont recherchés dans tous les secteurs d'activité."
      ],
      options: [
        { text: "Soft skills essentielles", next: "digitalSoftSkills" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/dit" },
        { text: "Retour", next: "explainDigital" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // IoT - Carrières
    iotCareers: {
      messages: [
        "L'Internet des Objets ouvre de nombreuses perspectives professionnelles :",
        "• IoT Solution Architect (65-95k€)",
        "• Embedded Systems Engineer (55-85k€)",
        "• IoT Data Analyst (50-80k€)",
        "• Smart City Consultant (60-90k€)",
        "• IoT Security Specialist (65-100k€)",
        "• IoT Product Manager (60-95k€)",
        "Le marché de l'IoT devrait atteindre 1,6 trillion de dollars d'ici 2025."
      ],
      options: [
        { text: "Industries qui recrutent", next: "iotIndustries" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/iot" },
        { text: "Retour", next: "explainIoT" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // VR/AR - Carrières
    vrCareers: {
      messages: [
        "Le secteur VR/AR offre des opportunités créatives et techniques :",
        "• VR/AR Developer (50-85k€)",
        "• 3D Artist / Modeleur (45-75k€)",
        "• UX Designer for immersive experiences (50-80k€)",
        "• Technical Artist (55-85k€)",
        "• VR/AR Project Manager (60-90k€)",
        "• Metaverse Specialist (65-95k€)",
        "Ce marché émergent connaît une croissance annuelle de plus de 30%."
      ],
      options: [
        { text: "Entreprises qui recrutent", next: "vrCompanies" },
        { text: "Voir la page détaillée", action: "navigate", url: "/epitech-msc-discovery/specialites/vr" },
        { text: "Retour", next: "explainVR" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // TECHNOLOGIES ET OUTILS POUR CHAQUE SPÉCIALITÉ
    
    // Cybersécurité - Outils
    cyberTools: {
      messages: [
        "Principaux outils et technologies en Cybersécurité :",
        "• Kali Linux, Metasploit, Burp Suite (pentest)",
        "• Wireshark, Snort, Suricata (analyse réseau)",
        "• Splunk, ELK Stack (SIEM)",
        "• Nessus, OpenVAS, Qualys (scan de vulnérabilités)",
        "• HashCat, John the Ripper (cracking)",
        "• OWASP ZAP, Acunetix (sécurité web)",
        "• Cyber Kill Chain, MITRE ATT&CK (frameworks)"
      ],
      options: [
        { text: "Certifications recommandées", next: "cyberCertifications" },
        { text: "Retour aux compétences", next: "cyberSkills" },
        { text: "Retour", next: "explainCyber" }
      ]
    },
    
    // Cloud - Plateformes
    cloudPlatforms: {
      messages: [
        "Principales plateformes et technologies Cloud :",
        "• AWS (Amazon Web Services) : leader du marché",
        "• Microsoft Azure : forte intégration enterprise",
        "• Google Cloud Platform : puissant pour le ML/AI",
        "• Kubernetes, Docker (containerisation)",
        "• Terraform, Ansible, CloudFormation (IaC)",
        "• Jenkins, GitHub Actions, GitLab CI (CI/CD)",
        "• Prometheus, Grafana (monitoring)"
      ],
      options: [
        { text: "Certifications cloud", next: "cloudCertifications" },
        { text: "Retour aux compétences", next: "cloudSkills" },
        { text: "Retour", next: "explainCloud" }
      ]
    },
    
    // IA - Outils
    aiTools: {
      messages: [
        "Principaux frameworks et bibliothèques en IA :",
        "• TensorFlow, PyTorch, Keras (deep learning)",
        "• scikit-learn, XGBoost (machine learning)",
        "• NLTK, spaCy, Hugging Face (NLP)",
        "• OpenCV, TensorFlow Lite (vision)",
        "• MLflow, Weights & Biases (MLOps)",
        "• Ray, Spark ML (distributed ML)",
        "• ONNX, TensorRT (optimisation)"
      ],
      options: [
        { text: "Infrastructures IA", next: "aiInfrastructure" },
        { text: "Retour aux compétences", next: "aiSkills" },
        { text: "Retour", next: "explainAI" }
      ]
    },
    
    // Big Data - Outils
    bigDataTools: {
      messages: [
        "Principaux outils et technologies Big Data :",
        "• Apache Hadoop, HDFS (stockage distribué)",
        "• Apache Spark, Flink (traitement)",
        "• Apache Kafka, RabbitMQ (streaming)",
        "• Snowflake, BigQuery, Redshift (data warehousing)",
        "• MongoDB, Cassandra, HBase (NoSQL)",
        "• Tableau, Power BI, Looker (visualisation)",
        "• Airflow, NiFi (orchestration)"
      ],
      options: [
        { text: "Architecture Big Data", next: "bigDataArchitecture" },
        { text: "Retour aux compétences", next: "bigDataSkills" },
        { text: "Retour", next: "explainBigData" }
      ]
    },
    
    // Digital Transformation - Méthodes
    digitalMethods: {
      messages: [
        "Méthodologies et frameworks de Transformation Digitale :",
        "• Design Thinking et approche centrée utilisateur",
        "• Lean Startup et innovation continue",
        "• Agilité à l'échelle (SAFe, LeSS)",
        "• Growth Hacking et marketing digital",
        "• Business Model Canvas et Value Proposition",
        "• Modèles de maturité digitale",
        "• OKRs (Objectives and Key Results)"
      ],
      options: [
        { text: "Soft skills essentielles", next: "digitalSoftSkills" },
        { text: "Retour aux compétences", next: "digitalSkills" },
        { text: "Retour", next: "explainDigital" }
      ]
    },
    
    // IoT - Technologies
    iotTech: {
      messages: [
        "Technologies et standards IoT clés :",
        "• Arduino, Raspberry Pi, ESP32 (hardware)",
        "• MQTT, CoAP, AMQP (protocoles)",
        "• LoRaWAN, Sigfox, NB-IoT (réseau)",
        "• AWS IoT, Azure IoT, Google Cloud IoT (plateformes)",
        "• Node-RED, ThingSpeak (middleware)",
        "• TinyML, Edge Impulse (edge AI)",
        "• IOTA, Helium (blockchain IoT)"
      ],
      options: [
        { text: "Défis de l'IoT", next: "iotChallenges" },
        { text: "Retour aux compétences", next: "iotSkills" },
        { text: "Retour", next: "explainIoT" }
      ]
    },
    
    // VR/AR - Technologies
    vrTech: {
      messages: [
        "Technologies et matériel VR/AR clés :",
        "• Unity, Unreal Engine (moteurs)",
        "• Meta Quest, Valve Index, HTC Vive (casques VR)",
        "• HoloLens, Magic Leap (AR/MR)",
        "• ARKit (iOS), ARCore (Android)",
        "• WebXR, A-Frame (VR/AR web)",
        "• Blender, Maya, 3DS Max (modélisation)",
        "• Haptics, motion capture (interfaces)"
      ],
      options: [
        { text: "Tendances émergentes", next: "vrTrends" },
        { text: "Retour aux compétences", next: "vrSkills" },
        { text: "Retour", next: "explainVR" }
      ]
    },
    
    // SECTIONS SPÉCIALES POUR CHAQUE SPÉCIALITÉ
    
    // Cybersecurité - Certifications
    cyberCertifications: {
      messages: [
        "Les certifications les plus valorisées en Cybersécurité :",
        "• CEH (Certified Ethical Hacker) - Base solide en pentesting",
        "• CISSP (Certified Information Systems Security Professional) - Référence pour les postes seniors",
        "• OSCP (Offensive Security Certified Professional) - Très prisée pour le pentesting",
        "• CompTIA Security+ - Bon point d'entrée pour débutants",
        "• SANS/GIAC (GSEC, GCIH, GPEN) - Très respectées dans l'industrie",
        "• ISO 27001 Lead Implementer/Auditor - Pour les aspects gouvernance",
        "",
        "Ces certifications peuvent augmenter votre salaire de 15 à 30% selon les postes."
      ],
      options: [
        { text: "Débouchés professionnels", next: "cyberCareers" },
        { text: "Outils et technologies", next: "cyberTools" },
        { text: "Retour", next: "explainCyber" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Cybersécurité - Tendances
    cyberTrends: {
      messages: [
        "Tendances émergentes en Cybersécurité :",
        "• Zero Trust Architecture - Ne faire confiance à rien ni personne par défaut",
        "• DevSecOps - Intégration de la sécurité dans le CI/CD",
        "• XDR - Détection et réponse étendues",
        "• SASE - Secure Access Service Edge",
        "• Cloud Security Posture Management",
        "• Sécurité des conteneurs et Kubernetes",
        "• IA/ML pour la détection des menaces",
        "• Quantum-safe cryptography",
        "",
        "La capacité à s'adapter à ces évolutions technologiques est cruciale."
      ],
      options: [
        { text: "Outils et technologies", next: "cyberTools" },
        { text: "Certifications recherchées", next: "cyberCertifications" },
        { text: "Débouchés professionnels", next: "cyberCareers" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    // Comparaison des spécialités
    compareSpecialties: {
      messages: ["Quelles spécialités souhaitez-vous comparer ?"],
      options: [
        { text: "IA vs Big Data", next: "compareAIBigData" },
        { text: "Cybersécurité vs Cloud", next: "compareCyberCloud" },
        { text: "Digital Transformation vs IoT", next: "compareDigitalIoT" },
        { text: "VR/AR vs IA", next: "compareVRAI" },
        { text: "Cloud vs Big Data", next: "compareCloudBigData" },
        { text: "Retour", next: "initial" }
      ]
    },
    
    // Comparaisons détaillées
    compareAIBigData: {
      messages: [
        "Comparaison IA vs Big Data :",
        "",
        "Intelligence Artificielle :",
        "• Focus : Création d'algorithmes intelligents et apprentissage",
        "• Compétences : Mathématiques avancées, programmation (Python), deep learning",
        "• Salaire moyen : 65-110k€ (légèrement supérieur au Big Data)",
        "• Difficulté : Barrière d'entrée plus élevée (maths, complexité algorithmique)",
        "• Débouchés : Data Scientist, ML Engineer, AI Researcher",
        "",
        "Big Data :",
        "• Focus : Gestion, traitement et analyse de grands volumes de données",
        "• Compétences : SQL/NoSQL, ETL, data pipelines, visualisation",
        "• Salaire moyen : 60-100k€",
        "• Difficulté : Plus accessible pour débutants avec bases techniques",
        "• Débouchés : Data Engineer, Data Analyst, Big Data Architect",
        "",
        "Les deux domaines sont complémentaires et souvent combinés dans les projets."
      ],
      options: [
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Autre comparaison", next: "compareSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    compareCyberCloud: {
      messages: [
        "Comparaison Cybersécurité vs Cloud Computing :",
        "",
        "Cybersécurité :",
        "• Focus : Protection des systèmes et des données contre les menaces",
        "• Compétences : Sécurité réseau, pentesting, forensics, gestion des risques",
        "• Salaire moyen : 55-110k€ (légèrement supérieur en début de carrière)",
        "• Difficulté : Demande une vigilance constante et formation continue",
        "• Débouchés : Pentester, Security Engineer, RSSI, SOC Analyst",
        "",
        "Cloud Computing :",
        "• Focus : Déploiement et gestion d'infrastructures cloud évolutives",
        "• Compétences : Virtualisation, containerisation, IaC, automatisation",
        "• Salaire moyen : 55-120k€ (potentiel plus élevé aux niveaux seniors)",
        "• Difficulté : Écosystème vaste avec évolution rapide des technologies",
        "• Débouchés : Cloud Architect, DevOps Engineer, SRE, Cloud Security",
        "",
        "Ces domaines convergent avec le développement de la sécurité cloud."
      ],
      options: [
        { text: "En savoir plus sur la Cybersécurité", next: "explainCyber" },
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Autre comparaison", next: "compareSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    compareDigitalIoT: {
      messages: [
        "Comparaison Digital Transformation vs IoT :",
        "",
        "Digital Transformation :",
        "• Focus : Stratégie globale d'intégration des technologies dans l'entreprise",
        "• Compétences : Business, gestion de projet, UX, marketing digital",
        "• Salaire moyen : 50-100k€",
        "• Profil : Plus orienté business et management que technique",
        "• Débouchés : Chief Digital Officer, Digital Consultant, Project Manager",
        "",
        "Internet of Things :",
        "• Focus : Connexion d'objets physiques pour collecter et échanger des données",
        "• Compétences : Systèmes embarqués, réseaux, protocols de communication",
        "• Salaire moyen : 45-95k€",
        "• Profil : Plus technique et spécialisé",
        "• Débouchés : IoT Solutions Architect, Embedded Systems Engineer",
        "",
        "L'IoT est souvent un élément clé des stratégies de transformation digitale."
      ],
      options: [
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "En savoir plus sur l'IoT", next: "explainIoT" },
        { text: "Autre comparaison", next: "compareSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    compareVRAI: {
      messages: [
        "Comparaison VR/AR vs Intelligence Artificielle :",
        "",
        "Réalité Virtuelle/Augmentée :",
        "• Focus : Création d'expériences immersives et interactives",
        "• Compétences : Développement 3D, design d'interfaces spatiales, Unity/Unreal",
        "• Salaire moyen : 45-95k€",
        "• Caractéristiques : Créativité, innovation, expérience utilisateur",
        "• Débouchés : VR/AR Developer, 3D Artist, UX Designer pour XR",
        "",
        "Intelligence Artificielle :",
        "• Focus : Conception d'algorithmes intelligents qui apprennent",
        "• Compétences : Mathématiques, ML/DL, Python, résolution de problèmes",
        "• Salaire moyen : 65-110k€",
        "• Caractéristiques : Analytique, recherche, modélisation",
        "• Débouchés : Data Scientist, ML Engineer, AI Researcher",
        "",
        "Ces domaines convergent dans des applications comme la vision par ordinateur pour AR."
      ],
      options: [
        { text: "En savoir plus sur la VR/AR", next: "explainVR" },
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "Autre comparaison", next: "compareSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    compareCloudBigData: {
      messages: [
        "Comparaison Cloud Computing vs Big Data :",
        "",
        "Cloud Computing :",
        "• Focus : Infrastructure, plateformes et services accessibles à distance",
        "• Compétences : IaC, virtualisation, DevOps, sécurité cloud",
        "• Salaire moyen : 55-120k€",
        "• Caractéristiques : Automatisation, scaling, hautes disponibilités",
        "• Débouchés : Cloud Architect, DevOps Engineer, SRE",
        "",
        "Big Data :",
        "• Focus : Gestion et analyse de grandes quantités de données",
        "• Compétences : Hadoop, Spark, data warehousing, ETL, analytics",
        "• Salaire moyen : 60-100k€",
        "• Caractéristiques : Traitement distribué, stockage optimisé, insights",
        "• Débouchés : Data Engineer, Data Analyst, Big Data Architect",
        "",
        "Ces technologies sont très complémentaires, le cloud étant souvent l'infrastructure privilégiée pour les solutions Big Data."
      ],
      options: [
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Autre comparaison", next: "compareSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    // Tendances du marché
    marketTrends: {
      messages: [
        "Les grandes tendances du marché tech en 2023-2024 :",
        "",
        "• IA Générative - Explosion des applications basées sur les LLMs",
        "• Zero Trust Security - Nouvelle approche de cybersécurité",
        "• Cloud Natif - Architectures orientées Kubernetes et microservices",
        "• Edge Computing - Traitement décentralisé plus proche des sources",
        "• Développement Low-Code/No-Code - Démocratisation du développement",
        "• ESG Tech - Technologies au service du développement durable",
        "",
        "Que souhaitez-vous explorer ?"
      ],
      options: [
        { text: "Meilleur ROI (salaire/formation)", next: "bestROI" },
        { text: "Métiers les plus recherchés", next: "topJobs" },
        { text: "Tendances émergentes par secteur", next: "emergingTrends" },
        { text: "Retour", next: "initial" }
      ]
    },

    // Tendances émergentes par secteur
    emergingTrends: {
      messages: [
        "Tendances émergentes par secteur technologique :",
        "",
        "• IA : Modèles génératifs, IA multimodale, edge AI, IA explicable",
        "• Cybersécurité : Zero Trust, SASE, souveraineté des données",
        "• Cloud : Multi-cloud, FinOps, cloud souverain, serverless avancé",
        "• Big Data : Data Mesh, DataOps, Lakehouse, real-time analytics",
        "• Développement : Web3, Progressive Web Apps, API-first",
        "• IoT : Digital Twins, 5G private networks, edge analytics",
        "• XR : Métavers d'entreprise, AR cloud, interfaces cerveau-machine",
        "",
        "Ces tendances façonnent l'évolution des spécialités tech."
      ],
      options: [
        { text: "Impact sur les compétences requises", next: "skillsEvolution" },
        { text: "Métiers les plus recherchés", next: "topJobs" },
        { text: "Explorer les spécialités", next: "explainSpecialties" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    // Évolution des compétences requises
    skillsEvolution: {
      messages: [
        "Évolution des compétences tech recherchées :",
        "",
        "• Polyvalence technique : Maîtrise de plusieurs domaines complémentaires",
        "• Hybridation business/tech : Comprendre les enjeux métiers",
        "• Prompt Engineering : Interaction optimale avec les LLMs",
        "• Automatisation : IaC, CI/CD, robotisation des processus",
        "• Tech éthique : Confidentialité, durabilité, inclusion",
        "• Résilience des systèmes : Chaos engineering, SRE",
        "• Collaboration augmentée : Outils et méthodes pour le travail hybride",
        "",
        "La capacité d'adaptation rapide devient la compétence la plus valorisée."
      ],
      options: [
        { text: "Comment acquérir ces compétences", next: "skillsAcquisition" },
        { text: "Certifications recommandées", next: "valuableCertifications" },
        { text: "Retour aux tendances", next: "emergingTrends" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    // Selon centres d'intérêt
    interestsBased: {
      messages: [
        "Choisir une spécialité selon vos centres d'intérêt :",
        "",
        "Qu'est-ce qui vous passionne le plus ?"
      ],
      options: [
        { text: "Algorithmes et résolution de problèmes", next: "interestsAlgo" },
        { text: "Créer des interfaces et expériences utilisateur", next: "interestsUX" },
        { text: "Analyser et visualiser des données", next: "interestsData" },
        { text: "Sécuriser et protéger les systèmes", next: "interestsSecurity" },
        { text: "Innover et transformer les organisations", next: "interestsBusiness" }
      ]
    },

    // Recommandations basées sur les centres d'intérêt
    interestsAlgo: {
      messages: [
        "Avec votre intérêt pour les algorithmes et la résolution de problèmes, ces spécialités pourraient vous convenir :",
        "",
        "1. Intelligence Artificielle - Conception d'algorithmes intelligents",
        "2. Big Data - Algorithmes de traitement de données massives",
        "3. Cloud Computing - Architecture de systèmes complexes",
        "",
        "L'IA offre les défis algorithmiques les plus stimulants, mais requiert de solides bases en mathématiques."
      ],
      options: [
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Autres centres d'intérêt", next: "interestsBased" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    interestsUX: {
      messages: [
        "Avec votre intérêt pour les interfaces et l'expérience utilisateur, ces spécialités pourraient vous convenir :",
        "",
        "1. Réalité Virtuelle & Augmentée - Création d'expériences immersives",
        "2. Digital Transformation - Expérience client et parcours utilisateur",
        "3. IoT - Interfaces entre monde physique et numérique",
        "",
        "La VR/AR offre les défis d'interface les plus innovants et créatifs."
      ],
      options: [
        { text: "En savoir plus sur la VR/AR", next: "explainVR" },
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "Autres centres d'intérêt", next: "interestsBased" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    interestsData: {
      messages: [
        "Avec votre intérêt pour l'analyse et la visualisation de données, ces spécialités pourraient vous convenir :",
        "",
        "1. Big Data & Analytics - Traitement et analyse de volumes massifs",
        "2. Intelligence Artificielle - Extraction d'insights via ML/DL",
        "3. Digital Transformation - Prise de décision data-driven",
        "",
        "Le Big Data offre les défis d'analyse les plus diversifiés, avec un accent sur les infrastructures et pipelines."
      ],
      options: [
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "Autres centres d'intérêt", next: "interestsBased" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    interestsSecurity: {
      messages: [
        "Avec votre intérêt pour la sécurité et la protection des systèmes, ces spécialités pourraient vous convenir :",
        "",
        "1. Cybersécurité - Défense et sécurisation des systèmes d'information",
        "2. Cloud Computing - Sécurité des infrastructures cloud",
        "3. IoT - Sécurisation des objets connectés",
        "",
        "La Cybersécurité offre la formation la plus complète en matière de protection des systèmes et des données."
      ],
      options: [
        { text: "En savoir plus sur la Cybersécurité", next: "explainCyber" },
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Autres centres d'intérêt", next: "interestsBased" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    interestsBusiness: {
      messages: [
        "Avec votre intérêt pour l'innovation et la transformation des organisations, ces spécialités pourraient vous convenir :",
        "",
        "1. Digital Transformation - Stratégie digitale et conduite du changement",
        "2. Cloud Computing - Modernisation des infrastructures IT",
        "3. IoT - Nouveaux modèles d'affaires basés sur les objets connectés",
        "",
        "La Digital Transformation offre l'approche la plus business et stratégique, combinant technologie et management."
      ],
      options: [
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Autres centres d'intérêt", next: "interestsBased" },
        { text: "Menu principal", next: "initial" }
      ]
    },

    // Test d'orientation amélioré
    orientationTest: {
      messages: [
        "Ce test rapide vous aidera à identifier les spécialités qui correspondent le mieux à votre profil.",
        "",
        "Première question : Comment préférez-vous résoudre des problèmes ?"
      ],
      options: [
        { text: "En analysant des données et des patterns", next: "testAnalytical" },
        { text: "En imaginant des solutions créatives", next: "testCreative" },
        { text: "En suivant une approche méthodique et structurée", next: "testMethodical" },
        { text: "En collaborant et en échangeant avec d'autres", next: "testCollaborative" }
      ]
    },
    
    // Test d'orientation - profil créatif
    testCreative: {
      messages: [
        "Avec votre profil créatif et innovant, ces spécialités pourraient vous correspondre :",
        "",
        "• Réalité Virtuelle & Augmentée - Création d'expériences immersives",
        "• Digital Transformation - Conception de nouveaux parcours utilisateurs",
        "• Intelligence Artificielle - Applications innovantes de l'IA générative",
        "",
        "Une autre question : préférez-vous créer des expériences visuelles ou plutôt concevoir des stratégies d'innovation ?"
      ],
      options: [
        { text: "Expériences visuelles et immersives", next: "recommendVR" },
        { text: "Stratégies et parcours d'innovation", next: "recommendDigital" },
        { text: "Applications intelligentes innovantes", next: "recommendAI" },
        { text: "Voir toutes les spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Test d'orientation - profil méthodique
    testMethodical: {
      messages: [
        "Avec votre profil méthodique et structuré, ces spécialités pourraient vous correspondre :",
        "",
        "• Cloud Computing - Architectures et infrastructures optimisées",
        "• Cybersécurité - Approches systématiques de protection des systèmes",
        "• Big Data - Pipelines et structures de données efficaces",
        "",
        "Une autre question : préférez-vous construire des infrastructures, les sécuriser, ou organiser des flux de données ?"
      ],
      options: [
        { text: "Concevoir des infrastructures", next: "recommendCloud" },
        { text: "Sécuriser des systèmes", next: "recommendCyber" },
        { text: "Organiser des flux de données", next: "recommendBigData" },
        { text: "Voir toutes les spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Test d'orientation - profil collaboratif
    testCollaborative: {
      messages: [
        "Avec votre profil collaboratif et orienté communication, ces spécialités pourraient vous correspondre :",
        "",
        "• Digital Transformation - Conduite du changement et accompagnement",
        "• IoT - Projets multidisciplinaires connectant différents domaines",
        "• Cloud Computing - Collaboration DevOps et équipes transverses",
        "",
        "Une autre question : préférez-vous accompagner des équipes dans le changement ou créer des liens entre systèmes et technologies ?"
      ],
      options: [
        { text: "Accompagner le changement", next: "recommendDigital" },
        { text: "Connecter systèmes et objets", next: "recommendIoT" },
        { text: "Faire collaborer technologies et équipes", next: "recommendCloud" },
        { text: "Voir toutes les spécialités", next: "explainSpecialties" }
      ]
    },
    
    // Recommandations supplémentaires
    recommendBigData: {
      messages: [
        "Basé sur vos réponses, le Big Data & Analytics semble être une excellente option pour vous !",
        "",
        "Cette spécialité combine parfaitement :",
        "• Traitement de grandes masses de données",
        "• Analyses approfondies et découverte d'insights",
        "• Architectures de données complexes",
        "",
        "Vous pourrez transformer des données brutes en informations stratégiques dans tous les secteurs d'activité, de la finance à la santé en passant par le retail."
      ],
      options: [
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Voir les débouchés professionnels", next: "bigDataCareers" },
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
        { text: "Retour au début", next: "initial" }
      ]
    },
    
    recommendCyber: {
      messages: [
        "Basé sur vos réponses, la Cybersécurité semble être une excellente option pour vous !",
        "",
        "Cette spécialité combine parfaitement :",
        "• Résolution de défis de sécurité complexes",
        "• Protection des systèmes et des données",
        "• Analyse de risques et de vulnérabilités",
        "",
        "Vous pourrez protéger les organisations contre les cybermenaces dans un domaine en constante évolution où les talents sont très recherchés."
      ],
      options: [
        { text: "En savoir plus sur la Cybersécurité", next: "explainCyber" },
        { text: "Voir les débouchés professionnels", next: "cyberCareers" },
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
        { text: "Retour au début", next: "initial" }
      ]
    },
    
    recommendCloud: {
      messages: [
        "Basé sur vos réponses, le Cloud Computing semble être une excellente option pour vous !",
        "",
        "Cette spécialité combine parfaitement :",
        "• Conception d'architectures évolutives",
        "• Automatisation et optimisation des infrastructures",
        "• Collaboration DevOps et approches modernes",
        "",
        "Vous pourrez transformer la manière dont les entreprises déploient leurs applications et services, en offrant flexibilité, performance et sécurité."
      ],
      options: [
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Voir les débouchés professionnels", next: "cloudCareers" },
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
        { text: "Retour au début", next: "initial" }
      ]
    },
    
    recommendDigital: {
      messages: [
        "Basé sur vos réponses, la Transformation Digitale semble être une excellente option pour vous !",
        "",
        "Cette spécialité combine parfaitement :",
        "• Vision stratégique et business",
        "• Innovation centrée utilisateur",
        "• Gestion du changement organisationnel",
        "",
        "Vous pourrez accompagner les organisations dans leur évolution numérique, en créant de nouveaux services, expériences client et modèles d'affaires."
      ],
      options: [
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "Voir les débouchés professionnels", next: "digitalCareers" },
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
        { text: "Retour au début", next: "initial" }
      ]
    },
    
    recommendIoT: {
      messages: [
        "Basé sur vos réponses, l'Internet des Objets semble être une excellente option pour vous !",
        "",
        "Cette spécialité combine parfaitement :",
        "• Connexion entre monde physique et numérique",
        "• Collecte et analyse de données temps réel",
        "• Conception de systèmes connectés innovants",
        "",
        "Vous pourrez développer des solutions qui transforment notre façon d'interagir avec les objets du quotidien, dans des domaines comme la ville intelligente, l'industrie 4.0 ou la santé connectée."
      ],
      options: [
        { text: "En savoir plus sur l'IoT", next: "explainIoT" },
        { text: "Voir les débouchés professionnels", next: "iotCareers" },
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
        { text: "Retour au début", next: "initial" }
      ]
    },

    // Perspectives d'emploi
    careerProspects: {
      messages: [
        "Voici un aperçu des perspectives d'emploi par spécialité :",
        "",
        "• Cybersécurité : Demande extrêmement forte, pénurie mondiale (+350% en 5 ans)",
        "• Cloud Computing : Adoption massive par les entreprises, croissance soutenue",
        "• Intelligence Artificielle : Explosion des applications, profils très recherchés",
        "• Big Data : Besoin constant en analyse de données dans tous secteurs",
        "• VR/AR : Marché en forte croissance dans formation, santé, industrie",
        "• Digital Transformation : Besoin transversal dans toutes les organisations",
        "• IoT : Développement rapide dans industrie, smart cities, santé connectée",
        "",
        "Quelle spécialité vous intéresse le plus pour approfondir ?"
      ],
      options: [
        { text: "Cybersécurité", next: "cyberCareers" },
        { text: "Intelligence Artificielle", next: "aiCareers" },
        { text: "Big Data", next: "bigDataCareers" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "choosingHelp" }
      ]
    },
    
    // Compétences requises pour les spécialités
    skillsNeeded: {
      messages: [
        "Choisir selon vos compétences actuelles peut être une bonne approche.",
        "",
        "Quelles sont vos forces principales ?"
      ],
      options: [
        { text: "Programmation et développement", next: "skillsProgramming" },
        { text: "Mathématiques et statistiques", next: "skillsMath" },
        { text: "Communication et gestion de projet", next: "skillsComm" },
        { text: "Design et créativité", next: "skillsDesign" },
        { text: "Analyse et résolution de problèmes", next: "skillsAnalysis" }
      ]
    },
    
    // Recommandations basées sur les compétences
    skillsProgramming: {
      messages: [
        "Avec vos compétences en programmation, ces spécialités seraient accessibles :",
        "",
        "• Intelligence Artificielle - Python, bibliothèques ML/DL",
        "• Développement Web/Mobile - JavaScript, frameworks frontend/backend",
        "• Cloud Computing - IaC, conteneurisation, automatisation",
        "• IoT - Systèmes embarqués, protocols de communication",
        "",
        "Si vous êtes à l'aise avec l'algorithmique complexe, l'IA est un excellent choix. Si vous préférez le développement d'applications, le Web/Mobile ou l'IoT peuvent être plus adaptés."
      ],
      options: [
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Explorer d'autres compétences", next: "skillsNeeded" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    skillsMath: {
      messages: [
        "Avec vos compétences en mathématiques et statistiques, ces spécialités seraient accessibles :",
        "",
        "• Intelligence Artificielle - Fondements mathématiques du ML/DL",
        "• Big Data & Analytics - Statistiques, modélisation, prédiction",
        "• Cybersécurité - Cryptographie, analyse de risques",
        "",
        "L'IA est le domaine qui valorise le plus les compétences mathématiques avancées, suivi du Big Data et de certains aspects de la cybersécurité."
      ],
      options: [
        { text: "En savoir plus sur l'IA", next: "explainAI" },
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Explorer d'autres compétences", next: "skillsNeeded" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    skillsComm: {
      messages: [
        "Avec vos compétences en communication et gestion de projet, ces spécialités seraient accessibles :",
        "",
        "• Digital Transformation - Conduite du changement, stratégie digitale",
        "• Cloud Computing - Coordination DevOps, transformation IT",
        "• Cybersécurité - Gouvernance, conformité, gestion des risques",
        "",
        "La Digital Transformation est la spécialité qui valorise le plus ces soft skills, tout en nécessitant une compréhension technique des enjeux."
      ],
      options: [
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "En savoir plus sur le Cloud", next: "explainCloud" },
        { text: "Explorer d'autres compétences", next: "skillsNeeded" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    skillsDesign: {
      messages: [
        "Avec vos compétences en design et créativité, ces spécialités seraient accessibles :",
        "",
        "• Réalité Virtuelle & Augmentée - Design d'expériences immersives",
        "• Digital Transformation - UX/UI, parcours utilisateur",
        "• Web/Mobile - Frontend, expérience utilisateur",
        "",
        "La VR/AR est le domaine qui valorise le plus la créativité et le design d'expérience, combinés à des compétences techniques."
      ],
      options: [
        { text: "En savoir plus sur la VR/AR", next: "explainVR" },
        { text: "En savoir plus sur la Digital Transformation", next: "explainDigital" },
        { text: "Explorer d'autres compétences", next: "skillsNeeded" },
        { text: "Menu principal", next: "initial" }
      ]
    },
    
    skillsAnalysis: {
      messages: [
        "Avec vos compétences en analyse et résolution de problèmes, ces spécialités seraient accessibles :",
        "",
        "• Cybersécurité - Analyse de vulnérabilités et de menaces",
        "• Big Data - Exploration et interprétation des données",
        "• Intelligence Artificielle - Modélisation et optimisation",
        "• Cloud Computing - Architecture de solutions complexes",
        "",
        "Ces domaines valorisent la pensée analytique, avec différentes orientations selon que vous préférez l'analyse de sécurité, de données ou d'algorithmes."
      ],
      options: [
        { text: "En savoir plus sur la Cybersécurité", next: "explainCyber" },
        { text: "En savoir plus sur le Big Data", next: "explainBigData" },
        { text: "Explorer d'autres compétences", next: "skillsNeeded" },
        { text: "Menu principal", next: "initial" }
      ]
    }
  };

  // Initialize bot
  function initBot() {
    // Toggle chat on avatar click
    botAvatar.addEventListener('click', toggleChat);
    
    // Close button functionality
    closeBotButton.addEventListener('click', closeChat);
    
    // Initialize with closed state
    botChatContainer.style.display = 'none';
    
    // Start with initial conversation state
    if (localStorage.getItem('botConversationState')) {
      // Retrieve previous state if exists
      restorePreviousState();
    } else {
      renderConversationState(conversationState);
    }
  }
  
  // Toggle chat open/closed
  function toggleChat() {
    isOpen = !isOpen;
    
    if (isOpen) {
      openChat();
    } else {
      closeChat();
    }
  }
  
  // Open the chat
  function openChat() {
    isOpen = true;
    botChatContainer.style.display = 'flex';
    setTimeout(() => {
      botChatContainer.classList.add('open');
    }, 10); // Small delay for animation to work
  }
  
  // Close the chat
  function closeChat() {
    isOpen = false;
    botChatContainer.classList.remove('open');
    setTimeout(() => {
      botChatContainer.style.display = 'none';
    }, 300); // Match transition duration
    
    // Save conversation state
    saveCurrentState();
  }
  
  // Save the current conversation state to localStorage
  function saveCurrentState() {
    const stateToSave = {
      conversationState: conversationState,
      chatHistory: chatHistory
    };
    localStorage.setItem('botConversationState', JSON.stringify(stateToSave));
  }
  
  // Restore previous conversation state
  function restorePreviousState() {
    try {
      const savedState = JSON.parse(localStorage.getItem('botConversationState'));
      if (savedState) {
        conversationState = savedState.conversationState;
        
        // Render saved history first
        if (savedState.chatHistory && savedState.chatHistory.length > 0) {
          savedState.chatHistory.forEach(item => {
            if (item.type === 'bot') {
              const messageElement = document.createElement('div');
              messageElement.className = 'bot-message';
              messageElement.textContent = item.content;
              botMessagesContainer.appendChild(messageElement);
            } else if (item.type === 'user') {
              const userElement = document.createElement('div');
              userElement.className = 'user-message';
              userElement.textContent = item.content;
              botMessagesContainer.appendChild(userElement);
            }
          });
          
          // Scroll to bottom of history
          botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
          
          // Set current chat history
          chatHistory = [...savedState.chatHistory];
        }
        
        // Then render current state options
        renderOptions(conversationTree[conversationState].options);
      } else {
        renderConversationState(conversationState);
      }
    } catch (e) {
      console.error("Error restoring conversation state:", e);
      renderConversationState(conversationState);
    }
  }
  
  // Process and display messages sequentially
  async function processMessageQueue() {
    if (processingQueue || messageQueue.length === 0) return;
    
    processingQueue = true;
    
    while (messageQueue.length > 0) {
      const message = messageQueue.shift();
      await displayMessage(message);
    }
    
    processingQueue = false;
  }
  
  // Display a single message with typing animation
  function displayMessage(message) {
    return new Promise(resolve => {
      const messageElement = document.createElement('div');
      messageElement.className = 'bot-message';
      botMessagesContainer.appendChild(messageElement);
      
      // Add to chat history
      chatHistory.push({
        type: 'bot',
        content: message
      });
      
      let i = 0;
      const typingSpeed = 20; // ms per character
      
      // Simulate typing effect
      const typingInterval = setInterval(() => {
        if (i < message.length) {
          messageElement.textContent += message.charAt(i);
          i++;
          
          // Auto-scroll to bottom
          botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
        } else {
          clearInterval(typingInterval);
          setTimeout(resolve, 300); // Pause after message completes
        }
      }, typingSpeed);
    });
  }
  
  // Render options only
  function renderOptions(options) {
    // Remove old options if they exist
    const oldOptions = botChatContainer.querySelector('.bot-options');
    if (oldOptions) {
      botChatContainer.removeChild(oldOptions);
    }
    
    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bot-options';
    
    // Add options
    options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.className = 'bot-option';
      optionButton.textContent = option.text;
      
      // Handle option click
      optionButton.addEventListener('click', () => handleOptionClick(option));
      
      optionsContainer.appendChild(optionButton);
    });
    
    botChatContainer.appendChild(optionsContainer);
  }
  
  // Handle option click
  function handleOptionClick(option) {
    // Create user response element
    const userResponse = document.createElement('div');
    userResponse.className = 'user-message';
    userResponse.textContent = option.text;
    botMessagesContainer.appendChild(userResponse);
    
    // Add to chat history
    chatHistory.push({
      type: 'user',
      content: option.text
    });
    
    // Scroll to bottom
    botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
    
    // Handle navigation action
    if (option.action === 'navigate') {
      window.location.href = option.url;
      return;
    }
    
    // Move to next state
    if (option.next) {
      conversationState = option.next;
      setTimeout(() => {
        renderConversationState(option.next);
      }, 500);
    }
  }
  
  // Render conversation state (messages + options)
  function renderConversationState(stateKey) {
    const state = conversationTree[stateKey];
    
    if (!state) {
      console.error(`State "${stateKey}" not found in conversation tree`);
      return;
    }
    
    // Add messages to queue
    messageQueue = [...state.messages];
    
    // Process messages
    processMessageQueue().then(() => {
      // Add options after messages are displayed
      if (state.options && state.options.length > 0) {
        renderOptions(state.options);
      }
    });
  }
  
  // Initialize the bot
  initBot();
}); 