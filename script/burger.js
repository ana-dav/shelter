const hamburger = document.querySelector('.hamburger'),
  navbar = document.querySelector('.list'),
  links = document.querySelectorAll('.list__item'),
  outerDiv = document.querySelector('.menu');

const bg = document.createElement('div');

const toggleHamburger = () => {
  hamburger.classList.toggle('close');
  if (navbar.style.display === 'none' || navbar.style.display === '') {
    navbar.style.display = 'flex';
  } else {
    navbar.style.display = 'none';
  }

  if (outerDiv.childNodes[4].className !== 'list__wrapper') {
    bg.classList.add('list__wrapper');
    bg.appendChild(navbar);
    outerDiv.appendChild(bg);
  }

  bg.classList.toggle('close');
};

const handleWindowResize = () => {
  if (window.innerWidth > 767) {
    const bg = document.querySelector('.list__wrapper');
    if (bg) bg.replaceWith(...bg.childNodes);
    navbar.style.display = 'flex';
    if ((hamburger.className = 'hamburger close')) {
      hamburger.className = 'hamburger';
    }
  } else {
    navbar.style.display = 'none';
  }
};

hamburger.addEventListener('click', toggleHamburger);
window.addEventListener('resize', handleWindowResize);
