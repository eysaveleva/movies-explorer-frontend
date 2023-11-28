import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import useResize from '../../hooks/useResize.js';

import { Step, StepLitle, StepBig, Width, WidthLitle, WidthBig, CardsToRendMax, CardsToRend, CardsToRendLess, CardsToRendMin } from '../../utils/const';

export default function MoviesCardList({ movies, savedMovies, addMovie, removeMovie }) {
  const { pathname } = useLocation();
  let size = useResize();
  const [moviesToAdd, setMoviesToAdd] = useState(0);

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const fact = useMemo(() => {
    const countToRender = size.width < WidthLitle ?
                            CardsToRendMin :
                            (size.width < Width ?
                              CardsToRendLess :
                              (size.width < WidthBig ?
                                CardsToRend :
                                CardsToRendMax
                              )
                            );
    return movies.slice(0, countToRender + moviesToAdd);
  }, [movies, moviesToAdd, size]);

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
      {pathname === '/movies' &&  movies.length > fact.length &&
        (<button className={"movies-section__button"}
          type="button"
            onClick={() => {
              setMoviesToAdd((prev) => prev + (size.width < Width ? StepLitle : (size.width < WidthBig ? Step : StepBig)));
            }}>
            Ещё
        </button>)
      }</section>
  )
}
