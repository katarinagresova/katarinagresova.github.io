/* Four small behaviours: the theme toggle, fading sections in as you reach
   them, the reading-progress hairline, and highlighting the nav link for
   whichever section you're looking at. Nothing on the page depends on any
   of them. */

(function () {
  'use strict';

  /* --- Theme toggle ------------------------------------------------------ */

  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');

  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Reveal on scroll -------------------------------------------------- */

  var revealables = document.querySelectorAll('.section .reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* --- Hairline under the nav once the page scrolls ---------------------- */

  var nav = document.querySelector('.nav');
  if (nav && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('nav--stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* --- Reading progress -------------------------------------------------- */

  var progress = document.querySelector('.progress span');
  if (progress) {
    var ticking = false;

    var paint = function () {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.setProperty('--progress', Math.min(1, Math.max(0, ratio)));
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paint);
    }, { passive: true });

    window.addEventListener('resize', paint, { passive: true });
    paint();
  }

  /* --- Highlight the nav link for the section in view -------------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));

  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    var sections = [];

    navLinks.forEach(function (link) {
      var id = (link.getAttribute('href') || '').split('#')[1];
      var section = id && document.getElementById(id);
      if (!section) return;
      linkFor[id] = link;
      sections.push(section);
    });

    // More than one section can cross the middle band at once, so track them
    // all and light up whichever sits highest on the page.
    var visible = [];

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var at = visible.indexOf(id);
        if (entry.isIntersecting && at === -1) visible.push(id);
        if (!entry.isIntersecting && at !== -1) visible.splice(at, 1);
      });

      var top = visible
        .map(function (id) { return document.getElementById(id); })
        .sort(function (a, b) { return a.offsetTop - b.offsetTop; })[0];

      navLinks.forEach(function (link) { link.removeAttribute('aria-current'); });
      if (top && linkFor[top.id]) linkFor[top.id].setAttribute('aria-current', 'true');
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }
})();
