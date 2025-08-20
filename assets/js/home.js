/**
 * Home page specific JavaScript - extracted from inline script
 * Handles animations, typewriter effects, and interactive elements
 */

// Cache DOM elements for better performance
let cachedElements = {};

document.addEventListener('DOMContentLoaded', function() {
  // Cache frequently used DOM elements
  cacheDOMElements();
  
  // Initialize all home page functionality
  initCountUpAnimation();
  initTypewriterEffect();
  initTechOrbitAnimation();
  initScrollAnimations();
  initSmoothScroll();
  initPersonalityTestButton();
});

/**
 * Cache frequently used DOM elements
 */
function cacheDOMElements() {
  cachedElements = {
    typewriterElement: document.getElementById('typewriter-text'),
    techOrbit: document.querySelector('.tech-orbit'),
    orbitCircle: document.querySelector('.orbit-circle'),
    techIcons: document.querySelectorAll('.tech-icon'),
    heroSection: document.querySelector('.hero-section'),
    specialtyCards: document.querySelectorAll('.specialite-card'),
    counters: document.querySelectorAll('.count-up')
  };
}

/**
 * Count-up animation for statistics
 */
function initCountUpAnimation() {
  const counters = cachedElements.counters;
  if (!counters || counters.length === 0) return;
  
  counters.forEach(counter => {
    const updateCount = (startTime) => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const duration = 2000; // 2 seconds total
      
      const target = +counter.getAttribute('data-count');
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(target * progress);
      
      counter.innerText = currentCount;
      
      if (progress < 1) {
        requestAnimationFrame(() => updateCount(startTime));
      } else {
        counter.innerText = target;
      }
    };
    
    // Start counting when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount(performance.now());
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

/**
 * Typewriter effect for specialty text
 */
function initTypewriterEffect() {
  const typewriterElement = cachedElements.typewriterElement;
  if (!typewriterElement) return;

  const specialties = [
    "Intelligence Artificielle",
    "Cybersécurité",
    "Big Data & Analytics",
    "Cloud Computing",
    "VR/AR",
    "Internet of Things (IoT)",
    "Strategic Project Management",
    "Fintech & Stratégies financières",
    "Marketing & Influence",
    "IA & Transformation des organisations"
  ];

  let currentText = '';
  let currentSpecialtyIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let isWaiting = false;
  let animationFrameId = null;
  let isActive = true;

  typewriterElement.textContent = '';

  function typeEffect() {
    if (!typewriterElement || !isActive) return;
    
    const currentSpecialty = specialties[currentSpecialtyIndex];
    
    if (isWaiting) {
      animationFrameId = requestAnimationFrame(() => {
        setTimeout(typeEffect, 50);
      });
      return;
    }

    // Typing
    if (!isDeleting && currentCharIndex <= currentSpecialty.length) {
      currentText = currentSpecialty.substring(0, currentCharIndex);
      typewriterElement.textContent = currentText;
      currentCharIndex++;
      
      if (currentCharIndex > currentSpecialty.length) {
        isWaiting = true;
        setTimeout(() => {
          if (isActive) {
            isWaiting = false;
            isDeleting = true;
          }
        }, 1000);
      }
    } 
    // Deleting
    else if (isDeleting && currentCharIndex >= 0) {
      currentText = currentSpecialty.substring(0, currentCharIndex);
      typewriterElement.textContent = currentText;
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentSpecialtyIndex = (currentSpecialtyIndex + 1) % specialties.length;
        isWaiting = true;
        setTimeout(() => {
          if (isActive) {
            isWaiting = false;
          }
        }, 300);
      }
    }

    let typingSpeed = isDeleting ? 30 : 80;
    typingSpeed += Math.random() * 20;
    
    if (!isDeleting && currentCharIndex > 0 && currentSpecialty[currentCharIndex-1] === ' ') {
      typingSpeed += 40;
    }

    if (isActive) {
      animationFrameId = requestAnimationFrame(() => {
        setTimeout(typeEffect, typingSpeed);
      });
    }
  }

  setTimeout(typeEffect, 500);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    isActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

/**
 * Tech orbit animation for specialty icons
 */
function initTechOrbitAnimation() {
  const orbit = cachedElements.techOrbit;
  const orbitCircle = cachedElements.orbitCircle;
  const techIcons = cachedElements.techIcons;
  const heroSection = cachedElements.heroSection;
  
  if (!orbit || techIcons.length === 0) return;
  
  let angle = 0;
  const radius = 250;
  let isAnimating = true;
  let animationFrameId = null;
  let originalBackground = window.getComputedStyle(heroSection).background;
  let hoveredIcon = null;
  let lastTime = 0;
  const rotationSpeed = 0.005; // Degrees per second for consistent speed (very slow)
  
  // Pre-create pulse elements for reuse
  const pulseElements = new Map();
  techIcons.forEach(icon => {
    const pulseElement = document.createElement('div');
    pulseElement.className = 'icon-pulse';
    pulseElement.style.position = 'absolute';
    pulseElement.style.top = '0';
    pulseElement.style.left = '0';
    pulseElement.style.width = '100%';
    pulseElement.style.height = '100%';
    pulseElement.style.borderRadius = '50%';
    pulseElement.style.opacity = '0.2';
    pulseElement.style.transform = 'scale(1.5)';
    pulseElement.style.zIndex = '-1';
    pulseElement.style.animation = 'pulse 2s infinite';
    pulseElement.style.display = 'none';
    icon.appendChild(pulseElement);
    pulseElements.set(icon, pulseElement);
  });
  
  // Position icons in orbit
  techIcons.forEach((icon, index) => {
    const iconAngle = (index * (360 / techIcons.length)) * (Math.PI / 180);
    // Use transform3d for hardware acceleration
    icon.style.transform = `translate3d(${Math.cos(iconAngle) * radius}px, ${Math.sin(iconAngle) * radius}px, 0)`;
    icon.style.willChange = 'transform'; // Hint for browser optimization
    
    icon.dataset.angle = iconAngle;
    icon.dataset.x = Math.cos(iconAngle) * radius;
    icon.dataset.y = Math.sin(iconAngle) * radius;
    
    // Hover effects
    icon.addEventListener('mouseenter', () => {
      isAnimating = false;
      hoveredIcon = icon;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      
      const specialtyColor = icon.getAttribute('data-color');
      if (specialtyColor && heroSection) {
        heroSection.style.background = `linear-gradient(135deg, #F0F9FF 0%, ${specialtyColor}20 50%, #BAE6FD 100%)`;
      }
      
      icon.classList.add('hovered');
      
      // Show pre-created pulse element
      const pulseElement = pulseElements.get(icon);
      if (pulseElement) {
        pulseElement.style.display = 'block';
        pulseElement.style.backgroundColor = icon.getAttribute('data-color') || 'var(--primary)';
      }
    });
    
    icon.addEventListener('mouseleave', () => {
      isAnimating = true;
      hoveredIcon = null;
      
      if (heroSection) {
        heroSection.style.background = originalBackground;
      }
      
      icon.classList.remove('hovered');
      
      // Hide pre-created pulse element
      const pulseElement = pulseElements.get(icon);
      if (pulseElement) {
        pulseElement.style.display = 'none';
      }
      
      // Restart animation with current time
      lastTime = performance.now();
      rotateTechIcons(performance.now());
    });
  });
  

  
  function rotateTechIcons(currentTime) {
    if (!isAnimating) return;
    
    // Time-based animation for consistent speed
    if (lastTime === 0) {
      lastTime = currentTime;
    }
    
    const deltaTime = currentTime - lastTime;
    const deltaAngle = (rotationSpeed * deltaTime * Math.PI) / 180; // Convert to radians
    
    angle += deltaAngle;
    lastTime = currentTime;
    
    techIcons.forEach(icon => {
      if (icon === hoveredIcon) return;
      
      const currentAngle = parseFloat(icon.dataset.angle) + angle;
      const newX = Math.cos(currentAngle) * radius;
      const newY = Math.sin(currentAngle) * radius;
      
      // Use transform3d for hardware acceleration
      icon.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      
      icon.dataset.x = newX;
      icon.dataset.y = newY;
    });
    
    if (orbitCircle) {
      // Use transform3d for better performance
      orbitCircle.style.transform = `rotate3d(0, 0, 1, ${angle * (180 / Math.PI)}deg)`;
    }
    
    animationFrameId = requestAnimationFrame(rotateTechIcons);
  }
  
  // Start animation with initial time
  lastTime = performance.now();
  rotateTechIcons(performance.now());
  
  // Cleanup function
  window.addEventListener('beforeunload', () => {
    isAnimating = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

// Performance monitoring (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🚀 Home page performance optimizations loaded:');
  console.log('- DOM elements cached for faster access');
  console.log('- Count-up animations use requestAnimationFrame');
  console.log('- Typewriter effect optimized with proper cleanup');
  console.log('- Orbit animation uses pre-created elements');
  console.log('- Scroll animations use cached selectors');
}

/**
 * Animation for cards on scroll
 */
function initScrollAnimations() {
  const specialtyCards = cachedElements.specialtyCards;
  if (!specialtyCards || specialtyCards.length === 0) return;
  
  const animateOnScroll = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    elements.forEach(el => {
      observer.observe(el);
      el.style.transition = 'opacity 0.5s ease, transform 0.6s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });
  };
  
  // Animate specialty cards
  animateOnScroll(specialtyCards, 'animated-in');
  
  // Add animation styles only once
  if (!document.getElementById('home-animations-style')) {
    const style = document.createElement('style');
    style.id = 'home-animations-style';
    style.textContent = `
      .animated-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .typewriter {
        min-width: 5rem;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize personality test button functionality
 */
function initPersonalityTestButton() {
  const personalityTestBtn = document.getElementById('personality-test-hero-btn');
  
  if (personalityTestBtn) {
    personalityTestBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Vérifier si le bot est disponible
      const botContainer = document.getElementById('specialty-bot-container');
      const botAvatar = document.getElementById('bot-avatar');
      
      if (botContainer && botAvatar) {
        // Simuler un clic sur l'avatar pour ouvrir le bot
        botAvatar.click();
        
        // Attendre que le bot soit ouvert et lancer le test
        setTimeout(() => {
          if (typeof startPersonalityTest === 'function') {
            startPersonalityTest();
          } else if (typeof handleInlineClick === 'function') {
            handleInlineClick('personality_test_start');
          } else {
            console.warn('Système de test de personnalité non disponible');
          }
        }, 500);
      } else {
        console.warn('Bot assistant non trouvé');
      }
    });
  }
}