import pets from '../../pets.js';
import { fullWidth, middleWidth, smallWidth } from '../../script/constants.js';
import modal from '../../script/modal.js';

const petCards = document.getElementById('pets__cards');

const pagination = () => {
  const first = document.getElementById('first');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const last = document.getElementById('last');
  const pageNum = document.getElementById('number');

  const cardsOnFullWidth = 8;
  const cardsOnMiddleWidth = 6;
  const cardsOnSmallWidth = 3;
  const petsArrayLength = 48;

  let pageNumber = 1;
  let page = 0;

  function createRandomArray(arrOriginal, arrLength) {
    const result = [];

    while (result.length < arrLength) {
      const randomPick = Math.floor(Math.random() * arrOriginal.length);

      let sliceOfThree = [];
      let sliceOfSix = [];
      let sliceOfEight = [];

      if (result.length % cardsOnSmallWidth !== 0) {
        sliceOfThree = result.slice(-(result.length % cardsOnSmallWidth));
      }

      if (result.length % cardsOnMiddleWidth !== 0) {
        sliceOfSix = result.slice(-(result.length % cardsOnMiddleWidth));
      }

      if (result.length % cardsOnFullWidth !== 0) {
        sliceOfEight = result.slice(-(result.length % cardsOnFullWidth));
      }

      if (
        !result.length % cardsOnSmallWidth === 0 &&
        sliceOfThree.includes(randomPick)
      ) {
        continue;
      }

      if (
        !result.length % cardsOnMiddleWidth === 0 &&
        sliceOfSix.includes(randomPick)
      ) {
        continue;
      }

      if (
        !result.length % cardsOnFullWidth === 0 &&
        sliceOfEight.includes(randomPick)
      ) {
        continue;
      }

      result.push(randomPick);
    }
    return result;
  }

  const createPetCard = (index, arr) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'pets__cards-card';
    cardDiv.id = `card ${index + 1}`;

    const cardImg = document.createElement('img');
    cardImg.className = 'pets__cards-card-image';
    cardImg.alt = `pet ${arr[index].name}`;
    cardImg.src = arr[index].img;

    const cardName = document.createElement('p');
    cardName.className = 'pets__cards-card-name';
    cardName.innerHTML = arr[index].name;

    const cardBtn = document.createElement('button');
    cardBtn.className = 'pets__cards-card-button';
    cardBtn.innerHTML = 'Learn more';
    cardBtn.id = index;

    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardBtn);
    petCards.appendChild(cardDiv);

    return cardDiv;
  };

  const fullArr = createRandomArray(pets, petsArrayLength);

  for (let i = 0; i < fullArr.length; i++) {
    fullArr[i] = pets[fullArr[i]];
  }

  const cardsPagination = (cardsAmountOnPage) => {
    const pages = petsArrayLength / cardsAmountOnPage;
    for (let i = 0; i < page + cardsAmountOnPage; i++) {
      createPetCard(i, fullArr);
      pageNum.innerHTML = pageNumber;
    }

    const changePetsView = (page, pageNum) => {
      petCards.innerHTML = '';
      pageNum.innerHTML = pageNumber;
      for (let i = page; i < page + cardsAmountOnPage; i++) {
        createPetCard(i, fullArr);
      }
      modal(fullArr);
    };

    next.addEventListener('click', () => {
      page === fullArr.length - cardsAmountOnPage
        ? (page = 0)
        : (page += cardsAmountOnPage);
      pageNumber === pages ? (pageNumber = 1) : (pageNumber += 1);
      changePetsView(page, pageNum);
    });

    previous.addEventListener('click', () => {
      page === 0
        ? (page = fullArr.length - cardsAmountOnPage)
        : (page -= cardsAmountOnPage);
      pageNumber === 1 ? (pageNumber = pages) : (pageNumber -= 1);
      changePetsView(page, pageNum);
    });

    first.addEventListener('click', () => {
      page = 0;
      pageNumber = 1;
      changePetsView(page, pageNum);
    });

    last.addEventListener('click', () => {
      page = fullArr.length - cardsAmountOnPage;
      pageNumber = pages;
      changePetsView(page, pageNum);
    });
  };

  if (fullWidth) cardsPagination(cardsOnFullWidth);
  if (middleWidth) cardsPagination(cardsOnMiddleWidth);
  if (smallWidth) cardsPagination(cardsOnSmallWidth);

  modal(fullArr);
};

pagination();

let timeOutFunctionId;

const resized = () => {
  petCards.innerHTML = '';
  pagination();
};

window.addEventListener('resize', () => {
  clearTimeout(timeOutFunctionId);
  timeOutFunctionId = setTimeout(resized, 500);
});
