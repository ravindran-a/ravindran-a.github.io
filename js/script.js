/* ============================================================
   NAV — scroll-aware + mobile toggle
   ============================================================ */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* ============================================================
   ACTIVE NAV LINK — highlight on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navLinks.querySelector(`a[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   AUTO-ADD REVEAL CLASS TO SECTION ELEMENTS
   ============================================================ */
function addRevealClasses() {
  const selectors = [
    '#about .about-text',
    '#about .about-stats',
    '#about .stat-card',
    '#skills .skill-group',
    '#experience .timeline-item',
    '#competencies .competency-card',
    '#education .education-card',
    '#contact .contact-intro',
    '#contact .contact-card',
  ];

  selectors.forEach((selector, groupIndex) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        const delay = Math.min(i, 4);
        if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
      }
    });
  });

  // Re-observe newly added elements
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

addRevealClasses();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   SMOOTH ACTIVE NAV STYLE (CSS injection)
   ============================================================ */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--gold) !important;
    background: var(--gold-glow) !important;
  }
`;
document.head.appendChild(style);
