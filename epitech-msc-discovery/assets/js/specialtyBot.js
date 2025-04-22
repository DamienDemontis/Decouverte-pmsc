// Specialty Bot - A fun helper to choose your specialty
document.addEventListener('DOMContentLoaded', function() {
    // Add ClippyJS CSS and JS
    const clipCss = document.createElement('link');
    clipCss.rel = 'stylesheet';
    clipCss.href = 'https://gitcdn.xyz/repo/pi0/clippyjs/master/assets/clippy.css';
    document.head.appendChild(clipCss);

    const clipScript = document.createElement('script');
    clipScript.src = 'https://unpkg.com/clippyjs@0.0.3/dist/clippy.min.js';
    document.head.appendChild(clipScript);

    // Wait for ClippyJS to load
    function checkClippyLoaded() {
        if (window.clippy) {
            initSpecialtyBot();
        } else {
            setTimeout(checkClippyLoaded, 100);
        }
    }
    
    setTimeout(checkClippyLoaded, 500);
});

function initSpecialtyBot() {
    // Create bot container in the sidebar
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    const botContainer = document.createElement('div');
    botContainer.id = 'specialty-bot-container';
    botContainer.style.position = 'absolute';
    botContainer.style.bottom = '20px';
    botContainer.style.left = '20px';
    botContainer.style.width = 'calc(100% - 40px)';
    sidebar.appendChild(botContainer);
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'specialty-bot-messages';
    messageContainer.style.background = 'rgba(255, 255, 255, 0.9)';
    messageContainer.style.borderRadius = '10px';
    messageContainer.style.padding = '15px';
    messageContainer.style.marginBottom = '10px';
    messageContainer.style.maxHeight = '200px';
    messageContainer.style.overflowY = 'auto';
    messageContainer.style.display = 'none';
    messageContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    messageContainer.style.color = '#374151';
    messageContainer.style.fontSize = '14px';
    botContainer.appendChild(messageContainer);
    
    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'specialty-bot-buttons';
    buttonsContainer.style.display = 'none';
    buttonsContainer.style.flexDirection = 'column';
    buttonsContainer.style.gap = '8px';
    botContainer.appendChild(buttonsContainer);

    // Load the agent
    clippy.load('Clippy', (agent) => {
        // Store the agent globally
        window.specialtyBot = agent;
        
        // Position the agent
        agent.moveTo(100, sidebar.offsetHeight - 120);
        agent.show();
        
        // Add click handler to toggle chat
        agent.element.addEventListener('click', () => {
            toggleChat();
        });
        
        // Start conversation after a short delay
        setTimeout(() => {
            agent.play('Wave');
            agent.speak('👋 Salut ! Je suis SpeciBot. Besoin d\'aide pour choisir ta spécialité ?');
            showOptions(conversationTree.start.options);
        }, 1500);
    });
    
    // Conversation toggle
    function toggleChat() {
        const msgContainer = document.getElementById('specialty-bot-messages');
        const btnContainer = document.getElementById('specialty-bot-buttons');
        
        if (msgContainer.style.display === 'none') {
            msgContainer.style.display = 'block';
            btnContainer.style.display = 'flex';
            window.specialtyBot.play('GetAttention');
        } else {
            msgContainer.style.display = 'none';
            btnContainer.style.display = 'none';
        }
    }
    
    // Show options to the user
    function showOptions(options) {
        const btnContainer = document.getElementById('specialty-bot-buttons');
        btnContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.style.background = 'linear-gradient(135deg, #4361ee, #4cc9f0)';
            button.style.border = 'none';
            button.style.borderRadius = '8px';
            button.style.padding = '8px 12px';
            button.style.color = 'white';
            button.style.cursor = 'pointer';
            button.style.fontWeight = '500';
            button.style.transition = 'all 0.2s ease';
            
            button.addEventListener('mouseover', () => {
                button.style.background = 'linear-gradient(135deg, #3a0ca3, #4361ee)';
            });
            
            button.addEventListener('mouseout', () => {
                button.style.background = 'linear-gradient(135deg, #4361ee, #4cc9f0)';
            });
            
            button.addEventListener('click', () => {
                addMessage('user', option.text);
                
                // Play animation based on response type
                if (option.nextId.includes('excited')) {
                    window.specialtyBot.play('GetAttention');
                } else if (option.nextId.includes('confused')) {
                    window.specialtyBot.play('Confused');
                } else {
                    window.specialtyBot.play('Explain');
                }
                
                // Process next step in conversation
                processConversation(option.nextId);
            });
            
            btnContainer.appendChild(button);
        });
    }
    
    // Process next step in conversation
    function processConversation(nodeId) {
        if (!conversationTree[nodeId]) {
            console.error('Node not found:', nodeId);
            return;
        }
        
        const node = conversationTree[nodeId];
        
        // Add bot message
        addMessage('bot', node.message);
        window.specialtyBot.speak(node.message);
        
        // If there are options, show them
        if (node.options && node.options.length > 0) {
            showOptions(node.options);
        } else {
            // This is an endpoint, offer to restart
            setTimeout(() => {
                showOptions([{
                    text: "Parlons d'une autre spécialité",
                    nextId: "start"
                }]);
            }, 1500);
        }
    }
    
    // Add message to chat
    function addMessage(sender, text) {
        const messageContainer = document.getElementById('specialty-bot-messages');
        const message = document.createElement('div');
        message.style.marginBottom = '10px';
        message.style.padding = '8px 12px';
        message.style.borderRadius = '8px';
        message.style.maxWidth = '100%';
        message.style.wordBreak = 'break-word';
        
        if (sender === 'bot') {
            message.style.background = 'rgba(67, 97, 238, 0.1)';
            message.style.borderLeft = '3px solid #4361ee';
        } else {
            message.style.background = 'rgba(76, 201, 240, 0.1)';
            message.style.borderLeft = '3px solid #4cc9f0';
            message.style.textAlign = 'right';
        }
        
        message.textContent = text;
        messageContainer.appendChild(message);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    // Conversation decision tree
    const conversationTree = {
        start: {
            message: "Salut ! Je suis SpeciBot. Besoin d'aide pour choisir ta spécialité ?",
            options: [
                { 
                    text: "Je ne sais pas quelle spé choisir", 
                    nextId: "what_interests" 
                },
                { 
                    text: "Parle-moi des spécialités disponibles", 
                    nextId: "list_specialties" 
                },
                { 
                    text: "Je voudrais comparer deux spécialités", 
                    nextId: "compare_intro" 
                }
            ]
        },
        what_interests: {
            message: "Super ! Pour t'aider, dis-moi ce qui t'intéresse le plus :",
            options: [
                { 
                    text: "J'aime créer des applications et sites web", 
                    nextId: "suggest_webdev" 
                },
                { 
                    text: "Je suis passionné par les données et l'analytique", 
                    nextId: "suggest_bigdata" 
                },
                { 
                    text: "La cybersécurité me fascine", 
                    nextId: "suggest_cybersec" 
                },
                { 
                    text: "J'adore l'IA et le Machine Learning", 
                    nextId: "suggest_ai" 
                },
                { 
                    text: "Je m'intéresse à la VR/AR et nouvelles interfaces", 
                    nextId: "suggest_vrar" 
                }
            ]
        },
        list_specialties: {
            message: "Voici les spécialités disponibles : \n💻 Développement Web & Mobile\n🔐 Cybersécurité\n📊 Big Data & BI\n🤖 Intelligence Artificielle\n🥽 Réalité Virtuelle & Augmentée\n💼 Transformation Digitale\n\nLaquelle t'intéresse le plus ?",
            options: [
                { text: "Développement Web & Mobile", nextId: "more_webdev" },
                { text: "Cybersécurité", nextId: "more_cybersec" },
                { text: "Big Data & BI", nextId: "more_bigdata" },
                { text: "Intelligence Artificielle", nextId: "more_ai" },
                { text: "Réalité Virtuelle & Augmentée", nextId: "more_vrar" },
                { text: "Transformation Digitale", nextId: "more_dit" }
            ]
        },
        compare_intro: {
            message: "Bien sûr ! Quelles spécialités aimerais-tu comparer ?",
            options: [
                { text: "Web Dev vs Cybersécurité", nextId: "compare_web_cyber" },
                { text: "Big Data vs Intelligence Artificielle", nextId: "compare_data_ai" },
                { text: "VR/AR vs Transformation Digitale", nextId: "compare_vr_dit" },
                { text: "Cybersécurité vs Big Data", nextId: "compare_cyber_data" }
            ]
        },
        suggest_webdev: {
            message: "D'après tes intérêts, le Développement Web & Mobile pourrait te plaire ! Tu y apprendras à créer des sites et applications à la pointe de la technologie. Tu veux en savoir plus ?",
            options: [
                { text: "Oui, dis-m'en plus", nextId: "more_webdev" },
                { text: "Quels sont les débouchés ?", nextId: "webdev_jobs" },
                { text: "Suggère-moi une autre spécialité", nextId: "what_interests" }
            ]
        },
        suggest_bigdata: {
            message: "Avec ton intérêt pour les données, la spécialité Big Data & BI serait parfaite ! Tu apprendras à analyser de grands volumes de données et créer des visualisations pertinentes. Ça t'intéresse ?",
            options: [
                { text: "Oui, dis-m'en plus", nextId: "more_bigdata" },
                { text: "Quels sont les débouchés ?", nextId: "bigdata_jobs" },
                { text: "Suggère-moi une autre spécialité", nextId: "what_interests" }
            ]
        },
        suggest_cybersec: {
            message: "La Cybersécurité serait parfaite pour toi ! Tu apprendras à protéger les systèmes contre les menaces et à penser comme un hacker éthique. Ça te tente ?",
            options: [
                { text: "Oui, dis-m'en plus", nextId: "more_cybersec" },
                { text: "Quels sont les débouchés ?", nextId: "cybersec_jobs" },
                { text: "Suggère-moi une autre spécialité", nextId: "what_interests" }
            ]
        },
        suggest_ai: {
            message: "L'Intelligence Artificielle correspond bien à tes intérêts ! Tu exploreras le machine learning, le deep learning et la création de systèmes intelligents. Intéressé ?",
            options: [
                { text: "Oui, dis-m'en plus", nextId: "more_ai" },
                { text: "Quels sont les débouchés ?", nextId: "ai_jobs" },
                { text: "Suggère-moi une autre spécialité", nextId: "what_interests" }
            ]
        },
        suggest_vrar: {
            message: "La spécialité VR/AR serait parfaite pour toi ! Tu développeras des expériences immersives et découvriras les interfaces du futur. Ça t'intéresse ?",
            options: [
                { text: "Oui, dis-m'en plus", nextId: "more_vrar" },
                { text: "Quels sont les débouchés ?", nextId: "vrar_jobs" },
                { text: "Suggère-moi une autre spécialité", nextId: "what_interests" }
            ]
        },
        more_webdev: {
            message: "Le Développement Web & Mobile, c'est apprendre à créer des sites et applications modernes ! Tu découvriras les frameworks frontends comme React, Vue.js, les technologies backend comme Node.js, et les méthodologies agiles. C'est une spé très demandée sur le marché !",
            options: [
                { text: "Quels langages vais-je apprendre ?", nextId: "webdev_languages" },
                { text: "Est-ce difficile ?", nextId: "webdev_difficulty" },
                { text: "Voir les débouchés", nextId: "webdev_jobs" }
            ]
        },
        more_cybersec: {
            message: "En Cybersécurité, tu apprendras à protéger les systèmes d'information et à comprendre les techniques d'attaque pour mieux défendre. Au programme : pentest, forensics, cryptographie, gestion des incidents de sécurité... Un domaine passionnant !",
            options: [
                { text: "C'est compliqué ?", nextId: "cybersec_difficulty" },
                { text: "Quelles certifications obtenir ?", nextId: "cybersec_certifications" },
                { text: "Voir les débouchés", nextId: "cybersec_jobs" }
            ]
        },
        more_bigdata: {
            message: "Le Big Data & BI, c'est apprendre à exploiter de grandes quantités de données pour en tirer des insights business. Tu étudieras Hadoop, Spark, les data warehouses, et la visualisation de données avec Tableau ou PowerBI !",
            options: [
                { text: "Faut-il être bon en maths ?", nextId: "bigdata_maths" },
                { text: "Quelles technologies sont utilisées ?", nextId: "bigdata_tech" },
                { text: "Voir les débouchés", nextId: "bigdata_jobs" }
            ]
        },
        more_ai: {
            message: "L'Intelligence Artificielle est un domaine fascinant où tu apprendras à créer des systèmes qui peuvent apprendre et s'adapter. Tu étudieras le machine learning, le deep learning, le NLP et la vision par ordinateur !",
            options: [
                { text: "Faut-il être bon en maths ?", nextId: "ai_maths" },
                { text: "Quels frameworks sont utilisés ?", nextId: "ai_frameworks" },
                { text: "Voir les débouchés", nextId: "ai_jobs" }
            ]
        },
        more_vrar: {
            message: "La Réalité Virtuelle & Augmentée est une spécialité innovante ! Tu apprendras à développer des expériences immersives avec Unity ou Unreal Engine, à créer des interfaces 3D et à comprendre l'interaction homme-machine de demain.",
            options: [
                { text: "Faut-il savoir modéliser en 3D ?", nextId: "vrar_3d" },
                { text: "Quels langages sont utilisés ?", nextId: "vrar_languages" },
                { text: "Voir les débouchés", nextId: "vrar_jobs" }
            ]
        },
        more_dit: {
            message: "La Transformation Digitale est une spé orientée business et technologie. Tu apprendras à digitaliser les processus d'entreprise, à gérer des projets de transformation et à accompagner les organisations dans leur évolution numérique.",
            options: [
                { text: "Est-ce plus business que technique ?", nextId: "dit_business" },
                { text: "Quelles compétences y développe-t-on ?", nextId: "dit_skills" },
                { text: "Voir les débouchés", nextId: "dit_jobs" }
            ]
        },
        webdev_jobs: {
            message: "Les débouchés en Développement Web & Mobile sont nombreux : Développeur Frontend, Backend ou Fullstack, Lead Developer, CTO, Architecte Web, DevOps... Les salaires débutent entre 35-45K€ et peuvent dépasser 70K€ avec de l'expérience !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis Web Dev !", nextId: "final_choice_excited" }
            ]
        },
        cybersec_jobs: {
            message: "En Cybersécurité, tu pourras devenir Pentester, Security Engineer, SOC Analyst, RSSI, Consultant en sécurité... Les salaires sont attractifs (40-50K€ en début de carrière) et la demande est en forte hausse !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis la Cybersécurité !", nextId: "final_choice_excited" }
            ]
        },
        bigdata_jobs: {
            message: "Les métiers du Big Data sont très recherchés : Data Engineer, Data Analyst, Data Scientist, Chief Data Officer... Les salaires débutent entre 38-48K€ et peuvent atteindre 80K€+ pour les profils expérimentés !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis le Big Data !", nextId: "final_choice_excited" }
            ]
        },
        ai_jobs: {
            message: "L'IA offre des débouchés passionnants : ML Engineer, AI Researcher, NLP Specialist, Computer Vision Engineer... Les salaires sont parmi les plus élevés du secteur tech (42-55K€ en début de carrière) !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis l'IA !", nextId: "final_choice_excited" }
            ]
        },
        vrar_jobs: {
            message: "La VR/AR offre des débouchés innovants : VR/AR Developer, UX Designer immersif, 3D Artist, Technical Artist... Les salaires commencent entre 35-45K€, avec un secteur en pleine croissance !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis la VR/AR !", nextId: "final_choice_excited" }
            ]
        },
        dit_jobs: {
            message: "La Transformation Digitale permet de devenir Chief Digital Officer, Digital Project Manager, Digital Consultant, Digital Transformation Specialist... Les salaires varient de 40-50K€ en début de carrière !",
            options: [
                { text: "Retour aux spécialités", nextId: "list_specialties" },
                { text: "C'est décidé, je choisis la Transformation Digitale !", nextId: "final_choice_excited" }
            ]
        },
        compare_web_cyber: {
            message: "Web Dev vs Cybersécurité : Le Web Dev est plus créatif et centré sur la création d'applications, tandis que la Cybersécurité est plus analytique et se concentre sur la protection des systèmes. Le Web Dev a plus de postes disponibles, mais la Cybersécurité offre souvent des salaires plus élevés.",
            options: [
                { text: "Je préfère le Web Dev", nextId: "more_webdev" },
                { text: "Je préfère la Cybersécurité", nextId: "more_cybersec" },
                { text: "Comparer d'autres spécialités", nextId: "compare_intro" }
            ]
        },
        compare_data_ai: {
            message: "Big Data vs IA : Le Big Data se concentre sur la gestion et l'analyse de grandes quantités de données, tandis que l'IA se spécialise dans la création d'algorithmes intelligents. L'IA requiert généralement plus de compétences en maths, mais les deux domaines sont complémentaires et très demandés !",
            options: [
                { text: "Je préfère le Big Data", nextId: "more_bigdata" },
                { text: "Je préfère l'IA", nextId: "more_ai" },
                { text: "Comparer d'autres spécialités", nextId: "compare_intro" }
            ]
        },
        compare_vr_dit: {
            message: "VR/AR vs Transformation Digitale : La VR/AR est très technique et créative, centrée sur l'expérience utilisateur immersive. La Transformation Digitale combine business et tech, avec un focus sur l'organisation et la stratégie. La VR/AR est plus spécialisée, la Transformation Digitale plus polyvalente !",
            options: [
                { text: "Je préfère la VR/AR", nextId: "more_vrar" },
                { text: "Je préfère la Transformation Digitale", nextId: "more_dit" },
                { text: "Comparer d'autres spécialités", nextId: "compare_intro" }
            ]
        },
        compare_cyber_data: {
            message: "Cybersécurité vs Big Data : La Cybersécurité se concentre sur la protection des systèmes et des données, tandis que le Big Data vise à extraire des insights à partir des données. Les deux domaines sont analytiques, mais avec des finalités différentes. Ils se complètent parfaitement dans l'écosystème tech !",
            options: [
                { text: "Je préfère la Cybersécurité", nextId: "more_cybersec" },
                { text: "Je préfère le Big Data", nextId: "more_bigdata" },
                { text: "Comparer d'autres spécialités", nextId: "compare_intro" }
            ]
        },
        webdev_languages: {
            message: "En Web Dev, tu apprendras JavaScript (et ses frameworks comme React, Vue, Angular), HTML/CSS, puis côté backend, tu exploreras Node.js, Python (Django/Flask), PHP, ou Java. Tu découvriras aussi les bases de données SQL et NoSQL !",
            options: [
                { text: "C'est compliqué à apprendre ?", nextId: "webdev_difficulty" },
                { text: "Retour aux spécialités", nextId: "list_specialties" }
            ]
        },
        webdev_difficulty: {
            message: "Le Web Dev a une courbe d'apprentissage progressive ! Tu peux rapidement créer tes premiers sites, puis approfondir petit à petit. Le challenge vient de l'évolution constante des technologies, mais c'est aussi ce qui rend ce domaine passionnant !",
            options: [
                { text: "Je pense que ça me plaira !", nextId: "final_choice_excited" },
                { text: "Je ne suis pas convaincu...", nextId: "what_interests_confused" }
            ]
        },
        cybersec_difficulty: {
            message: "La Cybersécurité demande une bonne compréhension des systèmes, réseaux et programmation. C'est un domaine technique, mais super gratifiant ! On apprend beaucoup par la pratique, les CTF (Capture The Flag) et les labs.",
            options: [
                { text: "Ça a l'air passionnant !", nextId: "final_choice_excited" },
                { text: "C'est peut-être trop technique pour moi...", nextId: "what_interests_confused" }
            ]
        },
        bigdata_maths: {
            message: "Les bases en maths sont utiles, surtout les stats et les probas ! Mais pas d'inquiétude, tu apprendras progressivement. L'important est d'avoir une pensée logique et analytique. Les outils facilitent beaucoup le travail !",
            options: [
                { text: "Ça me rassure !", nextId: "bigdata_tech" },
                { text: "Je préfère explorer d'autres spés", nextId: "list_specialties" }
            ]
        },
        bigdata_tech: {
            message: "Tu exploreras Hadoop, Spark, Kafka pour le traitement de données, puis SQL/NoSQL (MongoDB, Cassandra) pour le stockage, et des outils comme Python (pandas, numpy), R, Tableau ou PowerBI pour l'analyse et la visualisation !",
            options: [
                { text: "Ça a l'air complet !", nextId: "final_choice_excited" },
                { text: "Je ne suis pas sûr...", nextId: "what_interests_confused" }
            ]
        },
        ai_maths: {
            message: "Oui, les maths sont importantes en IA : algèbre linéaire, calcul différentiel, proba/stats... Mais rassure-toi, tu les apprendras progressivement, en les appliquant à des cas concrets. Les frameworks facilitent aussi beaucoup le travail !",
            options: [
                { text: "Je suis prêt à relever le défi !", nextId: "ai_frameworks" },
                { text: "Je préfère quelque chose de moins mathématique...", nextId: "list_specialties" }
            ]
        },
        ai_frameworks: {
            message: "Tu utiliseras TensorFlow, PyTorch, scikit-learn pour le ML, des frameworks comme Hugging Face pour le NLP, OpenCV pour la vision, et des outils comme Keras pour simplifier le développement. Python est le langage principal !",
            options: [
                { text: "Ça me donne envie de me lancer !", nextId: "final_choice_excited" },
                { text: "Je vais encore réfléchir...", nextId: "what_interests_confused" }
            ]
        },
        vrar_3d: {
            message: "Des bases en 3D sont utiles mais pas obligatoires ! Tu apprendras à utiliser des assets prêts à l'emploi, et à les customiser. Si tu veux aller plus loin, tu pourras explorer Blender ou Maya, mais l'essentiel est la programmation et l'interaction !",
            options: [
                { text: "Parfait, ça me rassure !", nextId: "vrar_languages" },
                { text: "Je préfère explorer d'autres domaines", nextId: "list_specialties" }
            ]
        },
        vrar_languages: {
            message: "En VR/AR, tu utiliseras principalement C# avec Unity ou C++ avec Unreal Engine. Tu exploreras aussi des SDK comme ARCore, ARKit, ou le SDK Meta Quest. Le JavaScript est également utilisé pour la WebXR !",
            options: [
                { text: "Ça a l'air fascinant !", nextId: "final_choice_excited" },
                { text: "Je ne suis pas certain...", nextId: "what_interests_confused" }
            ]
        },
        dit_business: {
            message: "C'est un bon mix des deux ! Tu auras besoin de comprendre les technologies pour proposer les bonnes solutions, mais aussi les aspects business et organisationnels pour bien accompagner la transformation. C'est une spé polyvalente !",
            options: [
                { text: "J'aime cette polyvalence !", nextId: "dit_skills" },
                { text: "Je préfère quelque chose de plus technique", nextId: "list_specialties" }
            ]
        },
        dit_skills: {
            message: "Tu développeras des compétences en gestion de projet, analyse des processus, UX/UI, marketing digital, data analytics, et une compréhension des technologies web et mobiles. C'est très complet et très recherché !",
            options: [
                { text: "C'est exactement ce que je cherche !", nextId: "final_choice_excited" },
                { text: "Je préfère me spécialiser davantage...", nextId: "what_interests_confused" }
            ]
        },
        what_interests_confused: {
            message: "Pas de souci, c'est normal d'hésiter ! Peut-être devrions-nous explorer d'autres domaines qui pourraient te correspondre ?",
            options: [
                { text: "Oui, explorons d'autres spécialités", nextId: "what_interests" },
                { text: "Montre-moi la liste complète", nextId: "list_specialties" }
            ]
        },
        final_choice_excited: {
            message: "Excellent choix ! 🎉 Je suis sûr que tu vas adorer cette spécialité ! N'hésite pas à explorer la page détaillée pour en savoir plus sur le programme, les projets et les débouchés. Bon courage dans ton parcours !",
            options: [
                { text: "Merci pour ton aide !", nextId: "goodbye" },
                { text: "Je veux explorer une autre spécialité", nextId: "what_interests" }
            ]
        },
        goodbye: {
            message: "C'était un plaisir de t'aider ! Si tu as d'autres questions sur les spécialités, n'hésite pas à revenir me voir. Bonne chance dans ton parcours ! 👋",
            options: [
                { text: "Recommencer la conversation", nextId: "start" }
            ]
        }
    };
} 