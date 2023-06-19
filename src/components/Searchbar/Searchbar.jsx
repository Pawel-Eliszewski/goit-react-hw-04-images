import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = props => {
  const [query, setQuery] = useState('');

  const handleInput = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onFormSubmit({ name: query });
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form type="submit" onSubmit={handleSubmit} className={css.searchform}>
        <button type="submit" className={css.button}></button>
        <input
          className={css.input}
          type="text"
          name="name"
          value={query}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
