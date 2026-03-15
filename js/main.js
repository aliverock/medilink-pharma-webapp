/* ============================================================
   Prachin Pharmachem — main.js
   Vanilla JS: navigation, hero slider, counters, interactions
   ============================================================ */

'use strict';

/* ── DOM Ready Helper ────────────────────────────────────── */
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(function () {
  initHeader();
  initMobileNav();
  initHeroSlider();
  initCounters();
  initBackToTop();
  initProductFilter();
  initContactForm();
  initScrollAnimations();
});

/* ================================================================
   HEADER — sticky + scroll class
================================================================ */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ================================================================
   MOBILE NAVIGATION
================================================================ */
function initMobileNav() {
  const toggle  = document.querySelector('.nav-toggle');
  const nav     = document.querySelector('.main-nav');
  const cta     = document.querySelector('.header-cta');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    nav.classList.toggle('open', open);
    if (cta) cta.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close when a nav link is clicked (mobile)
  nav.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      if (cta) cta.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('#site-header')) {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      if (cta) cta.classList.remove('open');
    }
  });
}

/* ================================================================
   HERO SLIDER
================================================================ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  if (!slides.length) return;

  let current   = 0;
  let timer     = null;
  const DELAY   = 5500;

  function showSlide(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function autoPlay() {
    timer = setInterval(() => showSlide(current + 1), DELAY);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      showSlide(i);
      autoPlay();
    });
  });

  showSlide(0);
  autoPlay();
}

/* ================================================================
   ANIMATED COUNTERS
================================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 2000;
      const step   = 16;
      const inc    = target / (dur / step);
      let val      = 0;

      const tick = setInterval(() => {
        val += inc;
        if (val >= target) {
          val = target;
          clearInterval(tick);
        }
        el.textContent = Math.floor(val) + suffix;
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ================================================================
   BACK TO TOP
================================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================================
   PRODUCT FILTER (products page)
================================================================ */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.product-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });
}

/* ================================================================
   CONTACT FORM
================================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn     = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');

    btn.disabled    = true;
    btn.textContent = 'Sending…';

    // Simulate send (replace with fetch to real endpoint)
    setTimeout(() => {
      btn.disabled    = false;
      btn.textContent = 'Send Message';
      form.reset();
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
}

/* ================================================================
   SCROLL ANIMATIONS (fade-in on scroll)
================================================================ */
function initScrollAnimations() {
  const items = document.querySelectorAll(
    '.product-card, .blog-card, .cert-card, .update-card, .industry-card, .principle-card, .cert-page-card'
  );
  if (!items.length) return;

  // Set initial state
  items.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity .5s ease ${(i % 4) * 0.07}s, transform .5s ease ${(i % 4) * 0.07}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
}
