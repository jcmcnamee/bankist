'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const header = $('.header');

//const allSections = document.querySelectorAll('.section');
const allSections = $('.section');
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

get all siblings as an HTML coll
console.log(h1.parentElement.children);
