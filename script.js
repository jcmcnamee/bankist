'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const header = $('.header');

//const allSections = document.querySelectorAll('.section');
const allSections = $('.section');
console.log(allSections);

//const allButtons = document.getElementsByTagName('button');
const allButtons = $('button');
console.log(allButtons);

//const message = document.createElement('div');
//const message = $('<div>');  DOES NOT WORK

//message.classList.add('cookie-message');
//$(message).addClass('cookie-message');

//message.text('We use cookies for improved functionality and analystics.');
//message.innerHTML =
// 'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>';

const message = $('<div>', {
  class: 'cookie-message',
  html: 'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>',
});

header.prepend(message);
