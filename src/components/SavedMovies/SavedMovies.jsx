import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCallback, useEffect, useState } from "react";
import { ShortDuration } from '../../utils/const';

export default function SavedMovies({ savedMovies, addMovie, removeMovie }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isError, setIsError] = useState(false);
  const [statusCheckBoxSave, setStatusCheckBoxSave] = useState(false);
  const [searchedText, setSearchedText] = useState('');

   const savedSearchData = useCallback((text, checkbox, witchmovies) => {
    setSearchedText(text);
    const filtered = witchmovies.filter((movie) => {
    const searchName = movie.nameRU.toLowerCase().trim().includes(text.toLowerCase());
    return checkbox ? (searchName && movie.duration <= ShortDuration) : searchName;})
    setFilteredMovies(filtered);

  }, [])

  useEffect(() => {
    savedSearchData(searchedText, statusCheckBoxSave, savedMovies);
  }, [savedSearchData, savedMovies, statusCheckBoxSave, searchedText]);

  function searchMovies(text) {
     savedSearchData(text, statusCheckBoxSave, savedMovies);
    }

    function changeShort() {
    if (statusCheckBoxSave) {
      setStatusCheckBoxSave(false);
    } else {
      setStatusCheckBoxSave(true);
    }
    savedSearchData(searchedText, statusCheckBoxSave, savedMovies);
  }

  return (
    <section className="saved-movies">
      <SearchForm
        searchMovies={searchMovies}
        isError={isError}
        setIsError={setIsError}
        statusCheckBox={statusCheckBoxSave}
        changeShort={changeShort}
        searchedText={searchedText}
        savedMovies={savedMovies}
      />
        {
          savedMovies.length ? (
            <MoviesCardList
              movies={filteredMovies}
              savedMovies={savedMovies}
              addMovie={addMovie}
              removeMovie={removeMovie}
            />
          ) : (
            <p className="saved-movies saved-movies_not-found">
              {filteredMovies.length ? 'Нет фильмов согласно запросу в поиске.' : 'Нет сохраненных фильмов.'}
            </p>
      )}
    </section>
  );
}

