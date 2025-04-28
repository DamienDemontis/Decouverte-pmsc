document.addEventListener('DOMContentLoaded', function() {
  // ===== Fonctionnalité des accordéons =====
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });
  
  // ===== Menu toggle pour mobile =====
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  let sidebarOverlay = document.querySelector('.sidebar-overlay');
  
  if (menuToggle && sidebar) {
    // Create overlay if it doesn't exist
    if (!sidebarOverlay) {
      sidebarOverlay = document.createElement('div');
      sidebarOverlay.className = 'sidebar-overlay';
      // Insert overlay before the sidebar or append to body
      if (mainContent) {
         mainContent.parentNode.insertBefore(sidebarOverlay, mainContent);
      } else {
         document.body.appendChild(sidebarOverlay);
      }
    }

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
      document.body.classList.toggle('sidebar-open'); // Prevent body scroll
    });

    // Close sidebar when clicking on the overlay
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    });

     // Optional: Close sidebar when a link inside it is clicked
     sidebar.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
          sidebar.classList.remove('active');
           sidebarOverlay.classList.remove('active');
           document.body.classList.remove('sidebar-open');
        }
    });
  }
  
  // ===== Bouton retour en haut =====
  const backToTop = document.getElementById('back-to-top');
  
  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ===== Navigation en sections améliorée et titres sticky =====
  // Références aux éléments
  const sections = document.querySelectorAll('section[id]');
  const sectionHeaders = document.querySelectorAll('section h2');
  const sectionNavItems = document.querySelectorAll('.section-nav-item');
  const sectionNav = document.querySelector('.section-nav');
  
  // Fonction pour attribuer des IDs aux sections qui correspondent à la navigation mais n'ont pas d'ID
  function initSectionIds() {
    // Récupérer tous les hrefs de la navigation
    const navTargets = Array.from(sectionNavItems).map(item => {
      const href = item.getAttribute('href');
      return href.startsWith('#') ? href.substring(1) : href;
    });
    
    // Pour chaque section sans ID, vérifier si son titre correspond à un élément de navigation
    document.querySelectorAll('section').forEach(section => {
      if (!section.id && section.querySelector('h2')) {
        const title = section.querySelector('h2').textContent.toLowerCase();
        
        // Cas spécial pour l'écosystème
        if (title.includes('écosystème') && navTargets.includes('ecosystem')) {
          section.id = 'ecosystem';
          console.log("ID 'ecosystem' attribué à une section d'écosystème");
        }
      }
    });
    
    // Mettre à jour la liste des sections avec ID
    return document.querySelectorAll('section[id]');
  }
  
  // Initialiser les IDs des sections
  const updatedSections = initSectionIds();
  
  // Solution pour le problème de l'écosystème technique
  // Chercher les sections avec des titres contenant "Écosystème" et leur donner l'ID "ecosystem" si elles n'ont pas d'ID
  document.querySelectorAll('section h2').forEach(header => {
    const text = header.textContent.toLowerCase();
    const section = header.closest('section');
    
    if (text.includes('écosystème') && section && !section.id) {
      section.id = 'ecosystem';
      console.log("Ajout de l'ID 'ecosystem' à une section d'écosystème");
    }
  });
  
  // Vérifier la correspondance entre les ID des sections et les href des éléments de navigation
  if (sections.length > 0 && sectionNavItems.length > 0) {
    console.log("Sections détectées:", sections.length);
    
    // Afficher les IDs des sections pour le débogage
    sections.forEach(section => {
      const id = section.getAttribute('id');
      console.log(`Section ID: ${id}`);
      
      // Vérifier si une correspondance existe dans la navigation
      const navMatch = Array.from(sectionNavItems).find(item => item.getAttribute('href') === `#${id}`);
      console.log(`  Navigation match: ${navMatch ? 'Oui' : 'Non'}`);
    });
  }
  
  // Variable pour suivre la direction du défilement
  let lastScrollY = window.scrollY;
  
  // Variables pour stabiliser la navigation active
  let activeNavItemHref = null;
  let lastActiveChangeTime = 0;
  const ACTIVE_CHANGE_COOLDOWN = 500; // Temps minimal entre deux changements d'élément actif (en ms)
  
  // Fonction optimisée pour mettre à jour la navigation active
  function updateActiveNavItem() {
    if (sections.length === 0 || sectionNavItems.length === 0) return;
    
    const now = Date.now();
    const scrollPosition = window.scrollY + 100;
    let foundActive = false;
    let newActiveHref = null;
    
    // Parcourir les sections de bas en haut pour trouver la première visible
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - 150; // Ajuster la marge pour une meilleure détection
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      // Vérifier si cette section est visible dans la fenêtre
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        let matchFound = false;
        
        // Vérifier s'il y a une correspondance directe avec un élément de navigation
        sectionNavItems.forEach(item => {
          const itemHref = item.getAttribute('href');
          
          // Cas standard : l'ID de section correspond au href
          if (itemHref === `#${sectionId}`) {
            newActiveHref = itemHref;
            foundActive = true;
            matchFound = true;
          }
        });
        
        // Si aucune correspondance n'a été trouvée mais que la section contient "Écosystème", activer ce lien
        if (!matchFound) {
          const sectionTitle = section.querySelector('h2');
          
          if (sectionTitle && sectionTitle.textContent.toLowerCase().includes('écosystème')) {
            const ecosystemNavItem = Array.from(sectionNavItems).find(
              item => item.getAttribute('href') === '#ecosystem'
            );
            
            if (ecosystemNavItem) {
              newActiveHref = '#ecosystem';
              foundActive = true;
            }
          }
        }
        
        // Si on a trouvé une section active, sortir de la boucle
        if (foundActive) break;
      }
    }
    
    // Si aucune section n'est active et que nous sommes tout en haut de la page, activer la première section
    if (!foundActive && window.scrollY < 150 && sections.length > 0 && sectionNavItems.length > 0) {
      const firstSectionId = sections[0].getAttribute('id');
      const firstNavItem = Array.from(sectionNavItems).find(item => 
        item.getAttribute('href') === `#${firstSectionId}`
      );
      
      if (firstNavItem) {
        newActiveHref = firstNavItem.getAttribute('href');
      }
    }
    
    // Vérifier si nous devons mettre à jour la navigation active
    // Appliquer un "cooldown" pour éviter les changements trop rapides
    if (newActiveHref !== null && (newActiveHref !== activeNavItemHref || now - lastActiveChangeTime > ACTIVE_CHANGE_COOLDOWN)) {
      // Mettre à jour la navigation active seulement si c'est un nouvel élément ou si assez de temps s'est écoulé
      sectionNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === newActiveHref) {
          item.classList.add('active');
          activeNavItemHref = newActiveHref;
          lastActiveChangeTime = now;
          
          // Centrer l'élément de navigation
          centerNavItem(item);
        }
      });
    }
  }
  
  // Fonction helper pour centrer un élément de navigation
  function centerNavItem(navItem) {
    if (sectionNav) {
      const navWidth = sectionNav.offsetWidth;
      const itemOffset = navItem.offsetLeft;
      const itemWidth = navItem.offsetWidth;
      
      sectionNav.scrollTo({
        left: itemOffset - navWidth / 2 + itemWidth / 2,
        behavior: 'smooth'
      });
    }
  }
  
  // Créer un Intersection Observer pour les titres sticky
  if ('IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        // Ignorer les changements pendant un défilement rapide
        if (isScrolling && Date.now() - lastActiveChangeTime < ACTIVE_CHANGE_COOLDOWN / 2) return;
        
        entries.forEach(entry => {
          if (!entry.target.classList.contains('section-title')) return;
          
          // Vérifier direction du défilement
          const scrollingDown = window.scrollY > lastScrollY;
          lastScrollY = window.scrollY;
          
          if (entry.isIntersecting) {
            // Obtenir l'ID de la section parente
            const sectionId = entry.target.closest('section').id;
            
            // Désactiver le mode sticky seulement sur certains titres
            sectionHeaders.forEach(header => {
              // Ne pas changer l'état des titres dans les sections actives ou adjacentes
              const headerSectionId = header.closest('section').id;
              if (headerSectionId && headerSectionId !== sectionId) {
                header.classList.remove('is-sticky');
              }
            });
            
            // Le titre entre dans le viewport
            if (scrollingDown && entry.boundingClientRect.top <= 0) {
              entry.target.classList.add('is-sticky');
            } else if (!scrollingDown && entry.boundingClientRect.top > 0) {
              entry.target.classList.remove('is-sticky');
            }
          } else {
            // Le titre sort du viewport
            if (entry.boundingClientRect.top < 0) {
              if (scrollingDown) {
                // On défile vers le bas et le titre sort par le haut
                entry.target.classList.remove('is-sticky');
              } else {
                // On défile vers le haut et le titre sort par le bas
                if (Math.abs(entry.boundingClientRect.top) > 100) {
                  // Seulement si on est suffisamment loin du bord
                  entry.target.classList.add('is-sticky');
                }
              }
            } else {
              entry.target.classList.remove('is-sticky');
            }
          }
        });
      },
      { 
        threshold: 0,
        rootMargin: "-5px 0px 0px 0px" // Déclencher dès que le titre touche le haut, avec une petite marge
      }
    );
    
    // Ajouter une classe pour les titres à observer et les observer
    sectionHeaders.forEach(header => {
      // Si le parent n'a pas d'ID, essayer de lui en donner un basé sur le contenu du titre
      if (!header.parentElement.id && header.textContent) {
        const possibleId = header.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, '')    // Supprimer les caractères spéciaux
          .replace(/\s+/g, '-')       // Remplacer les espaces par des tirets
          .replace(/^[^a-z]+/, '')    // S'assurer que l'ID commence par une lettre
          .substring(0, 20);          // Limiter la longueur
          
        if (possibleId && !document.getElementById(possibleId)) {
          header.parentElement.id = possibleId;
          console.log(`ID généré pour une section: ${possibleId}`);
        }
      }
      
      // Ajouter la classe pour observer
      header.classList.add('section-title');
      headerObserver.observe(header);
    });
    
    // Observer pour activation de la navigation
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Si on vient de changer d'élément actif récemment, ignorer ce changement
          const now = Date.now();
          if (now - lastActiveChangeTime < ACTIVE_CHANGE_COOLDOWN) return;
          
          const section = entry.target;
          const id = section.id;
          
          if (!id) return;
          
          // Gérer le cas normal d'un ID correspondant directement
          let navItem = document.querySelector(`.section-nav-item[href="#${id}"]`);
          
          // Cas spécial pour l'écosystème
          if (!navItem && section.querySelector('h2')) {
            const title = section.querySelector('h2').textContent.toLowerCase();
            if (title.includes('écosystème')) {
              navItem = document.querySelector('.section-nav-item[href="#ecosystem"]');
            }
          }
          
          if (entry.isIntersecting && navItem) {
            const navItemHref = navItem.getAttribute('href');
            // Vérifier si c'est un nouvel élément actif
            if (navItemHref !== activeNavItemHref) {
              // Section visible - mettre à jour la navigation
              sectionNavItems.forEach(item => item.classList.remove('active'));
              navItem.classList.add('active');
              
              // Mettre à jour l'état actif
              activeNavItemHref = navItemHref;
              lastActiveChangeTime = now;
              
              // Centrer l'élément de navigation
              centerNavItem(navItem);
            }
          }
        });
      },
      {
        rootMargin: '-10% 0px -60% 0px', // Ajuster la marge pour une meilleure stabilité
        threshold: 0.1
      }
    );
    
    // Observer chaque section
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // Fallback pour les navigateurs sans IntersectionObserver
    window.addEventListener('scroll', () => {
      sectionHeaders.forEach(header => {
        const sectionTop = header.parentElement.getBoundingClientRect().top;
        const sectionBottom = header.parentElement.getBoundingClientRect().bottom;
        
        if (sectionTop <= 0 && sectionBottom > 0) {
          header.classList.add('is-sticky');
        } else {
          header.classList.remove('is-sticky');
        }
      });
      
      // Mettre à jour également la navigation
      updateActiveNavItem();
    });
  }
  
  // Mettre à jour la navigation active lors du défilement avec un peu de debounce
  let scrollTimer;
  let isScrolling = false;
  
  window.addEventListener('scroll', () => {
    // Marquer que nous sommes en train de défiler
    isScrolling = true;
    
    // Annuler le précédent timer
    if (scrollTimer) clearTimeout(scrollTimer);
    
    // Créer un nouveau timer pour mettre à jour la navigation une fois le défilement terminé
    scrollTimer = setTimeout(() => {
      updateActiveNavItem();
      isScrolling = false;
    }, 100); // Attendre 100ms après la fin du défilement
  });
  
  // Initialiser la navigation active avec un délai pour s'assurer que tout est chargé
  setTimeout(updateActiveNavItem, 300);
  
  // Ajouter un comportement de clic amélioré sur les éléments de navigation
  sectionNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obtenir l'ID de la section cible
      const targetId = this.getAttribute('href');
      let targetSection = document.querySelector(targetId);
      
      // Cas spécial pour l'écosystème - chercher une section avec un titre contenant "Écosystème" si l'ID ne correspond pas
      if (!targetSection && targetId === '#ecosystem') {
        const ecosystemSection = Array.from(document.querySelectorAll('section h2'))
          .find(header => header.textContent.toLowerCase().includes('écosystème'));
          
        if (ecosystemSection) {
          targetSection = ecosystemSection.closest('section');
          console.log("Section d'écosystème trouvée par le titre:", targetSection);
        }
      }
      
      if (targetSection) {
        // Ajouter une animation de clic
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        // Désactiver temporairement la mise à jour automatique des sections actives
        const previousTime = lastActiveChangeTime;
        lastActiveChangeTime = Date.now();
        
        // Mettre à jour la navigation active
        sectionNavItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Mettre à jour l'état actif
        activeNavItemHref = this.getAttribute('href');
        
        // Faire défiler jusqu'à la section cible avec un petit décalage
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: 'smooth'
        });
        
        // Empêcher les changements d'état pendant le défilement animé
        scrollTimer = setTimeout(() => {
          lastActiveChangeTime = Date.now(); // Réinitialiser le temps de dernier changement
        }, 800); // Un peu plus long que la durée de l'animation de défilement
      }
    });
  });
  
  // Ajouter un effet d'animation au survol de la barre de navigation
  if (sectionNav) {
    sectionNav.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    sectionNav.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.transition = 'transform 0.3s ease';
    });
  }
  
  // ===== Animation de l'orbite et changement de fond =====
  const techOrbit = document.querySelector('.tech-orbit');
  const techIcons = document.querySelectorAll('.tech-icon');
  const orbitCircle = document.querySelector('.orbit-circle');
  const heroSection = document.querySelector('.hero-section');
  let hoverTimeout;
  const defaultGradient = 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)';
  let radius = 250; // Sera mis à jour
  let angle = 0;
  let animationFrameId;
  let isAnimating = true;
  let hoveredIcon = null;

  // Fonction pour mettre à jour le rayon (inchangée)
  function updateOrbitRadius() {
    if (techOrbit) {
      const orbitWidth = parseFloat(window.getComputedStyle(techOrbit).width);
      // Ensure radius is never NaN or 0 if calculation fails briefly
      radius = (orbitWidth / 2) > 0 ? (orbitWidth / 2) : 150; // Min radius 150px
      // console.log("Orbit radius updated:", radius);
    } else {
      radius = 150; // Fallback/minimum
    }
  }

  // Fonction pour définir les angles initiaux (appelée une fois)
  function setInitialAngles() {
    if (!techOrbit || techIcons.length === 0) return;
    const numIcons = techIcons.length;
    techIcons.forEach((icon, index) => {
      icon.dataset.angle = (index / numIcons) * 2 * Math.PI;
    });
  }

  // Fonction pour mettre à jour la position d'UNE icône (appelée dans la boucle)
  function updateIconPosition(icon) {
    const currentAngle = parseFloat(icon.dataset.angle || 0) + angle;
    // Use the CURRENT radius for calculations
    const newX = Math.cos(currentAngle) * radius;
    const newY = Math.sin(currentAngle) * radius;
    icon.style.setProperty('--tx', `${newX}px`);
    icon.style.setProperty('--ty', `${newY}px`);
  }

  // Fonction pour démarrer/arrêter l'animation (inchangée)
  function toggleOrbitAnimation(start) {
    isAnimating = start;
    if (isAnimating && !animationFrameId) {
      animationFrameId = requestAnimationFrame(rotateTechIcons);
    } else if (!isAnimating && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Animation de rotation
  function rotateTechIcons() {
    if (!isAnimating || !techOrbit) {
      animationFrameId = null;
      return;
    }

    // *** Mise à jour du rayon à chaque frame ***
    updateOrbitRadius();

    angle += 0.001; // Vitesse de rotation

    // Mettre à jour la position de chaque icône
    techIcons.forEach(updateIconPosition);

    // Faire tourner aussi le cercle de l'orbite
    if (orbitCircle) {
      orbitCircle.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
    }

    animationFrameId = requestAnimationFrame(rotateTechIcons); // Continue loop
  }

  // Function to generate gradient based on color
  function generateGradient(hexColor) {
    const lightColor = hexToRgba(hexColor, 0.2);
    const midColor = hexToRgba(hexColor, 0.4);
    return `linear-gradient(135deg, ${lightColor} 0%, ${midColor} 50%, ${hexColor} 100%)`;
  }

  // Helper to convert hex to rgba (optional, depends on gradient logic)
  function hexToRgba(hex, alpha) {
    if (!hex || hex.length < 7) hex = '#0EA5E9'; // Fallback color
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (techOrbit && techIcons.length > 0 && heroSection) {
    // Fonction pour initialiser/réinitialiser l'orbite
    function initializeOrbit() {
      setInitialAngles(); // Définit les angles de base une seule fois
      // Attendre le prochain frame pour démarrer
      requestAnimationFrame(() => {
        if(isAnimating && !animationFrameId) {
          // Update positions once before starting animation loop
          techIcons.forEach(updateIconPosition); // Met à jour rayon + position
          animationFrameId = requestAnimationFrame(rotateTechIcons);
        } else {
          // Ensure positions are correct even if not animating initially
          updateOrbitRadius(); // Get current radius
          techIcons.forEach(updateIconPosition); // Set positions based on current angle/radius
        }
      });
    }

    // Initialiser au chargement
    initializeOrbit();

    // Recalculer au redimensionnement (avec debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      const wasAnimating = isAnimating;
      toggleOrbitAnimation(false); // Arrêter l'animation temporairement

      resizeTimer = setTimeout(() => {
        // Réinitialise les positions basé sur le nouveau rayon
        initializeOrbit(); // Redémarre l'init (qui relance l'anim si needed)
      }, 250); // Debounce
    });

    // Gestion du survol (inchangée)
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        hoveredIcon = icon;
        clearTimeout(hoverTimeout);
        const color = icon.dataset.color || '#0EA5E9';
        const newGradient = generateGradient(color);
        document.documentElement.style.setProperty('--hero-before-bg-dynamic', newGradient);
        heroSection.classList.add('background-active');
      });

      icon.addEventListener('mouseleave', () => {
        hoveredIcon = null;
        hoverTimeout = setTimeout(() => {
          heroSection.classList.remove('background-active');
        }, 100);
      });
    });
  }

  // Add CSS Variable use in home.css for the ::before background
  /*
  In assets/css/home.css, update the .hero-section::before rule:
  .hero-section::before {
    ...
    background: var(--hero-before-bg-dynamic, linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%));
    ...
  }
  */

  // ===== Animation des compteurs =====
  // ... existing code ...

  // ===== Initialisation de TypewriterJS pour l'effet de machine à écrire =====
  const typewriterElement = document.getElementById('typewriter-text');

  if (typewriterElement && typeof Typewriter !== 'undefined') {
    const typewriter = new Typewriter(typewriterElement, {
      loop: true,
      delay: 75,
      deleteSpeed: 50
    });
  
  const specialties = [
      'Intelligence Artificielle',
      'Big Data & Analytics',
      'Cloud Computing',
      'Cybersécurité',
      'Internet of Things',
      'VR/AR',
      'Digital Transformation',
      'Project Management',
      'Fintech',
      'Marketing',
      'IA & Transformation',
      'Data Protection',
      'RH Digitale',
      'Santé, IA & IoT',
      'Data Science & BI'
    ];

    // Shuffle array for variety
    specialties.sort(() => Math.random() - 0.5);

    typewriter
      .pauseFor(1000)
      .typeString(specialties[0])
      .pauseFor(2500)
      .deleteAll(50); // Use deleteSpeed

    for (let i = 1; i < specialties.length; i++) {
      typewriter
        .typeString(specialties[i])
        .pauseFor(2500)
        .deleteAll(50);
    }

    typewriter.start();

  } else if (typewriterElement) {
    console.warn('TypewriterJS library not found. Please include it in your HTML.');
    // Fallback or leave empty if library is missing
    typewriterElement.textContent = 'votre domaine...';
  }

  // ===== Scroll Animations =====
  const scrollElements = document.querySelectorAll('.specialties-section, .specialties-grid, .stats-band, .cta-section, .category-card, .specialite-card');
    
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger effect based on index within its group (e.g., cards in a grid)
          // Simple approach: use index provided by forEach
          // More robust: check parent/sibling structure if needed
          const delay = (index % 6) * 100; // Apply delay up to 6 items, then repeat pattern
          entry.target.style.setProperty('--scroll-anim-delay', `${delay}ms`);

          entry.target.classList.add('is-visible');
          entry.target.classList.add('animate-on-scroll'); // Add the base class here too
          observerInstance.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
      // Add the base class initially to hide elements before they are observed
      el.classList.add('animate-on-scroll'); 
      observer.observe(el);
    });
    } else {
    // Fallback for older browsers: show all elements immediately
    scrollElements.forEach(el => {
      el.classList.add('is-visible');
      el.classList.add('animate-on-scroll'); 
    });
    }
    
  // ===== Hero Parallax Effect =====
  const heroVisual = document.querySelector('.hero-visual');

  if (heroSection && heroVisual) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      // Calculate mouse position relative to the center of the section
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Define parallax intensity (adjust these values)
      const intensityX = 15; 
      const intensityY = 10;

      // Calculate translation values
      const moveX = -(x / rect.width) * intensityX;
      const moveY = -(y / rect.height) * intensityY;

      // Apply the transform using requestAnimationFrame for performance
      requestAnimationFrame(() => {
        heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    // Reset transform when mouse leaves the section
    heroSection.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        heroVisual.style.transform = 'translate(0, 0)';
      });
    });
    
    // Ensure smooth transition back to original position
     heroVisual.style.transition = 'transform 0.3s ease-out';
  }

}); // Fin de DOMContentLoaded 