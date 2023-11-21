import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer () {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__copyright">
        <p className="footer__year">&copy; 2023</p>
        <nav className="footer__links">
          <Link className="footer__link" to={'https://practicum.yandex.ru/'} target='_blank'>Яндекс.Практикум</Link>
          <Link className="footer__link" to={'https://github.com/eysaveleva'} target='_blank'>Github</Link>
        </nav>
      </div>
    </footer>
  );
};
