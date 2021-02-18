const galleryContainer1 = document.querySelector('.galleryCooperationContainer');
const galleryControlsContainer1 = document.querySelector('.galleryCooperationControls');
const galleryControls1 = ['previous', 'next'];
const galleryItems1 = document.querySelectorAll('.galleryCooperationItem');
const galleryNav = document.querySelector('.galleryNav');

class Carousel1 {
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

    document.querySelector('.gallery-nav').childNodes[0].className = 'gallery-nav-item gallery-item-first';
    document.querySelector('.gallery-nav').childNodes[1].className = 'gallery-nav-item gallery-item-previous';
    document.querySelector('.gallery-nav').childNodes[2].className = 'gallery-nav-item gallery-item-selected';
    document.querySelector('.gallery-nav').childNodes[3].className = 'gallery-nav-item gallery-item-next';
    document.querySelector('.gallery-nav').childNodes[4].className = 'gallery-nav-item gallery-item-last';
  }

  // Update the order state of the carousel with css classes
  setCurrentState(target, selected, previous, next, first, last) {
    
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
        el.classList.add('gallery-item-last');
      }
    });

    last.forEach(el => {
      el.classList.remove('gallery-item-last');

      if (target.className.includes('gallery-controls-previous')) {
        el.classList.add('gallery-item-first');
      } else {
        el.classList.add('gallery-item-next');
      }
    });
  }

  // Construct the carousel navigation
  setNav() {
    galleryContainer1.appendChild(document.createElement('ul')).className = 'gallery-nav';

    this.carouselArray.forEach(item => {
      const nav = galleryContainer1.lastElementChild;
      nav.appendChild(document.createElement('li'));
    }); 
  }

  // Construct the carousel controls
  setControls() {
    // this.carouselControls.forEach(control => {
    //   galleryControlsContainer1.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
    // }); 

    // !!galleryControlsContainer1.childNodes[0] ? galleryControlsContainer1.childNodes[0].innerHTML = this.carouselControls[0] : null;
    // !!galleryControlsContainer1.childNodes[1] ? galleryControlsContainer1.childNodes[1].innerHTML = this.carouselControls[1] : null;
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer1.childNodes];

    triggers.forEach(control => {
      if (control.className === undefined) {
        return;
      }
      
      control.addEventListener('click', () => {
        const target = control;
        const selectedItem = galleryContainer1.querySelectorAll('.gallery-item-selected');
        const previousSelectedItem = galleryContainer1.querySelectorAll('.gallery-item-previous');
        const nextSelectedItem = galleryContainer1.querySelectorAll('.gallery-item-next');
        const firstCarouselItem = galleryContainer1.querySelectorAll('.gallery-item-first');
        const lastCarouselItem = galleryContainer1.querySelectorAll('.gallery-item-last');

        this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, firstCarouselItem, lastCarouselItem);
      });
    });
  }
}

const cooperationCarousel = new Carousel1(galleryContainer1, galleryItems1, galleryControls1);

cooperationCarousel.setControls();
cooperationCarousel.setNav();
cooperationCarousel.setInitialState();
cooperationCarousel.useControls();
