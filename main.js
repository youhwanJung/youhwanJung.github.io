const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const hero = document.querySelector('#hero');
const logoLink = document.querySelector('header h1 a');
const navLinks = document.querySelectorAll('nav a');
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');

document.body.style.paddingTop = headerHeight + 'px';
hero.style.marginTop = '-' + headerHeight + 'px';
hero.style.paddingTop = headerHeight + 'px';

function smoothScroll(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navLinks.forEach((a) => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll(this.getAttribute('href'));
    nav.classList.remove('open');
  });
});

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelector('.hero-btn').addEventListener('click', (e) => {
  e.preventDefault();  // 추가
  smoothScroll('#AboutMe');
});

window.addEventListener('scroll', () => {
  const isMobile = window.innerWidth <= 768;
  const scrolled = window.scrollY > 50 || isMobile;

  header.style.backgroundColor = '#ffffff';
  header.style.boxShadow = scrolled ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none';

  logoLink.style.color = '#1a2a3a';
  hamburger.style.color = '#1a2a3a';
  navLinks.forEach((a) => {
    a.style.color = scrolled ? '#1a2a3a' : '#475569';
  });
});

window.dispatchEvent(new Event('scroll'));

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(btn, tabId) {
  const modal = btn.closest('.modal-content');
  modal.querySelectorAll('.modal-tab').forEach((t) => t.classList.remove('active'));
  modal.querySelectorAll('.modal-tab-content').forEach((t) => t.classList.remove('active'));
  btn.classList.add('active');
  modal.querySelector('#' + tabId).classList.add('active');
}

