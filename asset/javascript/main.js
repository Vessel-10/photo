document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.reset();
});
document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Thank you for your interest! We\'ll contact you soon to get started.');
    });
});
// document.querySelector('.mobile-menu').addEventListener('click', function() {
//     const navLinks = document.querySelector('.nav-links');
//     navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
// });
// document.querySelector('.mobile-menu').addEventListener('click', function() {
//   const navLinks = document.querySelector('.nav-links');
//   navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
// });

document.querySelector('.mobile-menu').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelectorAll('.service-card, .portfolio-item, .testimonial').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
            
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

fetch('./asset/json/main.json')
  .then(response => response.json())
  .then(data => {
    const servicesContainer = document.querySelector('.services-grid');
    servicesContainer.innerHTML = ''; 
    data.services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      `;
      servicesContainer.appendChild(card);
    });

    const pricingContainer = document.querySelector('.pricing-grid');
    pricingContainer.innerHTML = '';
    data.pricing.forEach(plan => {
      const card = document.createElement('div');
      card.className = `pricing-card ${plan.featured ? 'featured' : ''}`;
      card.innerHTML = `
        <h3>${plan.title}</h3>
        <div class="price">${plan.price}<span>${plan.unit}</span></div>
        <ul class="pricing-features">
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="pricing-button">${plan.button}</button>
      `;
      pricingContainer.appendChild(card);
    });

    const testimonialContainer = document.querySelector('.testimonials-grid');
    testimonialContainer.innerHTML = '';
    data.testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial';
      div.innerHTML = `
        <div class="testimonial-avatar">${t.initials}</div>
        <div class="testimonial-text">"${t.text}"</div>
        <div class="testimonial-name">${t.name}<br><small>${t.role}</small></div>
      `;
      testimonialContainer.appendChild(div);
    });

   const portfolioContainer = document.querySelector('.portfolio-grid');
portfolioContainer.innerHTML = '';

data.portfolio.forEach(item => {
  const div = document.createElement('div');
  div.className = 'portfolio-item';
  div.style.backgroundImage = `url('${item.image}')`;
  div.style.backgroundPosition = 'center';
  div.style.backgroundSize = 'cover';
  div.style.backgroundRepeat = 'no-repeat';
  portfolioContainer.appendChild(div);
});

  })
  .catch(err => console.error('Error loading JSON:', err));
