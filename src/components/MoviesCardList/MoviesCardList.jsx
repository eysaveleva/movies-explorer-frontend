import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, savedMovies, addMovie, removeMovie }) {
  const [count, setCount] = useState(printCards().init);
  const { pathname } = useLocation();
  const fact = movies.slice(0, count);

  function printCards() {
    const counter = { init: 16, step: 4}
    if (window.innerWidth  <= 850) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth <= 450) {
      counter.init = 5
      counter.step = 2
    }
    return counter;
  }

  function clickMore() {
    setCount(count + printCards().step)
  }


  return (
    <section className="movies-section">
      <ul className="movies-cardlist">
      {(pathname === '/movies' && fact.length !== 0) ?

        fact.map((data) => {
          return (
            <MoviesCard
            data={data}
            key={data.id}
            addMovie={addMovie}
            removeMovie={removeMovie}
            savedMovies={savedMovies}
            />
          )
        })
          :
          movies.map(data => {
            return (
              <MoviesCard
              data={data}
              key={data._id}
              removeMovie={removeMovie}
              savedMovies={savedMovies}
              />
            )
          })
      }
      </ul>
      {pathname === '/movies' && <button className={`movies-section__button ${count >= movies.length && "movies-section__button_hidden"}`} type="button" onClick={clickMore}>Ещё</button>
      }</section>
  )
}
