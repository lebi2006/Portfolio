// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Dark mode toggle (persisted in localStorage)
const themeToggle = document.getElementById('theme-toggle');
const rootEl = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = rootEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootEl.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    } else {
      rootEl.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    }
  });
}

// Scroll-triggered reveal animations
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealEls.length) {
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
}

// Cursor-reactive hero blob
const hero = document.querySelector('.hero');
const blobMain = document.querySelector('.blob-main');
const blobAccent = document.querySelector('.blob-accent');

if (hero && blobMain && blobAccent && !prefersReducedMotion) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    blobMain.style.transform = `translate(${x * 24}px, ${y * 24}px)`;
    blobAccent.style.transform = `translate(${x * -18}px, ${y * -18}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    blobMain.style.transform = '';
    blobAccent.style.transform = '';
  });
}

// Case study modal
const caseModal = document.getElementById('case-modal');
const caseModalContent = document.getElementById('case-modal-content');
const caseModalClose = document.getElementById('case-modal-close');

if (caseModal && caseModalContent) {
  document.querySelectorAll('.case-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const templateId = btn.getAttribute('data-case');
      const template = document.getElementById(templateId);
      if (!template) return;
      caseModalContent.innerHTML = '';
      caseModalContent.appendChild(template.content.cloneNode(true));
      caseModal.showModal();
    });
  });

  if (caseModalClose) {
    caseModalClose.addEventListener('click', () => caseModal.close());
  }

  // Click on the backdrop (outside the dialog's own box) closes it
  caseModal.addEventListener('click', (e) => {
    const rect = caseModal.getBoundingClientRect();
    const inDialog =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) caseModal.close();
  });
}
