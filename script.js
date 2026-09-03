document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-menu');

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.classList.remove('open');
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  };

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  menuButton?.addEventListener('click', () => {
    const isOpen = navigation?.classList.toggle('open') ?? false;
    menuButton.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
      closeMenu();
      menuButton?.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!navigation?.classList.contains('open')) return;
    if (!navigation.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  const divisionSelect = document.getElementById('division');
  const divisionFields = document.getElementById('divisionFields');
  const detailOne = document.getElementById('detailOne');
  const detailTwo = document.getElementById('detailTwo');
  const detailOneLabel = document.getElementById('detailOneLabel');
  const detailTwoLabel = document.getElementById('detailTwoLabel');

  const fieldOptions = {
    haven: {
      firstLabel: 'Property type',
      firstOptions: ['Residential property', 'Commercial property', 'Not sure yet'],
      secondLabel: 'Preferred location',
      secondOptions: ['Nerul', 'Elsewhere in Navi Mumbai', 'Open to suggestions']
    },
    designs: {
      firstLabel: 'Space type',
      firstOptions: ['Home', 'Commercial space', 'Other'],
      secondLabel: 'Current stage',
      secondOptions: ['Planning stage', 'Site available for review', 'Renovation enquiry']
    },
    kitchens: {
      firstLabel: 'Kitchen stage',
      firstOptions: ['New kitchen', 'Kitchen replacement', 'Planning only'],
      secondLabel: 'Measurements available?',
      secondOptions: ['Yes', 'No', 'Partially']
    },
    essentials: {
      firstLabel: 'Product category',
      firstOptions: ['Bathroom fittings', 'Sanitaryware', 'Door hardware', 'Architectural fittings'],
      secondLabel: 'Specification available?',
      secondOptions: ['Yes', 'No', 'Need help preparing it']
    }
  };

  const fillSelect = (select, options) => {
    select.replaceChildren(new Option('Select an option', ''));
    options.forEach((option) => select.add(new Option(option, option)));
  };

  divisionSelect?.addEventListener('change', () => {
    const config = fieldOptions[divisionSelect.value];
    if (!config || !divisionFields || !detailOne || !detailTwo) {
      if (divisionFields) divisionFields.hidden = true;
      if (detailOne) detailOne.disabled = true;
      if (detailTwo) detailTwo.disabled = true;
      return;
    }
    detailOneLabel.textContent = config.firstLabel;
    detailTwoLabel.textContent = config.secondLabel;
    detailOne.name = config.firstLabel.toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '');
    detailTwo.name = config.secondLabel.toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '');
    fillSelect(detailOne, config.firstOptions);
    fillSelect(detailTwo, config.secondOptions);
    detailOne.disabled = false;
    detailTwo.disabled = false;
    divisionFields.hidden = false;
  });

  if (divisionSelect) {
    const requestedDivision = new URLSearchParams(window.location.search).get('division');
    if (requestedDivision && fieldOptions[requestedDivision]) {
      divisionSelect.value = requestedDivision;
      divisionSelect.dispatchEvent(new Event('change'));
    }
  }

  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.dataset.state = '';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || 'Submission failed.');
      form.reset();
      if (divisionFields) divisionFields.hidden = true;
      if (detailOne) detailOne.disabled = true;
      if (detailTwo) detailTwo.disabled = true;
      formStatus.textContent = 'Your enquiry has been sent. The selected NAVANA desk can follow up using the details you provided.';
      formStatus.dataset.state = 'success';
    } catch (error) {
      formStatus.textContent = 'The form could not be sent. Please use the division phone, WhatsApp or email link on this page.';
      formStatus.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
      formStatus.focus();
    }
  });
});
