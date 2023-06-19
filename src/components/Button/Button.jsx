import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = props => {
  return (
    <button type="button" className={css.button} onClick={props.onClick}>
      <span className={css.label}>Load more</span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
