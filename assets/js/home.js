/**
 * Home page specific JavaScript - extracted from inline script
 * Handles animations, typewriter effects, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all home page functionality
  initCountUpAnimation();
  initTypewriterEffect();
  initTechOrbitAnimation();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Count-up animation for statistics
 */
function initCountUpAnimation() {
  const counters = document.querySelectorAll('.count-up');
  const speed = 200;
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    
    // Start counting when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
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
  const typewriterElement = document.getElementById('typewriter-text');
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
  let animationFrame;

  typewriterElement.textContent = '';

  function typeEffect() {
    if (!typewriterElement) return;
    
    const currentSpecialty = specialties[currentSpecialtyIndex];
    
    if (isWaiting) {
      animationFrame = requestAnimationFrame(() => {
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
          isWaiting = false;
          isDeleting = true;
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
          isWaiting = false;
        }, 300);
      }
    }

    let typingSpeed = isDeleting ? 30 : 80;
    typingSpeed += Math.random() * 20;
    
    if (!isDeleting && currentCharIndex > 0 && currentSpecialty[currentCharIndex-1] === ' ') {
      typingSpeed += 40;
    }

    animationFrame = requestAnimationFrame(() => {
      setTimeout(typeEffect, typingSpeed);
    });
  }

  setTimeout(typeEffect, 500);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
}

/**
 * Tech orbit animation for specialty icons
 */
function initTechOrbitAnimation() {
  const orbit = document.querySelector('.tech-orbit');
  const orbitCircle = document.querySelector('.orbit-circle');
  const techIcons = document.querySelectorAll('.tech-icon');
  const heroSection = document.querySelector('.hero-section');
  
  if (!orbit || techIcons.length === 0) return;
  
  let angle = 0;
  const radius = 250;
  let isAnimating = true;
  let animationFrameId = null;
  let originalBackground = window.getComputedStyle(heroSection).background;
  let hoveredIcon = null;
  
  // Position icons in orbit
  techIcons.forEach((icon, index) => {
    const iconAngle = (index * (360 / techIcons.length)) * (Math.PI / 180);
    icon.style.transform = `translate(${Math.cos(iconAngle) * radius}px, ${Math.sin(iconAngle) * radius}px)`;
    
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
      createPulseEffect(icon);
    });
    
    icon.addEventListener('mouseleave', () => {
      isAnimating = true;
      hoveredIcon = null;
      
      if (heroSection) {
        heroSection.style.background = originalBackground;
      }
      
      icon.classList.remove('hovered');
      
      const pulseElement = icon.querySelector('.icon-pulse');
      if (pulseElement) {
        icon.removeChild(pulseElement);
      }
      
      rotateTechIcons();
    });
  });
  
  function createPulseEffect(icon) {
    const pulseElement = document.createElement('div');
    pulseElement.className = 'icon-pulse';
    
    pulseElement.style.position = 'absolute';
    pulseElement.style.top = '0';
    pulseElement.style.left = '0';
    pulseElement.style.width = '100%';
    pulseElement.style.height = '100%';
    pulseElement.style.borderRadius = '50%';
    pulseElement.style.backgroundColor = icon.getAttribute('data-color') || 'var(--primary)';
    pulseElement.style.opacity = '0.2';
    pulseElement.style.transform = 'scale(1.5)';
    pulseElement.style.zIndex = '-1';
    pulseElement.style.animation = 'pulse 2s infinite';
    
    icon.appendChild(pulseElement);
  }
  
  function rotateTechIcons() {
    if (!isAnimating) return;
    
    angle += 0.001;
    
    techIcons.forEach(icon => {
      if (icon === hoveredIcon) return;
      
      const currentAngle = parseFloat(icon.dataset.angle) + angle;
      const newX = Math.cos(currentAngle) * radius;
      const newY = Math.sin(currentAngle) * radius;
      
      icon.style.transform = `translate(${newX}px, ${newY}px)`;
      
      icon.dataset.x = newX;
      icon.dataset.y = newY;
    });
    
    if (orbitCircle) {
      orbitCircle.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
    }
    
    animationFrameId = requestAnimationFrame(rotateTechIcons);
  }
  
  setTimeout(rotateTechIcons, 100);
}

/**
 * Animation for cards on scroll
 */
function initScrollAnimations() {
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
  animateOnScroll(document.querySelectorAll('.specialite-card'), 'animated-in');
  
  // Add animation styles
  const style = document.createElement('style');
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