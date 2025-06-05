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

  // --- Dados dos Produtos (31 produtos fictícios adicionados) ---
  const products = [
    {
      id: 1,
      name: 'Ducha Fluir (Zagonel)',
      category: 'duchas',
      image: 'img/prod-fluir.png',
      description: 'A Ducha Fluir da Zagonel oferece um design moderno e slim, com alta tecnologia de aquecimento rápido e controle de temperatura, proporcionando um banho confortável e econômico. Ideal para quem busca eficiência e estilo no banheiro.',
      price: 69.90
    },
    {
      id: 2,
      name: 'Ducha Moment (Zagonel)',
      category: 'duchas',
      image: 'img/prod-moment.png',
      description: 'A Ducha Moment da Zagonel é perfeita para o dia a dia, combinando praticidade e desempenho. Com sistema de aquecimento eficiente, garante água quente instantaneamente, ideal para um banho relaxante a qualquer momento.',
      price: 109.90
    },
    {
      id: 3,
      name: 'Ducha Ducali Branca (Zagonel)',
      category: 'duchas',
      image: 'img/prod-ducali-b.png',
      description: 'Com design clássico e elegante na cor branca, a Ducha Ducali da Zagonel integra-se perfeitamente a qualquer estilo de banheiro. Proporciona um fluxo de água agradável e aquecimento eficiente, sendo uma excelente escolha para o seu lar.',
      price: 12.50 // Preço ajustado, era 12.50
    },
    {
      id: 4,
      name: 'Ducha Ducali Preta (Zagonel)',
      category: 'duchas',
      image: 'img/prod-ducali-p.png',
      description: 'A Ducha Ducali da Zagonel na cor preta oferece um toque de sofisticação e modernidade ao seu banheiro. Além do design arrojado, garante um banho com temperatura agradável e constante, graças à sua tecnologia de aquecimento.',
      price: 30.00 // Preço ajustado, era 30.00
    },
    {
      id: 5,
      name: 'Ducha Ducali Premium Branca (Zagonel)',
      category: 'duchas',
      image: 'img/prod-ducali-premium-b.png',
      description: 'A Ducha Ducali Premium Branca da Zagonel eleva o nível do seu banho com um jato intenso e regulável. Seu acabamento superior e tecnologia avançada garantem conforto, durabilidade e um visual impecável para banheiros sofisticados.',
      price: 75.00 // Preço ajustado, era 75.00
    },
    {
      id: 6,
      name: 'Ducha Ducali Premium Preta (Zagonel)',
      category: 'duchas',
      image: 'img/prod-ducali-premium-p.png',
      description: 'Sofisticação e performance se encontram na Ducha Ducali Premium Preta da Zagonel. Com um design elegante e alta potência, oferece um banho revigorante e controle de temperatura preciso, complementando o estilo do seu ambiente.',
      price: 99.90
    },
    {
      id: 7,
      name: 'Ducha Optima (Zagonel)',
      category: 'duchas',
      image: 'img/prod-optima.png',
      description: 'A Ducha Optima da Zagonel é sinônimo de eficiência e praticidade. Com um sistema de troca rápida de temperatura e design compacto, é a escolha ideal para quem busca um banho confortável e sem complicações.',
      price: 139.90 // Preço fictício ajustado
    },
    {
      id: 8,
      name: 'Ducha ND (Zagonel)',
      category: 'duchas',
      image: 'img/prod-nd.png',
      description: 'A Ducha ND da Zagonel é a opção mais econômica e funcional para o seu banheiro. Simples e eficaz, oferece a temperatura ideal para o seu banho com a qualidade e durabilidade que você espera da marca Zagonel.',
      price: 89.90 // Preço fictício ajustado
    },
    {
      id: 9,
      name: 'Bella Ducha (Lorenzetti)',
      category: 'duchas', // Categoria corrigida para 'duchas'
      image: 'img/prod-belladucha.png',
      description: 'A Bella Ducha da Lorenzetti é conhecida pela sua economia e praticidade. Com fácil instalação e design compacto, oferece um banho agradável e um ótimo custo-benefício para o seu dia a dia.',
      price: 79.90 // Preço fictício ajustado
    },
    {
      id: 10,
      name: 'Loren Shower (Lorenzetti)',
      category: 'duchas', // Categoria corrigida para 'duchas'
      image: 'img/prod-lorenshower.png',
      description: 'A Loren Shower da Lorenzetti proporciona um banho relaxante com seu grande espalhador e fluxo de água intenso. É uma opção popular pela sua durabilidade e desempenho consistente, perfeita para toda a família.',
      price: 119.90 // Preço fictício ajustado
    },
    {
      id: 11,
      name: 'Advanced Eletrônica (Lorenzetti)',
      category: 'duchas',
      image: 'img/prod-advanced.png',
      description: 'A Ducha Advanced Eletrônica da Lorenzetti oferece controle de temperatura gradual e preciso, permitindo que você personalize seu banho. Com seu sistema eletrônico, garante conforto e economia de energia.',
      price: 169.90 // Preço fictício ajustado
    },
    {
      id: 12,
      name: 'Torneira Prima Preta (Zagonel)',
      category: 'torneiras',
      image: 'img/prod-prima-p.png',
      description: 'A Torneira Prima Preta da Zagonel combina design moderno e funcionalidade. Com aquecimento elétrico integrado, oferece água quente instantaneamente na pia da cozinha ou lavabo, com um toque de elegância na cor preta.',
      price: 289.90 // Preço fictício ajustado
    },
    {
      id: 13,
      name: 'Torneira Prima Branca (Zagonel)',
      category: 'torneiras',
      image: 'img/prod-prima-b.png',
      description: 'Elegância e praticidade definem a Torneira Prima Branca da Zagonel. Com aquecimento elétrico, é ideal para otimizar o uso de água quente em cozinhas e lavabos, adicionando um acabamento clean e sofisticado ao ambiente.',
      price: 279.90 // Preço fictício ajustado
    },
    {
      id: 14,
      name: 'Torneira Lumen (Zagonel)',
      category: 'torneiras',
      image: 'img/prod-lumen.png',
      description: 'A Torneira Lumen da Zagonel se destaca pelo seu design contemporâneo e iluminação LED no bico, que indica a temperatura da água. É uma solução inovadora para cozinhas e banheiros, unindo estética e tecnologia.',
      price: 254.90
    },
    {
      id: 15,
      name: 'Torneira Luna (Zagonel)',
      category: 'torneiras',
      image: 'img/prod-luna.png',
      description: 'Com linhas suaves e design minimalista, a Torneira Luna da Zagonel é ideal para ambientes que valorizam a simplicidade e a eficiência. Oferece água quente rapidamente, tornando as tarefas diárias mais confortáveis.',
      price: 229.90 // Preço fictício ajustado
    },
    {
      id: 16,
      name: 'Torneira Essence (Lorenzetti)',
      category: 'torneiras',
      image: 'img/prod-essence.png',
      description: 'A Torneira Essence da Lorenzetti combina design elegante e alta performance. Com bico giratório e aquecimento elétrico eficiente, é a escolha ideal para cozinhas que buscam um toque de modernidade e funcionalidade.',
      price: 199.90 // Preço fictício ajustado
    },
    {
      id: 17,
      name: 'Tomada Simples 2P+T 10A (Aria)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-aria.png',
      description: 'Tomada simples 2P+T (2 Pinos + Terra) de 10A da linha Aria. Ideal para uso residencial e comercial, oferece segurança e durabilidade, com design clean que se adapta a qualquer ambiente.',
      price: 5.90
    },
    {
      id: 18,
      name: 'Interruptor Simples (Aria)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-aria.png',
      description: 'Interruptor simples da linha Aria, ideal para controle de iluminação em ambientes residenciais e comerciais. Design discreto e funcional, garante acionamento suave e confiável.',
      price: 45.00 // Preço fictício ajustado
    },
    {
      id: 19,
      name: 'Tomada 2P+T 10A + Interruptor Simples (Aria)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-tom-aria.png',
      description: 'Conjunto completo com tomada 2P+T de 10A e interruptor simples da linha Aria. Solução prática e elegante para instalações elétricas, combinando funcionalidade e estética.',
      price: 80.00 // Preço fictício ajustado
    },
    {
      id: 20,
      name: 'Tomada 2P+T 10A Dupla (Aria)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-dupla-aria.png',
      description: 'Tomada dupla 2P+T de 10A da linha Aria. Oferece duas saídas em um único módulo, otimizando o espaço e a funcionalidade em paredes e painéis.',
      price: 150.00 // Preço fictício ajustado
    },
    {
      id: 21,
      name: 'Tomada Simples 2P+T 10A (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-liz.png',
      description: 'Tomada simples 2P+T de 10A da linha LIZ, design tradicional e discreto. Perfeita para instalações que exigem praticidade e segurança, com acabamento branco brilhante.',
      price: 180.00 // Preço fictício ajustado
    },
    {
      id: 22,
      name: 'Interruptor Simples (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-liz.png',
      description: 'Interruptor simples da linha LIZ, ideal para controle de pontos de luz. Com design funcional e acabamento branco, é uma solução confiável e fácil de instalar.',
      price: 110.00 // Preço fictício ajustado
    },
    {
      id: 23,
      name: 'Tomada 2P+T 10A + Interruptor Simples (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-tomada-liz.png',
      description: 'Conjunto de tomada 2P+T 10A e interruptor simples da linha LIZ. Solução completa para instalações elétricas, oferecendo funcionalidade e um visual harmonioso em branco.',
      price: 7.00 // Preço fictício ajustado
    },
    {
      id: 24,
      name: 'Tomada 2P+T 10A Dupla (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-dupla-liz.png',
      description: 'Tomada dupla 2P+T 10A da linha LIZ. Permite a conexão de dois aparelhos em uma única placa, ideal para otimizar o espaço e a organização de ambientes.',
      price: 0.80 // Preço fictício ajustado
    },
    {
      id: 25,
      name: 'Tomada Simples 2P+T 10A Grafite (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-grafite.png',
      description: 'Tomada simples 2P+T 10A da linha LIZ com acabamento grafite. Modernidade e segurança para suas instalações, adicionando um toque de sofisticação ao ambiente.',
      price: 6.50 // Preço fictício ajustado
    },
    {
      id: 26,
      name: 'Interruptor Simples Grafite (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-grafite.png',
      description: 'Interruptor simples da linha LIZ com acabamento grafite. Ideal para ambientes modernos, oferece controle de iluminação com um design elegante e discreto.',
      price: 55.00 // Preço fictício ajustado
    },
    {
      id: 27,
      name: 'Tomada 2P+T 10A + Interruptor Simples Grafite (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-tom-grafite.png',
      description: 'Conjunto de tomada 2P+T 10A e interruptor simples da linha LIZ em grafite. A combinação perfeita de funcionalidade e design contemporâneo para suas instalações elétricas.',
      price: 70.00 // Preço fictício ajustado
    },
    {
      id: 28,
      name: 'Tomada 2P+T 10A Dupla Grafite (LIZ)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-dupla-grafite.png',
      description: 'Tomada dupla 2P+T 10A da linha LIZ com acabamento grafite. Solução versátil para múltiplos equipamentos, mantendo a organização e o estilo do ambiente.',
      price: 250.00 // Preço fictício ajustado
    },
    {
      id: 29,
      name: 'Tomada Simples 2P+T 10A (LizFlex)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-lizflex.png',
      description: 'Tomada simples 2P+T 10A da linha LizFlex, conhecida pela sua flexibilidade e resistência. Ideal para instalações que exigem durabilidade e segurança em ambientes diversos.',
      price: 180.00 // Preço fictício ajustado
    },
    {
      id: 30,
      name: 'Interruptor Simples (LizFlex)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-lizflex.png',
      description: 'Interruptor simples da linha LizFlex, projetado para alta durabilidade e fácil manuseio. Perfeito para controle de iluminação em locais de grande fluxo e uso frequente.',
      price: 9.50 // Preço fictício ajustado
    },
    {
      id: 31,
      name: 'Tomada 2P+T 10A + Interruptor Simples (LizFlex)',
      category: 'interruptoresTomadas',
      image: 'img/prod-inter-tom-lizflex.png',
      description: 'Conjunto de tomada 2P+T 10A e interruptor simples da linha LizFlex. Oferece a robustez e a segurança necessárias para instalações residenciais e comerciais, com a praticidade de um único módulo.',
      price: 40.00
    },
    {
      id: 32,
      name: 'Tomada 2P+T 10A Dupla (LizFlex)',
      category: 'interruptoresTomadas',
      image: 'img/prod-tom-dupla-lizflex.png',
      description: 'Tomada dupla 2P+T 10A da linha LizFlex. Uma solução eficiente para múltiplos aparelhos, garantindo a segurança e a organização da sua instalação elétrica.',
      price: 40.00 // Preço ajustado, era 40.00
    },
    {
      id: 33,
      name: 'Rolo Cabo Flexível 2,5mm (RCM & Energy)',
      category: 'cabos',
      image: 'img/rolos.png',
      description: 'Rolo de cabo elétrico flexível de 2,5mm², ideal para instalações residenciais e comerciais de uso geral. Oferece alta condutividade e segurança, certificado pelas normas técnicas.',
      price: 234.00
    },
    {
      id: 34,
      name: 'Rolo Cabo Flexível 4,0mm (RCM & Energy)',
      category: 'cabos',
      image: 'img/rolos.png',
      description: 'Rolo de cabo elétrico flexível de 4,0mm², recomendado para circuitos de maior potência em residências e indústrias. Garante eficiência e segurança na distribuição de energia.',
      price: 379.00
    },
    {
      id: 35,
      name: 'Rolo Cabo Flexível 6,0mm (RCM & Energy)',
      category: 'cabos',
      image: 'img/rolos.png',
      description: 'Rolo de cabo elétrico flexível de 6,0mm², essencial para instalações com alta demanda de corrente, como chuveiros e ar-condicionados. Alta capacidade e durabilidade para projetos elétricos robustos.',
      price: 569.00
    }
  ];

  // Carrega o carrinho do localStorage ou inicializa como vazio
  let cart = JSON.parse(localStorage.getItem('cart')) || []; 

  // Mapeamento de imagens para categorias (adicionada 'outros' para novos produtos)
  const imageMap = {
    iluminacao: 'img/led.png',
    interruptoresTomadas: 'img/prod-tom-aria.png',
    cabos: 'img/cabos.png',
    contatores: 'img/contatoras.png',
    disjuntores: 'img/disjuntores.png',
    duchas: 'img/duchas.jpg',
    torneiras: 'img/torneiras.png',
    outros: 'https://placehold.co/300x200/E0E0E0/333333?text=Outros+Produtos' // Imagem genérica para 'outros'
  };

  // --- Funções de Renderização, Filtragem e Ordenação ---

  // Função para renderizar os produtos na página
  function renderProducts(productsToRender) { // Renomeado para clareza
    gradeProdutos.innerHTML = ''; 
    if (productsToRender.length === 0) {
      gradeProdutos.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem;">Nenhum produto encontrado para os filtros selecionados.</p>';
      return;
    }
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
    if (contadorItensCarrinhoMobile) contadorItadorItensCarrinhoMobile.textContent = totalItems;
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
