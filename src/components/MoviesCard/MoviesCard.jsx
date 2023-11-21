import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import './MoviesCard.css';

export default function MoviesCard({ name, src, link, duration }) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  }
  return (
    <li className="card">
      <article>
        <Link to={link} target="_blank">
          <img className="card__image" src={src} alt={name}/>
        </Link>
        <div className="card__container">
          <div className="card__text-group">
            <h2 className="card__subtitle">{name}</h2>
            <span className="card__duration">{duration}</span>
          </div>
          {pathname === '/movies' ?
            <button type="button" className={`card__save ${click ? "card__save_active" : ""}`} onClick={onClick}></button>
            :
            <button type="button" className={`card__save card__save_type_delete`} onClick={onClick}></button>
          }
        </div>
      </article>
    </li>
  )
}
