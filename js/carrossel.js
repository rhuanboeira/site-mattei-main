document.addEventListener("DOMContentLoaded", () => {
  //-- CARROSSEL PRINCIPAL 
  const slidesContainer = document.querySelector('.slides');
  const originalSlides = Array.from(document.querySelectorAll('.slide'));
  const setaEsquerda = document.querySelector('.prev');
  const setaDireita = document.querySelector('.next');

  let slideIndex = 3;
  let slideWidth;
  let slidesPerView = 6;
  let isTransitioning = false;
  let autoSlideInterval;

  const totalOriginal = originalSlides.length;

  if (!slidesContainer || !originalSlides.length || !setaEsquerda || !setaDireita) {
    console.error('Erro: Elementos do carrossel não encontrados.');
    return;
  }

  function clonarSlides(slides, quantidade, posicao) {
    const destino = posicao === 'inicio' ? 'prepend' : 'append';
    const parte = posicao === 'inicio' ? slides.slice(-quantidade) : slides.slice(0, quantidade);

    parte.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add('clone');
      slidesContainer[destino](clone);
    });
  }

  clonarSlides(originalSlides, 3, 'inicio');
  clonarSlides(originalSlides, 3, 'fim');

  const totalSlides = document.querySelectorAll('.slide').length;

  function calcularSlideWidth() {
    const slide = originalSlides[0];
    const estilos = window.getComputedStyle(slide);
    const margemDireita = parseFloat(estilos.marginRight || 0);
    const slideIndividualWidth = slide.getBoundingClientRect().width + margemDireita;

    if (window.innerWidth <= 600) {
      slidesPerView = 1;
    } else if (window.innerWidth <= 900) {
      slidesPerView = 2;
    } else {
      slidesPerView = totalOriginal;
    }

    slideWidth = slideIndividualWidth * slidesPerView;
  }

  function atualizarSlide(transicao = true) {
    slidesContainer.style.transition = transicao ? 'transform 0.5s ease-in-out' : 'none';
    slidesContainer.style.transform = `translateX(-${slideIndex * (slideWidth / slidesPerView)}px)`;
  }

  function moverSlide(direcao) {
    if (isTransitioning) return;
    isTransitioning = true;

    slideIndex += direcao;
    atualizarSlide(true);

    slidesContainer.addEventListener('transitionend', resetarSlide, { once: true });
  }

  function resetarSlide() {
    if (slideIndex >= totalSlides - slidesPerView + 1) {
      slideIndex = 0;
      atualizarSlide(false);
    } else if (slideIndex < 0) {
      slideIndex = totalSlides - slidesPerView;
      atualizarSlide(false);
    }
    isTransitioning = false;
  }

  function iniciarAutoSlide() {
    pararAutoSlide();
    autoSlideInterval = setInterval(() => moverSlide(1), 5000);
  }

  function pararAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  setaEsquerda.setAttribute('aria-label', 'Slide anterior');
  setaDireita.setAttribute('aria-label', 'Próximo slide');
  setaEsquerda.setAttribute('role', 'button');
  setaDireita.setAttribute('role', 'button');

  setaEsquerda.addEventListener('click', () => moverSlide(-1));
  setaDireita.addEventListener('click', () => moverSlide(1));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moverSlide(-1);
    if (event.key === 'ArrowRight') moverSlide(1);
  });

  window.addEventListener('resize', () => {
    calcularSlideWidth();
    atualizarSlide(false);
  });

  slidesContainer.addEventListener('mouseenter', pararAutoSlide);
  slidesContainer.addEventListener('mouseleave', iniciarAutoSlide);

  calcularSlideWidth();
  atualizarSlide(false);
  iniciarAutoSlide();

  //-- CARROSSEL DE FEEDBACK 
  const feedbackContainer = document.querySelector('.feedback-carousel-track');
  const feedbackSlides = Array.from(feedbackContainer?.querySelectorAll('.feedback-slide') || []);
  const feedbackPrev = document.querySelector('.feedback-prev');
  const feedbackNext = document.querySelector('.feedback-next');
  let feedbackIndex = 0;

  function atualizarFeedbackSlide() {
    if (feedbackContainer) {
      feedbackContainer.style.transform = `translateX(-${feedbackIndex * 100}%)`;
    }
  }

  feedbackPrev?.addEventListener('click', () => {
    feedbackIndex = (feedbackIndex - 1 + feedbackSlides.length) % feedbackSlides.length;
    atualizarFeedbackSlide();
  });

  feedbackNext?.addEventListener('click', () => {
    feedbackIndex = (feedbackIndex + 1) % feedbackSlides.length;
    atualizarFeedbackSlide();
  });

  atualizarFeedbackSlide();
});