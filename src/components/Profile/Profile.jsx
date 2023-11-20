import React from "react";
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__info">
          <label className="profile__label">Имя</label>
          <input
              minLength="6"
              placeholder="Имя"
              maxLength="40"
              disabled
              className="profile__input"
              type="text"
              defaultValue="Виталий"
              required
              />
        </div>
        <div className="profile__info profile__info_type_last">
          <label className="profile__label">E-mail</label>
          <input
            minLength="6"
            placeholder="Пароль"
            maxLength="40"
            disabled
            className="profile__input"
            type="text"
            defaultValue="pochta@yandex.ru"
            required
            />
          </div>
        <button className="profile__button" type="submit">Редактировать</button>
        <Link to="/" className="profile__button profile__button_log-out">Выйти из аккаунта</Link>
      </form>
    </section>
  )
}
