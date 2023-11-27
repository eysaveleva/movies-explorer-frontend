import './Promo.css';
/* import { HashLink as Link } from 'react-router-hash-link'; */

export default function Promo() {

  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
       {/*  <Link className="promo__button" to="#aboutProject">Узнать больше</Link> */}
        <a className="promo__button" href="#aboutProject">Узнать больше</a>
      </div>
      <div className="promo__logo"></div>
    </section>
  )
}
