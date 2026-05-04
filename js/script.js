document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // EFECTO TYPEWRITER - Nombre del Hero
  // ==========================================
  const nameElement = document.querySelector('.hero-name');
  if (nameElement) {
    const fullText = nameElement.textContent;
    nameElement.textContent = '';
    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        nameElement.textContent += fullText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100);
  }

  // ==========================================
  // BARRA DE NAVEGACIÓN INTELIGENTE
  // Oculta al bajar, muestra al subir
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  const scrollThreshold = 10;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // ==========================================
  // DESPLAZAMIENTO SUAVE (Smooth Scroll)
  // Maneja offset para barra fija
  // ==========================================
  const smoothScrollLinks = document.querySelectorAll('.nav-links a, .pixel-btn[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetSection = document.getElementById(href.substring(1));
      
      if (targetSection) {
        e.preventDefault();
        navbar.classList.remove('hidden');
        
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // ANIMACIONES DE SCROLL REVEAL
  // Usa Intersection Observer para detectar
  // cuando los elementos entran en viewport
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Dejar de observar una vez animado (rendimiento)
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // EFECTO HOVER BOTONES (Escala + Parpadeo)
  // ==========================================
  const pixelButtons = document.querySelectorAll('.pixel-btn');
  pixelButtons.forEach(button => {
    let flickerInterval;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translate(-2px, -2px) scale(1.05)';
      
      let flickerCount = 0;
      flickerInterval = setInterval(() => {
        button.style.opacity = button.style.opacity === '0.7' ? '1' : '0.7';
        flickerCount++;
        if (flickerCount > 3) {
          clearInterval(flickerInterval);
          button.style.opacity = '1';
        }
      }, 50);
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.opacity = '1';
      if (flickerInterval) clearInterval(flickerInterval);
    });
  });

  // ==========================================
  // PARTÍCULAS DE FONDO (Pixel Particles)
  // ==========================================
  function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('pixel-particle');

      const size = Math.floor(Math.random() * 5) + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const top = Math.random() * 100;
      const left = Math.random() * 100;
      particle.style.top = `${top}vh`;
      particle.style.left = `${left}vw`;

      const duration = Math.random() * 4 + 3;
      particle.style.animationDuration = `${duration}s`;

      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;

      document.body.appendChild(particle);
    }
  }

  createParticles();
});