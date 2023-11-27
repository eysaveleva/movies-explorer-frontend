import React from 'react';
import { Link } from "react-router-dom";
import './AboutMe.css';
import avatar from '../../images/avatar.png';

export default function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__container">
        <div className="aboutme__description">
          <h3 className="aboutme__description-name">Виталий</h3>
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
          <img className="aboutme__description-photo" src={avatar} alt="Фото студента разработчика факультета веб-разработки"/>
      </div>
    </section>
  );
};
