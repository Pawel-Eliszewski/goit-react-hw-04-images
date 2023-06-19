import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import axios from 'axios';
import Notiflix from 'notiflix';

export function App() {
  const [state, setState] = useState({
    query: '',
    images: [],
    page: 1,
    totalPages: null,
    totalHits: null,
    isLoading: false,
    modalUrl: '',
    modalAlt: '',
    isModalOpen: false,
  });

  const handleFormSubmit = input => {
    setState(prev => ({
      ...prev,
      page: 1,
      query: input.name,
      isLoading: true,
    }));
  };

  const getImages = async () => {
    const API_KEY = '34700780-6518b738595d403a93012b466';
    const URL =
      'https://pixabay.com/api/?key=' +
      API_KEY +
      '&q=' +
      encodeURIComponent(state.query.trim()) +
      '&image_type=photo&orientation=horizontal&safesearch=true&per_page=12' +
      '&page=' +
      `${state.page}`;

    if (state.isLoading !== true) {
    } else
      try {
        const response = await axios.get(`${URL}`);
        const totalPages = Math.ceil(response.data.totalHits / 12);
        if (state.page === 1) {
          setState(prev => ({
            ...prev,
            images: response.data.hits,
            isLoading: false,
            totalPages: totalPages,
            totalHits: response.data.totalHits,
          }));
        } else if (state.page !== 1) {
          setState(prev => ({
            ...prev,
            images: [...prev.images, ...response.data.hits],
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
  };

  const handleBtnClick = e => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      page: prev.page + 1,
      isLoading: true,
    }));
  };

  const handleImgClick = e => {
    e.preventDefault();
    const chosenImgLargeUrl = e.target.dataset['src'];
    const chosenImgAlt = e.target['alt'];
    setState(prev => ({
      ...prev,
      isModalOpen: true,
      modalUrl: chosenImgLargeUrl,
      modalALt: chosenImgAlt,
    }));
  };

  const handleModalClick = e => {
    if (e.target.name === undefined) {
      setState(prev => ({
        ...prev,
        isModalOpen: false,
      }));
    }
  };

  const handleModalEsc = e => {
    if (e.key === 'Escape') {
      setState(prev => ({
        ...prev,
        isModalOpen: false,
      }));
    }
  };

  useEffect(() => {
    getImages();
  });

  useEffect(() => {
    if (state.totalPages > 0 && state.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${state.totalHits} images.`);
    } else if (state.totalPages > null && state.page === state.totalPages) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (state.query !== '' && state.totalPages === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }, [state.query, state.page, state.totalPages, state.totalHits]);

  return (
    <div className="main">
      <Searchbar onFormSubmit={handleFormSubmit} />
      {state.images.length > 0 ? (
        <ImageGallery images={state.images} onClick={handleImgClick} />
      ) : null}
      {state.isLoading ? <Loader /> : null}
      {state.page !== state.totalPages && state.totalHits ? (
        <Button onClick={handleBtnClick} />
      ) : null}
      {state.isModalOpen === true ? (
        <Modal
          onClick={handleModalClick}
          onEsc={handleModalEsc}
          modalUrl={state.modalUrl}
          modalAlt={state.modalAlt}
        />
      ) : null}
    </div>
  );
}
