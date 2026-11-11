    'use strict';

    // -------------------------------------------------------
    // 1. STICKY HEADER — add shadow on scroll
    // -------------------------------------------------------
    (function () {
      var header = document.getElementById('main-header');
      function onScroll() {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
    })();

    // -------------------------------------------------------
    // 2. HAMBURGER MENU TOGGLE (mobile)
    // -------------------------------------------------------
    (function () {
      var hamburger = document.getElementById('hamburger');
      var navLinks = document.getElementById('nav-links');

      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
      });

      // Close nav when any link is clicked
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close nav when clicking outside
      document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    })();

    // -------------------------------------------------------
    // 3. SCROLL-TO-TOP BUTTON
    // -------------------------------------------------------
    (function () {
      var btn = document.getElementById('scroll-top');
      window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();

    // -------------------------------------------------------
    // 4. OPTIONAL FORM HANDLING (Safe Guarded)
    // -------------------------------------------------------
    (function () {
      var form = document.getElementById('enquiry-form');
      if (!form) return; // Exit cleanly if direct contact buttons are used
    })();

    // -------------------------------------------------------
    // 5. ACTIVE NAV LINK HIGHLIGHT (Intersection Observer)
    // -------------------------------------------------------
    (function () {
      var sections = document.querySelectorAll('section[id], main > section[id]');
      var navItems = document.querySelectorAll('.nav-links a');

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navItems.forEach(function (a) {
              var href = a.getAttribute('href');
              if (href === '#' + id) {
                a.style.color = 'var(--primary)';
              } else {
                a.style.color = '';
              }
            });
          }
        });
      }, { rootMargin: '-50% 0px -50% 0px' });

      sections.forEach(function (section) { observer.observe(section); });
    })();

    // -------------------------------------------------------
    // 6. PREMIUM SCROLL REVEAL (Bulletproof & Safe)
    // -------------------------------------------------------
    (function () {
      try {
        if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          document.documentElement.classList.add('js-ready');
          var targets = document.querySelectorAll('.reveal-on-scroll, .reveal-image');

          var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
              }
            });
          }, {
            threshold: 0.08,
            rootMargin: '0px 0px 50px 0px'
          });

          targets.forEach(function (el) {
            revealObserver.observe(el);
          });
        }
      } catch (e) {
        // If anything fails, all elements stay 100% visible
        console.error('Animation notice:', e);
      }
    })();
