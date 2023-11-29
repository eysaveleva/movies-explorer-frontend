import React, { useState, useCallback, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import { ShortDuration } from '../../utils/const';

export default function Movies({ savedMovies, addMovie, removeMovie,setIsError, isError }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isErrorAnswerServer, setIsErrorAnswerServer] = useState(false);
  const [newEntrance, setNewEntrance] = useState(true);
  const [searchedText, setSearchedText] = useState('') ;

  const [statusCheckBox, setStatusCheckBox] = useState(JSON.parse(localStorage.getItem('statusCheckBoxin')));

  const savedSearchData = useCallback((text, checkbox, bdmovies) => {
    setSearchedText(text);
    localStorage.setItem('searchedTextin', JSON.stringify(text));
    localStorage.setItem('statusCheckBoxin', JSON.stringify(checkbox));
    localStorage.setItem('searchedMoviesin', JSON.stringify(bdmovies));


    const filtered = bdmovies.filter((movie) => {
    const searchName = movie.nameRU.toLowerCase().trim().includes(text.toLowerCase());
    return checkbox ? (searchName && movie.duration <= ShortDuration) : searchName;})
    setFilteredMovies(filtered);
  }, [])

  function searchMovies(text) {
    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
          setIsErrorAnswerServer(false);
          setNewEntrance(false);
          setStatusCheckBox(false);
          savedSearchData(text, false, res);
          localStorage.setItem('searchedMoviesin', JSON.stringify(movies));
        })
        .catch(err => {
          setIsErrorAnswerServer(true);
          console.error(`Ошибка при поиске фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      savedSearchData(text, statusCheckBox, movies)
    }
  }

  useEffect(() => {
    if (localStorage.searchedMoviesin && localStorage.statusCheckBoxin && localStorage.searchedTextin) {
      const bdmovies = JSON.parse(localStorage.searchedMoviesin);
      const text = JSON.parse(localStorage.searchedTextin);
      const checkbox = JSON.parse(localStorage.statusCheckBoxin);
      setSearchedText(text);
      setStatusCheckBox(checkbox);
      setIsErrorAnswerServer(false);
      setNewEntrance(false);
      setMovies(bdmovies);
      savedSearchData(text, checkbox, bdmovies);
    }
  }, [savedSearchData]);

   function changeShort() {
    if (statusCheckBox) {
      localStorage.setItem('statusCheckBoxin', JSON.stringify(false));
      setStatusCheckBox(false);
      savedSearchData(searchedText, false, movies);

    } else {
      localStorage.setItem('statusCheckBoxin', JSON.stringify(true));
      setStatusCheckBox(true);
      savedSearchData(searchedText, true, movies);
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
      {isErrorAnswerServer ? (
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
