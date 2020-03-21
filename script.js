class Modal {
  constructor (modal, form, mess) {
    this.modal = modal;
    this.form = form;
    this.message_container = mess;
  }

  show () {
    this.modal.classList.remove('hidden');
  }

  close () {
    this.modal.classList.add('hidden');
  }

  formValue (obj) {
    let value = this.form.querySelector(obj['node']).value;
    value = (value === "") ? obj['defaultValue'] : value;
    return `<p>${obj['fieldName']}: ${value}</p>`;
  }

  init (message) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      let text = '<p>Письмо отправлено</p>' + message['message'].map(obj => this.formValue(obj)).join('');
      this.message_container.innerHTML = text;
      this.show();
    })
  }

  reset () {
    this.form.reset();
  }
}


const navigation = () => {
  function checkLocation () {
    let currentItem = anchors[0];
    anchors.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight/10) currentItem = el;
    });
    currentNavigationItem = document.getElementById(`${currentItem.dataset.anchor}`);
    currentNavigationItem.classList.add('active_nav');
  }

  const anchors = document.querySelectorAll('section');
  let currentNavigationItem;

  checkLocation ();
  window.addEventListener('scroll', () => {
    currentNavigationItem.classList.remove('active_nav');
    checkLocation();
  });
}


const switchSlide = () => {
  const slider_slidesBgcolor = {
    0: "red",
    1: "blue"
  }
  const slider_slidesPattern = {
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

  let currentSlide = 0;
  slider_arrows.forEach( arrow => arrow.addEventListener("click", event => {
    (currentSlide === 1) ? currentSlide-- : currentSlide++;
    slider_fullSection.classList.value = "slider";
    slider_fullSection.classList.add(slider_slidesBgcolor[currentSlide]);

    slider_slideContainer.innerHTML = slider_slidesPattern[currentSlide];

    slider_arrows.forEach(arrow => arrow.querySelectorAll('span').forEach(el => el.classList.value = 'arrow_' + slider_slidesBgcolor[currentSlide]));//add color class
    switchScreen();
  }));
}


const switchScreen = () => {
  const slider_phones_screen = document.querySelectorAll(".slider .phone__screen");
  slider_phones_screen.forEach( phone => phone.addEventListener( "click", event => {
    if ( event.target.classList.contains("hidden") ) {
      event.target.classList.remove("hidden");
    } else {
      event.target.classList.add("hidden");
    }
  }));
}


const switchTags = () => {
  portfolio_filterTags.addEventListener('click', event => {
    if(!event.target.classList.contains("active_filter")) {
      let portfolioPictures = [...portfolio_containerOfItems.querySelectorAll(".portfolio_picture")];
      portfolioPictures.push(portfolioPictures.shift());
      portfolioPictures.forEach( picture => portfolio_containerOfItems.append(picture) );
    }

    portfolio_filterTags.querySelectorAll("button").forEach(item => item.classList.remove('active_filter'));
    event.target.classList.add('active_filter');
  })
}


const tagClick = () => {
  const portfolio_items = portfolio_containerOfItems.querySelectorAll("li");
  portfolio_items.forEach(el => el.addEventListener('click', event => {
    if(event.target.classList.contains('active_item')) event.target.classList.remove('active_item')
    else {
      portfolio_items.forEach((el => el.querySelector('img').classList.remove('active_item')));
      event.target.classList.add('active_item');
    }
  }))
}


const getQuote_modal = () => {
  const form_container = document.querySelector("form");
  const modal_container = document.querySelector(".modal")
  const modal_message_container = modal_container.querySelector(".modal_message");

  const modal = new Modal(modal_container, form_container, modal_message_container);
  const modal_message = {
    'message': [
      {'node': "input[name='subject']", 'fieldName': "Subject", 'defaultValue': "No subject"},
      {'node': "textarea[name='description']", 'fieldName': "Description", 'defaultValue': "No description"}
    ]
  }

  modal.init(modal_message)

  window.addEventListener('click', event => {
    if(event.target.classList.contains('modal_background')) {
      modal.reset();
      modal.close();
    }
  });
}


const slider_fullSection = document.querySelector(".slider");
const slider_slideContainer = document.querySelector(".phones");

const slider_arrows = document.querySelectorAll(".slider .arrow");
const portfolio_containerOfItems = document.querySelector('.portfolio__works');

const portfolio_filterTags = document.getElementById('filter');

navigation();
switchScreen();
switchSlide();
switchTags();
tagClick();
getQuote_modal();




