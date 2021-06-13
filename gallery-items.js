export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

import DefaultExport from './gallery-items.js';

const images = DefaultExport;

const gallery = document.querySelector('.js-gallery');
const imageMarkup = addImagesMarkup(images);

gallery.insertAdjacentHTML('beforeend', imageMarkup);

function addImagesMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
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

const lightbox = document.querySelector('.js-lightbox');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const lightBoxImg = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

gallery.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
lightBoxOverlay.addEventListener('click', onOverlayClick);

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const sourceEl = event.target.dataset.source;
  const altEl = event.target.alt;
  window.addEventListener('keydown', onEscKeyPress);
  lightbox.classList.add('is-open');
  replaceAttribute(sourceEl, altEl);
}

function closeModal() {
  lightbox.classList.remove('is-open');
  replaceAttribute('', '');
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

function onEscKeyPress(event) {
  const isEscKey = event.code === 'Escape';
  if (isEscKey) {
    closeModal();
  }
}

function replaceAttribute(src, alt) {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
}
