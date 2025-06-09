document.addEventListener("DOMContentLoaded", () => {
  //-- CARROSSEL PRINCIPAL
  const slidesContainer = document.querySelector('.slides');
  const slidesWrapper = document.querySelector('.slides-wrapper'); // Adicionado wrapper para cálculo de largura
  const originalSlides = Array.from(slidesContainer?.querySelectorAll('.slide') || []);
  const setaEsquerda = document.querySelector('.prev');
  const setaDireita = document.querySelector('.next');

  let slideIndex = 3; // Índice inicial, considerando 3 clones no início
  let slidesPerView; // Será definido dinamicamente
  let currentSlideWidth; // Largura total que um slide ocupa (conteúdo + margem)
  let isTransitioning = false;
  let autoSlideInterval;

  const totalOriginal = originalSlides.length;

  // Verifica se os elementos do carrossel principal existem antes de inicializá-lo
  if (slidesContainer && originalSlides.length && setaEsquerda && setaDireita && slidesWrapper) {

    // Função para clonar slides e criar o efeito infinito
    function clonarSlides(slides, quantidade, posicao) {
      const destino = posicao === 'inicio' ? 'prepend' : 'append';
      const parte = posicao === 'inicio' ? slides.slice(-quantidade) : slides.slice(0, quantidade);

      parte.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone');
        slidesContainer[destino](clone);
      });
    }

    // Clona os slides para o efeito infinito (mantendo 3 clones no início e 3 no fim)
    // Isso garante que haja slides suficientes para preencher o espaço e permitir a rolagem contínua
    clonarSlides(originalSlides, 3, 'inicio');
    clonarSlides(originalSlides, 3, 'fim');

    const allSlides = Array.from(slidesContainer.querySelectorAll('.slide')); // Todos os slides (originais + clones)

    // Calcula a largura de um único slide (incluindo margens) e o número de slides por vista
    function calcularSlideProperties() {
      // Lógica de slidesPerView para mobile/desktop
      if (window.innerWidth <= 600) {
        slidesPerView = 1; // 1 slide por vez no mobile
      } else if (window.innerWidth <= 900) {
        slidesPerView = 2; // 2 slides por vez em tablets/telas médias
      } else {
        // Define 3 slides visíveis por vez no desktop para permitir o efeito infinito
        // e ter um tamanho razoável para as imagens.
        slidesPerView = 3; 
      }

      const wrapperWidth = slidesWrapper.getBoundingClientRect().width;
      const marginHorizontalPerSide = 8; // Do CSS: margin: 0 8px; em .slides li

      // Calcula a largura total que cada <li> (slide wrapper) deve ocupar,
      // incluindo suas margens, para preencher o wrapper.
      const liTotalOccupiedWidth = wrapperWidth / slidesPerView;

      // A largura do conteúdo interno da imagem (o <figure class="slide">)
      // é a largura total ocupada menos as margens horizontais (8px de cada lado).
      const slideContentWidth = liTotalOccupiedWidth - (2 * marginHorizontalPerSide);

      // Garante que a largura do conteúdo não seja negativa
      const finalSlideContentWidth = Math.max(0, slideContentWidth);

      // Aplica a largura calculada ao <figure class="slide">
      allSlides.forEach(slide => {
        slide.style.width = `${finalSlideContentWidth}px`;
      });
      
      // currentSlideWidth para translateX deve ser a largura total que um <li> ocupa
      // (largura do conteúdo + suas margens)
      currentSlideWidth = liTotalOccupiedWidth; 
      
      return currentSlideWidth;
    }

    // Atualiza a posição do carrossel
    function atualizarSlide(transicao = true) {
      slidesContainer.style.transition = transicao ? 'transform 0.5s ease-in-out' : 'none';
      slidesContainer.style.transform = `translateX(-${slideIndex * currentSlideWidth}px)`;
    }

    // Move o carrossel para a direção especificada
    function moverSlide(direcao) {
      if (isTransitioning) return;
      isTransitioning = true;

      // Parar o auto-slide ao interagir manualmente
      pararAutoSlide(); 

      slideIndex += direcao;
      atualizarSlide(true);

      slidesContainer.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    // Lida com o fim da transição para redefinir o índice sem transição visual
    function handleTransitionEnd() {
      // Se estamos nos clones do final e movemos para a frente
      // (totalOriginal + 3 clones adicionados no total, então a partir do índice totalOriginal + 3)
      if (slideIndex >= totalOriginal + 3) { 
        slideIndex = 3; // Volta para o primeiro slide original (índice 3, após os 3 clones iniciais)
        atualizarSlide(false); // Sem transição para o reset
      } 
      // Se estamos nos clones do início e movemos para trás
      // (quando slideIndex é menor que 3, estamos nos clones iniciais)
      else if (slideIndex < 3) {
        slideIndex = totalOriginal + 2; // Volta para o último slide original (índice totalOriginal + 2)
        atualizarSlide(false); // Sem transição para o reset
      }
      isTransitioning = false;
      iniciarAutoSlide(); // Reiniciar auto-slide após interação manual
    }

    // Inicia o auto-slide
    function iniciarAutoSlide() {
      pararAutoSlide(); // Garante que não haja múltiplos intervalos rodando
      autoSlideInterval = setInterval(() => moverSlide(1), 5000);
    }

    function pararAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Adiciona acessibilidade
    setaEsquerda.setAttribute('aria-label', 'Slide anterior');
    setaDireita.setAttribute('aria-label', 'Próximo slide');
    setaEsquerda.setAttribute('role', 'button');
    setaDireita.setAttribute('role', 'button');

    // Suporte a cliques e toques nas setas
    setaEsquerda.addEventListener('click', () => moverSlide(-1));
    setaDireita.addEventListener('click', () => moverSlide(1));

    // Suporte a toque para arrastar o carrossel (nas setas, o preventDefault é para evitar scroll)
    setaEsquerda.addEventListener('touchstart', (e) => {
      e.preventDefault(); 
      moverSlide(-1);
    }, { passive: false }); 

    setaDireita.addEventListener('touchstart', (e) => {
      e.preventDefault(); 
      moverSlide(1);
    }, { passive: false }); 


    // Suporte a teclado
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') moverSlide(-1);
      if (event.key === 'ArrowRight') moverSlide(1);
    });

    // Recalcula largura e atualiza slide ao redimensionar a janela
    window.addEventListener('resize', () => {
      currentSlideWidth = calcularSlideProperties(); // Recalcula a largura do slide
      // Ajusta o slideIndex para o valor mais próximo de um slide original se necessário
      // Garante que o carrossel não fique em uma posição fracionada após o resize
      slideIndex = 3 + (slideIndex - 3) % totalOriginal; 
      atualizarSlide(false); // Atualiza a posição sem transição
    });

    // Pausa o auto-slide ao passar o mouse e reinicia ao sair
    slidesContainer.addEventListener('mouseenter', pararAutoSlide);
    slidesContainer.addEventListener('mouseleave', iniciarAutoSlide);

    // Inicializa o carrossel na posição correta
    currentSlideWidth = calcularSlideProperties(); // Define a largura inicial antes de atualizar o slide
    atualizarSlide(false);
    iniciarAutoSlide();

  } else {
    console.warn('Elementos do carrossel principal não encontrados. O carrossel principal não será inicializado.');
  }

  //-- CARROSSEL DE FEEDBACK (Mantido como estava, se estiver funcionando)
  const feedbackContainer = document.querySelector('.feedback-track');
  // Usar optional chaining para evitar erro se feedbackContainer for null
  const feedbackItems = Array.from(feedbackContainer?.querySelectorAll('.feedback-item') || []);
  const feedbackPrev = document.querySelector('.feedback-prev');
  const feedbackNext = document.querySelector('.feedback-next');
  let feedbackIndex = 0;

  if (feedbackContainer && feedbackItems.length > 0 && feedbackPrev && feedbackNext) {
    function updateFeedbackSlide() {
      feedbackContainer.style.transform = `translateX(-${feedbackIndex * 100}%)`;
    }

    feedbackPrev.addEventListener('click', () => {
      feedbackIndex = (feedbackIndex - 1 + feedbackItems.length) % feedbackItems.length;
      updateFeedbackSlide();
    });

    feedbackNext.addEventListener('click', () => {
      feedbackIndex = (feedbackIndex + 1) % feedbackItems.length;
      updateFeedbackSlide();
    });

    updateFeedbackSlide();
  } else {
    console.warn('Elementos do carrossel de feedback não encontrados. O carrossel de feedback não será inicializado.');
  }

  //-- CARROSSEL DE MARCAS INFINITAS (Mantido como estava, se estiver funcionando)
  const brandTrack = document.querySelector('.brand-track');

  if (brandTrack) {
    const brandLogos = Array.from(brandTrack.querySelectorAll('.brand-logo'));
    const totalBrandLogos = brandLogos.length;

    if (totalBrandLogos > 0) {
      // Duplica os logos para criar o efeito infinito
      brandLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        brandTrack.appendChild(clone);
      });
    } else {
      console.warn('Nenhum logotipo de marca encontrado no .brand-track. O carrossel de marcas pode não funcionar como esperado.');
    }
  } else {
    console.warn('Elemento .brand-track não encontrado para o carrossel de marcas. O carrossel de marcas não será inicializado.');
  }
});
