/* ============================================
   MARY ROSE ANONAT — PORTFOLIO SCRIPT
   Sections below are labeled — edit values
   marked with EDIT comments as needed.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 400);
  });
  // Fallback in case load event already fired
  setTimeout(() => loader && loader.classList.add('loaded'), 2500);

  /* ---------- AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out',
      once: true,
      offset: 60
    });
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('active');
  });

  // Close mobile nav after clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- DARK MODE TOGGLE ---------- */
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkIcon = darkModeToggle.querySelector('i');
  const DARK_KEY = 'mra-dark-mode'; // localStorage key

  function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    darkIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  // Restore saved preference
  const savedPref = localStorage.getItem(DARK_KEY);
  if (savedPref === 'true') applyDarkMode(true);

  darkModeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDarkMode(isDark);
    localStorage.setItem(DARK_KEY, isDark);
  });

  /* ---------- ANIMATED STAT COUNTERS ---------- */
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count, 10);
      const duration = 1200;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- ANIMATED SKILL BARS ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    skillBars.forEach(bar => {
      const level = bar.dataset.level || 0;
      requestAnimationFrame(() => { bar.style.width = level + '%'; });
    });
  }

  /* ---------- INTERSECTION OBSERVER FOR HERO STATS & SKILLS ---------- */
  const heroStatsEl = document.querySelector('.hero-stats');
  const skillsSectionEl = document.querySelector('.skills');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target === heroStatsEl) animateCounters();
      if (entry.target === skillsSectionEl) animateSkillBars();
    });
  }, { threshold: 0.3 });

  if (heroStatsEl) observer.observe(heroStatsEl);
  if (skillsSectionEl) observer.observe(skillsSectionEl);

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- NAVBAR SHADOW ON SCROLL (subtle) ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 14px rgba(15,23,42,0.06)'
      : 'none';
  });

  /* ---------- TYPING EFFECT IN HERO ---------- */
  // EDIT: change the words array to customize the rotating titles
  const typedEl = document.getElementById('typedTarget');
  const words = ['Virtual Assistant', 'Executive Support', 'Personal Assistant', 'Operations Partner'];
  let wordIndex = 0;
  let charIndex = 0;
  let typingForward = true;

  function typeLoop() {
    if (!typedEl) return;
    const currentWord = words[wordIndex];

    if (typingForward) {
      charIndex++;
      typedEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        typingForward = false;
        return setTimeout(typeLoop, 1800); // pause at full word
      }
    } else {
      charIndex--;
      typedEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        typingForward = true;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, typingForward ? 70 : 35);
  }

  // Respect reduced-motion preference: skip animation, just show first word
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = words[0];
    } else {
      typedEl.textContent = '';
      charIndex = 0;
      setTimeout(typeLoop, 600);
    }
  }

  /* ---------- CONTACT FORM SUBMISSION (FORMSPREE) ---------- */
  // This form posts to Formspree (see the HTML comment above the <form>
  // tag for one-time setup steps). Submissions are sent via fetch so the
  // page can show an inline success/error message instead of redirecting.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Friendly reminder if the Formspree endpoint hasn't been set up yet
      if (contactForm.action.includes('YOUR_FORM_ID')) {
        formStatus.style.color = '#DC2626';
        formStatus.textContent = "Form isn't connected yet — add your Formspree form ID in index.html (see the comment above the form).";
        return;
      }

      formStatus.style.color = '';
      formStatus.textContent = 'Sending...';
      if (submitBtn) submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            formStatus.style.color = '';
            formStatus.textContent = "Thanks for reaching out! Your message has been sent — I'll get back to you within the same business day.";
            contactForm.reset();
          } else {
            return response.json().then(data => {
              throw new Error((data && data.error) || 'Something went wrong.');
            });
          }
        })
        .catch(() => {
          formStatus.style.color = '#DC2626';
          formStatus.textContent = "Something went wrong sending your message. Please try again, or email me directly.";
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------- SET CURRENT YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
