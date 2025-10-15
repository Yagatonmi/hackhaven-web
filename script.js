(function () {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const navToggleBtn = document.querySelector("[data-nav-toggle]");
  const themeToggleBtn = document.querySelector("[data-theme-toggle]");
  const primaryMenu = document.getElementById("primary-menu");

  // Theme handling
  const STORAGE_KEY = "aurora-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(theme) {
    // theme: 'light' | 'dark' | 'auto'
    root.setAttribute("data-theme", theme);
  }

  function loadInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme("auto");
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "auto";
    if (current === "auto") {
      const next = prefersDark.matches ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      setTheme(next);
      return;
    }
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  function handleSystemThemeChange() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null || stored === "auto") {
      setTheme("auto");
    }
  }

  // Mobile navigation
  function closeMenu() {
    header?.setAttribute("data-open", "false");
    navToggleBtn?.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    header?.setAttribute("data-open", "true");
    navToggleBtn?.setAttribute("aria-expanded", "true");
  }

  function toggleMenu() {
    const isOpen = header?.getAttribute("data-open") === "true";
    (isOpen ? closeMenu : openMenu)();
  }

  function handleNavLinkClick(e) {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  }

  function handleEscapeClose(e) {
    if (e.key === "Escape") closeMenu();
  }

  function handleOutsideClick(e) {
    if (!header) return;
    if (header.getAttribute("data-open") !== "true") return;
    if (!header.contains(e.target)) closeMenu();
  }

  // Scroll reveal
  function setupReveal() {
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    if (revealEls.length === 0) return;

    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionReduced) {
      revealEls.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  // Active section highlighting
  function setupActiveNav() {
    if (!primaryMenu) return;
    const links = Array.from(primaryMenu.querySelectorAll('a[href^="#"]'));
    if (links.length === 0) return;

    const map = links
      .map(link => {
        const id = decodeURIComponent(link.getAttribute('href') || '').replace('#','');
        const section = id ? document.getElementById(id) : null;
        return { link, section };
      })
      .filter(x => x.section);

    function updateActive() {
      const y = window.scrollY + 120; // header offset
      let current = null;
      for (const { link, section } of map) {
        const top = section.offsetTop;
        if (top <= y) current = link;
      }
      links.forEach(l => l.removeAttribute('aria-current'));
      if (current) current.setAttribute('aria-current', 'location');
    }

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
  }

  // Counters
  function setupCounters() {
    const counters = Array.from(document.querySelectorAll("[data-count]"));
    if (counters.length === 0) return;

    function animateCount(el) {
      const targetStr = el.getAttribute("data-count") || "0";
      const target = parseFloat(targetStr);
      const isInt = Number.isInteger(Number(targetStr));
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isInt ? Math.round(value).toLocaleString() : value.toFixed(1);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numEl = entry.target.querySelector('.num');
            if (numEl) animateCount(numEl);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll('.stat').forEach(s => observer.observe(s));
  }

  // 3D Tilt
  function setupTilt() {
    const tiltEls = Array.from(document.querySelectorAll('[data-tilt]'));
    if (tiltEls.length === 0) return;

    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionReduced) return;

    function handleMove(e, el) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);
      const rotateX = (py * -8).toFixed(2);
      const rotateY = (px * 8).toFixed(2);
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${mx}%`);
      el.style.setProperty('--my', `${my}%`);
    }

    function resetTilt(el) {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    }

    tiltEls.forEach(el => {
      el.addEventListener('mouseenter', () => el.style.transition = 'transform .12s ease');
      el.addEventListener('mousemove', (e) => handleMove(e, el));
      el.addEventListener('mouseleave', () => { el.style.transition = 'transform .35s ease'; resetTilt(el); });
      el.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        if (!t) return;
        handleMove(t, el);
      }, { passive: true });
      el.addEventListener('touchend', () => resetTilt(el));
    });
  }

  // Sticky header shadow on scroll
  function setupHeaderShadow() {
    function onScroll() {
      const y = window.scrollY;
      const scrolled = y > 6;
      header?.classList.toggle('header--scrolled', scrolled);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    loadInitialTheme();
    prefersDark.addEventListener('change', handleSystemThemeChange);

    themeToggleBtn?.addEventListener("click", toggleTheme);

    navToggleBtn?.addEventListener("click", toggleMenu);
    menu?.addEventListener("click", handleNavLinkClick);
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener('click', handleOutsideClick);

    setupReveal();
    setupActiveNav();
    setupCounters();
    setupTilt();
    setupHeaderShadow();

    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
})();
