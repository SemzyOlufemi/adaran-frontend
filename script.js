// ==============================
// Mobile menu toggle
// ==============================
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileToggle && mainNav) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });
}

// ==============================
// Reveal on scroll animation
// ==============================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ==============================
// Navbar shadow on scroll
// ==============================
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ==============================
// Scroll to top button
// ==============================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ==============================
// Contact form connection (Render backend)
// ==============================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect data
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const message = (formData.get('message') || '').trim();

    // Validate fields
    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill out all fields.';
      formStatus.style.color = '#e6b3a1';
      return;
    }

    // Show loading message
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#ccc';

    // Send to backend
    fetch('https://adarannig-backend.onrender.com/contact', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          formStatus.textContent = '✅ Message sent successfully!';
          formStatus.style.color = '#bff3d4';
          contactForm.reset();
        } else {
          formStatus.textContent = '❌ Failed to send message. Please try again.';
          formStatus.style.color = '#e6b3a1';
        }
      })
      .catch(err => {
        console.error('Error sending message:', err);
        formStatus.textContent = '⚠️ Server error. Try again later.';
        formStatus.style.color = '#e6b3a1';
      });
  });
}
