// ONYAME AKYEDIE STUDIO — FULL INTERACTIVE SCRIPT
// Author: Your Digital Partner
// Date: December 2025

document.addEventListener('DOMContentLoaded', function() {

  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // 2. SMOOTH SCROLLING FOR NAV LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });

        // Close mobile menu after click (if open)
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // 3. ADD ACTIVE CLASS TO NAV LINKS AS YOU SCROLL
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. FADE-IN ANIMATION ON SCROLL
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    fadeInObserver.observe(el);
  });

  // 5. PORTFOLIO LIGHTBOX
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.querySelector('.lightbox .close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.dataset.title || 'Untitled';
      const desc = this.dataset.desc || 'No description available';

      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });

  // Close lightbox when clicking outside
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // 6. BOOKING FORM VALIDATION
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      let isValid = true;

      if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
      } else {
        clearError('name');
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
      } else {
        clearError('email');
      }

      if (!service) {
        showError('service', 'Please select a service');
        isValid = false;
      } else {
        clearError('service');
      }

      if (!message) {
        showError('message', 'Please describe your project');
        isValid = false;
      } else {
        clearError('message');
      }

      if (isValid) {
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const serviceText = document.getElementById('service').selectedOptions[0].text;
        sendToWhatsApp([
          'Hello Onyame Akyedie Studio, I would like to book a session.',
          'Name: ' + name,
          'Email: ' + email,
          phone ? 'Phone: ' + phone : '',
          'Service: ' + serviceText,
          date ? 'Preferred date: ' + date : '',
          'Details: ' + message
        ].filter(Boolean).join('\n'), bookingForm);
        bookingForm.reset();
      }
    });
  }

  // 7. CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('cname').value.trim();
      const email = document.getElementById('cemail').value.trim();
      const message = document.getElementById('cmessage').value.trim();

      let isValid = true;

      if (!name) {
        showError('cname', 'Please enter your name');
        isValid = false;
      } else {
        clearError('cname');
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showError('cemail', 'Please enter a valid email');
        isValid = false;
      } else {
        clearError('cemail');
      }

      if (!message) {
        showError('cmessage', 'Please write your message');
        isValid = false;
      } else {
        clearError('cmessage');
      }

      if (isValid) {
        const subject = document.getElementById('csubject').value.trim();
        sendToWhatsApp([
          'Hello Onyame Akyedie Studio,',
          subject ? 'Subject: ' + subject : '',
          message,
          'From: ' + name + ' (' + email + ')'
        ].filter(Boolean).join('\n'), contactForm);
        contactForm.reset();
      }
    });
  }

  // 8. FORM ERROR HANDLING
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
      field.parentNode.insertBefore(error, field.nextSibling);
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = field.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
      error.remove();
    }
  }

  // 9. SEND FORMS TO WHATSAPP (opens WhatsApp with the form details filled in)
  function sendToWhatsApp(text, form) {
    const url = 'https://api.whatsapp.com/send?phone=233530184096&text=' + encodeURIComponent(text);

    // Show a message with a tap-able link, in case the browser blocks the automatic opening
    let box = form.querySelector('.wa-status');
    if (!box) {
      box = document.createElement('p');
      box.className = 'wa-status';
      form.appendChild(box);
    }
    box.textContent = 'Opening WhatsApp... ';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Tap here if it did not open';
    box.appendChild(link);

    window.open(url, '_blank');
  }

  // 10. SCROLL TO TOP BUTTON (Optional Enhancement)
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.pointerEvents = 'none';
    }
  });

  // Style scroll-to-top button
  const style = document.createElement('style');
  style.textContent = `
    .scroll-to-top {
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #3E2723;
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 998;
    }
    .scroll-to-top:hover {
      background: #FFD700;
      color: #3E2723;
      transform: translateY(-5px);
    }
  `;
  document.head.appendChild(style);

});

