document.addEventListener('DOMContentLoaded', () => {
  
  const menuToggle = document.getElementById('menu-toggle');
  const topMenu = document.getElementById('top-menu');

  menuToggle.addEventListener('click', () => {
    topMenu.classList.toggle('active');
  });

  
  const categoryFilter = document.getElementById('category');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    const selectedCategory = categoryFilter.value;

    productCards.forEach(card => {
      const cardCategory = card.dataset.category;
      card.style.display = selectedCategory === 'all' || cardCategory === selectedCategory ? 'block' : 'none';
    });
  }

  categoryFilter.addEventListener('change', filterProducts);

  // Modal
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close-btn');

  // Dados dos produtos (descrições por segmento)
  const productDetails = {
    1: {
      title: 'Iluminação de LED',
      image: 'img/led.png',
      description: 'Trabalhamos com uma ampla variedade de soluções em iluminação, incluindo refletores, lâmpadas LED bulbo, fitas LED e painéis LED, perfeitos para ambientes internos e externos.'
    },
    2: {
      title: 'Ferramentas',
      image: 'img/ferramentas.jpg',
      description: 'Oferecemos ferramentas de alta qualidade, como chaves de fenda, alicates, furadeiras e kits completos para uso profissional e doméstico.'
    },
    3: {
      title: 'Conexões PVC',
      image: 'img/conexoes.jpg',
      description: 'Disponibilizamos conexões PVC para instalações hidráulicas e elétricas, incluindo joelhos, luvas, adaptadores e tubos de diversas especificações.'
    },
    4: {
      title: 'Disjuntores',
      image: 'img/disjuntores.png',
      description: 'Nossa linha de disjuntores inclui modelos monofásicos, bifásicos e trifásicos, garantindo segurança e eficiência em instalações elétricas.'
    },
    5: {
      title: 'Contatores',
      image: 'img/contatoras.png',
      description: 'Trabalhamos com contatores para automação e controle de circuitos elétricos, ideais para aplicações industriais e comerciais.'
    },
    6: {
      title: 'Duchas',
      image: 'img/duchas.jpg',
      description: 'Oferecemos duchas elétricas e acessórios, com opções de diferentes potências e designs, garantindo conforto e praticidade.'
    }
  };

  
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      const product = productDetails[productId];

      if (product) {
        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.focus();
      }
    });
  });

  
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);

  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
});