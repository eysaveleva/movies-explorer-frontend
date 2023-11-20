import { Link } from 'react-router-dom';
import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow-link.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li>
          <Link className="portfolio__link" to="https://eysaveleva.github.io/how-to-learn/" target='_blank'>
            <p className="portfolio__link-name">Статичный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="Ссылка на гитхаб"/>
          </Link>
        </li>
        <li>
          <Link className="portfolio__link" to="https://eysaveleva.github.io/russian-travel/" target='_blank'>
            <p className='portfolio__link-name'>Адаптивный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="Ссылка на гитхаб"/>
          </Link>
        </li>
        <li>
          <Link className="portfolio__link portfolio__link_type_last"  to="https://eysaveleva.github.io/react-mesto-auth/" target='_blank'>
            <p className='portfolio__link-name'>Одностраничное приложение</p>
            <img className="portfolio__link-img" src={arrow} alt="Ссылка на гитхаб"/>
          </Link>
        </li>
      </ul>
    </section>
  );
};
