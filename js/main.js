function setupThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (!button) {
    console.warn('#theme-toggle not found');
    return;
  }

  button.addEventListener('click', () => {
    console.log('Button clicked');
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', 'dark');
  });
}

function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const menuNav = document.querySelector('.menu-nav');
  const menuBranding = document.querySelector('.menu-branding');
  const navItems = document.querySelectorAll('.nav-item');

  if (!menuBtn || !menu || !menuNav || !menuBranding) return;

  if (!window.showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    window.showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    window.showMenu = false;
  }
}

function getYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  setupThemeToggle();
  getYear();
  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }
});

// Attach to window so you can call them from HTML if needed
window.setupThemeToggle = setupThemeToggle;
window.toggleMenu = toggleMenu;
window.getYear = getYear;
