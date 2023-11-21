import React from "react";
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <div className='login'>
      <form className='login__form'>
        <Link to="/" title="На главную" className="login__logo" />
        <h1 className='login__title'>Рады видеть!</h1>
        <label className="login__input-label">E-mail</label>
        <input
          name="Email"
          type="email"
          className="login__input"
          id="email"
          placeholder="pochta@yandex.ru"
          minLength="6"
          maxLength="40"
          required
        />
        <label className="login__input-label">Пароль</label>
        <input
          name="Password"
          type="password"
          className="login__input login__input_type_error"
          id="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="40"
          required
        />
        <span className="login__input-error" id="login__input-error"> </span>
        <button type="submit" className='login__button'>Войти</button>
        <p className='login__link'>Еще не зарегистрированы? <Link className='login__link-way' to='/signup'>Регистрация</Link></p>
      </form>
    </div>
  )
}
