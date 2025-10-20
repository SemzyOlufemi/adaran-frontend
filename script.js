// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');

mobileToggle?.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav?.classList.toggle('open');
});

// Simple reveal-on-scroll
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

// Navbar shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form (client-side demo / placeholder)
// Replace with real endpoint (Firebase, FormSubmit, Web3Forms) for production.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic client-side validation
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill out all fields.';
      formStatus.style.color = '#e6b3a1';
      return;
    }

    // Demo success (swap this with real POST)
    formStatus.textContent = 'Thanks — your message has been recorded (demo).';
    formStatus.style.color = '#bff3d4';
    contactForm.reset();
  });

  fetch('http://localhost:5000/api/test')
  .then(res => res.json())
  .then(data => {
    console.log('Response from backend:', data);
    document.getElementById('output').textContent = data.message;
  })
  .catch(err => console.error('Error connecting:', err));

}
 