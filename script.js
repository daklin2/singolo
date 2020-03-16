const switchScreen = () => {
  const phones = document.querySelectorAll(".slider .phone__screen");
  phones.forEach( phone => phone.addEventListener( "click", event => {
    if ( event.target.classList.contains("hidden") ) {
      event.target.classList.remove("hidden");
    } else {
      event.target.classList.add("hidden");
    }
  }));
}

const switchNav = () => {
  const nav = document.getElementById('nav');
  nav.addEventListener('click', event => {
    nav.querySelectorAll('a').forEach(item => {
      item.classList.remove('linkActive');
    });
    event.target.classList.add('linkActive');
  });
}

const switchSlide = () => {
  let currentSlide = 0;
  arrow.forEach( arrow => arrow.addEventListener("click", event => {
    (currentSlide === 1) ? currentSlide-- : currentSlide++;

    sliderBackground.classList.value = "slider";
    sliderBackground.classList.add(slide_bgcolor[currentSlide]);

    slideContainer.innerHTML = slides[currentSlide];

    switchScreen();
  }));
}

const sliderBackground = document.querySelector(".slider");
const slideContainer = document.querySelector(".phones");
const arrow = document.querySelectorAll(".slider .arrow");
const slide_bgcolor = {
  0: "red",
  1: "green"
}
const slides = {
  0: [`<div class="phone phone_vertical">
          <div class="phone__screen"></div>
          <div class="phone__case"></div>
          <div class="phone__shadow"></div>
        </div>
        <div class="phone phone_horizontal">
          <div class="phone__screen"></div>
          <div class="phone__case"></div>
          <div class="phone__shadow"></div>
        </div>`],
  1: [`<img width="517" height="513" style="padding: 46px 260px;" src="./assets/slider/2-phones.png" alt="Phone Vertical">`]
};

switchNav();
switchScreen();
switchSlide();