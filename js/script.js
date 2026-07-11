
'use strict';

/**
 * Finka Aura Fauzi Portfolio
 * Shared interactions for navigation, theme, animation, project filters,
 * project modal, skill bars, contact validation, and page transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loader = document.getElementById('page-loader');
  const header = document.getElementById('site-header');
  const nav = document.getElementById('main-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const scrollTopButton = document.getElementById('scroll-top');

  // Mark the active navigation link using the current page identifier.
  const currentPage = body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Theme preference: saved selection first, device preference second.
  const savedTheme = localStorage.getItem('finka-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
  }

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('finka-theme', nextTheme);
  });

  // Mobile navigation.
  function closeMenu() {
    nav?.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
    body.classList.remove('menu-open');
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open');
    menuToggle.classList.toggle('active', Boolean(isOpen));
    menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    body.classList.toggle('menu-open', Boolean(isOpen));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuToggle?.contains(event.target)) {
      closeMenu();
    }
  });

  // Header state and scroll-to-top control.
  function handleScroll() {
    const hasScrolled = window.scrollY > 20;
    header?.classList.toggle('scrolled', hasScrolled);
    scrollTopButton?.classList.toggle('visible', window.scrollY > 450);
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  scrollTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal elements when they enter the viewport.
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  // Animate skill bars only when visible.
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length && 'IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    skillBars.forEach((bar) => skillObserver.observe(bar));
  } else {
    skillBars.forEach((bar) => bar.classList.add('animated'));
  }

  // Project filtering.
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !shouldShow);
      });
    });
  });

  // Project details modal.
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalContribution = document.getElementById('modal-contribution');
  const modalTools = document.getElementById('modal-tools');
  let lastFocusedElement = null;

  function openModal(button) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = button.dataset.title || 'Project Details';
    modalCategory.textContent = button.dataset.categoryLabel || 'Project';
    modalImage.src = button.dataset.image || 'assets/images/project-1.jpg';
    modalImage.alt = `${button.dataset.title || 'Selected project'} placeholder image`;
    modalDescription.textContent = button.dataset.description || '';
    modalContribution.textContent = button.dataset.contribution || '';
    modalTools.textContent = button.dataset.tools || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    lastFocusedElement?.focus();
  }

  document.querySelectorAll('.project-detail-button').forEach((button) => {
    button.addEventListener('click', () => openModal(button));
  });
  modal?.querySelectorAll('[data-modal-close]').forEach((element) => element.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
    if (event.key === 'Escape' && nav?.classList.contains('open')) closeMenu();
  });

  // Front-end contact form validation only.
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = {
      fullName: document.getElementById('full-name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };
    let isValid = true;

    clearFormErrors(contactForm);

    if (!fields.fullName.value.trim()) {
      setFieldError(fields.fullName, 'Please enter your full name.');
      isValid = false;
    }
    if (!fields.email.value.trim()) {
      setFieldError(fields.email, 'Please enter your email address.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) {
      setFieldError(fields.email, 'Please enter a valid email address.');
      isValid = false;
    }
    if (!fields.subject.value.trim()) {
      setFieldError(fields.subject, 'Please add a subject.');
      isValid = false;
    }
    if (!fields.message.value.trim()) {
      setFieldError(fields.message, 'Please write a message.');
      isValid = false;
    } else if (fields.message.value.trim().length < 15) {
      setFieldError(fields.message, 'Please write at least 15 characters.');
      isValid = false;
    }

    if (isValid) {
      const status = document.getElementById('form-status');
      status.textContent = 'Thank you. Your form is valid. Connect it to Formspree, EmailJS, or a backend to deliver messages.';
      status.classList.add('visible');
      contactForm.reset();
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  function clearFormErrors(form) {
    form.querySelectorAll('.form-field').forEach((field) => field.classList.remove('invalid'));
    form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
    document.getElementById('form-status')?.classList.remove('visible');
  }

  function setFieldError(input, message) {
    const wrapper = input.closest('.form-field');
    const error = wrapper?.querySelector('.field-error');
    wrapper?.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
  }

  contactForm?.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => {
      input.closest('.form-field')?.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      const error = input.closest('.form-field')?.querySelector('.field-error');
      if (error) error.textContent = '';
    });
  });

  // Current footer year.
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Add a subtle transition before internal HTML page navigation.
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    const isInternalPage = href && href.endsWith('.html') && !link.hasAttribute('download');
    if (!isInternalPage) return;
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = href; }, 380);
    });
  });

  // Finish initial loading state.
  requestAnimationFrame(() => body.classList.add('page-ready'));
  window.setTimeout(() => loader?.classList.add('hidden'), 500);
});
