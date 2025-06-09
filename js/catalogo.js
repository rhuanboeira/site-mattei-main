document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos do DOM ---
  const filtroCategoria = document.getElementById('categoria');
  const campoPesquisa = document.getElementById('pesquisa');
  const selectOrdenar = document.getElementById('ordenar');
  const gradeProdutos = document.querySelector('.grade-produtos');
  const header = document.querySelector('header'); // Obtém o elemento header
  const mainContent = document.querySelector('main'); // Obtém o elemento main

  // Modal de detalhes do produto
  const modalProduto = document.getElementById('modal-produto');
  const imagemModalProduto = document.getElementById('imagem-modal-produto');
  const tituloModalProduto = document.getElementById('titulo-modal-produto');
  const descricaoModalProduto = document.getElementById('descricao-modal-produto');
  const precoModalProduto = document.getElementById('preco-modal-produto');
  const variacaoSelectModal = document.getElementById('variacao-select-modal');
  const adicionarAoCarrinhoBtnModal = document.getElementById('adicionar-ao-carrinho-btn-modal');
  const fecharBtnProduto = modalProduto.querySelector('#fechar-btn-produto');

  // Contadores do carrinho no header
  const contadorItensCarrinhoDesktop = document.getElementById('cart-count-badge-desktop');
  const contadorItensCarrinhoMobile = document.getElementById('cart-count-badge');

  // Menu Toggle (Hamburger)
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('top-menu');
  // const header = document.querySelector('header'); // Já obtido acima

  // Imagem da categoria
  const categoryImageContainer = document.querySelector('.category-image');
  const categoryImage = document.getElementById('category-image');

  // Variável para armazenar os produtos, será carregada do JSON
  let products = [];

  // Carrega o carrinho do localStorage ou inicializa como vazio
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Mapeamento de imagens para categorias
  const imageMap = {
    iluminacao: 'img/led.png',
    interruptoresTomadas: 'img/prod-tomadas-inter.png',
    cabos: 'img/cabos.png',
    contatores: 'img/contatoras.png',
    disjuntores: 'img/disjuntores.png',
    duchas: 'img/duchas.jpg',
    torneiras: 'img/torneiras.png',
    outros: 'https://placehold.co/300x200/E0E0E0/333333?text=Outros+Produtos'
  };

  // --- Funções para ajuste de layout (Header Fixo) ---
  function adjustMainContentPadding() {
    if (header && mainContent) {
      const headerHeight = header.offsetHeight; // Obtém a altura renderizada do cabeçalho
      mainContent.style.paddingTop = `${headerHeight}px`; // Aplica como padding-top no main
    }
  }

  // --- Funções de Renderização, Filtragem e Ordenação ---

  // Função para renderizar os produtos na página
  function renderProducts(productsToRender) {
    gradeProdutos.innerHTML = '';
    if (productsToRender.length === 0) {
      gradeProdutos.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem;">Nenhum produto encontrado para os filtros selecionados.</p>';
      return;
    }
    productsToRender.forEach(product => {
      const productCard = document.createElement('article');
      productCard.className = 'cartao-produto';
      productCard.setAttribute('data-category', product.category);
      productCard.setAttribute('data-id', product.id);

      let priceDisplay;
      let addToCartButton;
      let variationSelectorHtml = '';

      if (product.hasVariations && product.variations && product.variations.length > 0) {
        // Se o produto tem variações, exibe um seletor de opções
        const defaultVariation = product.variations[0];
        priceDisplay = `R$ <span class="product-price">${defaultVariation.price.toFixed(2).replace('.', ',')}</span>`;
        
        variationSelectorHtml = `
          <div class="variation-selector-group">
            <label for="variation-${product.id}">Potência/Amperagem:</label>
            <select id="variation-${product.id}" class="variation-select" data-product-id="${product.id}">
              ${product.variations.map(v => `<option value="${v.power}" data-price="${v.price}">${v.power}</option>`).join('')}
            </select>
          </div>
        `;
        // O botão "Adicionar ao Carrinho" precisará do ID da variação selecionada
        addToCartButton = `<button class="adicionar-ao-carrinho-btn contact-btn" data-product-id="${product.id}" data-variation-power="${defaultVariation.power}">Adicionar ao Carrinho</button>`;

      } else {
        // Se não tem variações, exibe o preço direto
        priceDisplay = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        addToCartButton = `<button class="adicionar-ao-carrinho-btn contact-btn" data-product-id="${product.id}">Adicionar ao Carrinho</button>`;
      }

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p class="product-price-display">${priceDisplay}</p>
        ${variationSelectorHtml}
        <button class="ver-detalhes" data-id="${product.id}">Ver Detalhes</button>
        ${addToCartButton}
      `;
      gradeProdutos.appendChild(productCard);
    });

    // Adiciona event listeners aos seletores de variação (se existirem)
    document.querySelectorAll('.variation-select').forEach(select => {
      select.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const newPrice = parseFloat(selectedOption.dataset.price);
        const productId = event.target.dataset.productId;
        const productCard = event.target.closest('.cartao-produto');
        const priceElement = productCard.querySelector('.product-price');
        const addToCartBtn = productCard.querySelector('.adicionar-ao-carrinho-btn');

        if (priceElement) {
          priceElement.textContent = newPrice.toFixed(2).replace('.', ',');
        }
        // Atualiza o atributo data-variation-power do botão "Adicionar ao Carrinho"
        if (addToCartBtn) {
          addToCartBtn.dataset.variationPower = selectedOption.value;
        }
      });
    });

    // Adiciona event listeners aos botões "Ver Detalhes"
    document.querySelectorAll('.ver-detalhes').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.id);
        openProductModal(productId);
      });
    });

    // Adiciona event listeners aos botões "Adicionar ao Carrinho" dos cartões de produto
    document.querySelectorAll('.adicionar-ao-carrinho-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.productId);
        const variationPower = event.target.dataset.variationPower;
        addToCart(productId, variationPower);
      });
    });
  }

  // Função principal para aplicar filtros e ordenação
  function applyFiltersAndSort() {
    let currentProducts = [...products];

    // 1. Filtrar por categoria
    const selectedCategory = filtroCategoria.value;
    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter(product => product.category === selectedCategory);
    }

    // 2. Filtrar por pesquisa
    const searchTerm = campoPesquisa.value.toLowerCase().trim();
    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.baseDescription && product.baseDescription.toLowerCase().includes(searchTerm)) ||
        (product.variations && product.variations.some(v => v.descriptionAddon.toLowerCase().includes(searchTerm))) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
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
        currentProducts.sort((a, b) => {
          const priceA = a.hasVariations ? a.variations[0].price : a.price;
          const priceB = b.hasVariations ? b.variations[0].price : b.price;
          return priceA - priceB;
        });
        break;
      case 'preco-desc':
        currentProducts.sort((a, b) => {
          const priceA = a.hasVariations ? a.variations[0].price : a.price;
          const priceB = b.hasVariations ? b.variations[0].price : b.price;
          return priceB - priceA;
        });
        break;
      case 'default':
      default:
        break;
    }

    renderProducts(currentProducts);
    updateCategoryImage();
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

      variacaoSelectModal.innerHTML = '';
      variacaoSelectModal.style.display = 'none';

      adicionarAoCarrinhoBtnModal.dataset.productId = productId;

      if (product.hasVariations && product.variations && product.variations.length > 0) { // CORREÇÃO: "hasVariations" estava com typo
        product.variations.forEach(v => {
          const option = document.createElement('option');
          option.value = v.power;
          option.textContent = v.power;
          option.dataset.price = v.price;
          option.dataset.descriptionAddon = v.descriptionAddon || '';
          variacaoSelectModal.appendChild(option);
        });
        variacaoSelectModal.style.display = 'block';

        variacaoSelectModal.onchange = () => {
          const selectedOption = variacaoSelectModal.options[variacaoSelectModal.selectedIndex];
          const newPrice = parseFloat(selectedOption.dataset.price);
          const descriptionAddon = selectedOption.dataset.descriptionAddon;

          precoModalProduto.textContent = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
          descricaoModalProduto.textContent = `${product.baseDescription} ${descriptionAddon}`.trim();
          
          adicionarAoCarrinhoBtnModal.dataset.variationPower = selectedOption.value;
        };

        variacaoSelectModal.value = product.variations[0].power;
        variacaoSelectModal.onchange();
      } else {
        descricaoModalProduto.textContent = product.description;
        precoModalProduto.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        delete adicionarAoCarrinhoBtnModal.dataset.variationPower;
      }
      
      modalProduto.style.display = 'flex';
      modalProduto.setAttribute('aria-hidden', 'false');
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

  // Lógica para o botão "Adicionar ao Carrinho" dentro do modal
  adicionarAoCarrinhoBtnModal.addEventListener('click', (event) => {
    const productId = parseInt(event.target.dataset.productId);
    const variationPower = event.target.dataset.variationPower;
    addToCart(productId, variationPower);
    closeProductModal();
  });


  // Função para adicionar um produto (ou variação) ao carrinho
  function addToCart(productId, variationPower = null) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      console.error('Produto não encontrado:', productId);
      return;
    }

    let itemToAdd;
    if (product.hasVariations && variationPower) {
      const selectedVariation = product.variations.find(v => v.power === variationPower);
      if (!selectedVariation) {
        console.error('Variação não encontrada para o produto:', productId, 'Potência:', variationPower);
        return;
      }
      itemToAdd = { 
        id: selectedVariation.variationId,
        productId: product.id,
        name: `${product.name} - ${selectedVariation.power}`,
        image: product.image,
        price: selectedVariation.price,
        power: selectedVariation.power,
        quantity: 1
      };
    } else {
      itemToAdd = { 
        id: String(product.id),
        name: product.name, 
        image: product.image, 
        price: product.price, 
        quantity: 1 
      };
    }

    const existingItem = cart.find(item => item.id === itemToAdd.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(itemToAdd);
    }
    saveCart();
    updateCartCountDisplay();
    alertCustom("Produto adicionado ao carrinho!");
  }

  // Função para salvar o carrinho no localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para atualizar a exibição dos contadores do carrinho no header
  function updateCartCountDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (contadorItensCarrinhoDesktop) {
      contadorItensCarrinhoDesktop.textContent = totalItems;
      contadorItensCarrinhoDesktop.style.display = totalItems > 0 ? 'inline' : 'none';
    }

    if (contadorItensCarrinhoMobile) {
      contadorItensCarrinhoMobile.textContent = totalItems;
      contadorItensCarrinhoMobile.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  // --- Lógica do Menu Toggle (Hamburger) ---
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

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

  // --- Alerta Personalizado (Substitui alert()) ---
  function alertCustom(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-[9999] opacity-0 transition-opacity duration-300';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      alertBox.style.opacity = '0';
      alertBox.addEventListener('transitionend', () => alertBox.remove());
    }, 3000);
  }

  // --- Carrega os produtos do JSON e inicializa a página ---
  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      products = data;
      filtroCategoria.addEventListener('change', applyFiltersAndSort);
      campoPesquisa.addEventListener('input', applyFiltersAndSort);
      selectOrdenar.addEventListener('change', applyFiltersAndSort);

      applyFiltersAndSort();
      updateCartCountDisplay();
      adjustMainContentPadding(); // Ajusta o padding inicial
    })
    .catch(error => {
      console.error('Erro ao carregar os produtos:', error);
      gradeProdutos.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: red;">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    });

  // Ajusta o padding do main também no redimensionamento da janela
  window.addEventListener('resize', adjustMainContentPadding);
});
