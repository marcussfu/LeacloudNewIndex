const galleryContainer1 = document.querySelector('.galleryCooperationContainer');
const galleryControlsContainer1 = document.querySelector('.galleryCooperationControls');
const galleryControls1 = ['previous', 'next'];
const galleryItems1 = document.querySelectorAll('.galleryCooperationItem');
const galleryNav = document.querySelector('.galleryNavContainer');
const galleryCooperationContent = document.querySelector('.cooperationContent');

const cooperationControlPre = document.querySelector('#cooperationControlPre');
const cooperationControlNex = document.querySelector('#cooperationControlNex');

// const galleryItemClassNames = ['gallery-item-first', 'gallery-item-previous', 'gallery-item-selected', 'gallery-item-next', 'gallery-item-last'];
const galleryItemClassNames = ['gallery-item-previous', 'gallery-item-selected', 'gallery-item-next'];

var autoPlayTimer = null;
var interval = 8000;

class Carousel1 {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Assign initial css classes for gallery and nav items
  setInitialState() {
    // for (let i=0; i<5; i++) {
    for (let i=0; i<3; i++) {
        this.carouselArray[i].classList.add(galleryItemClassNames[i]);
        galleryNav.childNodes[i].className = 'galleryNavItem ' +  galleryItemClassNames[i];
    }
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
        // el.classList.add('gallery-item-first');
        el.classList.add('gallery-item-next');
      }
    });

    next.forEach(el => {
      el.classList.remove('gallery-item-next');

      if (target.className.includes('gallery-controls-previous')) {
        // el.classList.add('gallery-item-last');
        el.classList.add('gallery-item-previous');
      } else {
        el.classList.add('gallery-item-selected');
      }
    });

    // first.forEach(el => {
    //   el.classList.remove('gallery-item-first');

    //   if (target.className.includes('gallery-controls-previous')) {
    //     el.classList.add('gallery-item-previous');
    //   } else {
    //     el.classList.add('gallery-item-last');
    //   }
    // });

    // last.forEach(el => {
    //   el.classList.remove('gallery-item-last');

    //   if (target.className.includes('gallery-controls-previous')) {
    //     el.classList.add('gallery-item-first');
    //   } else {
    //     el.classList.add('gallery-item-next');
    //   }
    // });
  }

  // Construct the carousel navigation
  setNav() {
    this.carouselArray.forEach(item => {
        galleryNav.appendChild(document.createElement('div'));
    });

    for(var child=galleryNav.firstChild; child!==null; child=child.nextSibling) {
        child.addEventListener('click', (event) => {
            var tempArray = [
              // [2,3,4,0,1],
              // [1,2,3,4,0],
              // [0,1,2,3,4],
              // [4,0,1,2,3],
              // [3,4,0,1,2],
              [1,2,0],
              [0,1,2],
              [2,0,1],
            ];
            var targetIndex = 0;

            for (var i = 0; i<galleryNav.childNodes.length; i++) {
                if (galleryNav.childNodes[i].className === event.target.className) {
                    targetIndex = i;
                }
            }

            const galleryNavChildNodes = [...galleryNav.childNodes].filter(item => {
                if (String(item.className).includes("gallery-item")) {
                  item.classList.remove('gallery-item-first', 'gallery-item-previous', 
                  'gallery-item-selected', 'gallery-item-next', 'gallery-item-last');
                    return item;
                }
            });

            const galleryContainerChildNodes = [...galleryContainer1.childNodes].filter(item => {
                if (String(item.className).includes("gallery-item")) {
                  item.classList.remove('gallery-item-first', 'gallery-item-previous', 
                  'gallery-item-selected', 'gallery-item-next', 'gallery-item-last');
                    return item;
                }
            });

            for (var i = 0; i<galleryNavChildNodes.length; i++) {
                galleryNavChildNodes[i].classList.add(galleryItemClassNames[tempArray[targetIndex][i]]);
                galleryContainerChildNodes[i].classList.add(galleryItemClassNames[tempArray[targetIndex][i]]);
            }
        });
    }
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
    const triggers = [...galleryControlsContainer1.childNodes, ...galleryContainer1.childNodes];

    triggers.forEach(control => {
      if (control.className === undefined || !String(control.className).includes("-")) {
        return;
      }
      
      control.addEventListener('click', () => {
        if (!(String(control.className).includes("previous") || String(control.className).includes("next"))) {
            return;
        }
        
        const target = String(control.className).includes("previous") ? cooperationControlNex : cooperationControlPre;
        const selectedItem = galleryCooperationContent.querySelectorAll('.gallery-item-selected');
        const previousSelectedItem = galleryCooperationContent.querySelectorAll('.gallery-item-previous');
        const nextSelectedItem = galleryCooperationContent.querySelectorAll('.gallery-item-next');
        const firstCarouselItem = galleryCooperationContent.querySelectorAll('.gallery-item-first');
        const lastCarouselItem = galleryCooperationContent.querySelectorAll('.gallery-item-last');

        this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, firstCarouselItem, lastCarouselItem);
      });
    });
  }
  
  autoPlay() {
    if (autoPlayTimer === null) {
      // setTimeout(() => {
      //   cooperationControlNex.dispatchEvent(new Event('click'));
      // }, 1000);

      autoPlayTimer = setInterval(() => {
        cooperationControlPre.dispatchEvent(new Event('click'));
      }, interval);
    }
  }
}

const cooperationCarousel = new Carousel1(galleryContainer1, galleryItems1, galleryControls1);

cooperationCarousel.setControls();
cooperationCarousel.setNav();
cooperationCarousel.setInitialState();
cooperationCarousel.useControls();
cooperationCarousel.autoPlay();

// start or stop autoplay
$(document).on('mouseenter', '.galleryCooperationItem.gallery-item-selected, .galleryCooperationItem.gallery-item-previous, .galleryCooperationItem.gallery-item-next', () => {
  clearInterval(autoPlayTimer);
  autoPlayTimer = null;
});
$(document).on('mouseleave', '.galleryCooperationItem.gallery-item-selected, .galleryCooperationItem.gallery-item-previous, .galleryCooperationItem.gallery-item-next', () => {
  cooperationCarousel.autoPlay();
});
