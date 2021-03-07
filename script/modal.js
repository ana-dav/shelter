import { smallWidth } from './constants.js';

const modal = (arr) => {
  const petBtns = document.querySelectorAll('.pets__cards-card-button');
  const bg = document.querySelector('.modal__overlay');
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.modal_close-btn');
  const closeCross = document.querySelector('.modal_close-cross');
  const petName = document.querySelector('.modal__content-title');
  const petType = document.querySelector('.type');
  const petBreed = document.querySelector('.breed');
  const petDescription = document.querySelector('.modal__content-description');
  const petAge = document.querySelector('.age1');
  const petInoculations = document.querySelector('.inoculations1');
  const petDiseases = document.querySelector('.diseases1');
  const petParasites = document.querySelector('.parasites1');
  const petImage = document.querySelector('.modal__img');

  const fillModalContent = (arr, name) => {
    arr.filter((pet) => {
      if (pet.name === name) {
        petName.innerText = pet.name;
        petType.innerText = pet.type;
        petBreed.innerText = pet.breed;
        petDescription.innerText = pet.description;
        petAge.innerText = pet.age;
        petInoculations.innerText = pet.inoculations;
        petDiseases.innerText = pet.diseases;
        petParasites.innerText = pet.parasites;
        if (!smallWidth) {
          petImage.src = pet.img;
        } else {
          petImage.src = '';
          petImage.alt = '';
        }
      }
    });
  };

  Array.from(petBtns).forEach((petBtn) => {
    petBtn.addEventListener('click', (event) => {
      const name = event.target.parentNode.querySelector('p').innerText.trim();
      fillModalContent(arr, name);
      modal.style.display = 'flex';
      closeModal.style.display = 'block';
      closeCross.style.display = 'block';
      bg.style.display = 'block';
    });
  });

  closeModal.onclick = function () {
    modal.style.display = 'none';
    closeModal.style.display = 'none';
    closeCross.style.display = 'none';
    bg.style.display = 'none';
  };
};

export default modal;
