const nav = document.getElementById('nav');

nav.addEventListener('click', event => {
  nav.querySelectorAll('a').forEach(item => {
    item.classList.remove('linkActive');
  });
  event.target.classList.add('linkActive');
});

//slider

const phones = document.querySelectorAll(".slider .phone__screen");

phones.forEach( phone => phone.addEventListener( "click", event => {
  if ( event.target.classList.contains("hidden") ) {
    event.target.classList.remove("hidden");
  } else {
    event.target.classList.add("hidden");
  }
}));