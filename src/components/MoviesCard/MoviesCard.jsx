import { useLocation, Link } from 'react-router-dom';
import './MoviesCard.css';
import { getHoursAndMinutes } from '../../utils/convertMinutes.js';
import { beatfilm_URL } from '../../utils/const';

export default function MoviesCard({ data, savedMovies, addMovie, removeMovie }) {

  const { pathname } = useLocation();
  const isLikeButton = pathname === '/movies';

  const imageUrl = data.image.url ? `${beatfilm_URL}${data.image.url}` : data.image;
  const savedMovie = savedMovies ? savedMovies.find((item) => item.movieId === data.id) : '';
  const isLiked = savedMovies ? savedMovies.some((i) => i.movieId === data.id) : false;

  return (
    <li className="card">
      <article>
        <Link to={data.trailerLink} target="_blank">
          <img className="card__image" src={imageUrl} alt={data.nameRU}/>
        </Link>
        <div className="card__container">
          <div className="card__text-group">
            <h2 className="card__subtitle">{data.nameRU}</h2>
            <span className="card__duration">{getHoursAndMinutes(data.duration)}</span>
          </div>
          {isLikeButton ?
            <button type="button"
              className={`card__save ${isLiked ? "card__save_active" : ""}`}
              onClick={isLiked ? (() => removeMovie(savedMovie?._id)) : (() =>  addMovie(data, isLiked, savedMovie?._id))}>
            </button>
            :
            <button type="button"
              className={`card__save card__save_type_delete`}
              onClick={() => removeMovie(data._id)}>
            </button>
          }
        </div>
      </article>
    </li>
  )
}
