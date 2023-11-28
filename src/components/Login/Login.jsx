import React  from 'react';
import { Link  } from 'react-router-dom';
import './Login.css';
import useFormValidation from '../../hooks/useFormValidation';

export default function Login({onLogin, isLoggedIn, setIsError, isError}) {
  const { values, errors, isValid, handleChange } = useFormValidation();

  function handleSubmit(evt) {
      evt.preventDefault();
      onLogin(values.email, values.password);
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <Link to="/" title="На главную" className="login__logo" />
        <h1 className='login__title'>Рады видеть!</h1>
        <label className="login__input-label">E-mail</label>
        <input className={`login__input ${errors.email && 'login__input_type_error'}`}
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
        <span className="login__input-error">{errors.email}</span>
        <label className="login__input-label">Пароль</label>
        <input className={`login__input ${errors.password && 'login__input_type_error'}`}
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
        <span className="login__input-error">{errors.password}</span>
        {isError ?
            <p className="register__result register__result_type_error">Ошибка при авторизации!</p>
            :
            ('')
          }
        <button
          type="submit"
          className={`login__button ${!isValid ? 'login__button_disabled' : ""}`}
          disabled={!isValid}
          >
            Войти
        </button>
        <p className='login__link'>Еще не зарегистрированы? <Link className='login__link-way' to='/signup'>Регистрация</Link></p>
      </form>
    </div>
  )
}
