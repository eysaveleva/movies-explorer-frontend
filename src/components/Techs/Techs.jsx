import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h3 className="techs__title">Технологии</h3>
      <div className="techs__container">
        <h2 className="techs__subtitle">7 технологий</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className="techs__lists">
        <span className="techs__list">HTML</span>
        <span className="techs__list">CSS</span>
        <span className="techs__list">JS</span>
        <span className="techs__list">React</span>
        <span className="techs__list">Git</span>
        <span className="techs__list">Express.js</span>
        <span className="techs__list">mongoDB</span>
      </div>
    </section>
  );
};
