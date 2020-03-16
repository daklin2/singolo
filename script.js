const nav = document.getElementById('nav');

nav.addEventListener('click', event => {
  nav.querySelectorAll('a').forEach(item => {
    item.classList.remove('linkActive');
  });
  event.target.classList.add('linkActive');
});