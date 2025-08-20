class PersonalitySystem {
  constructor() {
    this.dimensions = {
      technical_business: { name: 'Technique - Business', technical: 0, business: 0 },
      detail_vision: { name: 'Détail - Vision', detail: 0, vision: 0 },
      individual_team: { name: 'Individuel - Équipe', individual: 0, team: 0 },
      stability_innovation: { name: 'Stabilité - Innovation', stability: 0, innovation: 0 },
      process_results: { name: 'Processus - Résultats', process: 0, results: 0 }
    };
    
    this.currentScores = {};
    this.currentQuestionIndex = 0;
    
    this.personalityTypes = {
      'architecte-technique': {
        name: 'L\'Architecte Technique',
        emoji: '🏗️',
        description: 'Vous concevez et construisez des systèmes techniques complexes avec une vision d\'ensemble.',
        traits: ['Maîtrise technique', 'Vision architecturale', 'Résolution de problèmes'],
        pattern: { technical: 'high', detail: 'high', individual: 'medium', stability: 'high', process: 'high' }
      },
      'innovateur-tech': {
        name: 'L\'Innovateur Tech',
        emoji: '💡',
        description: 'Vous repoussez les limites de la technologie et créez des solutions révolutionnaires.',
        traits: ['Créativité technique', 'R&D', 'Technologies émergentes'],
        pattern: { technical: 'high', vision: 'high', individual: 'high', innovation: 'high', results: 'high' }
      },
      'gardien-cyber': {
        name: 'Le Gardien Cyber',
        emoji: '🛡️',
        description: 'Vous protégez et sécurisez les systèmes contre toutes les menaces.',
        traits: ['Sécurité', 'Anticipation des risques', 'Rigueur'],
        pattern: { technical: 'high', detail: 'high', individual: 'medium', stability: 'high', process: 'high' }
      },
      'analyste-donnees': {
        name: 'L\'Analyste de Données',
        emoji: '📊',
        description: 'Vous transformez les données en insights stratégiques pour l\'entreprise.',
        traits: ['Analyse quantitative', 'Business intelligence', 'Précision'],
        pattern: { technical: 'medium', detail: 'high', individual: 'medium', stability: 'medium', process: 'high' }
      },
      'chef-projet-tech': {
        name: 'Le Chef de Projet Tech',
        emoji: '🎯',
        description: 'Vous orchestrez les équipes techniques pour livrer des projets complexes.',
        traits: ['Leadership', 'Gestion de projet', 'Communication'],
        pattern: { business: 'high', vision: 'high', team: 'high', stability: 'high', process: 'high' }
      },
      'strategiste-digital': {
        name: 'Le Stratège Digital',
        emoji: '🧠',
        description: 'Vous définissez la vision technologique et pilotez la transformation digitale.',
        traits: ['Vision stratégique', 'Transformation', 'Innovation business'],
        pattern: { business: 'high', vision: 'high', team: 'high', innovation: 'high', results: 'high' }
      },
      'catalyseur-business': {
        name: 'Le Catalyseur Business',
        emoji: '🚀',
        description: 'Vous utilisez la tech pour créer de nouveaux modèles économiques et engager les utilisateurs.',
        traits: ['Innovation business', 'Croissance', 'Engagement client'],
        pattern: { business: 'high', vision: 'high', team: 'high', innovation: 'high', results: 'high' }
      },
      'consultant-expert': {
        name: 'Le Consultant Expert',
        emoji: '🎓',
        description: 'Vous accompagnez les organisations dans leur adoption des nouvelles technologies.',
        traits: ['Expertise conseil', 'Accompagnement', 'Transfert de connaissances'],
        pattern: { business: 'medium', vision: 'high', team: 'high', stability: 'medium', process: 'high' }
      }
    };

    this.questions = [
      {
        id: 1,
        text: "Quand vous travaillez sur un projet complexe, votre priorité est de :",
        answers: [
          { text: "🔧 Maîtriser parfaitement tous les aspects techniques", scores: { technical: 3, detail: 2, individual: 1 }},
          { text: "📋 Définir une roadmap claire avec des jalons business", scores: { business: 3, vision: 2, process: 1 }},
          { text: "👥 Mobiliser et coordonner les bonnes personnes", scores: { business: 2, team: 3, vision: 1 }},
          { text: "🚀 Créer quelque chose de révolutionnaire", scores: { technical: 1, innovation: 3, results: 2 }}
        ]
      },
      {
        id: 2,
        text: "Face à un problème technique complexe, vous préférez :",
        answers: [
          { text: "🔍 Analyser le code ligne par ligne jusqu'à trouver la cause", scores: { technical: 3, detail: 3, individual: 2 }},
          { text: "📊 Examiner les métriques et les données pour identifier le pattern", scores: { technical: 2, detail: 2, process: 2 }},
          { text: "🤝 Organiser un brainstorming avec l'équipe technique", scores: { technical: 2, team: 3, vision: 1 }},
          { text: "🎯 Redéfinir l'approche pour éviter le problème", scores: { business: 2, innovation: 3, vision: 2 }}
        ]
      },
      {
        id: 3,
        text: "Votre définition d'un projet réussi :",
        answers: [
          { text: "⚡ Il est techniquement parfait et performant", scores: { technical: 3, detail: 2, stability: 2 }},
          { text: "💼 Il répond exactement aux besoins business exprimés", scores: { business: 3, process: 2, stability: 1 }},
          { text: "👥 L'équipe a grandi et appris de nouvelles compétences", scores: { team: 3, vision: 2, business: 1 }},
          { text: "🌟 Il change la donne sur le marché", scores: { innovation: 3, results: 3, vision: 2 }}
        ]
      },
      {
        id: 4,
        text: "Dans votre travail idéal, vous passez la majorité de votre temps à :",
        answers: [
          { text: "💻 Développer, architecturer ou optimiser des systèmes", scores: { technical: 3, individual: 2, detail: 2 }},
          { text: "📈 Analyser des données et créer des rapports stratégiques", scores: { technical: 2, business: 2, detail: 3, process: 1 }},
          { text: "🎤 Présenter, former et coordonner des équipes", scores: { business: 3, team: 3, vision: 2 }},
          { text: "🔬 Expérimenter de nouvelles technologies ou approches", scores: { technical: 2, innovation: 3, individual: 2, results: 1 }}
        ]
      },
      {
        id: 5,
        text: "Votre approche face à une nouvelle technologie émergente :",
        answers: [
          { text: "🔧 Je l'étudie en profondeur techniquement avant de l'adopter", scores: { technical: 3, detail: 3, stability: 2 }},
          { text: "📊 J'analyse son ROI et son impact business potentiel", scores: { business: 3, process: 2, vision: 2 }},
          { text: "👥 J'évalue comment l'équipe peut se l'approprier", scores: { team: 3, business: 2, process: 1 }},
          { text: "🚀 Je prototyppe rapidement pour tester son potentiel", scores: { innovation: 3, results: 2, technical: 1 }}
        ]
      },
      {
        id: 6,
        text: "Quand vous gérez un budget ou des ressources :",
        answers: [
          { text: "🎯 Je privilégie la qualité technique et la robustesse", scores: { technical: 2, stability: 3, detail: 2 }},
          { text: "📋 Je suis rigoureusement le plan et les processus établis", scores: { business: 2, process: 3, stability: 2 }},
          { text: "🤝 Je consulte l'équipe pour optimiser l'allocation", scores: { team: 3, business: 2, process: 1 }},
          { text: "💡 J'investis dans l'innovation même si c'est risqué", scores: { innovation: 3, results: 2, vision: 2 }}
        ]
      },
      {
        id: 7,
        text: "Votre plus grande satisfaction professionnelle vient de :",
        answers: [
          { text: "🏆 Résoudre un défi technique réputé impossible", scores: { technical: 3, individual: 2, results: 2 }},
          { text: "📈 Voir l'impact business mesurable de votre travail", scores: { business: 3, results: 3, vision: 1 }},
          { text: "👥 Développer les compétences de votre équipe", scores: { team: 3, business: 2, vision: 2 }},
          { text: "🌟 Lancer quelque chose qui n'existait pas avant", scores: { innovation: 3, results: 2, technical: 1 }}
        ]
      },
      {
        id: 8,
        text: "Face à une deadline serrée, votre réflexe est de :",
        answers: [
          { text: "⚡ Optimiser le code et automatiser au maximum", scores: { technical: 3, individual: 2, process: 1 }},
          { text: "📋 Reprioriser les features selon leur valeur business", scores: { business: 3, process: 2, results: 2 }},
          { text: "🤝 Répartir intelligemment la charge dans l'équipe", scores: { team: 3, business: 2, process: 1 }},
          { text: "🎯 Trouver une approche créative pour gagner du temps", scores: { innovation: 3, results: 2, vision: 1 }}
        ]
      },
      {
        id: 9,
        text: "Votre environnement de travail idéal :",
        answers: [
          { text: "🔬 Un lab technique avec les derniers outils", scores: { technical: 3, individual: 2, innovation: 1 }},
          { text: "📊 Un bureau avec accès à toutes les données de l'entreprise", scores: { business: 2, detail: 3, process: 2 }},
          { text: "🏢 Un open space dynamique avec beaucoup d'interactions", scores: { team: 3, business: 2, vision: 1 }},
          { text: "🌟 Un espace créatif où l'on peut expérimenter librement", scores: { innovation: 3, individual: 2, technical: 1 }}
        ]
      },
      {
        id: 10,
        text: "Pour rester à jour dans votre domaine, vous préférez :",
        answers: [
          { text: "📚 Lire la documentation technique et les specs", scores: { technical: 3, detail: 2, individual: 2 }},
          { text: "📰 Suivre les tendances business et les success stories", scores: { business: 3, vision: 2, process: 1 }},
          { text: "🎤 Participer à des conférences et événements networking", scores: { team: 3, business: 2, vision: 2 }},
          { text: "🔬 Tester et expérimenter les nouvelles technologies", scores: { innovation: 3, technical: 2, individual: 1 }}
        ]
      },
      {
        id: 11,
        text: "Votre définition du leadership :",
        answers: [
          { text: "🎯 Montrer l'exemple par l'excellence technique", scores: { technical: 3, individual: 2, stability: 1 }},
          { text: "📊 Prendre des décisions basées sur les données", scores: { business: 2, detail: 3, process: 2 }},
          { text: "👥 Inspirer et développer le potentiel de chacun", scores: { team: 3, business: 2, vision: 2 }},
          { text: "🚀 Entraîner l'équipe vers de nouveaux horizons", scores: { innovation: 3, vision: 3, results: 1 }}
        ]
      },
      {
        id: 12,
        text: "Quand vous évaluez une technologie, votre critère principal :",
        answers: [
          { text: "⚡ Sa performance et sa fiabilité technique", scores: { technical: 3, detail: 2, stability: 2 }},
          { text: "💰 Son rapport qualité-prix et ROI", scores: { business: 3, process: 2, results: 1 }},
          { text: "👥 Sa facilité d'adoption par l'équipe", scores: { team: 3, business: 1, stability: 2 }},
          { text: "🔮 Son potentiel d'innovation future", scores: { innovation: 3, vision: 2, technical: 1 }}
        ]
      }
    ];

    this.specialtyMappings = {
      'architecte-technique': ['cloud', 'bigdata', 'iot'],
      'innovateur-tech': ['ia', 'vrar', 'iot'],
      'gardien-cyber': ['cybersecurite', 'data-protection', 'cloud'],
      'analyste-donnees': ['data-science-bi', 'bigdata', 'fintech'],
      'chef-projet-tech': ['project-management', 'ai-transformation', 'cloud'],
      'strategiste-digital': ['ai-transformation', 'project-management', 'fintech'],
      'catalyseur-business': ['marketing', 'luxe-retail-tech', 'rh-digitale'],
      'consultant-expert': ['ai-transformation', 'data-protection', 'project-management']
    };

    this.specialtyNames = {
      'ia': 'Intelligence Artificielle',
      'cloud': 'Cloud Computing', 
      'cybersecurite': 'Cybersécurité',
      'bigdata': 'Big Data & Analytics',
      'iot': 'Internet of Things (IoT)',
      'vrar': 'Réalité Virtuelle & Augmentée',
      'data-science-bi': 'Data Science & Business Intelligence',
      'fintech': 'Fintech & Stratégies financières',
      'marketing': 'Marketing & Influence',
      'project-management': 'Strategic Project Management',
      'ai-transformation': 'IA & Transformation des organisations',
      'data-protection': 'Data, Protection & Sécurité',
      'rh-digitale': 'Digitalisation de la fonction RH',
      'luxe-retail-tech': 'Luxe & Retail Tech',
      'sante-ia-iot': 'Santé, IA & IoT'
    };

    // Mapping vers les actions du chatbot
    this.specialtyActions = {
      'ia': 'explainAI',
      'cloud': 'explainCloud',
      'cybersecurite': 'explainCyber',
      'bigdata': 'explainBigData',
      'iot': 'explainIoT',
      'vrar': 'explainVR',
      'data-science-bi': 'explainDataScienceBI',
      'fintech': 'explainFintech',
      'marketing': 'explainMarketing',
      'project-management': 'explainProjectManagement',
      'ai-transformation': 'explainAITransformation',
      'data-protection': 'explainDataProtection',
      'rh-digitale': 'explainRH',
      'luxe-retail-tech': 'explainLuxe',
      'sante-ia-iot': 'explainSante'
    };
  }

  resetTest() {
    this.currentScores = {};
    this.currentQuestionIndex = 0;
    for (let dim in this.dimensions) {
      this.dimensions[dim].technical = 0;
      this.dimensions[dim].business = 0;
      this.dimensions[dim].detail = 0;
      this.dimensions[dim].vision = 0;
      this.dimensions[dim].individual = 0;
      this.dimensions[dim].team = 0;
      this.dimensions[dim].stability = 0;
      this.dimensions[dim].innovation = 0;
      this.dimensions[dim].process = 0;
      this.dimensions[dim].results = 0;
    }
  }

  recordAnswer(questionId, answerIndex) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return;

    const answer = question.answers[answerIndex];
    if (!answer) return;

    for (let trait in answer.scores) {
      if (!this.currentScores[trait]) {
        this.currentScores[trait] = 0;
      }
      this.currentScores[trait] += answer.scores[trait];
    }

    this.updateDimensions();
  }

  updateDimensions() {
    const scores = this.currentScores;
    
    this.dimensions.technical_business.technical = scores.technical || 0;
    this.dimensions.technical_business.business = scores.business || 0;
    
    this.dimensions.detail_vision.detail = scores.detail || 0;
    this.dimensions.detail_vision.vision = scores.vision || 0;
    
    this.dimensions.individual_team.individual = scores.individual || 0;
    this.dimensions.individual_team.team = scores.team || 0;
    
    this.dimensions.stability_innovation.stability = scores.stability || 0;
    this.dimensions.stability_innovation.innovation = scores.innovation || 0;
    
    this.dimensions.process_results.process = scores.process || 0;
    this.dimensions.process_results.results = scores.results || 0;
  }

  determinePersonalityType() {
    const scores = this.currentScores;
    let bestMatch = null;
    let bestScore = -1;

    for (let typeId in this.personalityTypes) {
      let matchScore = this.calculateTypeMatch(scores, this.personalityTypes[typeId].pattern);
      
      if (matchScore > bestScore) {
        bestScore = matchScore;
        bestMatch = typeId;
      }
    }

    return bestMatch;
  }

  calculateTypeMatch(userScores, typePattern) {
    let score = 0;
    
    for (let trait in typePattern) {
      const userValue = userScores[trait] || 0;
      const expectedLevel = typePattern[trait];
      
      let targetValue;
      if (expectedLevel === 'high') targetValue = 25;
      else if (expectedLevel === 'medium') targetValue = 15;
      else targetValue = 5;
      
      const diff = Math.abs(userValue - targetValue);
      score += Math.max(0, 30 - diff);
    }
    
    return score;
  }

  getTopSpecialties(personalityType) {
    if (!this.specialtyMappings[personalityType]) {
      return ['ia', 'project-management', 'data-science-bi'];
    }
    
    return this.specialtyMappings[personalityType];
  }

  generateDimensionBars() {
    let html = '<div class="personality-dimensions">';
    
    for (let dimKey in this.dimensions) {
      const dim = this.dimensions[dimKey];
      const total = Math.max(1, Object.values(this.currentScores).reduce((a, b) => a + b, 0));
      
      let leftValue, rightValue, leftLabel, rightLabel;
      
      switch (dimKey) {
        case 'technical_business':
          leftValue = dim.technical;
          rightValue = dim.business;
          leftLabel = 'Technique';
          rightLabel = 'Business';
          break;
        case 'detail_vision':
          leftValue = dim.detail;
          rightValue = dim.vision;
          leftLabel = 'Détail';
          rightLabel = 'Vision';
          break;
        case 'individual_team':
          leftValue = dim.individual;
          rightValue = dim.team;
          leftLabel = 'Individuel';
          rightLabel = 'Équipe';
          break;
        case 'stability_innovation':
          leftValue = dim.stability;
          rightValue = dim.innovation;
          leftLabel = 'Stabilité';
          rightLabel = 'Innovation';
          break;
        case 'process_results':
          leftValue = dim.process;
          rightValue = dim.results;
          leftLabel = 'Processus';
          rightLabel = 'Résultats';
          break;
      }
      
      const leftPercent = Math.round((leftValue / (leftValue + rightValue || 1)) * 100);
      const rightPercent = 100 - leftPercent;
      
      html += `
        <div class="dimension-bar">
          <div class="dimension-labels">
            <span class="left-label">${leftLabel}</span>
            <span class="right-label">${rightLabel}</span>
          </div>
          <div class="bar-container">
            <div class="bar-left" style="width: ${leftPercent}%"></div>
            <div class="bar-right" style="width: ${rightPercent}%"></div>
          </div>
          <div class="dimension-values">
            <span class="left-value">${leftPercent}%</span>
            <span class="right-value">${rightPercent}%</span>
          </div>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  }

  generateResults() {
    const personalityType = this.determinePersonalityType();
    const personality = this.personalityTypes[personalityType];
    const topSpecialties = this.getTopSpecialties(personalityType);
    const dimensionBars = this.generateDimensionBars();
    
    let specialtiesHtml = '';
    topSpecialties.forEach((specialtyKey, index) => {
      const rank = ['🥇', '🥈', '🥉'][index] || '🏅';
      const name = this.specialtyNames[specialtyKey] || specialtyKey;
      const action = this.specialtyActions[specialtyKey] || 'explainSpecialties';
      const className = index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary';
      specialtiesHtml += `<div class="recommendation ${className} clickable-specialty" onclick="handleInlineClick('${action}')">${rank} <strong>${name}</strong><br/><span class="click-hint">Cliquez pour en savoir plus →</span></div>`;
    });

    return {
      personalityType,
      personality,
      topSpecialties,
      dimensionBars,
      specialtiesHtml,
      html: `
        <div class="personality-results">
          <h3>Votre profil : ${personality.name} ${personality.emoji}</h3>
          <p class="personality-description">${personality.description}</p>
          
          <div class="personality-traits">
            <strong>Vos points forts :</strong>
            ${personality.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
          </div>
          
          ${dimensionBars}
          
          <div class="specialty-recommendations">
            <h4>🎯 Spécialités recommandées pour vous :</h4>
            ${specialtiesHtml}
          </div>
          
          <div class="inline-buttons">
            <button class="inline-btn" onclick="handleInlineClick('explainSpecialties')">📋 Toutes les spécialités</button>
            <button class="inline-btn" onclick="handleInlineClick('personality_test_start')">🔄 Refaire le test</button>
          </div>
        </div>
      `
    };
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  hasNextQuestion() {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.currentQuestionIndex++;
      return this.getCurrentQuestion();
    }
    return null;
  }

  retakeTest() {
    this.resetTest();
    if (typeof handleInlineClick === 'function') {
      handleInlineClick('personality_test_start');
    }
  }
}

window.PersonalitySystem = PersonalitySystem;