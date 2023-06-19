import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = props => {
  useEffect(() => {
    document.addEventListener('keydown', props.onEsc);
    return () => {
      document.removeEventListener('keydown', props.onEsc);
    };
  });

  return (
    <div className={css.overlay} id="overlay" onClick={props.onClick}>
      <div className={css.modal}>
        <img src={props.modalUrl} alt={props.modalAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onEsc: PropTypes.func.isRequired,
};
