import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = props => {
  return (
    <ul className={css.gallery}>
      {props.images.map(image => {
        return (
          <li className={css.item} key={nanoid()}>
            <img
              id={image.id}
              className={css.image}
              src={image.webformatURL}
              data-src={image.largeImageURL}
              alt={image.tags}
              onClick={props.onClick}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
