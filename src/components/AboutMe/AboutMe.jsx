import React from 'react';
import { Link } from "react-router-dom";
import './AboutMe.css';
import avatar from '../../images/avatar.svg';

export default function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h3 className="aboutme__title">Студент</h3>
      <div className="aboutme__container">
        <div className="aboutme__description">
          <p className="aboutme__description-name">Виталий</p>
          <p className="aboutme__description-job">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__description-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как&nbsp;прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="aboutme__link" to={'https://github.com/eysaveleva'} target='_blank'>Github</Link>
        </div>
        <div className="aboutme__img">
          <img className="aboutme__description-photo" src={avatar} alt="#"/>
        </div>
      </div>
    </section>
  );
};
