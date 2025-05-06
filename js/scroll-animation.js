window.sr = ScrollReveal({
  reset: false, 
  mobile: true, 
  distance: '30px', 
  duration: 1000, 
  easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)', 
  viewFactor: 0.2 
});

// Seção Hero (#hero)
sr.reveal('#hero .overlay img', {
  origin: 'top',
  distance: '50px',
  opacity: 0,
  delay: 200
});

sr.reveal('#hero .overlay-text h1', {
  origin: 'bottom',
  distance: '40px',
  opacity: 0,
  delay: 400
});

sr.reveal('#hero .overlay-text p', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 600
});

// Seção Sobre (#sobre)
sr.reveal('#sobre h2', {
  origin: 'left',
  distance: '30px',
  opacity: 0,
  delay: 200
});

sr.reveal('#sobre figure img', {
  origin: 'right',
  distance: '40px',
  opacity: 0,
  delay: 400
});

sr.reveal('#sobre figcaption p', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 600
});

sr.reveal('#sobre .cta', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 800
});

// Seção Loja (#loja)
sr.reveal('#loja h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 200
});

sr.reveal('#loja p', {
  origin: 'top',
  distance: '20px',
  opacity: 0,
  delay: 400
});

sr.reveal('#loja .carousel', {
  origin: 'bottom',
  distance: '40px',
  opacity: 0,
  delay: 600
});

// Seção Produtos (#produtos)
sr.reveal('#produtos h2', {
  origin: 'left',
  distance: '30px',
  opacity: 0,
  delay: 200
});

sr.reveal('.product-list li', {
  origin: 'bottom',
  distance: '30px',
  opacity: 0,
  delay: 400,
  interval: 200 
});

// Seção Feedback (#feedback-carousel)
sr.reveal('#feedback-carousel h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 200
});

sr.reveal('.feedback-slide', {
  origin: 'bottom',
  distance: '30px',
  opacity: 0,
  delay: 400,
  interval: 200
});

// Seção Contato (#contato)
sr.reveal('#contato .endereco', {
  origin: 'left',
  distance: '40px',
  opacity: 0,
  delay: 200
});

sr.reveal('#contato h2', {
  origin: 'top',
  distance: '30px',
  opacity: 0,
  delay: 400
});

sr.reveal('.contato-conteudo form', {
  origin: 'right',
  distance: '40px',
  opacity: 0,
  delay: 600
});

sr.reveal('.contato-conteudo .meios', {
  origin: 'right',
  distance: '40px',
  opacity: 0,
  delay: 800
});

// Footer
sr.reveal('footer .social-media', {
  origin: 'bottom',
  distance: '30px',
  opacity: 0,
  delay: 200
});

sr.reveal('footer p', {
  origin: 'bottom',
  distance: '20px',
  opacity: 0,
  delay: 400
});