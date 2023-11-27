import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__lists">
        <li className="techs__list">HTML</li>
        <li className="techs__list">CSS</li>
        <li className="techs__list">JS</li>
        <li className="techs__list">React</li>
        <li className="techs__list">Git</li>
        <li className="techs__list">Express.js</li>
        <li className="techs__list">mongoDB</li>
      </ul>
    </section>
  );
};
