document.addEventListener('DOMContentLoaded', () => {
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
  categoryFilter.addEventListener('touchstart', filterProducts); 

  // Modal
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close-btn');

  const productDetails = {
    1: { title: 'Iluminação de LED', image: 'img/led.png', description: 'Trabalhamos com uma ampla variedade de soluções em iluminação...' },
    2: { title: 'Ferramentas', image: 'img/ferramentas.jpg', description: 'Oferecemos ferramentas de alta qualidade...' },
    3: { title: 'Conexões PVC', image: 'img/conexoes.jpg', description: 'Disponibilizamos conexões PVC...' },
    4: { title: 'Disjuntores', image: 'img/disjuntores.png', description: 'Nossa linha de disjuntores inclui modelos...' },
    5: { title: 'Contatores', image: 'img/contatoras.png', description: 'Trabalhamos com contatores...' },
    6: { title: 'Duchas', image: 'img/duchas.jpg', description: 'Oferecemos duchas elétricas...' }
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
    button.addEventListener('touchstart', (e) => {
      e.preventDefault(); 
      button.click(); 
    });
  });

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  modal.addEventListener('touchstart', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });

  
  const categoryImage = document.createElement('div');
  categoryImage.className = 'category-image';
  categoryImage.innerHTML = '<img src="" alt="Imagem da categoria filtrada" id="category-image">';
  document.querySelector('.product-grid').insertAdjacentElement('beforebegin', categoryImage);


  function updateCategoryImage() {
    const selectedCategory = categoryFilter.value;
    const img = document.getElementById('category-image');
    const categoryImageContainer = document.querySelector('.category-image');

    if (selectedCategory !== 'all') {
      img.src = imageMap[selectedCategory] || '';
      categoryImageContainer.style.display = 'block';
    } else {
      categoryImageContainer.style.display = 'none';
    }
  }

  categoryFilter.addEventListener('change', () => {
    filterProducts();
    updateCategoryImage();
  });
  categoryFilter.addEventListener('touchstart', () => {
    filterProducts();
    updateCategoryImage();
  });
  updateCategoryImage();
});