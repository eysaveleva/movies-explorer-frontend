import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const [count, setCount] = useState(printCards().init);
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
        {fact.map((data) => {
          return (
            <MoviesCard key={data._id} name={data.name} src={data.image} link={data.link} duration={data.duration}/>
          )
        })}
      </ul>
      <button className={`movies-section__button ${count >= movies.length && "movies-section__button_hidden"}`} type="button" onClick={clickMore}>Ещё</button>
    </section>
  )
}
