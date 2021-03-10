const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const servicesControlPre = document.querySelector('#servicesControlPre');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Assign initial css classes for gallery and nav items
  setInitialState() {
    this.carouselArray[0].classList.add('gallery-item-first');
    this.carouselArray[1].classList.add('gallery-item-previous');
    this.carouselArray[2].classList.add('gallery-item-selected');
    this.carouselArray[3].classList.add('gallery-item-next');
    this.carouselArray[4].classList.add('gallery-item-last');
    this.carouselArray[5].classList.add('gallery-item-end');

    // document.querySelector('.gallery-nav').childNodes[0].className = 'gallery-nav-item gallery-item-first';
    // document.querySelector('.gallery-nav').childNodes[1].className = 'gallery-nav-item gallery-item-previous';
    // document.querySelector('.gallery-nav').childNodes[2].className = 'gallery-nav-item gallery-item-selected';
    // document.querySelector('.gallery-nav').childNodes[3].className = 'gallery-nav-item gallery-item-next';
    // document.querySelector('.gallery-nav').childNodes[4].className = 'gallery-nav-item gallery-item-last';
  }

  // Update the order state of the carousel with css classes
  setCurrentState(target, selected, previous, next, first, last, end) {
    
    selected.forEach(el => {
      el.classList.remove('gallery-item-selected');
      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-next');
      } else {
        el.classList.add('gallery-item-previous');
      }
    });

    previous.forEach(el => {
      el.classList.remove('gallery-item-previous');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-selected');
      } else {
        el.classList.add('gallery-item-first');
      }
    });

    next.forEach(el => {
      el.classList.remove('gallery-item-next');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-last');
      } else {
        el.classList.add('gallery-item-selected');
      }
    });

    first.forEach(el => {
      el.classList.remove('gallery-item-first');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-previous');
      } else {
        el.classList.add('gallery-item-end');
      }
    });

    last.forEach(el => {
      el.classList.remove('gallery-item-last');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-end');
      } else {
        el.classList.add('gallery-item-next');
      }
    });

    end.forEach(el => {
      el.classList.remove('gallery-item-end');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-first');
      } else {
        el.classList.add('gallery-item-last');
      }
    });
  }

  // Construct the carousel navigation
  setNav() {
    galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    this.carouselArray.forEach(item => {
      const nav = galleryContainer.lastElementChild;
      nav.appendChild(document.createElement('li'));
    }); 
  }

  // Construct the carousel controls
  setControls() {
    // this.carouselControls.forEach(control => {
    //   galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
    // }); 

    // !!galleryControlsContainer.childNodes[0] ? galleryControlsContainer.childNodes[0].innerHTML = this.carouselControls[0] : null;
    // !!galleryControlsContainer.childNodes[1] ? galleryControlsContainer.childNodes[1].innerHTML = this.carouselControls[1] : null;
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      if (control.className === undefined) {
        return;
      }
      
      control.addEventListener('click', () => {
        const target = control;
        const selectedItem = galleryContainer.querySelectorAll('.gallery-item-selected');
        const previousSelectedItem = galleryContainer.querySelectorAll('.gallery-item-previous');
        const nextSelectedItem = galleryContainer.querySelectorAll('.gallery-item-next');
        const firstCarouselItem = galleryContainer.querySelectorAll('.gallery-item-first');
        const lastCarouselItem = galleryContainer.querySelectorAll('.gallery-item-last');
        const endCarouselItem = galleryContainer.querySelectorAll('.gallery-item-end');

        this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, firstCarouselItem, lastCarouselItem, endCarouselItem);
      });
    });
  }

  autoPlay() {
    setInterval(function() {
      servicesControlPre.dispatchEvent(new Event('click'));
     }, 6000);
  }
}

const servicesCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

servicesCarousel.setControls();
// servicesCarousel.setNav();
servicesCarousel.setInitialState();
servicesCarousel.useControls();
servicesCarousel.autoPlay();
