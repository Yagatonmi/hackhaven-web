// Aurora Landing — script.js
(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const docEl = document.documentElement;

  // Theme handling -----------------------------------------------------------
  const THEME_KEY = 'aurora-theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    docEl.setAttribute('data-theme', savedTheme);
  } else {
    // Respect system preference on first load
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    docEl.setAttribute('data-theme', systemDark ? 'dark' : 'light');
  }

  function toggleTheme() {
    const current = docEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleBtn.setAttribute('aria-pressed', String(docEl.getAttribute('data-theme') === 'dark'));
  }

  // Mobile menu --------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.getAttribute('data-open') === 'true';
      const next = !isOpen;
      navLinks.setAttribute('data-open', String(next));
      menuToggle.setAttribute('aria-expanded', String(next));
      if (next) {
        // Trap focus to the first link for accessibility on mobile
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        menuToggle.focus();
      }
    });

    // Close on link click (mobile)
    navLinks.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('a')) {
        navLinks.setAttribute('data-open', 'false');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scrolling with sticky header offset ------------------------------
  function getHeaderOffsetPx() {
    const header = document.querySelector('.site-header');
    return header ? (header.getBoundingClientRect().height + 10) : 0;
  }

  function scrollToWithOffset(targetEl) {
    if (!targetEl) return;
    const y = targetEl.getBoundingClientRect().top + window.pageYOffset - getHeaderOffsetPx();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.length <= 1) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      scrollToWithOffset(target);
    }
  });

  // Scroll reveal ------------------------------------------------------------
  const revealElements = Array.from(document.querySelectorAll('.reveal'));
  if (revealElements.length && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealElements.forEach(el => io.observe(el));
  } else {
    // If reduced motion, show immediately
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 3D tilt on cards ---------------------------------------------------------
  const tiltCards = Array.from(document.querySelectorAll('.tilt'));
  if (tiltCards.length) {
    const strength = 12; // degrees

    function handlePointerMove(event, card) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (event.clientX - centerX) / (rect.width / 2);
      const percentY = (event.clientY - centerY) / (rect.height / 2);
      const rotateY = Math.max(-1, Math.min(1, percentX)) * strength; // left/right
      const rotateX = Math.max(-1, Math.min(1, -percentY)) * strength; // up/down
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    }

    function resetTilt(card) {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    }

    tiltCards.forEach(card => {
      if (prefersReducedMotion) return;
      card.addEventListener('pointermove', (e) => handlePointerMove(e, card));
      card.addEventListener('pointerleave', () => resetTilt(card));
      card.addEventListener('blur', () => resetTilt(card));
    });

    window.addEventListener('blur', () => tiltCards.forEach(resetTilt));
  }

  // Animated counters --------------------------------------------------------
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    function animateCount(el) {
      const target = Number(el.getAttribute('data-count') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const durationMs = 1000 + Math.min(2000, target * 2);
      const start = performance.now();

      function frame(now) {
        const progress = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = `${current.toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    }

    // Start when visible
    const io = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const valEl = entry.target.querySelector('.value') || entry.target;
          if (valEl) animateCount(valEl);
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.4 });

    counters.forEach(el => {
      const parentStat = el.closest('.stat') || el;
      io.observe(parentStat);
    });
  }

  // Current year in footer ---------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
