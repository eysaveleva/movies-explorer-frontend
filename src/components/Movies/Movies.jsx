import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesData } from '../../utils/const.js';

export default function Movies () {
  const [movies, setMovies] = useState([]);
  const [isCheckMovies, setIsCheckMovies] = useState(true);

  useEffect(() => {
    setMovies(moviesData);
  }, [])

  function onCheckMovies() {
    if (isCheckMovies) {
      setIsCheckMovies(false);
      setMovies(movies.filter((element) => element.duration <= 40));
    } else {
      setIsCheckMovies(true);
      setMovies(moviesData);
    }
  }

  return (
    <section className="movies">
      <SearchForm isCheck={isCheckMovies} changeShot={onCheckMovies} />
      <MoviesCardList movies={movies} />
    </section>
  );
};

