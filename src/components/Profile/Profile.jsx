import React from "react";
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label className="profile__label">Имя<input minLength="2" disabled className="profile__input" type="text" defaultValue="Виталий" /></label>
        <label className="profile__label">E-mail<input minLength="2" disabled className="profile__input" type="text" defaultValue="pochta@yandex.ru" /></label>
        <button className="profile__button">Редактировать</button>
      </form>
      <Link to="/" className="profile__button profile__button_log-out">Выйти из аккаунта</Link>
    </section>
  )
}
