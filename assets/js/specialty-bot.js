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

  // Conversation tree - Updated with all specialties
  const conversationTree = {
    initial: {
      messages: ["Bonjour ! Je suis votre assistant pour découvrir les spécialités MSc EPITECH. Comment puis-je vous aider ?"],
      options: [
        { text: "Explorer les spécialités", next: "explainSpecialties" },
        { text: "Quelles sont les spécialités Tech / Business ?", next: "categorizeSpecialties" },
        { text: "Comment choisir ma spécialité ?", next: "choosingHelp" },
        // { text: "Comparer deux spécialités", next: "compareSpecialties" }, // TODO: Implement later
      ]
    },
    explainSpecialties: {
      messages: ["Voici toutes les spécialités MSc proposées. Laquelle vous intéresse en particulier ?"],
      options: [
        // Tech Specialties
        { text: "<i class='fas fa-shield-alt'></i> Cybersécurité", next: "explainCyber" },
        { text: "<i class='fas fa-cloud'></i> Cloud Computing", next: "explainCloud" },
        { text: "<i class='fas fa-brain'></i> Intelligence Artificielle", next: "explainAI" },
        { text: "<i class='fas fa-database'></i> Big Data & Analytics", next: "explainBigData" },
        { text: "<i class='fas fa-microchip'></i> Internet of Things", next: "explainIoT" }, // Corrected icon
        { text: "<i class='fas fa-vr-cardboard'></i> Réalité Virtuelle & Augmentée", next: "explainVR" },
        // Business Specialties
        { text: "<i class='fas fa-tasks'></i> Strategic Project Management", next: "explainProjectManagement" },
        { text: "<i class='fas fa-chart-bar'></i> Fintech & Stratégies financières", next: "explainFintech" },
        { text: "<i class='fas fa-bullhorn'></i> Marketing & Influence", next: "explainMarketing" },
        { text: "<i class='fas fa-brain'></i> IA & Transformation des organisations", next: "explainAITransformation" }, // Icon duplicate with AI
        { text: "<i class='fas fa-shield-alt'></i> Data, Protection & Sécurité", next: "explainDataProtection" }, // Icon duplicate with Cyber
        { text: "<i class='fas fa-users-cog'></i> Digitalisation de la fonction RH", next: "explainRH" },
        { text: "<i class='fas fa-heartbeat'></i> Santé, IA & IoT", next: "explainSante" },
        { text: "<i class='fas fa-chart-bar'></i> Data Science & Business Intelligence", next: "explainDataScienceBI" }, // Icon duplicate with Fintech
        { text: "<i class='fas fa-gem'></i> Luxe & Retail Tech", next: "explainLuxe" },
        { text: "Retour", next: "initial" }
      ]
    },
    categorizeSpecialties: {
      messages: [
            "Nos spécialités se divisent en deux grandes catégories :",
            "<i class='fas fa-laptop-code'></i> **Expertes Technologiques** : Pour ceux qui veulent une expertise technique pointue (IA, Cloud, Cybersécurité...).",
            "<i class='fas fa-briefcase'></i> **Digital, Business & Management** : Pour ceux qui veulent piloter la stratégie et la transformation numérique (Marketing, Fintech, Project Management...).",
            "Souhaitez-vous explorer une catégorie spécifique ?"
      ],
      options: [
            { text: "Voir les Spécialités Tech", next: "listTechSpecialties" },
            { text: "Voir les Spécialités Business", next: "listBusinessSpecialties" },
            { text: "Voir toutes les spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    listTechSpecialties: {
        messages: ["Voici nos spécialités axées sur l'expertise technologique :"],
      options: [
            { text: "<i class='fas fa-shield-alt'></i> Cybersécurité", next: "explainCyber" },
            { text: "<i class='fas fa-cloud'></i> Cloud Computing", next: "explainCloud" },
            { text: "<i class='fas fa-brain'></i> Intelligence Artificielle", next: "explainAI" },
            { text: "<i class='fas fa-database'></i> Big Data & Analytics", next: "explainBigData" },
            { text: "<i class='fas fa-microchip'></i> Internet of Things", next: "explainIoT" },
            { text: "<i class='fas fa-vr-cardboard'></i> Réalité Virtuelle & Augmentée", next: "explainVR" },
            { text: "Voir les spécialités Business", next: "listBusinessSpecialties" },
            { text: "Retour (Catégories)", next: "categorizeSpecialties" }
        ]
    },
    listBusinessSpecialties: {
        messages: ["Voici nos spécialités orientées Digital, Business & Management :"],
      options: [
            { text: "<i class='fas fa-tasks'></i> Strategic Project Management", next: "explainProjectManagement" },
            { text: "<i class='fas fa-chart-bar'></i> Fintech & Stratégies financières", next: "explainFintech" },
            { text: "<i class='fas fa-bullhorn'></i> Marketing & Influence", next: "explainMarketing" },
            { text: "<i class='fas fa-brain'></i> IA & Transformation des organisations", next: "explainAITransformation" },
            { text: "<i class='fas fa-shield-alt'></i> Data, Protection & Sécurité", next: "explainDataProtection" },
            { text: "<i class='fas fa-users-cog'></i> Digitalisation de la fonction RH", next: "explainRH" },
            { text: "<i class='fas fa-heartbeat'></i> Santé, IA & IoT", next: "explainSante" },
            { text: "<i class='fas fa-chart-bar'></i> Data Science & Business Intelligence", next: "explainDataScienceBI" },
            { text: "<i class='fas fa-gem'></i> Luxe & Retail Tech", next: "explainLuxe" },
            { text: "Voir les spécialités Tech", next: "listTechSpecialties" },
            { text: "Retour (Catégories)", next: "categorizeSpecialties" }
        ]
    },

    // --- Existing Tech Specialties (Updated Links/Info) ---
    explainCyber: {
      messages: [
        "<i class='fas fa-shield-alt'></i> **Cybersécurité** : Développez l'expertise nécessaire pour protéger les systèmes d'information contre les menaces numériques et sécuriser les données sensibles des organisations.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/cybersecurite" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainCloud: {
      messages: [
        "<i class='fas fa-cloud'></i> **Cloud Computing** : Maîtrisez la conception, le déploiement et la gestion d'infrastructures cloud pour créer des applications évolutives, flexibles et résilientes.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/cloud" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainAI: {
      messages: [
        "<i class='fas fa-brain'></i> **Intelligence Artificielle** : Explorez l'univers fascinant de l'Intelligence Artificielle et apprenez à concevoir des systèmes capables d'apprentissage, de raisonnement et d'adaptation.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/ia" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainBigData: {
      messages: [
        "<i class='fas fa-database'></i> **Big Data & Analytics** : Explorez les technologies et méthodologies permettant de collecter, transformer et analyser des volumes massifs de données pour en extraire des insights stratégiques.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/bigdata" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainIoT: {
      messages: [
        "<i class='fas fa-microchip'></i> **Internet of Things** : Concevez et développez des solutions connectées complètes, du capteur embarqué jusqu'au cloud, pour transformer n'importe quel objet physique en source d'intelligence.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/iot" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainVR: {
      messages: [
        "<i class='fas fa-vr-cardboard'></i> **Réalité Virtuelle & Augmentée** : Concevez et développez des expériences immersives en réalité virtuelle et augmentée qui transforment notre façon d'interagir avec le monde.",
      ],
      options: [
        { text: "Voir la page détaillée", action: "navigate", url: "/Decouverte-pmsc/specialites/vrar" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },

    // --- New Business Specialties ---
    explainProjectManagement: {
      messages: ["<i class='fas fa-tasks'></i> **Strategic Project Management & Entrepreneurship** : Développez les compétences stratégiques et opérationnelles pour mener des projets complexes et créer des entreprises innovantes dans l'écosystème tech."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" }, 
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainFintech: {
      messages: ["<i class='fas fa-chart-bar'></i> **Fintech & Stratégies financières** : Explorez l'intersection de la finance et de la technologie pour transformer les services financiers et développer des stratégies innovantes dans un monde en pleine digitalisation."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainMarketing: {
      messages: ["<i class='fas fa-bullhorn'></i> **Marketing & Influence** : Développez des stratégies de marketing digital innovantes et exploitez le pouvoir des médias sociaux pour construire une influence significative et générer un impact mesurable."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainAITransformation: {
      messages: ["<i class='fas fa-brain'></i> **IA & Transformation des organisations** : Orchestrez la transformation numérique des organisations grâce à l'intelligence artificielle pour optimiser les processus, stimuler l'innovation et créer de la valeur durable."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainDataProtection: {
      messages: ["<i class='fas fa-shield-alt'></i> **Data, Protection & Sécurité** : Protégez les données sensibles, élaborez des stratégies de sécurité et assurez la conformité réglementaire dans un environnement numérique en constante évolution."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
     explainRH: {
      messages: ["<i class='fas fa-users-cog'></i> **Digitalisation de la fonction RH** : Transformez la gestion des ressources humaines grâce aux technologies digitales pour créer une expérience collaborateur innovante et développer le capital humain."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
     explainSante: {
      messages: ["<i class='fas fa-heartbeat'></i> **Santé, IA & IoT** : Transformez le secteur de la santé grâce à l'intelligence artificielle et aux objets connectés pour améliorer les soins, optimiser les processus médicaux et développer la médecine préventive."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainDataScienceBI: {
      messages: ["<i class='fas fa-chart-bar'></i> **Data Science & Business Intelligence** : Exploitez le potentiel des données pour générer des insights stratégiques, prendre des décisions éclairées et créer un avantage concurrentiel durable."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    explainLuxe: {
      messages: ["<i class='fas fa-gem'></i> **Luxe & Retail Tech** : Transformez l'expérience client dans le luxe et le retail grâce aux technologies digitales pour créer des parcours d'achat innovants et personnalisés."],
      options: [
        { text: "Voir la page détaillée (Bientôt !)", next: "comingSoon" },
        { text: "Autres spécialités", next: "explainSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    comingSoon: {
        messages: ["Désolé, plus de détails sur cette spécialité seront bientôt disponibles ! N'hésitez pas à consulter la page correspondante."],
      options: [
        { text: "Explorer d'autres spécialités", next: "explainSpecialties" },
            { text: "Retour à l'accueil du bot", next: "initial" }
        ]
    },

    // --- Help Section ---
    choosingHelp: {
      messages: ["Choisir sa spécialité est une décision importante. Voici quelques pistes :"],
      options: [
        { text: "Quels sont mes centres d'intérêt ?", next: "interestsBased" },
        { text: "Quelles sont les perspectives d'emploi ?", next: "careerProspects" },
        { text: "Voir les spécialités Tech", next: "listTechSpecialties" },
        { text: "Voir les spécialités Business", next: "listBusinessSpecialties" },
        { text: "Retour", next: "initial" }
      ]
    },
    interestsBased: { messages: ["<i class='fas fa-question-circle'></i> Pensez aux domaines qui vous passionnent le plus : résoudre des énigmes (Cybersécurité), construire des systèmes robustes (Cloud), explorer les données (Big Data, IA), créer des expériences (VR/AR), connecter le monde physique (IoT), piloter des projets (Management), innover dans la finance (Fintech), etc."], options: [{ text: "Retour", next: "choosingHelp" }] },
    careerProspects: { messages: ["<i class='fas fa-briefcase'></i> Toutes nos spécialités offrent d'excellents débouchés ! Consultez les sections 'Perspectives de carrière' sur les pages détaillées (quand disponibles) pour voir les métiers typiques."], options: [{ text: "Retour", next: "choosingHelp" }] },

    // Removed old explainDigital and skill/use case states

  }; // End of conversationTree

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
  
  // Display a single message (HTML rendering, no typing effect)
  function displayMessage(message) {
    return new Promise(resolve => {
      const messageElement = document.createElement('div');
      messageElement.className = 'bot-message';
      // Use innerHTML to render HTML tags correctly
      messageElement.innerHTML = message; 
      botMessagesContainer.appendChild(messageElement);
      
      // Add to chat history
      chatHistory.push({
        type: 'bot',
        content: message // Store the message with HTML
      });
      
      // Auto-scroll to bottom
      scrollToBottom(); 
      
      // Remove typing effect logic
      /* 
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
      */

      // Resolve after a short delay to allow spacing between messages
      setTimeout(resolve, 300); 
    });
  }
  
  // Render options only
  function renderOptions(options) {
    // Remove old options if they exist
    removeOptions();
    
    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bot-options';
    
    // Add options
    options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.className = 'bot-option';
      // Use innerHTML instead of textContent to render icons
      optionButton.innerHTML = option.text; 
      
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
    // Use innerHTML to render potential icons/HTML in the choice correctly
    userResponse.innerHTML = option.text; 
    botMessagesContainer.appendChild(userResponse);
    
    // Add to chat history (store raw text for potential future use/logic)
    chatHistory.push({
      type: 'user',
      content: option.text // Store the text with potential HTML for now
    });
    
    // Remove old options immediately
    removeOptions(); 
    
    // Show typing indicator
    showTypingIndicator();

    // Scroll to bottom to show user message and indicator
    scrollToBottom();
    
    // Handle navigation action
    if (option.action === 'navigate') {
      // No need to remove indicator here, page is changing
      window.location.href = option.url;
      return;
    }
    
    // Move to next state after a short delay
    if (option.next) {
      const nextState = option.next;
      setTimeout(() => {
        removeTypingIndicator(); // Remove indicator before showing new content
        conversationState = nextState;
        renderConversationState(nextState);
      }, 800); // Delay to simulate thinking/network
    } else {
       removeTypingIndicator(); // Remove indicator if it's an end state with no 'next'
    }
  }

  // Remove current options
  function removeOptions() {
    const oldOptions = botChatContainer.querySelector('.bot-options');
    if (oldOptions) {
      botChatContainer.removeChild(oldOptions);
    }
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'bot-message typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>'; // Simple dots
    botMessagesContainer.appendChild(indicator);
    scrollToBottom(); // Ensure indicator is visible
  }

  // Remove typing indicator
  function removeTypingIndicator() {
      const indicator = botMessagesContainer.querySelector('.typing-indicator');
      if (indicator) {
          botMessagesContainer.removeChild(indicator);
      }
  }

  // Helper function to scroll to bottom
  function scrollToBottom() {
      botMessagesContainer.scrollTop = botMessagesContainer.scrollHeight;
  }
  
  // Render conversation state (messages + options)
  function renderConversationState(stateKey) {
    const state = conversationTree[stateKey];
    
    if (!state) {
      console.error(`State "${stateKey}" not found in conversation tree`);
       removeTypingIndicator(); // Ensure indicator is removed in case of error
      return;
    }
    
    // Ensure any previous indicator is removed before starting new messages
    removeTypingIndicator(); 
    
    // Add messages to queue
    messageQueue = [...(state.messages || [])]; // Ensure messages array exists
    
    // Process messages
    processMessageQueue().then(() => {
       removeTypingIndicator(); // Ensure indicator is removed after messages
      // Add options after messages are displayed
      if (state.options && state.options.length > 0) {
        renderOptions(state.options);
        scrollToBottom(); // Scroll after adding options too
      }
    });
  }
  
  // Initialize the bot
  initBot();
}); 