import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

export default function Movies({ savedMovies, addMovie, removeMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [newEntrance, setNewEntrance] = useState(true);
  const [statusCheckBox, setStatusCheckBox] = useState(false); //useState(JSON.parse(localStorage.getItem('statusCheckBoxin')));
  const [searchedText, setSearchedText] = useState('') ;//useState(JSON.parse(localStorage.getItem('searchedTextin')) || '');


  const savedSearchData = useCallback((text, checkbox, witchmovies) => {
    setSearchedText(text);
    localStorage.setItem('searchedTextin', JSON.stringify(text));
    localStorage.setItem('statusCheckBoxin', JSON.stringify(checkbox));
    localStorage.setItem('searchedMoviesin', JSON.stringify(witchmovies));

    const filtered = witchmovies.filter((movie) => {
    const searchName = movie.nameRU.toLowerCase().trim().includes(text.toLowerCase());
    return checkbox ? (searchName && movie.duration <= 40) : searchName;})
    setFilteredMovies(filtered);
    localStorage.setItem('searchedMoviesin', JSON.stringify(filtered));

  }, [])

  function searchMovies(text) {
    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
          setStatusCheckBox(false);
          setIsError(false);
          setNewEntrance(false);
          savedSearchData(text, statusCheckBox, res);
        })
        .catch(err => {
          setIsError(true)
          console.error(`Ошибка при поиске фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      savedSearchData(text, statusCheckBox, movies)
    }
  }

  useEffect(() => {
    if (localStorage.searchedMoviesin && localStorage.statusCheckBoxin && localStorage.searchedTextin) {
      const witchmovies = JSON.parse(localStorage.searchedMoviesin);
      const text = JSON.parse(localStorage.searchedTextin);
      const checkbox = JSON.parse(localStorage.statusCheckBoxin);

      setFilteredMovies(witchmovies);
      setSearchedText(text);
      setStatusCheckBox(checkbox);
      setIsError(false);
      setNewEntrance(false);
      savedSearchData(text, checkbox, witchmovies);
    }
  }, [savedSearchData]);

   function changeShort() {
    if (statusCheckBox) {
      setStatusCheckBox(false);
      savedSearchData(searchedText, false, movies);
      localStorage.setItem('statusCheckBoxin', JSON.stringify(false));
    } else {
      setStatusCheckBox(true);
      savedSearchData(searchedText, true, movies);
      localStorage.setItem('statusCheckBoxin', JSON.stringify(true));
    }
  }

  return (
    <section className="movies">
      <SearchForm
        searchMovies={searchMovies}
        isError={isError}
        setIsError={setIsError}
        statusCheckBox={statusCheckBox}
        changeShort={changeShort}
        searchedText={searchedText}
        savedMovies={savedMovies}
      />
      {isError ? (
        <span className='movies movies_not-found'>
          Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </span>
      ) : (
        isLoading ? (
          <Preloader visible={isLoading} />
        ) : (
          filteredMovies.length ? (
            <MoviesCardList
              movies={filteredMovies}
              savedMovies={savedMovies}
              addMovie={addMovie}
              removeMovie={removeMovie}
            />
          ) : (
            <p className="movies movies_not-found">
              {newEntrance ? "" :"По вашему запросу ничего не найдено."}
            </p>
          )
        )
      )}
    </section>
  );
}

