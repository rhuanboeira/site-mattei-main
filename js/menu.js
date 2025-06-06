document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('nav#top-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger');
  
    if (!toggle || !menu || !hamburgerLines.length) {
      console.error('Elementos #menu-toggle, nav#top-menu ou .hamburger não encontrados.');
      return;
    }
  
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      
      // Adiciona/remove a classe 'menu-open' no body para aplicar o desfoque
      document.body.classList.toggle('menu-open', menu.classList.contains('active'));
      
      // Controla o overflow do body para evitar rolagem do conteúdo desfocado
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      
      hamburgerLines.forEach(line => line.classList.toggle('active'));
    });
  
    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav#top-menu a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        
        // Remove a classe 'menu-open' do body
        document.body.classList.remove('menu-open');
        
        document.body.style.overflow = '';
        hamburgerLines.forEach(line => line.classList.remove('active'));
      });
    });
  
    // Fechar menu ao clicar fora
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains('active')) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        
        // Remove a classe 'menu-open' do body
        document.body.classList.remove('menu-open');
        
        document.body.style.overflow = '';
        hamburgerLines.forEach(line => line.classList.remove('active'));
      }
    });
  });
