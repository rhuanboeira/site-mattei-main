window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    console.log('Scroll Y:', window.scrollY);
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  } else {
    console.error('Header não encontrado');
  }
});

// Inicializar ScrollReveal
window.sr = ScrollReveal({
  reset: false,
  mobile: true,
  distance: '30px',
  duration: 1000,
  easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  viewFactor: 0.2
});

function safeReveal(selector, options) {
  const element = document.querySelector(selector);
  if (element) {
    sr.reveal(selector, options);
  }
}

// Seção Hero (#hero)
safeReveal('#hero .overlay img', {
  origin: 'top',
  distance: '50px',
  opacity: 0,
  delay: 200
});

safeReveal('#hero .overlay-text h1', {
  origin: 'bottom',
  distance: '40px',
  opacity: 0,
  delay: 400
});

safeReveal('#hero .overlay-text p', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 600
});

// Seção Sobre (#sobre)
safeReveal('#sobre h2', {
  origin: 'left',
  distance: '30px',
  opacity: 0,
  delay: 200
});

safeReveal('#sobre figure img', {
  origin: 'right',
  distance: '40px',
  opacity: 0,
  delay: 300
});

safeReveal('#sobre figcaption p', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 500
});

safeReveal('#sobre .cta', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 700
});

// Seção Loja (#loja)
safeReveal('#loja h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 200
});

safeReveal('#loja p', {
  origin: 'top',
  distance: '20px',
  opacity: 0,
  delay: 400
});

safeReveal('#loja .carousel', {
  origin: 'bottom',
  distance: '40px',
  opacity: 0,
  delay: 500
});

// Seção Produtos (#produtos)
safeReveal('#produtos h2', {
  origin: 'left',
  distance: '30px',
  opacity: 0,
  delay: 200
});

safeReveal('.product-list li', {
  origin: 'bottom',
  distance: '30px',
  opacity: 0,
  delay: 400,
  interval: 200
});

// Seção Feedback (#feedback-carousel)
safeReveal('#feedback-carousel h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 200
});

safeReveal('.feedback-slide', {
  origin: 'bottom',
  distance: '30px',
  opacity: 0,
  delay: 400,
  interval: 200
});

// Seção Contato (#contato)
safeReveal('#contato .endereco', {
  origin: 'left',
  distance: '40px',
  opacity: 0,
  delay: 200
});

safeReveal('#contato h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 400
});