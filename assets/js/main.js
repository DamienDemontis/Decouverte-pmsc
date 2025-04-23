// Attend que le DOM soit complètement chargé
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
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('active');
        }
      });
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
  
  // Typewriter effect for specialties
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;
  
  const specialties = [
    "Intelligence Artificielle",
    "Cybersécurité",
    "Big Data",
    "Réalité Virtuelle et Augmentée",
    "Cloud Computing",
    "DevOps",
    "Web 3.0",
    "Digital Marketing",
    "Blockchain"
  ];
  
  let currentSpecialtyIndex = 0;
  let isDeleting = false;
  let text = '';
  let delta = 200 - Math.random() * 100;
  
  function updateTypewriter() {
    const currentSpecialty = specialties[currentSpecialtyIndex];
    
    if (isDeleting) {
      text = currentSpecialty.substring(0, text.length - 1);
    } else {
      text = currentSpecialty.substring(0, text.length + 1);
    }
    
    typewriterElement.innerHTML = text;
    
    // Speed control
    if (isDeleting) {
      delta = 100; // Deleting is faster
    } else {
      delta = 200 - Math.random() * 100;
    }
    
    // Cycle control
    if (!isDeleting && text === currentSpecialty) {
      delta = 2000; // Wait before starting to delete
      isDeleting = true;
    } else if (isDeleting && text === '') {
      isDeleting = false;
      currentSpecialtyIndex = (currentSpecialtyIndex + 1) % specialties.length;
      delta = 500; // Pause before typing next specialty
    }
    
    setTimeout(updateTypewriter, delta);
  }
  
  updateTypewriter();
}); 