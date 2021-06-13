import images from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const imageMarkup = addImagesMarkup(images);
const lightbox = document.querySelector('.js-lightbox');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const lightBoxImg = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

let imgIndex = 0;

gallery.insertAdjacentHTML('beforeend', imageMarkup);

function addImagesMarkup(images) {
  return images
    .map(({ preview, original, description }, idx) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      data-index="${idx}"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

// Swipe function

const increment = () => {
  if (imgIndex === images.length - 1) return (imgIndex = 0);
  imgIndex++;
};

const decrement = () => {
  if (imgIndex === 0) return (imgIndex = images.length - 1);
  imgIndex--;
};

const onSwipe = event => {
  event.code === 'ArrowLeft' && decrement();
  event.code === 'ArrowRight' && increment();
  const { original, description } = images[imgIndex];
  replaceAttribute(original, description);
};

// Main functions

const replaceAttribute = (src, alt) => {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
};

const onOpenModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  imgIndex = Number(event.target.dataset.index);

  const sourceEl = event.target.dataset.source;
  const altEl = event.target.alt;
  window.addEventListener('keydown', onSwipe);
  window.addEventListener('keydown', onEscKeyPress);
  lightbox.classList.add('is-open');
  replaceAttribute(sourceEl, altEl);
};

const onCloseModal = () => {
  window.removeEventListener('keydown', onEscKeyPress);
  lightbox.classList.remove('is-open');
  replaceAttribute('', '');
};

const onOverlayClick = event => {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
};

const onEscKeyPress = event => {
  const isEscKey = event.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
};

gallery.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
lightBoxOverlay.addEventListener('click', onOverlayClick);
