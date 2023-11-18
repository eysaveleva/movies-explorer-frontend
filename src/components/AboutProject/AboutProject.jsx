import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="aboutprj" id="aboutprj">
      <h3 className="aboutprj__title">О проекте</h3>
      <div className="aboutprj__container">
        <div className="aboutprj__description">
          <p className="aboutprj__description-title">Дипломный проект включал 5 этапов</p>
          <p className="aboutprj__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="aboutprj__description">
          <p className="aboutprj__description-title">На выполнение диплома ушло 5 недель</p>
          <p className="aboutprj__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutprj__duration">
        <div className="aboutprj__text aboutprj__text-backend aboutprj__text_week1">1 неделя</div>
        <div className="aboutprj__text aboutprj__text_week4">4 недели</div>
      </div>
      <div className="aboutprj__duration">
        <div className="aboutprj__text aboutprj__text-backend">Back-end</div>
        <div className="aboutprj__text">Front-end</div>
      </div>
    </section>
  );
};
