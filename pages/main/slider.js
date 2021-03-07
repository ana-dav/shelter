import pets from '../../pets.js';
import modal from '../../script/modal.js';

init();

const slides = document.querySelectorAll('.pets__cards-slider');
const rightArrow = document.getElementById('slider_right');
const leftArrow = document.getElementById('slider_left');

function init() {
  const nextSlide = document
    .querySelector('.pets__cards-slider')
    .cloneNode(true);
  nextSlide.classList.remove('current');
  document.querySelector('.pets__cards').append(nextSlide);
  modal(pets);
}

let currentSlide = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideItem(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('current', direction);
  });
}

function showItem(direction) {
  slides[currentSlide].classList.add('next', direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('current');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createPetsGroup() {
  let prevSlide, nextSlide;

  slides.forEach((slide) => {
    if (slide.classList.contains('current')) {
      prevSlide = slide;
    } else {
      nextSlide = slide;
    }
  });

  let prevSlideTitles = Array.from(
    prevSlide.querySelectorAll('p'),
  ).map((title) => title.innerText.trim());
  let currSlideTitles = [];

  for (let card of nextSlide.children) {
    for (let pet of pets) {
      if (
        prevSlideTitles.includes(pet.name) ||
        currSlideTitles.includes(pet.name)
      ) {
        continue;
      } else {
        card.querySelector('p').innerText = pet.name;
        card.querySelector('img').src = pet.img;
        currSlideTitles.push(pet.name);
        break;
      }
    }
  }
}

rightArrow.addEventListener('click', function () {
  if (isEnabled) {
    shuffle(pets);
    createPetsGroup();
    previousItem(currentSlide);
  }
});

leftArrow.addEventListener('click', function () {
  if (isEnabled) {
    shuffle(pets);
    createPetsGroup();
    nextItem(currentSlide);
  }
});
