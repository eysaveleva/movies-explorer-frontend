import { useEffect, useState } from 'react';
import './Header.css'
import { Link, useLocation } from "react-router-dom";
import useResize from '../../hooks/useResize';

export default function Header({ loggedIn, theme }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = 'header__link_active';

  let size = useResize();

  function handelClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (size.width > 768) {
      setIsOpen(false);
    }
  }, [size.width]);

  return (
    <>
      {!loggedIn ? (
        <header className={`header ${theme === 1? 'header_type_light' : ''}`}>
        <Link className="header__logo" to="/"></Link>
        <nav className="header__container">
          <Link className="header__sign header__signup" to="/signup">Регистрация</Link>
          <Link className="header__sign header__signin" to="/signin">Войти</Link>
        </nav>
        </header>
      ) : (
        <header className="header">
          <Link className="header__logo" to="/"></Link>
          <nav className={`header__container header__nav ${isOpen ? 'header__nav_open' : ''}`}>
            <Link className={`header__link ${pathname === '/' ? isActive : ''}`} to="/">Главная</Link>
            <Link className={`header__link ${pathname === '/movies' ? isActive : ''}`} to="/movies">Фильмы</Link>
            <Link className={`header__link ${pathname === '/saved-movies' ? isActive : ''}`} to="/saved-movies">Сохранённые фильмы</Link>
            <Link className={`header__link header__link_type_account ${pathname === '/profile' ? isActive : ''}`}
              to="/profile"
              >Аккаунт<div className="header__account"></div>
            </Link>
            <button className="header__burger-close" type='button' onClick={handelClick}></button>
          </nav>
          <button className="header__burger" type='button' onClick={handelClick}></button>
        </header>
      )}
    </>
  );
}
