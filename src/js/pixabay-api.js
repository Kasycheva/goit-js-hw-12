import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45854856-78ad068c46767c3f7b48e1998';
export const perPage = 15;

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
