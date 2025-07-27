function setupThemeToggle() {
  const button = document.getElementById('theme-toggle')
  if (!button) {
    console.warn('#theme-toggle not found')
    return
  }

  button.addEventListener('click', () => {
    console.log('Button clicked')
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', 'dark')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired')
  setupThemeToggle()
})

window.setupThemeToggle = setupThemeToggle

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set initial state of menu
let showMenu = false;

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  if (!menuBtn || !menu || !menuNav || !menuBranding) return;

  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    showMenu = false;
  }
}

function getYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', getYear);
