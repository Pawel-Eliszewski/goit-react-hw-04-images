import Notiflix from 'notiflix';

export const notification = ({
  query,
  page,
  totalPages,
  totalHits,
  isLoading,
}) => {
  if (totalPages > 0 && page === 1 && isLoading === false) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  } else if (totalPages > null && page === totalPages && isLoading === false) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else if (query !== '' && totalPages === 0 && totalHits !== null) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};
