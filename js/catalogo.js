document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos do DOM ---
  const filtroCategoria = document.getElementById('categoria');
  const campoPesquisa = document.getElementById('pesquisa'); // Adicionado: Campo de pesquisa
  const selectOrdenar = document.getElementById('ordenar'); // Adicionado: Select de ordenação
  const gradeProdutos = document.querySelector('.grade-produtos');
  
  // Modal de detalhes do produto
  const modalProduto = document.getElementById('modal-produto');
  const imagemModalProduto = document.getElementById('imagem-modal-produto');
  const tituloModalProduto = document.getElementById('titulo-modal-produto');
  const descricaoModalProduto = document.getElementById('descricao-modal-produto');
  const fecharBtnProduto = modalProduto.querySelector('#fechar-btn-produto');

  // Contadores do carrinho no header
  const contadorItensCarrinhoDesktop = document.getElementById('contador-itens-carrinho-desktop');
  const contadorItensCarrinhoMobile = document.getElementById('contador-itens-carrinho-mobile');

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

  // Carrega o carrinho do localStorage ou inicializa como vazio
  let cart = JSON.parse(localStorage.getItem('cart')) || []; 

  // Mapeamento de imagens para categorias
  const imageMap = {
    iluminacao: 'img/led.png',
    ferramentas: 'img/ferramentas.jpg',
    conexoes: 'img/conexoes.jpg',
    disjuntores: 'img/disjuntores.png',
    contatores: 'img/contatoras.png',
    duchas: 'img/duchas.jpg',
  };

  // --- Funções de Renderização, Filtragem e Ordenação ---

  // Função para renderizar os produtos na página
  function renderProducts(productsToRender) { // Renomeado para clareza
    gradeProdutos.innerHTML = ''; 
    productsToRender.forEach(product => { // Usa os produtos já filtrados e ordenados
      const productCard = document.createElement('article');
      productCard.className = 'cartao-produto'; 
      productCard.setAttribute('data-category', product.category);
      productCard.setAttribute('data-id', product.id);

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        <button class="ver-detalhes" data-id="${product.id}">Ver Detalhes</button>
        <button class="adicionar-ao-carrinho-btn contact-btn" data-product-id="${product.id}">Adicionar ao Carrinho</button>
      `;
      gradeProdutos.appendChild(productCard);
    });

    // Adiciona event listeners aos botões "Ver Detalhes"
    document.querySelectorAll('.ver-detalhes').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.id);
        openProductModal(productId);
      });
    });

    // Adiciona event listeners aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.adicionar-ao-carrinho-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.productId);
        addToCart(productId);
      });
    });
  }

  // Função principal para aplicar filtros e ordenação
  function applyFiltersAndSort() {
    let currentProducts = [...products]; // Cria uma cópia para não modificar o array original

    // 1. Filtrar por categoria
    const selectedCategory = filtroCategoria.value;
    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter(product => product.category === selectedCategory);
    }

    // 2. Filtrar por pesquisa (implementação futura, por enquanto apenas prepara a estrutura)
    const searchTerm = campoPesquisa.value.toLowerCase().trim();
    if (searchTerm) {
      currentProducts = currentProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // 3. Ordenar
    const sortOption = selectOrdenar.value;
    switch (sortOption) {
      case 'nome-asc':
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nome-desc':
        currentProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'preco-asc':
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case 'default':
      default:
        // Mantém a ordem original ou uma ordem padrão se desejar
        // Para manter a ordem original dos dados, não faz nada aqui.
        // Se quiser uma ordem padrão fixa, pode redefinir o array original aqui.
        break;
    }

    renderProducts(currentProducts); // Renderiza os produtos filtrados e ordenados
    updateCategoryImage(); // Atualiza a imagem da categoria
  }

  // Função para atualizar a imagem da categoria filtrada
  function updateCategoryImage() {
    const selectedCategory = filtroCategoria.value;
    
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
      imagemModalProduto.src = product.image;
      imagemModalProduto.alt = product.name;
      tituloModalProduto.textContent = product.name;
      descricaoModalProduto.textContent = product.description;
      modalProduto.style.display = 'flex';
      modalProduto.setAttribute('aria-hidden', 'false');
      modalProduto.focus();
    }
  }

  function closeProductModal() {
    modalProduto.style.display = 'none';
    modalProduto.setAttribute('aria-hidden', 'true');
  }

  fecharBtnProduto.addEventListener('click', closeProductModal);
  fecharBtnProduto.addEventListener('touchstart', (e) => {
    e.preventDefault();
    closeProductModal();
  });

  modalProduto.addEventListener('click', (e) => {
    if (e.target === modalProduto) closeProductModal();
  });

  modalProduto.addEventListener('touchstart', (e) => {
    if (e.target === modalProduto) closeProductModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalProduto.style.display === 'flex') closeProductModal();
  });


  // --- Funções para o Carrinho (com localStorage) ---

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
      saveCart();
      updateCartCountDisplay();
    }
  }

  // Função para salvar o carrinho no localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para atualizar a exibição dos contadores do carrinho no header
  function updateCartCountDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (contadorItensCarrinhoDesktop) contadorItensCarrinhoDesktop.textContent = totalItems;
    if (contadorItensCarrinhoMobile) contadorItensCarrinhoMobile.textContent = totalItems;
  }

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

  // --- Inicialização da Página e Event Listeners para Filtros/Ordenação ---
  filtroCategoria.addEventListener('change', applyFiltersAndSort); // Chama a função principal de filtro/ordenação
  campoPesquisa.addEventListener('input', applyFiltersAndSort); // Adicionado: Evento para pesquisa em tempo real
  selectOrdenar.addEventListener('change', applyFiltersAndSort); // Adicionado: Evento para ordenação

  applyFiltersAndSort(); // Aplica os filtros e ordenação iniciais ao carregar a página
  updateCartCountDisplay(); // Garante que o contador do carrinho esteja correto ao carregar
});
