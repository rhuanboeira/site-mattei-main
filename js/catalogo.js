document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos do DOM ---
  // Atualizado: categoryFilter para filtroCategoria
  const filtroCategoria = document.getElementById('categoria'); // Alterado de 'category' para 'categoria'
  // Atualizado: productGrid para gradeProdutos
  const gradeProdutos = document.querySelector('.grade-produtos'); // Alterado de '.product-grid' para '.grade-produtos'
  
  // Modal de detalhes do produto
  // Atualizado: productModal para modalProduto
  const modalProduto = document.getElementById('modal-produto'); // Alterado de 'product-modal' para 'modal-produto'
  // Atualizado: modalImage para imagemModalProduto
  const imagemModalProduto = document.getElementById('imagem-modal-produto'); // Alterado de 'modal-image' para 'imagem-modal-produto'
  // Atualizado: modalTitle para tituloModalProduto
  const tituloModalProduto = document.getElementById('titulo-modal-produto'); // Alterado de 'modal-title' para 'titulo-modal-produto'
  // Atualizado: modalDescription para descricaoModalProduto
  const descricaoModalProduto = document.getElementById('descricao-modal-produto'); // Alterado de 'modal-description' para 'descricao-modal-produto'
  // Atualizado: closeProductModalBtn para fecharBtnProduto
  const fecharBtnProduto = modalProduto.querySelector('#fechar-btn-produto'); // Alterado de '.close-btn' para '#fechar-btn-produto'

  // Modal do carrinho
  // Atualizado: cartModal para modalCarrinho
  const modalCarrinho = document.getElementById('modal-carrinho'); // Alterado de 'cart-modal' para 'modal-carrinho'
  // Atualizado: viewCartBtn para verCarrinhoBtn
  const verCarrinhoBtn = document.getElementById('ver-carrinho-btn'); // Alterado de 'view-cart-btn' para 'ver-carrinho-btn'
  // Atualizado: mobileCartBtn para botaoCarrinhoMobile
  const botaoCarrinhoMobile = document.getElementById('botao-carrinho-mobile'); // Alterado de 'mobile-cart-btn' para 'botao-carrinho-mobile'
  // Atualizado: closeCartModalBtn para fecharBtnCarrinho
  const fecharBtnCarrinho = document.getElementById('fechar-btn-carrinho'); // Alterado de 'close-cart-modal-btn' para 'fechar-btn-carrinho'
  // Atualizado: cartItemCountDesktop para contadorItensCarrinhoDesktop
  const contadorItensCarrinhoDesktop = document.getElementById('contador-itens-carrinho-desktop'); // Alterado de 'cart-item-count-desktop' para 'contador-itens-carrinho-desktop'
  // Atualizado: cartItemCountMobile para contadorItensCarrinhoMobile
  const contadorItensCarrinhoMobile = document.getElementById('contador-itens-carrinho-mobile'); // Alterado de 'cart-item-count-mobile' para 'contador-itens-carrinho-mobile'
  // Atualizado: cartItemsContainer para itensCarrinhoContainer
  const itensCarrinhoContainer = document.getElementById('itens-carrinho'); // Alterado de 'cart-items' para 'itens-carrinho'
  // Atualizado: cartTotalSpan para totalCarrinhoSpan
  const totalCarrinhoSpan = document.getElementById('total-carrinho'); // Alterado de 'cart-total' para 'total-carrinho'
  // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
  const finalizarWhatsappBtn = document.getElementById('finalizar-whatsapp-btn'); // Alterado de 'checkout-whatsapp-btn' para 'finalizar-whatsapp-btn'

  // Menu Toggle (Hamburger)
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('top-menu');
  const header = document.querySelector('header');

  // Imagem da categoria
  const categoryImageContainer = document.querySelector('.category-image');
  const categoryImage = document.getElementById('category-image');

  // --- Dados dos Produtos ---
  const products = [
    {
      id: 1,
      name: 'Iluminação de LED',
      category: 'iluminacao',
      image: 'img/led.png',
      description: 'Trabalhamos com uma ampla variedade de soluções em iluminação, desde lâmpadas e painéis até fitas de LED e refletores, oferecendo alta eficiência energética e durabilidade para ambientes residenciais, comerciais e industriais. Nossos produtos garantem uma iluminação de qualidade, com opções para todos os estilos e necessidades.',
      price: 45.00
    },
    {
      id: 2,
      name: 'Ferramentas',
      category: 'ferramentas',
      image: 'img/ferramentas.jpg',
      description: 'Oferecemos ferramentas de alta qualidade, desde chaves de fenda e alicates até ferramentas elétricas e kits completos. Essenciais para qualquer projeto ou reparo, nossas ferramentas são selecionadas para garantir durabilidade, segurança e eficiência no trabalho.',
      price: 85.00
    },
    {
      id: 3,
      name: 'Conexões PVC',
      category: 'conexoes',
      image: 'img/conexoes.jpg',
      description: 'Disponibilizamos conexões PVC de diversos tipos e tamanhos, ideais para instalações elétricas e hidráulicas. Nossos produtos garantem vedação perfeita e durabilidade, seguindo os mais altos padrões de segurança e qualidade para sua obra ou reforma.',
      price: 12.50
    },
    {
      id: 4,
      name: 'Disjuntores',
      category: 'disjuntores',
      image: 'img/disjuntores.png',
      description: 'Nossa linha de disjuntores inclui modelos para diversas aplicações, garantindo a proteção de circuitos elétricos contra sobrecargas e curtos-circuitos. Essenciais para a segurança de sua instalação, nossos disjuntores são de marcas confiáveis e de fácil instalação.',
      price: 30.00
    },
    {
      id: 5,
      name: 'Contatoras',
      category: 'contatores',
      image: 'img/contatoras.png',
      description: 'Trabalhamos com contatores para controle de motores elétricos e sistemas de automação industrial. Nossos produtos são robustos e confiáveis, ideais para aplicações que exigem alta performance e segurança no acionamento de cargas.',
      price: 75.00
    },
    {
      id: 6,
      name: 'Duchas',
      category: 'duchas',
      image: 'img/duchas.jpg',
      description: 'Oferecemos duchas elétricas de alta qualidade, com diversas opções de temperatura e design. Nossas duchas proporcionam conforto e economia de energia, sendo ideais para banheiros residenciais e comerciais, com instalação simples e segura.',
      price: 99.90
    }
  ];

  let cart = []; // Array para armazenar os itens do carrinho

  // Mapeamento de imagens para categorias
  const imageMap = {
    iluminacao: 'img/led.png',
    ferramentas: 'img/ferramentas.jpg',
    conexoes: 'img/conexoes.jpg',
    disjuntores: 'img/disjuntores.png',
    contatores: 'img/contatoras.png',
    duchas: 'img/duchas.jpg',
  };

  // --- Funções de Renderização e Filtragem ---

  // Função para renderizar os produtos na página
  function renderProducts(filteredProducts) {
    gradeProdutos.innerHTML = ''; // Limpa o grid antes de renderizar (Atualizado: productGrid para gradeProdutos)
    filteredProducts.forEach(product => {
      const productCard = document.createElement('article');
      // Atualizado: product-card para cartao-produto
      productCard.className = 'cartao-produto'; // Classe para estilização
      productCard.setAttribute('data-category', product.category);
      productCard.setAttribute('data-id', product.id);

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        <button class="ver-detalhes" data-id="${product.id}">Ver Detalhes</button>
        <button class="adicionar-ao-carrinho-btn contact-btn" data-product-id="${product.id}">Adicionar ao Carrinho</button>
      `;
      gradeProdutos.appendChild(productCard); // Atualizado: productGrid para gradeProdutos
    });

    // Adiciona event listeners aos botões "Ver Detalhes"
    // Atualizado: .view-details para .ver-detalhes
    document.querySelectorAll('.ver-detalhes').forEach(button => { // Alterado
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.id);
        openProductModal(productId);
      });
    });

    // Adiciona event listeners aos botões "Adicionar ao Carrinho"
    // Atualizado: .add-to-cart-btn para .adicionar-ao-carrinho-btn
    document.querySelectorAll('.adicionar-ao-carrinho-btn').forEach(button => { // Alterado
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.productId);
        addToCart(productId);
      });
    });
  }

  // Função para filtrar produtos e renderizá-los
  function filterProducts() {
    // Atualizado: categoryFilter para filtroCategoria
    const selectedCategory = filtroCategoria.value; // Alterado
    const filtered = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
    renderProducts(filtered);
    updateCategoryImage();
  }

  // Função para atualizar a imagem da categoria filtrada
  function updateCategoryImage() {
    // Atualizado: categoryFilter para filtroCategoria
    const selectedCategory = filtroCategoria.value; // Alterado
    
    if (selectedCategory !== 'all' && imageMap[selectedCategory]) {
      categoryImage.src = imageMap[selectedCategory];
      categoryImageContainer.classList.remove('hidden');
    } else {
      categoryImageContainer.classList.add('hidden');
    }
  }

  // --- Funções e Event Listeners para o Modal de Detalhes do Produto ---
  function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      imagemModalProduto.src = product.image; // Atualizado: modalImage para imagemModalProduto
      imagemModalProduto.alt = product.name; // Atualizado: modalImage para imagemModalProduto
      tituloModalProduto.textContent = product.name; // Atualizado: modalTitle para tituloModalProduto
      descricaoModalProduto.textContent = product.description; // Atualizado: modalDescription para descricaoModalProduto
      modalProduto.style.display = 'flex'; // Torna o modal visível (Atualizado: productModal para modalProduto)
      modalProduto.setAttribute('aria-hidden', 'false'); // Atualizado: productModal para modalProduto
      modalProduto.focus(); // Atualizado: productModal para modalProduto
    }
  }

  function closeProductModal() {
    modalProduto.style.display = 'none'; // Esconde o modal (Atualizado: productModal para modalProduto)
    modalProduto.setAttribute('aria-hidden', 'true'); // Atualizado: productModal para modalProduto
  }

  // Atualizado: closeProductModalBtn para fecharBtnProduto
  fecharBtnProduto.addEventListener('click', closeProductModal); // Alterado
  fecharBtnProduto.addEventListener('touchstart', (e) => { // Alterado
    e.preventDefault();
    closeProductModal();
  });

  // Atualizado: productModal para modalProduto
  modalProduto.addEventListener('click', (e) => { // Alterado
    if (e.target === modalProduto) closeProductModal(); // Alterado
  });

  // Atualizado: productModal para modalProduto
  modalProduto.addEventListener('touchstart', (e) => { // Alterado
    if (e.target === modalProduto) closeProductModal(); // Alterado
  });

  // Atualizado: productModal para modalProduto
  document.addEventListener('keydown', (e) => { // Alterado
    if (e.key === 'Escape' && modalProduto.style.display === 'flex') closeProductModal(); // Alterado
  });


  // --- Funções e Event Listeners para o Carrinho e Modal do Carrinho ---

  // Função para adicionar um produto ao carrinho
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartDisplay();
    }
  }

  // Função para remover um item do carrinho
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
  }

  // Função para atualizar a quantidade de um item no carrinho
  function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
      }
      updateCartDisplay();
    }
  }

  // Função para atualizar a exibição do carrinho e o contador
  function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Atualiza contadores (verifica se existem antes)
    // Atualizado: cartItemCountDesktop para contadorItensCarrinhoDesktop
    if (contadorItensCarrinhoDesktop) contadorItensCarrinhoDesktop.textContent = totalItems; // Alterado
    // Atualizado: cartItemCountMobile para contadorItensCarrinhoMobile
    if (contadorItensCarrinhoMobile) contadorItensCarrinhoMobile.textContent = totalItems; // Alterado

    itensCarrinhoContainer.innerHTML = ''; // Limpa os itens atuais do carrinho (Atualizado: cartItemsContainer para itensCarrinhoContainer)

    let total = 0;

    if (cart.length === 0) {
      const emptyMessage = document.createElement('p');
      // Atualizado: empty-cart-message
      emptyMessage.className = 'empty-cart-message'; // Alterado
      emptyMessage.textContent = 'Seu carrinho está vazio.';
      itensCarrinhoContainer.appendChild(emptyMessage); // Atualizado: cartItemsContainer para itensCarrinhoContainer
      // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
      finalizarWhatsappBtn.disabled = true; // Desabilita o botão se o carrinho estiver vazio
      // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
      finalizarWhatsappBtn.classList.add('opacity-50'); // Adiciona classe para estilo desabilitado
    } else {
      // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
      finalizarWhatsappBtn.disabled = false; // Habilita o botão
      // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
      finalizarWhatsappBtn.classList.remove('opacity-50'); // Remove classe de estilo desabilitado

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        // Atualizado: cart-item-container para item-carrinho-container
        cartItemDiv.className = 'item-carrinho-container'; // Classe para estilização

        cartItemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="informacoes-item-carrinho">
              <h4>${item.name}</h4>
              <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
          </div>
          <div class="acoes-item-carrinho">
              <input type="number" min="1" value="${item.quantity}"
                  class="input-quantidade" data-product-id="${item.id}">
              <span class="price">R$ ${(itemTotal).toFixed(2).replace('.', ',')}</span>
              <button class="remover-item-carrinho" data-product-id="${item.id}">
                  <i class="fa-solid fa-trash-can"></i>
              </button>
          </div>
        `;
        itensCarrinhoContainer.appendChild(cartItemDiv); // Atualizado: cartItemsContainer para itensCarrinhoContainer
      });

      // Adiciona event listeners para remover itens e atualizar quantidades
      // Atualizado: .cart-item-remove para .remover-item-carrinho
      document.querySelectorAll('.remover-item-carrinho').forEach(button => { // Alterado
        button.addEventListener('click', (event) => {
          const productId = parseInt(event.currentTarget.dataset.productId);
          removeFromCart(productId);
        });
      });

      // Atualizado: .quantity-input para .input-quantidade
      document.querySelectorAll('.input-quantidade').forEach(input => { // Alterado
        input.addEventListener('change', (event) => {
          const productId = parseInt(event.target.dataset.productId);
          const newQuantity = parseInt(event.target.value);
          updateCartQuantity(productId, newQuantity);
        });
      });
    }

    totalCarrinhoSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`; // Atualizado: cartTotalSpan para totalCarrinhoSpan
  }

  // Função para abrir o modal do carrinho
  function openCartModal() {
    modalCarrinho.style.display = 'flex'; // Torna o modal visível (Atualizado: cartModal para modalCarrinho)
    modalCarrinho.setAttribute('aria-hidden', 'false'); // Atualizado: cartModal para modalCarrinho
    updateCartDisplay(); // Garante que o carrinho esteja atualizado ao abrir
  }

  // Função para fechar o modal do carrinho
  function closeCartModal() {
    modalCarrinho.style.display = 'none'; // Esconde o modal (Atualizado: cartModal para modalCarrinho)
    modalCarrinho.setAttribute('aria-hidden', 'true'); // Atualizado: cartModal para modalCarrinho
  }

  // Event listeners para abrir o modal do carrinho
  // Atualizado: viewCartBtn para verCarrinhoBtn
  if (verCarrinhoBtn) verCarrinhoBtn.addEventListener('click', openCartModal); // Botão desktop (Alterado)
  // Atualizado: mobileCartBtn para botaoCarrinhoMobile
  if (botaoCarrinhoMobile) botaoCarrinhoMobile.addEventListener('click', openCartModal); // Ícone mobile (Alterado)

  // Event listeners para fechar o modal do carrinho
  // Atualizado: closeCartModalBtn para fecharBtnCarrinho
  fecharBtnCarrinho.addEventListener('click', closeCartModal); // Alterado
  fecharBtnCarrinho.addEventListener('touchstart', (e) => { // Alterado
    e.preventDefault();
    closeCartModal();
  });

  // Fechar modal clicando fora
  // Atualizado: cartModal para modalCarrinho
  modalCarrinho.addEventListener('click', (e) => { // Alterado
    if (e.target === modalCarrinho) { // Alterado
      closeCartModal();
    }
  });

  // Fechar modal com a tecla ESC
  // Atualizado: cartModal para modalCarrinho
  document.addEventListener('keydown', (e) => { // Alterado
    if (e.key === 'Escape' && modalCarrinho.style.display === 'flex') { // Alterado
      closeCartModal();
    }
  });

  // Função para gerar a mensagem do WhatsApp e redirecionar
  // Atualizado: checkoutWhatsappBtn para finalizarWhatsappBtn
  finalizarWhatsappBtn.addEventListener('click', () => { // Alterado
    if (cart.length === 0) {
      console.warn("Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.");
      return;
    }

    const phoneNumber = '555199640860'; 
    let message = 'Olá! Gostaria de fazer o seguinte pedido na Mattei Materiais Elétricos:\n\n';

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Quantidade: ${item.quantity}) - Valor Unitário: R$ ${item.price.toFixed(2).replace('.', ',')} - Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal do Pedido: R$ ${total.toFixed(2).replace('.', ',')}`;
    message += `\n\nPor favor, confirme a disponibilidade e o valor final. Aguardo seu retorno!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });

  // --- Lógica do Menu Toggle (Hamburger) ---
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Lógica de Scroll do Header ---
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- Inicialização da Página ---
  filtroCategoria.addEventListener('change', filterProducts); // Adicionado event listener para o filtro
  filterProducts(); // Renderiza todos os produtos inicialmente
  updateCartDisplay(); // Garante que o contador do carrinho esteja correto ao carregar
});