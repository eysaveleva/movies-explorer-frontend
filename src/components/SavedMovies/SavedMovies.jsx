import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { saveMovies } from '../../utils/const.js';

export default function SavedMovies() {
  const [saveMovie, setSaveMovie] = useState([]);
  const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true);

  useEffect(() => {
    setSaveMovie(saveMovies)
  }, [])

  function onCheckMoviesSave() {
    if (isCheckMoviesSave) {
      setIsCheckMoviesSave(false);
      setSaveMovie(saveMovie.filter((element) => element.duration <= 40));
    } else {
      setIsCheckMoviesSave(true);
      setSaveMovie(saveMovies);
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm isCheck={isCheckMoviesSave} changeShot={onCheckMoviesSave} />
      <MoviesCardList movies={saveMovie} />
    </section>
  );
};
