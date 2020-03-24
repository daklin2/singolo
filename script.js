class Slider {
  constructor (section) {
    this.items = section.querySelectorAll('.slide_item');
    this.currentItem = 0;
    this.isEnable = true;
  }

  changeCurrentItem (i) {
    this.currentItem = (i + this.items.length) % this.items.length;
  }

  hideItem (direct) {
    this.isEnable = false;
    this.items[this.currentItem].classList.add(direct);
    this.items[this.currentItem].addEventListener('animationend', event => {
      event.target.classList.remove('active_slide', direct);
    })
  }

  showItem (direct) {
    this.items[this.currentItem].classList.add('next', direct);
    this.items[this.currentItem].addEventListener('animationend', event => {
      event.target.classList.remove('next', direct);
      event.target.classList.add('active_slide');
      this.isEnable = true;
    })
  }

  prevItem (i) {
    this.hideItem('to_right');
    this.changeCurrentItem(i - 1);
    this.showItem('from_left');
  }

  nextItem (i) {
    this.hideItem('to_left');
    this.changeCurrentItem(i + 1);
    this.showItem('from_right');
  }
}


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
    return `<p>${obj['fieldName']}: ${value.toString()}</p>`;
  }

  init (message) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      let text = '<p>The letter was sent</p>' + message['message'].map(obj => this.formValue(obj)).join('');
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
    let currentItem = anchors_blocks[0];
    anchors_blocks.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight/10) currentItem = el;
    });
    currentNavigationItem = document.getElementById(`${currentItem.dataset.anchor}`);
    currentNavigationItem.classList.add('active_nav');
  }

  const anchors_blocks = document.querySelectorAll('section');
  const anchors_links = [...document.querySelectorAll('header a[href*="#"]')]
  let currentNavigationItem;

  anchors_links.forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault()
      const blockID = anchor.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  });

  checkLocation ();
  window.addEventListener('scroll', () => {
    currentNavigationItem.classList.remove('active_nav');
    checkLocation();
  });
}


const switchSlide = () => {
  const slider_fullSection = document.querySelector(".slider");
  const slider_arrows = document.querySelectorAll(".slider .arrow");
  const slider = new Slider(slider_fullSection);
  const slider_arrowBgcolor = {
    0: "red",
    1: "blue"
  }

  slider_fullSection.querySelector('.right').addEventListener('click', () => {
    if (slider.isEnable) {
      slider.prevItem(slider.currentItem)
      slider_arrows.forEach(arrow => arrow.querySelectorAll('span').forEach(el => {
        el.classList.value = 'arrow_' + slider_arrowBgcolor[slider.currentItem]
      }));//add color class
    }
  });

  slider_fullSection.querySelector('.left').addEventListener('click', () => {
    if (slider.isEnable) {
      slider.nextItem(slider.currentItem)
      slider_arrows.forEach(arrow => arrow.querySelectorAll('span').forEach(el => {
        el.classList.value = 'arrow_' + slider_arrowBgcolor[slider.currentItem]
      }));//add color class
    }
  });
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


const portfolioSwitchTags = () => {
  const portfolio_filterTags = document.getElementById('filter');
  portfolio_filterTags.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', event => {
      if(!event.target.classList.contains("active_filter")) {
        let portfolioPictures = [...portfolio_containerOfItems.querySelectorAll(".portfolio_picture")];
        portfolioPictures.push(portfolioPictures.shift());
        portfolioPictures.forEach( picture => portfolio_containerOfItems.append(picture) );
      }

      portfolio_filterTags.querySelectorAll("button").forEach(item =>{
        item.classList.remove('active_filter')
      });
      event.target.classList.add('active_filter');
    })
  })
}


const portfolioItemClick = () => {
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


const portfolio_containerOfItems = document.querySelector('.portfolio__works');


navigation();
switchSlide();
switchScreen();
portfolioSwitchTags();
portfolioItemClick();
getQuote_modal();