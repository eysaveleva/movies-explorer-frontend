import React from "react";
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  return (
    <div className='register'>
      <form className='register__form'>
        <Link to="/" title="На главную" className="register__logo" />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className="register__input-label">Имя</label>
        <input
          name="Name"
          type="text"
          className="register__input"
          id="name"
          placeholder="Виталий"
          minLength="6"
          maxLength="40"
          required
        />
        <label className="register__input-label">E-mail</label>
        <input
          name="Email"
          type="email"
          className="register__input"
          id="email"
          placeholder="pochta@yandex.ru"
          minLength="6"
          maxLength="40"
          required
        />
        <label className="register__input-label">Пароль</label>
        <input
          name="Password"
          type="password"
          className="register__input register__input_type_error"
          id="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="40"
          required
        />
        <span className="register__input-error" id="register__input-error">Что-то пошло не так...</span>
        <button type="submit" className='register__button'>Зарегистрироваться</button>
        <p className='register__link'>Уже зарегистрированы? <Link className='register__link-way' to='/signin'>Войти</Link></p>
      </form>
    </div>
  )
}
