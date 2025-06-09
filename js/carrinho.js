document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos do DOM da página do carrinho ---
  const itensCarrinhoPagina = document.getElementById('itens-carrinho-pagina');
  const totalCarrinhoPagina = document.getElementById('total-carrinho-pagina');
  const finalizarWhatsappBtnPagina = document.getElementById('finalizar-whatsapp-btn-pagina');
  const continuarComprandoBtn = document.querySelector('.continuar-comprando-btn');
  const header = document.querySelector('header'); // Obtém o elemento header
  const mainContent = document.querySelector('main'); // Obtém o elemento main

  // Menu Toggle (Hamburger) - Reutilizado do produtos.js/catalogo.js para consistência
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('top-menu');
  // const header = document.querySelector('header'); // Já obtido acima

  // Carrega o carrinho do localStorage
  // Mapeia para garantir que todos os IDs sejam strings
  let cart = (JSON.parse(localStorage.getItem('cart')) || []).map(item => ({
      ...item,
      id: String(item.id) // Garante que o ID é sempre uma string
  }));

  // --- Funções para ajuste de layout (Header Fixo) ---
  function adjustMainContentPadding() {
    if (header && mainContent) {
      const headerHeight = header.offsetHeight; // Obtém a altura renderizada do cabeçalho
      mainContent.style.paddingTop = `${headerHeight}px`; // Aplica como padding-top no main
    }
  }

  // --- Funções do Carrinho ---

  // Função para salvar o carrinho no localStorage e ATUALIZAR O CONTADOR
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCountDisplay();
  }

  // Função para renderizar os itens do carrinho na página
  function renderCartItems() {
    itensCarrinhoPagina.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'empty-cart-message';
      emptyMessage.textContent = 'Seu carrinho está vazio.';
      itensCarrinhoPagina.appendChild(emptyMessage);
      finalizarWhatsappBtnPagina.disabled = true;
      finalizarWhatsappBtnPagina.classList.add('opacity-50');
    } else {
      finalizarWhatsappBtnPagina.disabled = false;
      finalizarWhatsappBtnPagina.classList.remove('opacity-50');

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'item-carrinho-container';

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
        itensCarrinhoPagina.appendChild(cartItemDiv);
      });

      document.querySelectorAll('.remover-item-carrinho').forEach(button => {
        button.addEventListener('click', (event) => {
          const itemIdToRemove = event.currentTarget.dataset.productId;
          removeFromCart(itemIdToRemove);
        });
      });

      document.querySelectorAll('.input-quantidade').forEach(input => {
        input.addEventListener('change', (event) => {
          const itemIdToUpdate = event.target.dataset.productId;
          const newQuantity = parseInt(event.target.value);
          updateCartQuantity(itemIdToUpdate, newQuantity);
        });
      });
    }

    totalCarrinhoPagina.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  // Função para remover um item do carrinho
  function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCartItems();
  }

  // Função para atualizar a quantidade de um item no carrinho
  function updateCartQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(itemId);
      } else {
        item.quantity = newQuantity;
      }
      saveCart();
      renderCartItems();
    }
  }

  // Função para gerar a mensagem do WhatsApp e redirecionar
  finalizarWhatsappBtnPagina.addEventListener('click', () => {
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

  // --- Lógica do Menu Toggle (Hamburger) para a página do carrinho ---
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

  // --- Lógica de Scroll do Header para a página do carrinho ---
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- FUNÇÃO CENTRAL PARA ATUALIZAR O CONTADOR DE ITENS NO ÍCONE DO CARRINHO ---
  // Esta função lê diretamente do localStorage e atualiza ambos os contadores.
  function updateCartCountDisplay() {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);

    const contadorItensCarrinhoDesktop = document.getElementById('cart-count-badge-desktop');
    const contadorItensCarrinhoMobile = document.getElementById('cart-count-badge');

    if (contadorItensCarrinhoDesktop) {
      contadorItensCarrinhoDesktop.textContent = totalItems;
      contadorItensCarrinhoDesktop.style.display = totalItems > 0 ? 'inline' : 'none';
    }

    if (contadorItensCarrinhoMobile) {
      contadorItensCarrinhoMobile.textContent = totalItems;
      contadorItensCarrinhoMobile.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  // --- Inicialização da Página do Carrinho ---
  renderCartItems();
  updateCartCountDisplay();
  adjustMainContentPadding(); // Ajusta o padding inicial
  
  // Ajusta o padding do main também no redimensionamento da janela
  window.addEventListener('resize', adjustMainContentPadding);
});
