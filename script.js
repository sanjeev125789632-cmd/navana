document.addEventListener('DOMContentLoaded', () => {
  
  // ----------------------------------------------------
  // 1. Header Scroll State
  // ----------------------------------------------------
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on startup

  // ----------------------------------------------------
  // 2. Mobile Navigation Toggle
  // ----------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Highlight active link based on current page route
    const currentPath = window.location.pathname.toLowerCase();
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const cleanHref = href.toLowerCase().replace(/^\.\.\//, '').replace(/^\//, '').replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
      const cleanPath = currentPath.replace(/^\//, '').replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');

      if ((cleanPath === '' && (cleanHref === '' || cleanHref === '#' || cleanHref === '#hero')) || (cleanPath !== '' && cleanHref !== '' && cleanPath.endsWith(cleanHref))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ----------------------------------------------------
  // 3. Scroll Reveal (Intersection Observer)
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep performance optimal
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ----------------------------------------------------
  // 4. Floating Connection Hub Menu
  // ----------------------------------------------------
  const floatingHub = document.querySelector('.floating-hub');
  const hubTrigger = document.querySelector('.hub-trigger');

  if (hubTrigger && floatingHub) {
    hubTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      hubTrigger.classList.toggle('active');
      floatingHub.classList.toggle('open');
    });

    // Close floating hub if clicked anywhere else
    document.addEventListener('click', () => {
      hubTrigger.classList.remove('active');
      floatingHub.classList.remove('open');
    });
  }

  // ----------------------------------------------------
  // 5. Toast Notification System
  // ----------------------------------------------------
  const toastContainer = document.querySelector('.toast-container');

  const showToast = (title, message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Force reflow and slide-in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Event listener for manual close
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    });

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
      }
    }, 5000);
  };

  // ----------------------------------------------------
  // 6. Contact Form Submission Handling (Web3Forms API)
  // ----------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const phoneInput = document.getElementById('formPhone');
      const messageInput = document.getElementById('formMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitBtnText = submitBtn.querySelector('span');

      // Basic Validation Check
      if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
        showToast('Submission Error', 'Please fill in all required fields.');
        return;
      }

      // Visual Loading Feedback
      const originalText = submitBtnText.textContent;
      submitBtnText.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.75';
      submitBtn.style.pointerEvents = 'none';

      const formData = new FormData(contactForm);
      if (!formData.get('access_key')) {
        formData.append('access_key', 'b5730e3b-e938-4af4-a496-31366194bff5');
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          showToast(
            'Message Sent Successfully!', 
            'Thank you for contacting NAVANA. Your message has been sent directly to our mailbox.'
          );
          contactForm.reset();
        } else {
          showToast('Submission Error', json.message || 'Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        showToast('Submission Error', 'Unable to connect. Please check your network connection.');
      })
      .finally(() => {
        submitBtnText.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';

        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => input.blur());
      });
    });
  }

  // ----------------------------------------------------
  // 7. Interactive Map Details
  // ----------------------------------------------------
  const mapPin = document.querySelector('.map-pin');
  if (mapPin) {
    mapPin.addEventListener('click', () => {
      showToast('NAVANA Office Location', 'Shop 53, 19 East, Nerul, Navi Mumbai. Visited daily from 10:00 AM to 7:00 PM.');
    });
  }
});
