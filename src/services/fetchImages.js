import axios from 'axios';

export const fetchImages = async ({
  query,
  images,
  page,
  isLoading,
  setImages,
  setIsLoading,
  setTotalPages,
  setTotalHits,
}) => {
  const API_KEY = '34700780-6518b738595d403a93012b466';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(query.trim()) +
    '&image_type=photo&orientation=horizontal&safesearch=true&per_page=12' +
    '&page=' +
    `${page}`;

  if (isLoading !== true) {
  } else
    try {
      const response = await axios.get(`${URL}`);
      const totalPages = Math.ceil(response.data.totalHits / 12);
      if (page === 1) {
        setImages(response.data.hits);
        setIsLoading(false);
        setTotalPages(totalPages);
        setTotalHits(response.data.totalHits);
      } else if (page !== 1) {
        setImages([...images, ...response.data.hits]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
};
