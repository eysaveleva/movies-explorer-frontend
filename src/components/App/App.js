import './App.css'
import '../../vendor/normalize.css'
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ErrorContext from '../../contexts/ErrorContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';



function App() {
  let location = useLocation();
  const headerPaths = ['/','/profile','/movies', '/saved-movies'];
  const headerLightPaths = ['/'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const headerLight = headerLightPaths.includes(location.pathname) ? true : false;

  const [currentUser, setCurrentUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (localStorage.jwt) {

      Promise.all([mainApi.getUserData(localStorage.jwt), mainApi.getSavedMovies(localStorage.jwt)])
        .then(([userData , dataMovies ]) => {
          setCurrentUser(userData);
          setLoggedIn(true);

          setIsLoading(false);
          setSavedMovies(dataMovies.reverse());
        })
        .catch((error) => {
          console.error(`Ошибка при загрузке данных ${error}`)
          setIsLoading(false);

          localStorage.clear();
        })

    } else {
      setLoggedIn(false);
      setIsLoading(false);
      localStorage.clear();
    }
  }, [loggedIn])

  function handleRegister(name, email, password) {
    mainApi.registration(name, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${err}`)
      })
  }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/movies');
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при авторизации ${err}`)
      })
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  };

  function handleUpdateUser (name, email) {
    setIsLoading(true);
    mainApi.saveUserChanges(name, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res);
        setIsError(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при редактировании данных ${err}`)
      })
      .finally(() => setIsLoading(false))
  }

  function handleRemoveMovie(id) {
    mainApi.removeMovie(id, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== id }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
    }

   function handleAddMovie (movie, isLiked, id) {
      if (isLiked) {
        handleRemoveMovie(id);

      } else {
        mainApi
          .addMovie(movie, localStorage.jwt)
          .then((res) => {
            setSavedMovies([res, ...savedMovies]);
          })
          .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
      }
    };

    return (
    <div className="app">
      {
      isLoading ? (<Preloader visible={isLoading}/>) : (
        <CurrentUserContext.Provider value={currentUser}>
        <ErrorContext.Provider value={isError}>

        {headerPaths.includes(location.pathname) ? (
          <Header loggedIn={loggedIn} theme={headerLight} />
        ) : (
          ''
        )}
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup"
              element={
                loggedIn ? (<Navigate to="/" replace />) :
                (
                  <Register
                    onRegister={handleRegister}
                    setIsError={setIsError}
                    isError={isError}

                />)
              }
            />
            <Route path="/signin"
              element={
                loggedIn ? (<Navigate to='/movies' replace />) : (
                  <Login
                    onLogin={handleLogin}
                    setIsError={setIsError}
                    isError={isError}
                    loggedIn={loggedIn}
                />)
              }
            />
            <Route path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  addMovie={handleAddMovie}
                  removeMovie={handleRemoveMovie}
                  savedMovies={savedMovies}
                  setIsError={setIsError}
                  isError={isError}
                />
              }
            />
            <Route path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  addMovie={handleAddMovie}
                  removeMovie={handleRemoveMovie}
                  savedMovies={savedMovies}
                  setIsError={setIsError}
                  isError={isError}
              />} />
            <Route path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  handleUpdateUser={handleUpdateUser}
                  handleSignOut={handleSignOut}
                  setIsError={setIsError}
                  setIsSuccess={setIsSuccess}
                  isError={isError}
                  isSuccess={isSuccess}
                />
              }
            />
            <Route path="*" element={<Error loggedIn={loggedIn}  />} />
          </Routes>
        </main>
        {footerPaths.includes(location.pathname) ? <Footer /> : ''}
        </ErrorContext.Provider>
        </CurrentUserContext.Provider>
       )}
    </div>
  );
}

export default App;
