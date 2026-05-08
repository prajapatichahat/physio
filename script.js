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
      link.addEventListener('click', (e) => {
        // If clicking a dropdown toggle, don't close the menu
        if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
          e.preventDefault();
          if (window.innerWidth <= 768) {
            link.parentElement.classList.toggle('active');
          }
          return;
        }
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

  // ===== HERO SLIDER =====
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroTextSlides = document.querySelectorAll('.hero-text-slide');
  const heroIndicators = document.querySelectorAll('#heroIndicators span');
  if (heroSlides.length > 1) {
    let currentHeroSlide = 0;
    function goToHeroSlide(index) {
      heroSlides.forEach(s => s.classList.remove('active'));
      heroTextSlides.forEach(s => s.classList.remove('active'));
      heroIndicators.forEach(s => s.classList.remove('active'));
      currentHeroSlide = index % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
      if (heroTextSlides[currentHeroSlide]) heroTextSlides[currentHeroSlide].classList.add('active');
      if (heroIndicators[currentHeroSlide]) heroIndicators[currentHeroSlide].classList.add('active');
    }
    heroIndicators.forEach(dot => {
      dot.addEventListener('click', () => goToHeroSlide(+dot.dataset.slide));
    });
    let heroAuto = setInterval(() => goToHeroSlide(currentHeroSlide + 1), 4000);
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(heroAuto));
      heroSection.addEventListener('mouseleave', () => {
        heroAuto = setInterval(() => goToHeroSlide(currentHeroSlide + 1), 4000);
      });
    }
  }

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
      window.open(`https://wa.me/919023931863?text=${text}`, '_blank');
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

  // ===== HOMEPAGE POPUP MODAL =====
  const homePopupModal = document.getElementById('homePopupModal');
  const closePopupModal = document.getElementById('closePopupModal');
  const popupModalBody = document.getElementById('popupModalBody');

  if (homePopupModal && popupModalBody) {
    // Configuration for popup content
    const popupConfig = {
      hasOffer: true, // Toggle this to true to show Offer, false to show Event
      offer: {
        image: "physio_offer_banner.png",
        link: "offers.html",
        alt: "Special Weekend Offer - Free OPD Checkup!"
      },
      event: {
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
        link: "appointment.html",
        alt: "Upcoming Health Camp"
      }
    };

    // Show popup every time the page loads
    setTimeout(() => {
      let contentHTML = "";

      if (popupConfig.hasOffer) {
        contentHTML = `
          <a href="${popupConfig.offer.link}">
            <img src="${popupConfig.offer.image}" alt="${popupConfig.offer.alt}" class="popup-img">
          </a>
        `;
      } else {
        contentHTML = `
          <a href="${popupConfig.event.link}">
            <img src="${popupConfig.event.image}" alt="${popupConfig.event.alt}" class="popup-img">
          </a>
        `;
      }

      popupModalBody.innerHTML = contentHTML;
      homePopupModal.classList.add('active');
    }, 1000); // 1.5 seconds delay before popup shows
    // Close functionality
    if (closePopupModal) {
      closePopupModal.addEventListener('click', () => {
        homePopupModal.classList.remove('active');
      });
    }

    // Close on clicking outside
    homePopupModal.addEventListener('click', (e) => {
      if (e.target === homePopupModal) {
        homePopupModal.classList.remove('active');
      }
    });
  }

  // ===== WHATSAPP WIDGET TOGGLE =====
  const waWidgetToggle = document.getElementById('waWidgetToggle');
  const waWidgetBox = document.getElementById('waWidgetBox');
  if (waWidgetToggle && waWidgetBox) {
    waWidgetToggle.addEventListener('click', () => {
      waWidgetBox.classList.toggle('active');
      waWidgetToggle.classList.toggle('active');
    });

    // Close WA widget when clicking outside
    // document.addEventListener('click', (e) => {
    //   if (!waWidgetToggle.contains(e.target) && !waWidgetBox.contains(e.target) && waWidgetBox.classList.contains('active')) {
    //     waWidgetBox.classList.remove('active');
    //     waWidgetToggle.classList.remove('active');
    //   }
    // });
  }
});
