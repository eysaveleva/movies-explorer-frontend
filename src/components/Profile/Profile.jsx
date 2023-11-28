import React,{ useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormValidation from '../../hooks/useFormValidation';

export default function Profile({ handleUpdateUser, handleSignOut, setIsError, setIsSuccess, isSuccess, isError }) {
  const currentUser = useContext(CurrentUserContext);
  const { errors, values, handleChange, isValid, reset, setIsValid } = useFormValidation();

  useEffect(() => {
      reset({name: currentUser.name, email: currentUser.email});
  }, [currentUser, reset ]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values.name, values.email);
    setIsValid(false);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form className="profile__form">
        <div className="profile__info">
          <label className="profile__label">Имя</label>
          <input className={`profile__input ${errors.name && 'profile__input_type_error'}`}
            name="name"
            type="text"
            id="user-name-input"
            value={values.name  || currentUser.name}
            onChange={(evt) => {
              handleChange(evt);
              setIsError(false);
              setIsSuccess(false);
            }}
            placeholder="Введите имя"
            minLength="6"
            maxLength="40"
            required
          />
        </div>
        <div className="profile__info profile__info_type_last">
          <label className="profile__label">E-mail</label>
          <input className={`profile__input ${errors.email && 'profile__input_type_error'}`}
            name="email"
            type="email"
            id="email"
            pattern = {"^\\S+@\\S+\\.\\S+$"}
            placeholder="Email"
            minLength="6"
            maxLength="40"
            required
            value={values.email || currentUser.email}
            onChange={(evt) => {
              handleChange(evt);
              setIsError(false);
              setIsSuccess(false);
            }}
          />
          </div>
          {isError ?
            <p className="profile__result profile__result_type_error">Ошибка при изменении данных!</p>
            :
            isSuccess ?
            <p className="profile__result">Изменение данных успешно!</p>
            :
            ('')
          }
          <button
            type="submit"
            className={`profile__button ${!isValid ? 'profile__button_disabled' : ""}`}
            disabled={(values.name === currentUser.name && values.email === currentUser.email) || !isValid}
            onClick={handleSubmit}
            >{(values.name === currentUser.name && values.email === currentUser.email)
              ||
              !isValid ?
            'Редактировать'
            :
            'Сохранить'}
          </button>
        <Link to="/" onClick={handleSignOut} className="profile__button profile__button_log-out">Выйти из аккаунта</Link>
      </form>
    </section>
  )
}
