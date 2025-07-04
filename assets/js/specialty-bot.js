/**
 * Specialty Bot - Enhanced Interactive assistant for exploring EPITECH MSC specialties
 * Version 2.0 with inline buttons, profile detection, FAQ, and enhanced UX
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
  let navigationHistory = ['initial'];
  let userProfile = { background: null, preferences: null, interests: [] };

  // Enhanced conversation tree with inline buttons and richer content
  const conversationTree = {
    // --- INITIAL & MAIN NAVIGATION ---
    initial: {
      messages: [
        "<div class='bot-welcome-message'><div class='bot-icon-large'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z'></path></svg></div><strong class='welcome-text'>Bonjour !</strong><br/>Je suis votre assistant d'orientation Epitech. Prêt à trouver le MSc qui vous correspond ?</div>",
        "Comment souhaitez-vous commencer ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"profile_check\")'>🎓 Découvrir mon profil</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>✨ M'aider à choisir</button><button class='inline-btn' onclick='handleInlineClick(\"explainSpecialties\")'>📋 Voir toutes les spécialités</button><button class='inline-btn' onclick='handleInlineClick(\"practical_info\")'>ℹ️ Infos pratiques</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ FAQ</button></div>"
      ],
      options: []
    },

    // --- PROFILE DETECTION ---
    profile_check: {
      messages: [
        "Parfait ! Commençons par comprendre votre profil actuel. Quel est votre niveau d'études ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"profile_bac2\")'>📚 Bac+2 validé</button><button class='inline-btn' onclick='handleInlineClick(\"profile_bac3_tech\")'>💻 Bac+3 Informatique/Tech</button><button class='inline-btn' onclick='handleInlineClick(\"profile_bac3_business\")'>💼 Bac+3 Business/Management</button><button class='inline-btn' onclick='handleInlineClick(\"profile_bac3_other\")'>🎯 Autre Bac+3</button><button class='inline-btn' onclick='handleInlineClick(\"profile_higher\")'>🎓 Bac+4 ou plus</button></div>"
      ],
      options: []
    },

    profile_bac2: {
      messages: [
        "Excellente nouvelle ! Avec un Bac+2, vous pouvez intégrer notre <strong>Pré-MSc</strong> 🚀",
        "<div class='highlight-box'>Le Pré-MSc est une passerelle d'un an pour vous préparer à l'excellence.</div>",
        "<strong>Phase 1 : 4 mois de formation initiale</strong><br/>• Des cours intensifs pour maîtriser les fondamentaux.<br/>• Cette phase est payante. Pour les modalités, contactez notre expert.",
        "<strong>Phase 2 : 8 mois en alternance</strong><br/>• Vous rejoignez une entreprise avec un rythme de 3 semaines sur 4.<br/>• La formation est alors <strong>gratuite et rémunérée</strong>.",
        "<div class='tip-box'>💡 Vous avez la possibilité de rester dans la même entreprise pour les 3 ans (Pré-MSc + MSc) !</div>",
        "Le Pré-MSc vous intéresse ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"pre_msc_details\")'>📖 Plus de détails</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Voir les spécialités MSc</button></div>"
      ],
      options: []
    },

    pre_msc_details: {
      messages: [
        "<h3>🎓 Pré-MSc : Le détail</h3>",
        "<div class='details-box'><strong>🎯 Objectif :</strong> Atteindre le niveau requis pour exceller en MSc.<br/><strong>Phase 1 (4 mois) :</strong> Formation initiale intensive (payante).<br/><strong>Phase 2 (8 mois) :</strong> Alternance gratuite et rémunérée (1 sem. école / 3 sem. entreprise).<br/><strong>➡️ Suite :</strong> Accès direct aux 15 spécialités MSc.</div>",
        "<div class='tip-box'>Pour toute question sur le financement de la phase initiale, contactez notre référent :<br/>📧 <a href='mailto:jean-benoit.vaucourt@epitech.eu'>jean-benoit.vaucourt@epitech.eu</a></div>",
        "Prêt à découvrir les spécialités qui vous attendent après ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🔍 Découvrir les MSc</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📞 Comment candidater</button></div>"
      ],
      options: []
    },

    profile_bac3_tech: {
      messages: [
        "Parfait ! Avec votre background technique, vous avez le choix entre deux approches :<br/><div class='choice-box'><strong>🔧 Approfondir vos compétences techniques</strong><br/>Devenir un expert de haut niveau (IA, Cloud, Cybersécurité...)</div><div class='choice-box'><strong>📈 Évoluer vers le management</strong><br/>Piloter la transformation digitale et manager des équipes tech</div>Quelle approche vous attire le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q_tech\")'>🔧 Expertise technique</button><button class='inline-btn' onclick='handleInlineClick(\"help_q_business\")'>📈 Management & stratégie</button><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>🤔 Découvrir les deux</button></div>"
      ],
      options: []
    },

    profile_bac3_business: {
      messages: [
        "Excellent ! Votre profil business est très recherché dans la tech 🎯 Nos spécialités <strong>Digital, Business & Management</strong> sont parfaites pour vous : elles combinent votre expertise business avec les technologies de pointe.<br/>Quel secteur vous passionne le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q_business_industry\")'>🏢 Transformer un secteur</button><button class='inline-btn' onclick='handleInlineClick(\"help_q_business_internal\")'>⚙️ Optimiser les organisations</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📋 Voir toutes les spé Business</button></div>"
      ],
      options: []
    },

    profile_bac3_other: {
      messages: [
        "Très bien ! La diversité des profils fait la richesse d'Epitech 🌟<br/>Votre background unique vous apportera une perspective précieuse. Dites-moi ce qui vous motive le plus :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"motivation_tech\")'>💻 Maîtriser la technologie</button><button class='inline-btn' onclick='handleInlineClick(\"motivation_impact\")'>🚀 Créer de l'impact business</button><button class='inline-btn' onclick='handleInlineClick(\"motivation_hybrid\")'>🔄 Les deux m'intéressent</button></div>"
      ],
      options: []
    },

    profile_higher: {
      messages: [
        "Parfait ! Votre niveau d'études avancé vous donne une excellente base 🎓<br/>Vous pourrez valoriser votre expérience tout en vous spécialisant. Que recherchez-vous dans cette formation ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"goal_specialization\")'>🎯 Spécialisation technique</button><button class='inline-btn' onclick='handleInlineClick(\"goal_career_change\")'>🔄 Reconversion tech</button><button class='inline-btn' onclick='handleInlineClick(\"goal_leadership\")'>👑 Leadership & management</button></div>"
      ],
      options: []
    },

    // --- ENHANCED GUIDED CHOICE FLOW ---
    help_q1: {
      messages: [
        "Excellent ! Je vais vous poser quelques questions pour vous guider vers la spécialité idéale 🎯<br/>Quand vous imaginez votre futur métier, vous vous voyez plutôt :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"motivation_build\")'>🔨 Construire et créer la technologie</button><button class='inline-btn' onclick='handleInlineClick(\"motivation_transform\")'>🚀 Transformer les secteurs avec la tech</button><button class='inline-btn' onclick='handleInlineClick(\"motivation_protect\")'>🛡️ Protéger et sécuriser</button><button class='inline-btn' onclick='handleInlineClick(\"motivation_analyze\")'>📊 Analyser et décider avec la data</button><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>❓ J'hésite, expliquez-moi</button></div>"
      ],
      options: []
    },

    motivation_build: {
      messages: [
        "Parfait ! Vous avez l'âme d'un bâtisseur 🏗️ Quel type de création vous passionne le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_ai\")'>🧠 Algorithmes d'IA intelligents</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_cloud\")'>☁️ Infrastructures cloud scalables</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_iot\")'>📡 Objets connectés innovants</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_vrar\")'>🥽 Mondes virtuels immersifs</button><button class='inline-btn' onclick='handleInlineClick(\"help_q_tech_ai_data\")'>📊 Solutions data & IA</button></div>"
      ],
      options: []
    },

    motivation_transform: {
      messages: [
        "Excellent ! Vous voulez être un agent de transformation 🌟 Quel secteur aimeriez-vous révolutionner ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_fintech\")'>💰 Finance & banque</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_sante\")'>🏥 Santé & bien-être</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_luxe\")'>💎 Luxe & retail</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_marketing\")'>📱 Communication & médias</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_ai_transfo\")'>🏢 Organisations & entreprises</button></div>"
      ],
      options: []
    },

    motivation_protect: {
      messages: [
        "Noble mission ! La sécurité est cruciale dans notre monde numérique 🛡️<br/>Quel aspect de la protection vous intéresse le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_cyber\")'>⚔️ Cybersécurité technique</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_data_protection\")'>📋 Protection des données (RGPD)</button><button class='inline-btn' onclick='handleInlineClick(\"compare_security\")'>🔍 Comparer les deux approches</button></div>"
      ],
      options: []
    },

    motivation_analyze: {
      messages: [
        "Excellente orientation ! La data est le nouveau pétrole 📊<br/>Comment voulez-vous exploiter la puissance des données ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_ds_bi\")'>📈 Business Intelligence & reporting</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_bigdata\")'>🗂️ Big Data & architectures</button><button class='inline-btn' onclick='handleInlineClick(\"data_application_choice\")'>🎯 Par secteur d'application</button></div>"
      ],
      options: []
    },

    // --- PRACTICAL INFO ---
    practical_info: {
      messages: [
        "<h3>ℹ️ Informations pratiques essentielles</h3><div class='info-grid'><div class='info-item'>📅 <strong>Durée</strong><br/>MSc : 2 ans<br/>Pré-MSc : 1 an</div><div class='info-item'>💼 <strong>Rythme</strong><br/>3 semaines entreprise<br/>1 semaine école</div><div class='info-item'>💰 <strong>Financement</strong><br/>Formation gratuite<br/>Salaire apprenti</div></div><div class='info-grid'><div class='info-item'>🎓 <strong>Prérequis</strong><br/>MSc : Bac+3 validé<br/>Pré-MSc : Bac+2 validé</div><div class='info-item'>🏢 <strong>Entreprises</strong><br/>+2000 partenaires<br/>Accompagnement recherche</div><div class='info-item'>📍 <strong>Campus</strong><br/>15 villes en France<br/>+ International</div></div>Besoin de plus d'infos ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"alternance_details\")'>🔄 L'alternance</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidature</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ FAQ</button></div>"
      ],
      options: []
    },

    alternance_details: {
      messages: [
        "<h3>🔄 L'alternance Epitech : le meilleur des deux mondes</h3><div class='alternance-benefits'><strong>🏢 3 semaines en entreprise :</strong><br/>• Missions réelles et responsabilités<br/>• Intégration dans une équipe pro<br/>• Application immédiate des compétences<br/>• Réseau professionnel dès la formation</div><div class='alternance-benefits'><strong>🎓 1 semaine école :</strong><br/>• Approfondissement théorique et pratique<br/>• Projets collaboratifs<br/>• Échanges avec les intervenants<br/>• Montée en compétences continue</div><br/>L'alternance vous intéresse ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"company_search\")'>🔍 Trouver une entreprise</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📋 Processus d'admission</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Choisir ma spécialité</button></div>"
      ],
      options: []
    },

    // --- FAQ ---
    faq: {
      messages: [
        "<h3>❓ Questions fréquemment posées</h3>Choisissez votre question :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"faq_cost\")'>💰 Coût de la formation</button><button class='inline-btn' onclick='handleInlineClick(\"faq_admission\")'>📝 Conditions d'admission</button><button class='inline-btn' onclick='handleInlineClick(\"faq_alternance\")'>🏢 Trouver une entreprise</button><button class='inline-btn' onclick='handleInlineClick(\"faq_locations\")'>📍 Campus disponibles</button><button class='inline-btn' onclick='handleInlineClick(\"faq_difference\")'>🔄 Différence Tech/Business</button><button class='inline-btn' onclick='handleInlineClick(\"faq_after\")'>🎯 Débouchés</button></div>"
      ],
      options: []
    },

    faq_cost: {
      messages: [
        "<h3>💰 Coût & Financement</h3><div class='faq-answer'>✅ <strong>Pour les MSc (Bac+3 et plus) :</strong><br/>La formation est 100% financée par l'entreprise d'accueil via l'alternance. Vous n'avez aucun frais de scolarité et vous êtes rémunéré.</div><div class='faq-answer'>✅ <strong>Pour le Pré-MSc (Bac+2) :</strong><br/>La formation débute par une phase initiale payante. Pour toutes les questions sur les modalités de financement, notre expert est là pour vous aider.<br/><br/>📧 <a href='mailto:jean-benoit.vaucourt@epitech.eu'>jean-benoit.vaucourt@epitech.eu</a></div><br/>Autres questions ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ Retour FAQ</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    faq_alternance: {
      messages: [
        "<h3>🏢 Comment trouver une entreprise ?</h3><div class='faq-answer'>🤝 <strong>Accompagnement personnalisé</strong> par nos équipes<br/>📊 <strong>+2000 entreprises partenaires</strong> dans tous les secteurs<br/>📝 <strong>Ateliers CV/Entretiens</strong> pour vous préparer<br/>🎯 <strong>Job dating</strong> et événements de recrutement<br/>⏰ <strong>Possibilité de commencer</strong> avant d'avoir trouvé (délai légal)</div>Besoin d'aide ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"company_types\")'>🏢 Types d'entreprises</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater maintenant</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ Autres questions</button></div>"
      ],
      options: []
    },

    // --- ENHANCED SPECIALTY EXPLANATIONS ---
    categorizeSpecialties: {
      messages: [
        "<h3>🔄 Tech vs Business : Quelle est la différence ?</h3><div class='comparison-box'><strong>🔧 Spécialités Expertes Technologiques</strong><br/>• Vous <u>construisez</u> la technologie<br/>• Focus sur l'expertise technique poussée<br/>• Métiers : Développeur senior, Architecte, Expert sécurité<br/>• Exemples : IA, Cloud, Cybersécurité, IoT</div><div class='comparison-box'><strong>📈 Spécialités Digital, Business & Management</strong><br/>• Vous <u>pilotez</u> la transformation par la tech<br/>• Focus sur la stratégie et le management<br/>• Métiers : Product Manager, Chef de projet, Consultant<br/>• Exemples : Fintech, Marketing, Management de projet</div>Quel profil vous correspond ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Explorer les spé Tech</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Explorer les spé Business</button><button class='inline-btn' onclick='handleInlineClick(\"personality_test\")'>🧠 Test de personnalité</button></div>"
      ],
      options: []
    },

    personality_test: {
      messages: [
        "<h3>🧠 Mini-test de personnalité professionnelle</h3>Face à un problème complexe, votre premier réflexe est de :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"personality_analyze\")'>🔍 L'analyser en détail techniquement</button><button class='inline-btn' onclick='handleInlineClick(\"personality_strategy\")'>📋 Élaborer une stratégie d'ensemble</button><button class='inline-btn' onclick='handleInlineClick(\"personality_team\")'>👥 Réunir une équipe pour le résoudre</button></div>"
      ],
      options: []
    },

    listTechSpecialties: {
      messages: [
        "<h3>🔧 Spécialités Expertes Technologiques</h3>Voici nos spécialités pour les futurs experts tech :<br/><br/><div class='specialty-grid'><div class='specialty-card' onclick='handleInlineClick(\"explainCyber\")'><strong>🛡️ Cybersécurité</strong><br/>Protéger les systèmes</div><div class='specialty-card' onclick='handleInlineClick(\"explainCloud\")'><strong>☁️ Cloud Computing</strong><br/>Infrastructures scalables</div><div class='specialty-card' onclick='handleInlineClick(\"explainAI\")'><strong>🧠 Intelligence Artificielle</strong><br/>Algorithmes intelligents</div><div class='specialty-card' onclick='handleInlineClick(\"explainBigData\")'><strong>📊 Big Data & Analytics</strong><br/>Données massives</div><div class='specialty-card' onclick='handleInlineClick(\"explainIoT\")'><strong>📡 Internet of Things</strong><br/>Objets connectés</div><div class='specialty-card' onclick='handleInlineClick(\"explainVR\")'><strong>🥽 VR & AR</strong><br/>Réalités immersives</div></div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Voir spé Business</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Aide au choix</button><button class='inline-btn' onclick='handleInlineClick(\"compare_specialties\")'>⚖️ Comparer</button></div>"
      ],
      options: []
    },

    listBusinessSpecialties: {
      messages: [
        "<h3>📈 Spécialités Business & Management</h3>Voici nos spécialités pour les futurs leaders de la transformation :<br/><br/><div class='specialty-grid'><div class='specialty-card' onclick='handleInlineClick(\"explainProjectManagement\")'><strong>🎯 Strategic Project Management</strong><br/>Leadership & entrepreneuriat</div><div class='specialty-card' onclick='handleInlineClick(\"explainFintech\")'><strong>💰 Fintech</strong><br/>Innovation financière</div><div class='specialty-card' onclick='handleInlineClick(\"explainMarketing\")'><strong>📱 Marketing & Influence</strong><br/>Stratégies digitales</div><div class='specialty-card' onclick='handleInlineClick(\"explainAITransformation\")'><strong>🚀 IA & Transformation</strong><br/>Conduite du changement</div><div class='specialty-card' onclick='handleInlineClick(\"explainDataProtection\")'><strong>🔒 Data & Protection</strong><br/>Conformité RGPD</div><div class='specialty-card' onclick='handleInlineClick(\"explainRH\")'><strong>👥 RH Digitale</strong><br/>Expérience collaborateur</div><div class='specialty-card' onclick='handleInlineClick(\"explainSante\")'><strong>🏥 Santé, IA & IoT</strong><br/>E-santé</div><div class='specialty-card' onclick='handleInlineClick(\"explainDataScienceBI\")'><strong>📊 Data Science & BI</strong><br/>Aide à la décision</div><div class='specialty-card' onclick='handleInlineClick(\"explainLuxe\")'><strong>💎 Luxe & Retail Tech</strong><br/>Expérience client</div></div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Voir spé Tech</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Aide au choix</button><button class='inline-btn' onclick='handleInlineClick(\"compare_specialties\")'>⚖️ Comparer</button></div>"
      ],
      options: []
    },

    // --- ENHANCED RECOMMENDATIONS ---
    recommend_cyber: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3><div class='recommendation primary'>🥇 <strong>Spécialité recommandée : Cybersécurité</strong><br/>Votre profil de protecteur numérique colle parfaitement !</div><div class='recommendation secondary'>🥈 <strong>Alternative intéressante : Data, Protection & Sécurité</strong><br/>Plus orientée conformité et gouvernance</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Découvrir Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>📋 Découvrir Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"compare_security\")'>⚖️ Comparer les deux</button></div>"
      ],
      options: []
    },

    // Enhanced specialty explanations with inline navigation
    explainCyber: {
      messages: [
        "<h3>🛡️ Cybersécurité</h3>Expert de la défense numérique contre les menaces sophistiquées.<br/><br/><div class='mini-grid'><div class='mini-card'>🔍 <strong>Pentesting</strong><br/>Tests intrusion</div><div class='mini-card'>🌐 <strong>Sécurité réseau</strong><br/>Infrastructure</div></div><div class='mini-grid'><div class='mini-card'>🔬 <strong>Forensics</strong><br/>Analyse incidents</div><div class='mini-card'>🏗️ <strong>Architecture</strong><br/>Systèmes sécurisés</div></div><div class='salary-box'>💰 <strong>Salaires :</strong> 40-75K€ selon expérience</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/cybersecurite\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"compare_with_data_protection\")'>⚖️ vs Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Autres spé</button></div>"
      ],
      options: []
    },

    explainFintech: {
      messages: [
        "<h3>💰 Fintech & Stratégies Financières</h3>Révolutionnez les services financiers avec la tech et la blockchain.<br/><br/><div class='mini-grid'><div class='mini-card'>💳 <strong>Paiements</strong><br/>APIs, blockchain</div><div class='mini-card'>⚖️ <strong>Régulation</strong><br/>DSP2, MiCA</div></div><div class='mini-grid'><div class='mini-card'>🌐 <strong>DeFi</strong><br/>Finance décentralisée</div><div class='mini-card'>📊 <strong>Stratégie</strong><br/>Produit fintech</div></div><div class='salary-box'>💰 <strong>Salaires :</strong> 45-80K€ selon expérience</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/fintech\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"fintech_trends\")'>📈 Tendances</button><button class='inline-btn' onclick='handleInlineClick(\"ai_finance\")'>🤖 IA Finance</button></div>"
      ],
      options: []
    },

    // Add remaining specialty explanations
    explainCloud: {
      messages: [
        "<h3>☁️ Cloud Computing</h3><div class='specialty-detail'>Architectez les infrastructures de demain ! Concevez et gérez des applications scalables, résilientes et performantes dans le cloud.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Plateformes cloud (AWS, Azure, GCP)<br/>• Infrastructure as Code (Terraform)<br/>• Conteneurisation (Docker, Kubernetes)<br/>• Architecture microservices</div><div class='careers-box'><strong>💼 Débouchés :</strong> Architecte Cloud (55-75K€), Ingénieur DevOps (45-65K€), Ingénieur SRE (50-70K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/cloud\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"compare_with_ai\")'>⚖️ vs IA</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Autres spé Tech</button></div>"
      ],
      options: []
    },

    explainAI: {
      messages: [
        "<h3>🧠 Intelligence Artificielle</h3>Créez des systèmes qui apprennent et imitent l'intelligence humaine.<br/><br/><div class='mini-grid'><div class='mini-card'>🔥 <strong>Deep Learning</strong><br/>PyTorch, TensorFlow</div><div class='mini-card'>💬 <strong>NLP</strong><br/>Traitement langage</div></div><div class='mini-grid'><div class='mini-card'>👁️ <strong>Computer Vision</strong><br/>Analyse d'images</div><div class='mini-card'>🚀 <strong>MLOps</strong><br/>Déploiement IA</div></div><div class='salary-box'>💰 <strong>Salaires :</strong> 45-85K€ selon expérience</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/ia\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"ai_vs_data\")'>⚖️ vs Data Science</button><button class='inline-btn' onclick='handleInlineClick(\"ai_use_cases\")'>💡 Cas d'usage</button></div>"
      ],
      options: []
    },

    explainBigData: {
      messages: [
        "<h3>📊 Big Data & Analytics</h3><div class='specialty-detail'>Domptez les données massives ! Gérez et analysez des volumes de données gigantesques pour en extraire des insights stratégiques.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Écosystème Hadoop & Spark<br/>• Architectures Data (Data Lake, Warehouse)<br/>• Pipelines de données (ETL/ELT)<br/>• Technologies NoSQL</div><div class='careers-box'><strong>💼 Débouchés :</strong> Data Engineer (45-60K€), Architecte Big Data (55-75K€), Data Platform Engineer (50-70K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/bigdata\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"bigdata_vs_bi\")'>⚖️ vs Data Science BI</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Autres spé Tech</button></div>"
      ],
      options: []
    },

    explainIoT: {
      messages: [
        "<h3>📡 Internet of Things</h3><div class='specialty-detail'>Connectez le monde physique au digital ! Concevez des solutions complètes, du capteur embarqué à la plateforme cloud.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Électronique et systèmes embarqués<br/>• Réseaux basse consommation (LoRaWAN, Sigfox)<br/>• Architectures IoT<br/>• Edge Computing</div><div class='careers-box'><strong>💼 Débouchés :</strong> Ingénieur IoT (45-65K€), Architecte de solutions IoT (55-75K€), Développeur embarqué (40-60K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/iot\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"iot_sectors\")'>🏭 Secteurs d'application</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Autres spé Tech</button></div>"
      ],
      options: []
    },

    explainVR: {
      messages: [
        "<h3>🥽 Réalité Virtuelle & Augmentée</h3><div class='specialty-detail'>Créez de nouvelles réalités ! Développez des expériences immersives qui transforment notre manière d'interagir avec l'information.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Développement 3D (Unity, Unreal Engine)<br/>• Design d'interaction spatiale (UX/UI)<br/>• Optimisation temps réel<br/>• Technologies XR (AR/VR/MR)</div><div class='careers-box'><strong>💼 Débouchés :</strong> Développeur XR (45-65K€), UX Designer 3D (40-60K€), Artiste technique 3D (35-55K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/vrar\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"vr_applications\")'>🎮 Applications</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Autres spé Tech</button></div>"
      ],
      options: []
    },
    
    explainProjectManagement: {
      messages: [
        "<h3>🎯 Strategic Project Management</h3>Devenez un leader ! Pilotez des projets tech et créez des entreprises.<br/><br/><div class='mini-grid'><div class='mini-card'>⚡ <strong>Agile</strong><br/>Scrum, Kanban</div><div class='mini-card'>🚀 <strong>Lean Startup</strong><br/>Business Model</div></div><div class='mini-grid'><div class='mini-card'>👑 <strong>Leadership</strong><br/>Gestion équipe</div><div class='mini-card'>💡 <strong>Innovation</strong><br/>Entrepreneuriat</div></div><div class='salary-box'>💰 <strong>Salaires :</strong> 42-70K€ selon expérience</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/project-management\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"project_types\")'>📋 Types projets</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé</button></div>"
      ],
      options: []
    },

    explainMarketing: {
      messages: [
        "<h3>📱 Marketing Digital & Influence</h3><div class='specialty-detail'>Maîtrisez l'art de l'engagement ! Développez des stratégies digitales pour construire des marques fortes et engager des communautés.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Marketing de contenu & SEO/SEA<br/>• Gestion de campagnes d'influence<br/>• Analytics & Data marketing<br/>• Community management</div><div class='careers-box'><strong>💼 Débouchés :</strong> Digital Marketing Manager (40-55K€), Responsable Influence (35-50K€), Growth Hacker (42-60K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/marketing\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"marketing_trends\")'>📈 Tendances</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

    explainAITransformation: {
      messages: [
        "<h3>🚀 IA & Transformation des organisations</h3><div class='specialty-detail'>Orchestrez le changement ! Pilotez l'intégration stratégique de l'IA pour optimiser et réinventer les entreprises.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Stratégie IA & identification cas d'usage<br/>• Conduite du changement<br/>• Gouvernance de l'IA & éthique<br/>• Management de projet complexe</div><div class='careers-box'><strong>💼 Débouchés :</strong> Consultant transformation IA (50-70K€), Chef de Projet IA (45-65K€), Product Manager IA (50-70K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/ai-transformation\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"ai_use_cases\")'>💡 Cas d'usage</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

    explainDataProtection: {
      messages: [
        "<h3>🔒 Data, Protection & Sécurité</h3><div class='specialty-detail'>Gardien de la confiance numérique ! Garantissez la conformité et protégez les données des organisations dans un monde hyper-connecté.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Maîtrise du RGPD et réglementation<br/>• Gestion des risques & conformité<br/>• Gouvernance des données<br/>• Audit et conseil</div><div class='careers-box'><strong>💼 Débouchés :</strong> DPO (45-65K€), Consultant RGPD (42-60K€), Chef de projet cybersécurité (40-58K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/data-protection\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"compare_security\")'>⚖️ vs Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

     explainRH: {
      messages: [
        "<h3>👥 Digitalisation de la fonction RH</h3><div class='specialty-detail'>Humanisez la tech ! Transformez la gestion des ressources humaines pour améliorer l'expérience collaborateur et piloter le capital humain.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Gestion de projet SIRH<br/>• HR Analytics & Data-driven RH<br/>• Marketing RH & marque employeur<br/>• Expérience collaborateur</div><div class='careers-box'><strong>💼 Débouchés :</strong> Chef de Projet SIRH (40-55K€), HR Data Analyst (38-50K€), Responsable Expérience Collaborateur (42-58K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/rh-digitale\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"hr_tools\")'>🛠️ Outils RH</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

     explainSante: {
      messages: [
        "<h3>🏥 Santé, IA & IoT</h3><div class='specialty-detail'>Révolutionnez la santé ! Appliquez les technologies de pointe pour transformer le secteur de la santé, de la prévention au traitement.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Réglementation des données de santé<br/>• Gestion de projet en e-santé<br/>• Dispositifs médicaux connectés<br/>• Éthique et conformité santé</div><div class='careers-box'><strong>💼 Débouchés :</strong> Chef de Projet E-santé (42-60K€), Product Manager Santé (45-65K€), Consultant transformation santé (50-70K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/sante-ia-iot\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"health_innovations\")'>💊 Innovations</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

    explainDataScienceBI: {
      messages: [
        "<h3>📊 Data Science & Business Intelligence</h3><div class='specialty-detail'>Transformez les données en décisions ! Maîtrisez l'art de transformer les données brutes en insights visuels et en stratégies gagnantes.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Data Visualisation (Tableau, Power BI)<br/>• SQL & analyse de données<br/>• Machine Learning appliqué<br/>• Compréhension business</div><div class='careers-box'><strong>💼 Débouchés :</strong> Data Analyst (38-50K€), BI Analyst (40-55K€), Analytics Engineer (45-65K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/data-science-bi\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"data_tools\")'>🛠️ Outils BI</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
        ],
      options: []
    },

    explainLuxe: {
      messages: [
        "<h3>💎 Luxe & Retail Tech</h3><div class='specialty-detail'>Alliez raffinement et innovation ! Combinez technologie et connaissance du marché pour réinventer l'expérience client dans le luxe et le retail.</div><br/><div class='skills-box'><strong>🔧 Compétences clés :</strong><br/>• Expérience client omnicanale<br/>• CRM & personnalisation<br/>• Technologies immersives (AR/VR)<br/>• Connaissance des codes du luxe</div><div class='careers-box'><strong>💼 Débouchés :</strong> Chef de Projet E-commerce (40-58K€), Retail Innovation Manager (45-65K€), Client Experience Manager (42-60K€)</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"/Decouverte-pmsc/specialites/luxe-retail-tech\")'>📖 Page complète</button><button class='inline-btn' onclick='handleInlineClick(\"luxury_trends\")'>✨ Tendances luxe</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
      ],
      options: []
    },

    // Additional FAQ states
    faq_admission: {
      messages: [
        "<h3>📝 Conditions d'admission</h3><div class='faq-answer'><strong>Pour les MSc :</strong><br/>✅ Bac+3 validé (toutes filières)<br/>✅ Dossier de candidature + entretien<br/>✅ Motivation pour la tech et l'alternance<br/><br/><strong>Pour le Pré-MSc :</strong><br/>✅ Bac+2 validé<br/>✅ Même processus de sélection<br/>✅ Volonté d'évoluer vers la tech</div><br/>Autres questions ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📋 Processus détaillé</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ Retour FAQ</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Choisir ma spécialité</button></div>"
      ],
      options: []
    },

    faq_locations: {
      messages: [
        "<h3>📍 Campus disponibles</h3><div class='faq-answer'><strong>🇫🇷 En France (15 campus) :</strong><br/>Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Nantes, Rennes, Strasbourg, Nancy, Nice, Montpellier, Mulhouse, La Réunion.<br/><br/><strong>🌍 À l'international :</strong><br/>Cotonou.<br/><br/>💡 Toutes les spécialités MSc sont disponibles sur l'ensemble de nos campus.</div><br/>Besoin de plus d'infos ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ Retour FAQ</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    faq_difference: {
      messages: [
        "<h3>🔄 Différence Tech vs Business</h3><div class='comparison-box'><strong>🔧 Tech : Vous CONSTRUISEZ</strong><br/>• Expert technique poussé<br/>• Développement, architecture, innovation<br/>• Maîtrise approfondie des technologies<br/>• Exemples : Développeur IA, Architecte Cloud</div><div class='comparison-box'><strong>📈 Business : Vous PILOTEZ</strong><br/>• Manager et stratège<br/>• Gestion de projet, transformation<br/>• Vision business + tech<br/>• Exemples : Product Manager, Consultant</div><br/>Quelle approche vous correspond ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"personality_test\")'>🧠 Test rapide</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Spé Tech</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Spé Business</button></div>"
      ],
      options: []
    },

    faq_after: {
      messages: [
        "<h3>🎯 Débouchés après le MSc</h3><div class='faq-answer'><strong>💼 Types d'entreprises :</strong><br/>• Startups et scale-ups innovantes<br/>• Grandes entreprises (CAC 40)<br/>• ESN et cabinets de conseil<br/>• Secteur public et associations<br/><br/><strong>📈 Évolution de carrière :</strong><br/>• Progression rapide vers des postes de management<br/>• Possibilité d'entrepreneuriat<br/>• Salaires attractifs dès la sortie</div><br/>Intéressé par une spécialité ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"salary_details\")'>💰 Détails salaires</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Choisir ma spécialité</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ Autres questions</button></div>"
      ],
      options: []
    },

    // Admission process
    admission_process: {
      messages: [
        "<h3>📝 Processus d'admission Epitech</h3><div class='info-grid'><div class='info-item'><strong>1️⃣ Candidature</strong><br/>Dossier en ligne<br/>CV + Lettre motivation</div><div class='info-item'><strong>2️⃣ Sélection</strong><br/>Étude du dossier<br/>Tests éventuels</div><div class='info-item'><strong>3️⃣ Entretien</strong><br/>Échange avec l'équipe<br/>Projet professionnel</div></div><div class='highlight-box'>💡 <strong>Conseil :</strong> Vous pouvez candidater même sans avoir trouvé votre entreprise d'alternance. Nous vous accompagnons dans votre recherche !</div><br/>Prêt à candidater ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"navigate\", \"https://epitech.my.site.com/candidature/s/login/SelfRegister?language=fr\")'>🚀 Candidater maintenant</button><button class='inline-btn' onclick='handleInlineClick(\"company_search\")'>🏢 Aide recherche entreprise</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Finaliser mon choix</button></div>"
      ],
      options: []
    },

    company_search: {
      messages: [
        "<h3>🏢 Trouver votre entreprise d'alternance</h3><div class='alternance-benefits'><strong>🤝 Notre accompagnement :</strong><br/>• +2000 entreprises partenaires<br/>• Ateliers CV et préparation entretiens<br/>• Job dating et événements recrutement<br/>• Suivi personnalisé par nos équipes</div><div class='info-grid'><div class='info-item'><strong>🚀 Startups</strong><br/>Innovation<br/>Polyvalence</div><div class='info-item'><strong>🏢 Grandes entreprises</strong><br/>Projets d'envergure<br/>Processus structurés</div><div class='info-item'><strong>💼 ESN/Conseil</strong><br/>Diversité missions<br/>Montée en compétences</div></div><br/>Quel type d'entreprise vous attire ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"company_types\")'>🎯 Découvrir les types</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button><button class='inline-btn' onclick='handleInlineClick(\"practical_info\")'>ℹ️ Retour infos pratiques</button></div>"
      ],
      options: []
    },

    // Comparison features
    compare_security: {
      messages: [
        "<h3>⚖️ Cybersécurité vs Data Protection</h3><div class='comparison-box'><strong>🛡️ Cybersécurité</strong><br/>• Technique et opérationnelle<br/>• Pentesting, forensics, SOC<br/>• Protection technique des systèmes<br/>• Profil : Hacker éthique</div><div class='comparison-box'><strong>📋 Data Protection</strong><br/>• Juridique et managériale<br/>• RGPD, conformité, gouvernance<br/>• Protection des données personnelles<br/>• Profil : Consultant/DPO</div><br/>Les deux vous intéressent ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"security_hybrid_path\")'>🔀 Approche hybride</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Plus sur Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>📋 Plus sur Data Protection</button></div>"
      ],
      options: []
    },

    // Enhanced recommendations with multiple options  
    recommend_ai_multiple: {
      messages: [
        "<h3>🎯 Recommandations IA personnalisées</h3><div class='recommendation primary'>🥇 <strong>Intelligence Artificielle</strong> - Pour créer des algorithmes révolutionnaires</div><div class='recommendation secondary'>🥈 <strong>IA & Transformation organisations</strong> - Pour piloter l'adoption de l'IA en entreprise</div><div class='recommendation tertiary'>🥉 <strong>Data Science & BI</strong> - Pour appliquer l'IA à la prise de décision</div><br/>Quelle facette de l'IA vous attire le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 IA technique</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 IA stratégique</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 IA décisionnelle</button></div>"
      ],
      options: []
    },

    // Personality test results
    personality_analyze: {
      messages: [
        "🔍 <strong>Profil Analyste :</strong> Vous aimez comprendre en profondeur !<br/>Votre approche méthodique vous orienterait parfaitement vers les spécialités techniques qui demandent de la rigueur et de l'expertise.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Découvrir spé Tech</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Intelligence Artificielle</button></div>"
      ],
      options: []
    },

    personality_strategy: {
      messages: [
        "📋 <strong>Profil Stratège :</strong> Vous voyez grand et planifiez !<br/>Votre vision globale vous dirigerait naturellement vers les spécialités qui allient tech et business pour transformer les organisations.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Découvrir spé Business</button><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>🎯 Project Management</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 IA & Transformation</button></div>"
      ],
      options: []
    },

    personality_team: {
      messages: [
        "👥 <strong>Profil Collaboratif :</strong> Vous excellez en équipe !<br/>Votre esprit d'équipe vous orienterait vers des spécialités où la collaboration et le management sont au cœur du métier.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>🎯 Project Management</button><button class='inline-btn' onclick='handleInlineClick(\"explainRH\")'>👥 RH Digitale</button><button class='inline-btn' onclick='handleInlineClick(\"explainMarketing\")'>📱 Marketing & Influence</button></div>"
      ],
      options: []
    },

    help_q_tech_ai_data: {
      messages: [
        "<h3>🤖 Solutions Data & IA</h3>Le domaine de la donnée est passionnant ! Vous préférez :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Créer les modèles d'IA</button><button class='inline-btn' onclick='handleInlineClick(\"explainBigData\")'>🗄️ Construire les pipelines de données massives</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📈 Analyser la donnée pour la décision</button></div>"
      ],
      options: []
    },

    help_q_business_industry: {
      messages: [
        "<h3>🚀 Transformer les Secteurs</h3>Quel secteur souhaitez-vous réinventer grâce à la technologie ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_fintech\")'>💰 La Finance (Fintech)</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_sante\")'>🏥 La Santé (Health Tech)</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_luxe\")'>💎 Le Luxe & Retail</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_marketing\")'>📱 Le Marketing & Média</button></div>"
      ],
      options: []
    },
    
    help_q_business_internal: {
      messages: [
        "<h3>⚙️ Optimiser les Organisations</h3>Très bonne approche ! Quel levier de performance interne vous intéresse le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_project\")'>🎯 Le pilotage de projets stratégiques</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_ai_transfo\")'>🚀 L'intégration de l'IA</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_rh\")'>👥 La digitalisation des RH</button></div>"
      ],
      options: []
    },
    
    help_q_business_data: {
      messages: [
        "<h3>📊 Stratégie par la Data</h3>La data est un levier puissant. Quelle est votre priorité ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_ds_bi\")'>📈 Créer des dashboards pour guider la prise de décision.</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_data_protection\")'>📋 Garantir la sécurité et la conformité (RGPD, etc.).</button></div>"
      ],
      options: []
    },
    
    help_q_tech: {
        messages: [
            "<h3>🔧 Exploration Technique</h3>Parfait ! Le monde de l'expertise technique est vaste. Qu'est-ce qui vous attire le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Construire des forteresses numériques</button><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Créer des intelligences artificielles</button><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Bâtir l'infrastructure du futur</button></div>"
        ],
        options: []
    },

    help_q_business: {
        messages: [
            "<h3>📈 Vers le Management</h3>Excellent choix ! Votre profil technique est un atout majeur pour piloter des projets et des équipes. Nos spécialités 'Digital, Business & Management' sont conçues pour vous.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>Découvrir les spécialités Business</button><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>Focus sur le Management de Projet</button></div>"
        ],
        options: []
    },

    // Additional trend and detail states
    fintech_trends: {
      messages: [
        "<h3>📈 Tendances Fintech 2024</h3><div class='highlight-box'>🚀 <strong>Tendances majeures :</strong><br/>• IA générative pour l'aide à la décision financière<br/>• Finance décentralisée (DeFi) et stablecoins<br/>• Banque intégrée (Embedded Finance)<br/>• RegTech et automatisation compliance<br/>• Néo-banques spécialisées (B2B, niches)</div><br/>Une tendance vous passionne ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Retour Fintech</button><button class='inline-btn' onclick='handleInlineClick(\"ai_finance\")'>🤖 IA en finance</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Autres spé Business</button></div>"
      ],
      options: []
    },

    // Back navigation helper
    after_navigate: {
      messages: [
        "J'ai ouvert la page pour vous ! 📖<br/>Que souhaitez-vous faire maintenant ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Découvrir d'autres spé</button><button class='inline-btn' onclick='handleInlineClick(\"practical_info\")'>ℹ️ Infos pratiques</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>�� Candidater</button><button class='inline-btn' onclick='handleInlineClick(\"initial\")'>🏠 Retour accueil</button><button class='inline-btn' onclick='handleInlineClick(\"faq\")'>❓ FAQ</button></div>"
      ],
      options: []
    },

    goodbye: {
      messages: [
        "Parfait ! J'espère avoir pu vous aider dans votre réflexion. 😊<br/>N'hésitez pas à revenir me voir si vous avez d'autres questions !<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>🚀 Candidater maintenant</button><button class='inline-btn' onclick='handleInlineClick(\"initial\")'>🔄 Nouvelle conversation</button></div>"
      ],
      options: []
    },

    // Missing states for enhanced functionality
    goal_specialization: {
      messages: [
        "Excellente motivation ! Avec votre niveau, vous pouvez viser une expertise pointue.<br/>Quel domaine technique vous passionne le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Intelligence Artificielle</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Cloud Computing</button><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Voir toutes les spé Tech</button></div>"
      ],
      options: []
    },

    goal_career_change: {
      messages: [
        "Reconversion réussie en vue ! La tech offre d'excellentes opportunités de transition.<br/>Préférez-vous une approche :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Technique pure</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Business & Management</button><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>🤔 Découvrir les différences</button></div>"
      ],
      options: []
    },

    goal_leadership: {
      messages: [
        "Parfait ! Le leadership tech est très recherché. Nos spécialités Digital, Business & Management sont idéales pour développer ces compétences.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>🎯 Strategic Project Management</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 IA & Transformation</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Toutes les spé Business</button></div>"
      ],
      options: []
    },

    motivation_tech: {
      messages: [
        "Excellente orientation ! Votre background unique apportera une perspective précieuse aux équipes tech. Quel aspect technique vous attire le plus ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Créer de l'intelligence artificielle</button><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Architecturer le cloud</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Protéger les systèmes</button></div>"
      ],
      options: []
    },

    motivation_impact: {
      messages: [
        "Formidable ! Créer de l'impact business avec la tech est passionnant. Dans quel secteur souhaitez-vous faire la différence ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"recommend_fintech\")'>💰 Finance</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_sante\")'>🏥 Santé</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_luxe\")'>💎 Luxe & Retail</button></div><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Voir toutes les spé Business</button></div>"
      ],
      options: []
    },

    motivation_hybrid: {
      messages: [
        "Approche très équilibrée ! Vous pourrez évoluer entre technique et business. Je vous recommande de commencer par découvrir les deux familles :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>🔄 Tech vs Business</button><button class='inline-btn' onclick='handleInlineClick(\"personality_test\")'>🧠 Test de personnalité</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Questionnaire d'orientation</button></div>"
      ],
      options: []
    },

    data_application_choice: {
      messages: [
        "Smart ! Choisir par secteur d'application est une excellente approche. Quel secteur vous passionne ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainSante\")'>🏥 Santé (IA médicale)</button><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Finance (Fintech)</button><button class='inline-btn' onclick='handleInlineClick(\"explainLuxe\")'>💎 Retail & Luxe</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Business Intelligence</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 Transformation entreprises</button></div>"
      ],
      options: []
    },

    // Additional missing recommendation states
    recommend_vrar: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Réalité Virtuelle & Augmentée</strong><br/>Parfait pour créer des mondes immersifs !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> Internet of Things - Pour connecter le monde physique</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainVR\")'>🥽 Découvrir VR/AR</button><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Découvrir IoT</button><button class='inline-btn' onclick='handleInlineClick(\"vr_applications\")'>🎮 Applications VR/AR</button></div>"
      ],
      options: []
    },

    recommend_iot: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Internet of Things</strong><br/>Idéal pour connecter le monde physique au digital !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> Cloud Computing - Pour l'infrastructure IoT</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Découvrir IoT</button><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Découvrir Cloud</button><button class='inline-btn' onclick='handleInlineClick(\"iot_sectors\")'>🏭 Secteurs IoT</button></div>"
      ],
      options: []
    },

    recommend_ai: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Intelligence Artificielle</strong><br/>Parfait pour créer des algorithmes intelligents !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternatives :</strong> Big Data & Analytics ou IA & Transformation</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Découvrir IA</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_ai_multiple\")'>🎯 Voir toutes les options IA</button><button class='inline-btn' onclick='handleInlineClick(\"ai_vs_data\")'>⚖️ IA vs Data Science</button></div>"
      ],
      options: []
    },

    recommend_bigdata: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Big Data & Analytics</strong><br/>Idéal pour dompter les données massives !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> Data Science & BI - Plus orienté business</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainBigData\")'>📊 Découvrir Big Data</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📈 Découvrir Data Science BI</button><button class='inline-btn' onclick='handleInlineClick(\"bigdata_vs_bi\")'>⚖️ Comparer</button></div>"
      ],
      options: []
    },

    recommend_cloud: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Cloud Computing</strong><br/>Parfait pour bâtir les infrastructures du futur !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> Cybersécurité - Pour sécuriser le cloud</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Découvrir Cloud</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Découvrir Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"cloud_trends\")'>📈 Tendances Cloud</button></div>"
      ],
      options: []
    },

    // Business specialties recommendations
    recommend_ds_bi: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Data Science & Business Intelligence</strong><br/>Parfait pour transformer la data en décisions !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> IA & Transformation - Pour piloter l'IA en entreprise</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Découvrir Data Science BI</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 Découvrir IA & Transformation</button><button class='inline-btn' onclick='handleInlineClick(\"data_tools\")'>🛠️ Outils BI</button></div>"
      ],
      options: []
    },

    recommend_data_protection: {
      messages: [
        "<h3>🎯 Recommandation personnalisée</h3>",
        "<div class='recommendation primary'>🥇 <strong>Data, Protection & Sécurité</strong><br/>Idéal pour devenir gardien de la confiance numérique !</div>",
        "<div class='recommendation secondary'>🥈 <strong>Alternative :</strong> Cybersécurité - Plus technique</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>🔒 Découvrir Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"compare_security\")'>⚖️ vs Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"rgpd_details\")'>📋 Focus RGPD</button></div>"
      ],
      options: []
    },

    // Additional detail states that were missing
    vr_applications: {
      messages: [
        "<h3>🎮 Applications VR/AR</h3>Découvrez les secteurs où la VR/AR révolutionne l'expérience :<br/><div class='mini-grid'><div class='mini-card'>🎯 <strong>Formation</strong><br/>Simulations immersives</div><div class='mini-card'>🏥 <strong>Santé</strong><br/>Chirurgie assistée</div></div><div class='mini-grid'><div class='mini-card'>🎮 <strong>Gaming</strong><br/>Jeux immersifs</div><div class='mini-card'>🛍️ <strong>Retail</strong><br/>Essayage virtuel</div></div>Un secteur vous intéresse ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainVR\")'>🥽 Retour VR/AR</button><button class='inline-btn' onclick='handleInlineClick(\"explainSante\")'>🏥 VR en santé</button><button class='inline-btn' onclick='handleInlineClick(\"explainLuxe\")'>🛍️ VR en retail</button></div>"
      ],
      options: []
    },

    iot_sectors: {
      messages: [
        "<h3>🏭 IoT par secteur</h3>L'IoT transforme tous les secteurs :<br/><div class='mini-grid'><div class='mini-card'>🏠 <strong>Smart Home</strong><br/>Domotique connectée</div><div class='mini-card'>🏙️ <strong>Smart City</strong><br/>Ville intelligente</div></div><div class='mini-grid'><div class='mini-card'>🏥 <strong>Santé</strong><br/>Dispositifs médicaux</div><div class='mini-card'>🌾 <strong>Agriculture</strong><br/>Agriculture de précision</div></div>Un secteur vous passionne ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Retour IoT</button><button class='inline-btn' onclick='handleInlineClick(\"explainSante\")'>🏥 IoT en santé</button><button class='inline-btn' onclick='handleInlineClick(\"smart_city_details\")'>🏙️ Smart Cities</button></div>"
      ],
      options: []
    },

    // Company and practical details
    company_types: {
      messages: [
        "<h3>🏢 Types d'entreprises</h3>Nos +2000 partenaires couvrent tous les profils :<br/><div class='company-type'><strong>🚀 Startups</strong><br/>Innovation, agilité, polyvalence</div><div class='company-type'><strong>🏢 Grandes entreprises</strong><br/>Projets d'envergure, formation structurée</div>Quel environnement vous attire ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"startup_details\")'>🚀 Pourquoi startup</button><button class='inline-btn' onclick='handleInlineClick(\"corporate_details\")'>🏢 Avantages grandes entreprises</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    startup_details: {
      messages: [
        "<h3>🚀 Pourquoi choisir une startup ?</h3><div class='pro-con-box'>✅ <strong>Avantages :</strong><br/>• Responsabilités rapidement<br/>• Innovation constante<br/>• Équipes resserrées<br/>• Impact direct visible</div><div class='pro-con-box warning'>⚠️ <strong>À considérer :</strong><br/>• Rythme intense<br/>• Moins de structure<br/>• Salaires parfois plus bas<br/>• Incertitude croissance</div><br/>Toujours intéressé ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"company_types\")'>🔄 Comparer types</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    corporate_details: {
      messages: [
        "<h3>🏢 Pourquoi une grande entreprise ?</h3><div class='pro-con-box'>✅ <strong>Avantages :</strong><br/>• Formation approfondie<br/>• Évolution claire<br/>• Projets internationaux<br/>• Sécurité de l'emploi</div><div class='pro-con-box warning'>⚠️ <strong>À considérer :</strong><br/>• Processus plus lents<br/>• Hiérarchie importante<br/>• Moins de polyvalence<br/>• Innovation parfois limitée</div><br/>Toujours intéressé ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"company_types\")'>🔄 Comparer types</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    salary_details: {
      messages: [
        "<h3>💰 Grilles de salaires MSc</h3><div class='salary-box'>🎯 <strong>Sortie formation :</strong><br/>Tech : 38-55K€ | Business : 35-50K€</div><div class='salary-box'>📈 <strong>Après 3-5 ans :</strong><br/>Tech : 50-75K€ | Business : 45-70K€</div><div class='tip-box'>💡 Les alternants sont souvent embauchés par leur entreprise d'accueil !</div><br/>Motivé ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Choisir ma spécialité</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>🚀 Candidater</button></div>"
      ],
      options: []
    },

    // Additional comparison and trend states
    ai_vs_data: {
      messages: [
        "<h3>⚖️ IA vs Data Science</h3><div class='vs-card'>🧠 <strong>Intelligence Artificielle</strong><br/>Créer des algorithmes qui apprennent</div><div class='vs-card'>📊 <strong>Data Science & BI</strong><br/>Analyser des données pour décider</div><br/>Les deux vous intéressent ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Plus sur IA</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Plus sur Data Science</button><button class='inline-btn' onclick='handleInlineClick(\"recommend_ai_multiple\")'>🎯 Voir toutes options IA</button></div>"
      ],
      options: []
    },

    bigdata_vs_bi: {
      messages: [
        "<h3>⚖️ Big Data vs BI</h3><div class='vs-card'>📊 <strong>Big Data</strong><br/>Gérer des volumes massifs de données</div><div class='vs-card'>📈 <strong>Business Intelligence</strong><br/>Créer des tableaux de bord décisionnels</div><br/>Votre préférence ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainBigData\")'>📊 Plus sur Big Data</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📈 Plus sur BI</button></div>"
      ],
      options: []
    },

    cloud_trends: {
      messages: [
        "<h3>📈 Tendances Cloud 2024</h3><div class='trend-item'>☁️ <strong>Multi-cloud</strong> - Éviter la dépendance</div><div class='trend-item'>🤖 <strong>IA dans le cloud</strong> - Services ML intégrés</div><div class='trend-item'>🔒 <strong>Zero Trust</strong> - Sécurité renforcée</div><br/>Une tendance vous intéresse ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Retour Cloud</button><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🔒 Sécurité Cloud</button></div>"
      ],
      options: []
    },

    data_tools: {
      messages: [
        "<h3>🛠️ Outils Data Science & BI</h3>",
        "<div class='tool-category'><strong>📊 Visualisation :</strong><br/>Tableau, Power BI, Looker</div>",
        "<div class='tool-category'><strong>🐍 Langages :</strong><br/>Python, R, SQL</div>",
        "<div class='tool-category'><strong>☁️ Plateformes :</strong><br/>Snowflake, BigQuery, Databricks</div>",
        "Envie d'apprendre ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Retour Data Science BI</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>🚀 Candidater</button></div>"
      ],
      options: []
    },

    hr_tools: {
      messages: [
        "<h3>🛠️ Outils RH Digitale</h3>",
        "<div class='tool-category'><strong>🏢 SIRH :</strong><br/>Workday, SuccessFactors</div>",
        "<div class='tool-category'><strong>📊 Analytics RH :</strong><br/>Tableau RH, People Analytics</div>",
        "<div class='tool-category'><strong>🎯 Recrutement :</strong><br/>ATS, IA de matching</div>",
        "Curieux d'en savoir plus ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainRH\")'>👥 Retour RH Digitale</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>🚀 Candidater</button></div>"
      ],
      options: []
    },

    rgpd_details: {
      messages: [
        "<h3>📋 Focus RGPD</h3>",
        "<div class='rgpd-point'>⚖️ <strong>Conformité légale</strong><br/>Respecter la réglementation européenne</div>",
        "<div class='rgpd-point'>🛡️ <strong>Protection données</strong><br/>Sécuriser les informations personnelles</div>",
        "<div class='rgpd-point'>👤 <strong>Droits utilisateurs</strong><br/>Portabilité, oubli, rectification</div>",
        "Le RGPD vous intéresse ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>🔒 Retour Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    // Additional missing states
    marketing_trends: {
      messages: [
        "<h3>📈 Tendances Marketing Digital</h3>",
        "<div class='trend-item'>🤖 <strong>IA générative</strong> - Contenu automatisé</div>",
        "<div class='trend-item'>🎥 <strong>Vidéo courte</strong> - TikTok, Instagram Reels</div>",
        "<div class='trend-item'>🛍️ <strong>Social Commerce</strong> - Achat direct sur réseaux</div>",
        "Une tendance vous passionne ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainMarketing\")'>📱 Retour Marketing</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    luxury_trends: {
      messages: [
        "<h3>✨ Tendances Luxe & Retail</h3>",
        "<div class='trend-item'>🥽 <strong>AR/VR</strong> - Essayage virtuel</div>",
        "<div class='trend-item'>🌱 <strong>Luxe durable</strong> - Consommation responsable</div>",
        "<div class='trend-item'>📱 <strong>Personnalisation</strong> - Expérience sur-mesure</div>",
        "Intéressé par le luxe tech ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainLuxe\")'>💎 Retour Luxe & Retail</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    health_innovations: {
      messages: [
        "<h3>💊 Innovations Santé & Tech</h3>",
        "<div class='health-innovation'>🤖 <strong>IA diagnostique</strong><br/>Aide au diagnostic médical</div>",
        "<div class='health-innovation'>📱 <strong>Télémédecine</strong><br/>Consultations à distance</div>",
        "<div class='health-innovation'>⌚ <strong>Objets connectés</strong><br/>Suivi temps réel des patients</div>",
        "Une innovation vous fascine ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainSante\")'>🏥 Retour Santé IA & IoT</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    project_types: {
      messages: [
        "<h3>📋 Types de projets</h3>",
        "<div class='project-type'>🚀 <strong>Startup</strong><br/>Lancement produit, levée de fonds</div>",
        "<div class='project-type'>🏢 <strong>Transformation</strong><br/>Digitalisation d'entreprise</div>",
        "<div class='project-type'>🌍 <strong>International</strong><br/>Déploiement multi-pays</div>",
        "Un type de projet vous attire ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>🎯 Retour Project Management</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    ai_use_cases: {
      messages: [
        "<h3>💡 Cas d'usage IA en entreprise</h3>",
        "<div class='use-case'>🤖 <strong>Automatisation</strong><br/>Processus répétitifs</div>",
        "<div class='use-case'>🔍 <strong>Prédiction</strong><br/>Anticipation des tendances</div>",
        "<div class='use-case'>💬 <strong>Chatbots</strong><br/>Service client intelligent</div>",
        "Un cas d'usage vous intéresse ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 Retour IA & Transformation</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    ai_finance: {
      messages: [
        "<h3>🤖 IA en Finance</h3><div class='ai-finance-use'>📊 <strong>Trading algorithmique</strong><br/>Décisions automatisées</div><div class='ai-finance-use'>🔍 <strong>Détection fraude</strong><br/>Analyse comportementale</div><div class='ai-finance-use'>💳 <strong>Scoring crédit</strong><br/>Évaluation risque client</div><br/>L'IA financière vous passionne ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Retour Fintech</button><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 IA technique</button></div>"
      ],
      options: []
    },

    campus_details: {
      // This state is now obsolete and will be removed.
    },

    smart_city_details: {
      messages: [
        "<h3>🏙️ Smart Cities & IoT</h3>",
        "<div class='smart-city-feature'>💡 <strong>Éclairage intelligent</strong><br/>Adaptation automatique</div>",
        "<div class='smart-city-feature'>🚦 <strong>Trafic optimisé</strong><br/>Feux connectés</div>",
        "<div class='smart-city-feature'>♻️ <strong>Gestion déchets</strong><br/>Collecte optimisée</div>",
        "Les smart cities vous intéressent ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Retour IoT</button><button class='inline-btn' onclick='handleInlineClick(\"admission_process\")'>📝 Candidater</button></div>"
      ],
      options: []
    },

    security_hybrid_path: {
      messages: [
        "<h3>🔀 Approche hybride sécurité</h3>",
        "Excellente idée ! Les deux compétences sont complémentaires.",
        "<div class='hybrid-approach'>🛡️+📋 <strong>Profil recherché :</strong><br/>Expert technique ET conformité</div>",
        "<div class='tip-box'>💡 Commencez par une spé, puis spécialisez-vous dans l'autre !</div>",
        "Par laquelle commencer ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Cybersécurité d'abord</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>📋 Data Protection d'abord</button></div>"
      ],
      options: []
    },

    compare_with_data_protection: {
      messages: [
        "<h3>⚖️ Cybersécurité vs Data Protection</h3>",
        "Même objectif, approches différentes :",
        "<div class='comparison-mini'>🛡️ <strong>Cyber :</strong> Technique, pentesting, SOC</div>",
        "<div class='comparison-mini'>📋 <strong>Data Protection :</strong> Juridique, RGPD, gouvernance</div>",
        "Votre choix ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>📋 Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"security_hybrid_path\")'>🔀 Les deux</button></div>"
      ],
      options: []
    },

    compare_with_ai: {
      messages: [
        "<h3>⚖️ Cloud vs IA</h3>",
        "Deux piliers de la tech moderne :",
        "<div class='comparison-mini'>☁️ <strong>Cloud :</strong> Infrastructure, scalabilité</div>",
        "<div class='comparison-mini'>🧠 <strong>IA :</strong> Algorithmes, intelligence</div>",
        "Votre préférence ? <div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Cloud Computing</button><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Intelligence Artificielle</button></div>"
      ],
      options: []
    },

    compare_specialties: {
      messages: [
        "<h3>⚖️ Comparateur de spécialités</h3>Outil de comparaison rapide :<br/><div class='inline-buttons'><button class='inline-btn' data-action='ai_vs_data'>🧠 IA vs Data Science</button><button class='inline-btn' data-action='bigdata_vs_bi'>📊 Big Data vs BI</button><button class='inline-btn' data-action='compare_security'>🛡️ Cyber vs Data Protection</button></div><div class='inline-buttons'><button class='inline-btn' data-action='categorizeSpecialties'>🔄 Tech vs Business</button><button class='inline-btn' data-action='help_q1'>🎯 Aide au choix</button></div>"
      ],
      options: []
    },

    // Additional missing comprehensive states
    explainSpecialties: {
      messages: [
        "<h3>📋 Nos 15 spécialités MSc</h3>Chacune est une porte d'entrée vers un domaine d'avenir.<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Spécialités Tech (6)</button><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Spécialités Business (9)</button></div><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>🔄 Tech vs Business</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Aide au choix</button></div>"
      ],
      options: []
    },

    listTechSpecialties: {
      messages: [
        "<h3>🔧 Spécialités Tech (6)</h3>Les formations techniques les plus demandées :<br/><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainCyber\")'><strong>🛡️ Cybersécurité</strong><br/>Protection systèmes</div><div class='mini-card' onclick='handleInlineClick(\"explainCloud\")'><strong>☁️ Cloud Computing</strong><br/>Infrastructures</div></div><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainAI\")'><strong>🧠 Intelligence Artificielle</strong><br/>Algorithmes intelligents</div><div class='mini-card' onclick='handleInlineClick(\"explainBigData\")'><strong>📊 Big Data & Analytics</strong><br/>Données massives</div></div><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainIoT\")'><strong>📡 Internet of Things</strong><br/>Objets connectés</div><div class='mini-card' onclick='handleInlineClick(\"explainVR\")'><strong>🥽 VR & AR</strong><br/>Réalités immersives</div></div><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listBusinessSpecialties\")'>📈 Spécialités Business</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Aide au choix</button></div>"
      ],
      options: []
    },

    listBusinessSpecialties: {
      messages: [
        "<h3>📈 Spécialités Business & Management (9)</h3>Les spécialisations alliant tech et business :<br/><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainProjectManagement\")'><strong>🎯 Project Management</strong><br/>Leadership & entrepreneuriat</div><div class='mini-card' onclick='handleInlineClick(\"explainFintech\")'><strong>💰 Fintech</strong><br/>Innovation financière</div></div><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainMarketing\")'><strong>📱 Marketing Digital</strong><br/>Influence & e-commerce</div><div class='mini-card' onclick='handleInlineClick(\"explainAITransformation\")'><strong>🚀 IA & Transformation</strong><br/>Conduite changement</div></div><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainDataProtection\")'><strong>🔒 Data Protection</strong><br/>Conformité RGPD</div><div class='mini-card' onclick='handleInlineClick(\"explainRH\")'><strong>👥 RH Digitale</strong><br/>Expérience collaborateur</div></div>Plus de spécialités business :<br/><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainSante\")'><strong>🏥 Santé, IA & IoT</strong><br/>E-santé</div><div class='mini-card' onclick='handleInlineClick(\"explainDataScienceBI\")'><strong>📊 Data Science & BI</strong><br/>Aide à la décision</div></div><div class='mini-grid'><div class='mini-card' onclick='handleInlineClick(\"explainLuxe\")'><strong>💎 Luxe & Retail Tech</strong><br/>Expérience client</div></div><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"listTechSpecialties\")'>🔧 Spécialités Tech</button><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Aide au choix</button></div>"
      ],
      options: []
    },

    fintech_trends: {
      messages: [
        "<h3>📈 Tendances Fintech 2024</h3>",
        "<div class='trend-item'>₿ <strong>Crypto & DeFi</strong> - Finance décentralisée en plein essor</div>",
        "<div class='trend-item'>📱 <strong>Super apps</strong> - Tout en une application</div>",
        "<div class='trend-item'>🤖 <strong>IA en finance</strong> - Trading algorithmique et conseil robo</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Retour Fintech</button><button class='inline-btn' onclick='handleInlineClick(\"ai_finance\")'>🤖 IA en Finance</button></div>"
      ],
      options: []
    },

    recommend_ai_multiple: {
      messages: [
        "<h3>🎯 Toutes les options IA</h3>",
        "Plusieurs spécialités pour explorer l'IA :",
        "<div class='comparison-mini'>🧠 <strong>Intelligence Artificielle</strong> - Technique pure</div>",
        "<div class='comparison-mini'>🚀 <strong>IA & Transformation</strong> - Business orientation</div>",
        "<div class='comparison-mini'>📊 <strong>Data Science & BI</strong> - IA appliquée aux données</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 IA Technique</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 IA Business</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Data Science</button></div>"
      ],
      options: []
    },

    compare_security: {
      messages: [
        "<h3>🔒 Sécurité : 2 approches</h3>",
        "Même objectif, moyens différents :",
        "<div class='comparison-mini'>🛡️ <strong>Cybersécurité</strong> - Technique, pentesting, SOC</div>",
        "<div class='comparison-mini'>📋 <strong>Data Protection</strong> - Juridique, RGPD, gouvernance</div>",
        "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>🛡️ Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>📋 Data Protection</button><button class='inline-btn' onclick='handleInlineClick(\"security_hybrid_path\")'>🔀 Approche hybride</button></div>"
      ],
      options: []
    },

    // --- NEW PERSONALITY QUIZ FLOW ---
    personality_test: {
      messages: [
        "<h3>🧠 Test de Personnalité Tech</h3>Commençons ! Ce test en 5 questions va nous aider à révéler votre profil.<br/>Prêt(e) ?<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleQuizClick(\"pt_q1\", {})'>🚀 C'est parti !</button></div>"
      ],
      options: []
    },

    pt_q1: {
      messages: [
        "<h4>Question 1/5</h4><p>Votre super-pouvoir rêvé serait de :</p><div class='inline-buttons'><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q2\", {analyst: 2, innovator: 1})'>🔮 Prévoir le futur avec précision</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q2\", {protector: 2})'>🛡️ Construire des forteresses imprenables</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q2\", {strategist: 2})'>🧠 Organiser et mener n'importe quel groupe</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q2\", {architect: 2, innovator: 1})'>🌍 Bâtir des mondes à partir de rien</button></div>"
      ],
      options: []
    },

    pt_q2: {
      messages: [
        "<h4>Question 2/5</h4><p>Un projet est une vraie réussite si :</p><div class='inline-buttons'><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q3\", {protector: 2})'>🔒 Il est parfaitement sécurisé et fiable</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q3\", {strategist: 2})'>📅 Il est livré à temps et dans le budget</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q3\", {architect: 2, innovator: 1})'>💡 Il est techniquement élégant et innovant</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q3\", {analyst: 2, catalyst: 2})'>📈 Son impact sur les utilisateurs est positif</button></div>"
      ],
      options: []
    },

    pt_q3: {
      messages: [
        "<h4>Question 3/5</h4><p>Face à une nouvelle technologie, votre premier réflexe est de :</p><div class='inline-buttons'><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q4\", {architect: 2})'>🔧 La démonter pour comprendre comment elle marche</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q4\", {catalyst: 2, innovator: 1})'>🚀 Imaginer comment elle peut changer le monde</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q4\", {protector: 2})'> Hacker ses failles de sécurité</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q4\", {analyst: 2})'>📊 Analyser les données qu'elle produit</button></div>"
      ],
      options: []
    },

    pt_q4: {
      messages: [
        "<h4>Question 4/5</h4><p>La phrase qui vous décrit le mieux :</p><div class='inline-buttons'><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q5\", {strategist: 2})'>\"J'aime quand un plan se déroule sans accroc.\"</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q5\", {innovator: 2, catalyst: 1})'>\"Je veux créer des choses qui n'ont jamais été faites.\"</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q5\", {architect: 2})'>\"Je trouve la beauté dans l'organisation de systèmes complexes.\"</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_q5\", {protector: 2})'>\"Mon but : laisser le système plus sûr que je ne l'ai trouvé.\"</button></div>"
      ],
      options: []
    },

    pt_q5: {
      messages: [
        "<h4>Question 5/5</h4><p>Le secteur le plus passionnant à transformer selon vous :</p><div class='inline-buttons'><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_results\", {strategist: 1, analyst: 1})'>💰 La Finance ou la Santé</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_results\", {architect: 1, protector: 1})'>🏭 L'Industrie ou les infrastructures critiques</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_results\", {catalyst: 2})'>📱 La Communication, le retail et les médias</button><button class='inline-btn quiz' onclick='handleQuizClick(\"pt_results\", {innovator: 2})'>🎮 Le Divertissement et les expériences immersives</button></div>"
      ],
      options: []
    },
    
    pt_results: {
      messages: [
        "Analyse de vos réponses..."
      ],
      options: []
    },

    // --- NEW RECOMMENDATION STATES ---
    reco_protector: {
        messages: [
            "<h3>Votre profil : Le Protecteur 🛡️</h3><p>Vous êtes méthodique, rigoureux et vous anticipez les risques. Votre mission : construire une forteresse numérique et garantir la confiance.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Cybersécurité</strong> - Pour devenir un expert de la défense technique.</div><div class='recommendation secondary'>🥈 <strong>Data, Protection & Sécurité</strong> - Pour maîtriser la conformité et la gouvernance (RGPD).</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCyber\")'>Explorer Cybersécurité</button><button class='inline-btn' onclick='handleInlineClick(\"explainDataProtection\")'>Explorer Data Protection</button></div>"
        ],
        options: []
    },
    reco_architect: {
        messages: [
            "<h3>Votre profil : L'Architecte 🏗️</h3><p>Vous aimez concevoir, organiser et bâtir des systèmes complexes, robustes et élégants. Vous créez les fondations du monde de demain.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Cloud Computing</strong> - Pour construire des infrastructures scalables.</div><div class='recommendation secondary'>🥈 <strong>Big Data & Analytics</strong> - Pour architecturer les pipelines de données massives.</div><div class='recommendation tertiary'>🥉 <strong>Internet of Things (IoT)</strong> - Pour concevoir des écosystèmes d'objets connectés.</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainCloud\")'>☁️ Explorer Cloud</button><button class='inline-btn' onclick='handleInlineClick(\"explainBigData\")'>📊 Explorer Big Data</button><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Explorer IoT</button></div>"
        ],
        options: []
    },
    reco_innovator: {
        messages: [
            "<h3>Votre profil : L'Innovateur 💡</h3><p>Vous êtes un créatif qui repousse les limites du possible. Vous utilisez la technologie pour inventer de nouvelles expériences et de nouveaux usages.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Intelligence Artificielle</strong> - Pour créer des algorithmes qui apprennent et raisonnent.</div><div class='recommendation secondary'>🥈 <strong>Réalité Virtuelle & Augmentée</strong> - Pour créer des mondes immersifs.</div><div class='recommendation tertiary'>🥉 <strong>Internet of Things (IoT)</strong> - Pour inventer les objets de demain.</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainAI\")'>🧠 Explorer IA</button><button class='inline-btn' onclick='handleInlineClick(\"explainVR\")'>🥽 Explorer VR/AR</button><button class='inline-btn' onclick='handleInlineClick(\"explainIoT\")'>📡 Explorer IoT</button></div>"
        ],
        options: []
    },
    reco_strategist: {
        messages: [
            "<h3>Votre profil : Le Stratège 🧠</h3><p>Vous avez une vision d'ensemble. Vous aimez piloter, planifier et orchestrer des projets complexes pour atteindre un objectif business clair.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Strategic Project Management</strong> - Pour devenir un chef d'orchestre de la tech.</div><div class='recommendation secondary'>🥈 <strong>IA & Transformation des organisations</strong> - Pour piloter le changement grâce à l'IA.</div><div class='recommendation tertiary'>🥉 <strong>Fintech & Stratégies financières</strong> - Pour définir la stratégie des services financiers de demain.</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainProjectManagement\")'>🎯 Explorer Project Management</button><button class='inline-btn' onclick='handleInlineClick(\"explainAITransformation\")'>🚀 Explorer IA & Transfo</button><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Explorer Fintech</button></div>"
        ],
        options: []
    },
    reco_catalyst: {
        messages: [
            "<h3>Votre profil : Le Catalyseur 🚀</h3><p>Vous comprenez les gens et les marchés. Vous utilisez la technologie pour créer des connexions, engager des communautés et transformer une industrie.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Marketing Digital & Influence</strong> - Pour construire et animer des marques fortes.</div><div class='recommendation secondary'>🥈 <strong>Luxe & Retail Tech</strong> - Pour réinventer l'expérience client.</div><div class='recommendation tertiary'>🥉 <strong>Digitalisation de la fonction RH</strong> - Pour transformer l'expérience collaborateur.</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainMarketing\")'>📱 Explorer Marketing</button><button class='inline-btn' onclick='handleInlineClick(\"explainLuxe\")'>💎 Explorer Luxe & Retail</button><button class='inline-btn' onclick='handleInlineClick(\"explainRH\")'>👥 Explorer RH</button></div>"
        ],
        options: []
    },
    reco_analyst: {
        messages: [
            "<h3>Votre profil : L'Analyste 📊</h3><p>Les données vous parlent. Vous aimez les explorer, les faire parler et les transformer en décisions intelligentes qui pilotent l'entreprise.</p><strong>Spécialités recommandées :</strong><div class='recommendation primary'>🥇 <strong>Data Science & Business Intelligence</strong> - Pour créer des insights et des dashboards.</div><div class='recommendation secondary'>🥈 <strong>Santé, IA & IoT</strong> - Pour analyser les données médicales et améliorer les soins.</div><div class='recommendation tertiary'>🥉 <strong>Fintech & Stratégies financières</strong> - Pour analyser les données de marché.</div><br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"explainDataScienceBI\")'>📊 Explorer Data Science</button><button class='inline-btn' onclick='handleInlineClick(\"explainSante\")'>🏥 Explorer Santé</button><button class='inline-btn' onclick='handleInlineClick(\"explainFintech\")'>💰 Explorer Fintech</button></div>"
        ],
        options: []
    },
    reco_default: {
        messages: [
            "<h3>Votre profil : Le Polyvalent 🌟</h3><p>Vous êtes un touche-à-tout ! Votre profil est équilibré, ce qui vous ouvre de nombreuses portes, que ce soit en tech pure ou en management.</p>Je vous suggère d'explorer ces deux voies :<br/><div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"categorizeSpecialties\")'>🔄 Tech vs Business</button><button class='inline-btn' onclick='handleInlineClick(\"explainSpecialties\")'>📋 Voir toutes les spécialités</button></div>"
        ],
        options: []
    },


    // --- RECOMMENDATIONS (old, to be potentially removed or refactored) ---
    // ... (code existant)
  
  };

  // Enhanced functions for inline button handling
  window.handleInlineClick = function(action, param) {
    // Get the button text from the clicked element
    const clickedElement = event.target.closest('[onclick]');
    if (!clickedElement) return;

    const titleElement = clickedElement.querySelector('strong');
    const buttonText = titleElement ? titleElement.innerText : (clickedElement.textContent || clickedElement.innerText);
    
    const userResponse = document.createElement('div');
    userResponse.className = 'user-response-inline';
    userResponse.innerHTML = `${buttonText.trim()}`;
    botMessagesContainer.appendChild(userResponse);
    
    // Add to navigation history
    if (action !== 'navigate') {
      navigationHistory.push(action);
    }
    
    removeTypingIndicator();
    showTypingIndicator();
    scrollToBottom();
    
    setTimeout(() => {
      if (action === 'navigate') {
        window.open(param, '_blank');
        removeTypingIndicator();
        renderConversationState('after_navigate');
      } else {
        conversationState = action;
        renderConversationState(conversationState);
      }
    }, 800);
  };
  
  window.handleQuizClick = function(nextState, scores) {
    const clickedButton = event.target.closest('.inline-btn');
    const buttonText = clickedButton.textContent || clickedButton.innerText;
    
    const userResponse = document.createElement('div');
    userResponse.className = 'user-response-inline';
    userResponse.innerHTML = `${buttonText}`;
    botMessagesContainer.appendChild(userResponse);
    
    // Aggregate scores
    for (const profile in scores) {
      if (!userProfile.scores) userProfile.scores = {};
      if (!userProfile.scores[profile]) userProfile.scores[profile] = 0;
      userProfile.scores[profile] += scores[profile];
    }
    
    showTypingIndicator();
    scrollToBottom();
    
    setTimeout(() => {
      if (nextState === 'pt_results') {
        renderConversationState('pt_results');
        setTimeout(calculateAndShowResult, 2000); // Simulate calculation
      } else {
        renderConversationState(nextState);
      }
    }, 800);
  };

  function calculateAndShowResult() {
    let scores = userProfile.scores || {};
    
    // Convert scores to an array and sort
    const sortedProfiles = Object.entries(scores).sort(([,a],[,b]) => b-a);

    // Reset scores for the next quiz
    userProfile.scores = {};

    if (sortedProfiles.length === 0) {
        renderConversationState('reco_default');
        return;
    }

    const topProfile = sortedProfiles[0][0];
    const topScore = sortedProfiles[0][1];
    
    let finalReco = 'reco_' + topProfile; // Default to top profile

    // Check for a close second or a tie
    if (sortedProfiles.length > 1) {
        const secondProfile = sortedProfiles[1][0];
        const secondScore = sortedProfiles[1][1];

        // If the second score is close to the top score (e.g., within 1 point), we have a hybrid profile
        if (topScore > 0 && topScore - secondScore <= 1) {
            // Create a consistent key for the hybrid profile (e.g., architect_innovator)
            const hybridKey = [topProfile, secondProfile].sort().join('_');
            const hybridReco = 'reco_' + hybridKey;
            
            // Check if a specific hybrid recommendation exists
            if (conversationTree[hybridReco]) {
                finalReco = hybridReco;
            }
        }
    }
    
    renderConversationState(finalReco);
  }

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
      setTimeout(resolve, 600); // Slightly longer delay for better readability
    });
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
        scrollToBottom();
    });
  }

  // Navigation states for after opening external links
  conversationTree.after_navigate = {
    messages: ["J'ai ouvert la page pour vous ! Puis-je vous aider avec autre chose ?"],
    options: [
      "<div class='inline-buttons'><button class='inline-btn' onclick='handleInlineClick(\"help_q1\")'>🎯 Choisir une autre spé</button><button class='inline-btn' onclick='handleInlineClick(\"practical_info\")'>ℹ️ Infos pratiques</button><button class='inline-btn' onclick='handleInlineClick(\"initial\")'>🏠 Retour accueil</button></div>"
    ]
  };

  // Initialize the bot
  initBot();

  // --- EVENT HANDLING ---
  // Use a single, delegated event listener for all dynamic content
  botMessagesContainer.addEventListener('click', function(event) {
    const target = event.target;
    let clickedElement = target.closest('[data-action]');
    
    if (clickedElement) {
        const action = clickedElement.dataset.action;
        const param = clickedElement.dataset.param;
        handleAction(action, param, clickedElement);
    }
  });

  function handleAction(action, param, clickedElement) {
    const titleElement = clickedElement.querySelector('strong');
    const buttonText = titleElement ? titleElement.innerText : (clickedElement.textContent || clickedElement.innerText);
    
    const userResponse = document.createElement('div');
    userResponse.className = 'user-response-inline';
    userResponse.innerHTML = `${buttonText.trim()}`;
    botMessagesContainer.appendChild(userResponse);
    
    if (action !== 'navigate') {
      navigationHistory.push(action);
    }
    
    removeTypingIndicator();
    showTypingIndicator();
    scrollToBottom();
    
    setTimeout(() => {
      if (action === 'navigate') {
        window.open(param, '_blank');
        removeTypingIndicator();
        renderConversationState('after_navigate');
      } else {
        conversationState = action;
        renderConversationState(conversationState);
      }
    }, 800);
  }
}); 