// ===== NEUROFIT - GLOBAL SCRIPTS =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  if (navbar && !navbar.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 60);
      if (backTop) backTop.classList.toggle('show', scrollY > 400);
    });
  } else if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.num[data-count]');
  let counted = false;
  function animateCounters() {
    if (counted || !counters.length) return;
    const first = counters[0];
    if (first.getBoundingClientRect().top < window.innerHeight * 0.85) {
      counted = true;
      counters.forEach(el => {
        const target = +el.dataset.count;
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + '+';
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== APPOINTMENT FORM (Homepage) =====
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('apptName').value;
      const phone = document.getElementById('apptPhone').value;
      const service = document.getElementById('apptService').value;
      const date = document.getElementById('apptDate').value;
      const msg = document.getElementById('apptMsg').value;
      const text = `Hello Neurofit Physio!%0A%0A*New Appointment Request*%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ADate: ${date}%0AMessage: ${msg || 'N/A'}`;
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent via WhatsApp!';
      btn.style.background = '#25D366';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  // ===== TESTIMONIALS SLIDER =====
  const testiTrack = document.getElementById('testiTrack');
  const testiDots = document.getElementById('testiDots');
  if (testiTrack && testiDots) {
    const cards = testiTrack.querySelectorAll('.testi-card');
    let currentSlide = 0;
    let cardsPerView = 3;
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    function getTotalSlides() { return Math.ceil(cards.length / cardsPerView); }
    function buildDots() {
      cardsPerView = getCardsPerView();
      const total = getTotalSlides();
      testiDots.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        if (i === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        testiDots.appendChild(dot);
      }
    }
    function goToSlide(index) {
      cardsPerView = getCardsPerView();
      const total = getTotalSlides();
      currentSlide = index >= total ? 0 : index;
      const cardWidth = cards[0].offsetWidth + 19;
      testiTrack.style.transform = `translateX(-${currentSlide * cardsPerView * cardWidth}px)`;
      testiDots.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }
    buildDots();
    window.addEventListener('resize', () => { buildDots(); goToSlide(0); });
    let testiAuto = setInterval(() => goToSlide(currentSlide + 1), 4000);
    testiTrack.closest('.testi-slider-wrapper').addEventListener('mouseenter', () => clearInterval(testiAuto));
    testiTrack.closest('.testi-slider-wrapper').addEventListener('mouseleave', () => {
      testiAuto = setInterval(() => goToSlide(currentSlide + 1), 4000);
    });
  }

  // ===== SET MIN DATE FOR DATE INPUTS =====
  document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
  });
});
