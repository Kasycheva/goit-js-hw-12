import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

export const createGalleryMarkup = (images) => {
  return images
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="text-info">Likes: <span class="number-info">${likes}</span></p>
          <p class="text-info">Views: <span class="number-info">${views}</span></p>
          <p class="text-info">Comments: <span class="number-info">${comments}</span></p>
          <p class="text-info">Downloads: <span class="number-info">${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');
};

export const renderGallery = (images, reset = false) => {
  if (reset) {
    gallery.innerHTML = '';
  }
  const markup = createGalleryMarkup(images);
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const showNotification = (message, type = 'error') => {
  iziToast[type]({
    message,
    position: 'topRight',
  });
};
