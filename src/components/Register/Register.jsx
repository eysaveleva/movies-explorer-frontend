import React from "react";
import { Link } from 'react-router-dom';
import './Register.css';
import useFormValidation from '../../hooks/useFormValidation';

export default function Register({onRegister, setIsError, isError}) {

  const { values, errors, isValid, handleChange } = useFormValidation();

  function handleSubmit(evt) {
      evt.preventDefault();
      onRegister(values.name, values.email, values.password);
  }
  return (
    <div className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <Link to="/" title="На главную" className="register__logo"/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className="register__input-label">Имя</label>
        <input className={`register__input ${errors.name && 'register__input_type_error'}`}
          name="name"
          type="text"
          id="name"
          placeholder="Имя"
          minLength="6"
          maxLength="40"
          required
          value={values.name || ''}
          onChange={(evt) => {
            handleChange(evt);
            setIsError(false);
          }}
        />
        <span className="register__input-error">{errors.name}</span>
         <label className="register__input-label">E-mail</label>
        <input className={`register__input ${errors.email && 'register__input_type_error'}`}
          name="email"
          type="email"
          id="email"
          pattern = {"^\\S+@\\S+\\.\\S+$"}
          placeholder="Email"
          minLength="6"
          maxLength="40"
          required
          value={values.email || ''}
          onChange={(evt) => {
            handleChange(evt);
            setIsError(false);
          }}
        />
        <span className="register__input-error">{errors.email}</span>
        <label className="register__input-label">Пароль</label>
        <input className={`register__input ${errors.password && 'register__input_type_error'}`}
          name="password"
          type="password"
          id="password"
          placeholder="Пароль"
          minLength="3"
          maxLength="40"
          required
          value={values.password  || ''}
          onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
          }}
        />
        <span className="register__input-error">{errors.password}</span>
        {isError ?
            <p className="register__result register__result_type_error">Ошибка при регистрации!</p>
            :
            ('')
          }
        <button
          type="submit"
          className={`register__button ${!isValid ? 'register__button_disabled' : ""}`}
          disabled={!isValid}
          >
            Зарегистрироваться
        </button>
        <p className='register__link'>Уже зарегистрированы? <Link className='register__link-way' to='/signin'>Войти</Link></p>
      </form>
    </div>
  )
}
