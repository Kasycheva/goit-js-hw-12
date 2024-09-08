import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNotification } from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const showLoader = () => {
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  loader.classList.add('hidden');
};

const onSearchForm = async (event) => {
  event.preventDefault();
  const query = event.target.elements.input.value.trim();
  
  if (!query) {
    showNotification('Please enter a valid search query', 'error');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  await searchImages(query, currentPage);
};

const searchImages = async (query, page) => {
  showLoader();
  
  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      showNotification('No images found. Please try again!', 'error');
      loadMoreBtn.classList.add('hidden');
      return;
    }

    renderGallery(data.hits, page === 1);
    updateLoadMoreButton();
  } catch (error) {
    showNotification('Something went wrong. Please try again later.', 'error');
  } finally {
    hideLoader();
  }
};

const updateLoadMoreButton = () => {
  const totalPages = Math.ceil(totalHits / 15);
  if (currentPage >= totalPages) {
    loadMoreBtn.classList.add('hidden');
    showNotification("We're sorry, but you've reached the end of search results.", 'info');
  } else {
    loadMoreBtn.classList.remove('hidden');
  }
};

const loadMoreImages = async () => {
  currentPage++;
  await searchImages(currentQuery, currentPage);
  smoothScroll();
};

const smoothScroll = () => {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', loadMoreImages);
