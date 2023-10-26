'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////// ADDING AND DELETING

//const allSections = document.querySelectorAll('.section');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

//const allButtons = document.getElementsByTagName('button');
const allButtons = $('button');
// console.log(allButtons);

// Javascript:
const message = document.createElement('div');
// jQuery:
//const message = $('<div>');  DOES NOT WORK

// Javascript:
message.classList.add('cookie-message');
// jQuery:
// $(message).addClass('cookie-message');

//message.text('We use cookies for improved functionality and analystics.');
message.innerHTML =
  'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>';

// const message = $('<div>', {
//   class: 'cookie-message',
//   html: 'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>',
// });

header.append(message);
//header.before(message);
//header.after(message);

$('.btn--close-cookie').click(function () {
  //old way: message.parentElement.removeChild(message); ES6 way:
  message.remove();
});

/////////////////////////////////////////// CLASSES, ATTRIBUTES AND STYLES
// Styles: These get added as INLINE HTML.
// Javascript:
message.style.backgroundColor = '#37383d';
// jQuery - ONLY WORKS WITH JQUERY OBJECT:
//$(message).css('backgroundColor', '#37383d');

message.style.width = '120%';

// // Get styles:
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// //Change CSS custom properties/variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); // Absolute path
// console.log(logo.getAttribute('src')); // Relative path
// console.log(logo.className);
// // Non-standard attributes
// console.log(logo.getAttribute('designer'));
// // Setting attributes
// logo.setAttribute('company', 'Bankist');

// // Links:
// const link = document.querySelector('.twitter-link');
// console.log(link.href); // abs
// console.log(link.getAttribute('href')); // rel

// // Data attributes
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// Don't use as will overwrite all other classes:
//logo.className = 'james-class';

////////////////////////////////////////////// SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());
  // // Returns the distance between the viewport and clicked element.

  // console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // // Returns the current scroll position in terms of the current scroll position relative to the top of the page.

  // console.log(
  //   'Height/width of viewport: ',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // Old school smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // New smooth scrolling method:
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////// EVENTS

const h1 = document.querySelector('h1');

// The modern way - allows us to add multiple listeners to the same event and allows removal of event listeners.
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading.');
// });

// Another way to add an event listener - this is an older method without the above functionailty.
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading.');
// };

// Removing an event listener:
const h1alert = function (e) {
  alert('addEventListener: Great! You are reading the heading.');

  h1.removeEventListener('mouseenter', h1alert);
};

h1.addEventListener('mouseenter', h1alert);

// Or remove after a certain time has passed:
// setTimeout(() => h1.removeEventListener('mouseenter', h1alert), 3000);

////////////////////////////////////////// EVENT PROPAGATION: BUBBLING AND CAPTURING

// 1. Capturing phase: Events are generate on the root of the DOM, they then travel down through the nodes/elements to the target element.
// 2. Target phase: Event reaches the target element, and the events are handled / callback function is executed.
// 3. Bubbling phase: Event travels back up through the parent elements to the document root. (Does not pass through siblings).

// By default, events can only be handled in the target and bubbling phases, but can be set up so can be handled in capturing phase too.

// Propagation can also be stopped, but it's not usually a good idea.

// Bubbling phase can be useful for event delegation#.

// To capture an event during the capturing phase, you can add 'true' to addEventListener.

////////////////////////////////////////// EVENT DELEGATION: IMPLEMENTING NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //Prevents the page scrolling to the section using the HTML anchor method
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });
// // The above is not very economical, as we are attaching the same function to each element.
// // To fix this we can attach the listener to the common parent to capture the event from each child:

// 1. Add event listener to common parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target); // Find original event

  // Match
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // Cannot use 'this' any more
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//////////////////////////////////////////////////// DOM TRAVERSING
// Used for selecting elements relative to other elements.

// Going downwards; children
console.log(h1.querySelectorAll('.highlight')); // Would travel down as deep as necessary into the DOM tree
console.log(h1.childNodes); // Returns all immediate child nodes - not used often
console.log(h1.children); // Returns live HTML collection direct children only
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // Direct parent node
console.log(h1.parentElement); // Direct parent element

// h1.closest('.header').style.background = 'var(--gradient-primary'; // IMPORTANT METHOD: USeful for event delegation

// Going sideways: siblings
// Gets sibling elemenets - most used.
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Gets sibling nodes:
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Get all siblings as an HTML collection
console.log(h1.parentElement.children);

// HTML collection is not an array, but is an iterable
// Manipulae all siblings except the target.
// [...h1.parentElement.children].forEach(function(el) {
//   if(el !== h1) el.style.transform = 'scale(0.5)';
// })

////////////////////////////////////////////////// BUILDING TABBED COMPONENTS

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // Gets closest parent with the class.
  console.log(clicked);

  // Guard clause - exits the funtion if condition is met.
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab and content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////////// PASSING ARGUEMENTS TO EVENT HANDLERS

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibs = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibs.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Even better:
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////// STICKY NAVIGATION BAR
// const initCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// }); // Not a great method due to the frequency of scroll events (will break phones!)

// A better way using Intersetion Observer API:
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOpts = {
//   root: null, // setting root to null selects the viewport
//   threshold: 0.1, // intersection threshold at 10%
// };

// const observer = new IntersectionObserver(obsCallBack, obsOpts);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//////////////////////////////////// REVEAL SECTIONS
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObs.observe(section);
  // section.classList.add('section--hidden');
});

/////////////////////////////////// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, obs) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
};

const imgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObs.observe(img));

//////////////////////////////////// SLIDER

// DECLARATIONS
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  // const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //init
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
    );
  };

  const activateDot = function (slide) {
    // remove active status from all
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const sliderInit = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  sliderInit();

  // Next slide

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
