import React, { useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useLocation} from 'react-router-dom';

export default function SearchForm({ searchedText, searchMovies, savedMovies, isError, setIsError, statusCheckBox, changeShort }) {

  const { values, handleChange, reset } = useFormValidation();
  const { pathname } = useLocation();

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedText })
    }
    setIsError(false)
  }, [searchedText, reset, setIsError, pathname, savedMovies])

  function handleSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form' noValidate onSubmit={handleSubmit}>
          <div className='search__line'>
            <input className='search__input'
              type="text"
              minLength={2}
              maxLength={40}
              placeholder='Фильм'
              required
              name="search"
              value={values.search || ''}
              onChange={(evt) => {
                handleChange(evt);
                setIsError(false);
              }}
            />
            <button className='search__submit' type="submit"></button>

          </div>
          <span className={`search__error ${isError && 'search__error_active'}`}>{isError ? 'Введите ключевое слово' : '.'}</span>
          <FilterCheckbox statusCheckBox={statusCheckBox} changeShort={changeShort} />
        </form>
      </div>
    </section>
  );
}
