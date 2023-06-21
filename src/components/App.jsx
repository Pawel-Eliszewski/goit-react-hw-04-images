import { useState, useEffect } from 'react';
import { fetchImages } from 'services/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { notification } from 'utils/notification';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = input => {
    setQuery(input.name);
    setPage(1);
    setIsLoading(true);
  };

  const handleBtnClick = e => {
    e.preventDefault();
    setPage(page + 1);
    setIsLoading(true);
  };

  const handleImgClick = e => {
    e.preventDefault();
    const chosenImgLargeUrl = e.target.dataset['src'];
    const chosenImgAlt = e.target['alt'];
    setIsModalOpen(true);
    setModalUrl(chosenImgLargeUrl);
    setModalAlt(chosenImgAlt);
  };

  const handleModalClick = e => {
    if (e.target.name === undefined) {
      setIsModalOpen(false);
    }
  };

  const handleModalEsc = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    let props = {
      query,
      images,
      page,
      isLoading,
      setImages,
      setIsLoading,
      setTotalPages,
      setTotalHits,
    };
    if (query !== '') {
      fetchImages(props);
    }
  }, [query, page, images, isLoading]);

  useEffect(() => {
    let props = { query, page, totalPages, totalHits, isLoading };
    notification(props);
  }, [query, page, totalPages, totalHits, isLoading]);

  return (
    <div className="main">
      <Searchbar onFormSubmit={handleFormSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} onClick={handleImgClick} />
      ) : null}
      {isLoading ? <Loader /> : null}
      {page !== totalPages && totalHits ? (
        <Button onClick={handleBtnClick} />
      ) : null}
      {isModalOpen === true ? (
        <Modal
          onClick={handleModalClick}
          onEsc={handleModalEsc}
          modalUrl={modalUrl}
          modalAlt={modalAlt}
        />
      ) : null}
    </div>
  );
}
