import './App.css'
import '../../vendor/normalize.css'
import { React } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Main from '../Main/Main';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import Error from '../Error/Error';

function App() {
  let location = useLocation();
  const headerPaths = ['/','/movies', '/saved-movies'];
  const headerLightPaths = ['/'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const isLoggedIn = location.pathname === '/' ? false : true;
  const headerLight = headerLightPaths.includes(location.pathname) ? 1 : 0;

   return (
    <div className="app">
      {headerPaths.includes(location.pathname) ? (
        <Header loggedIn={isLoggedIn} theme={headerLight} />
      ) : (
        ''
      )}
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={
            <>
              <Header loggedIn={true} />
              <Profile  />
            </>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {footerPaths.includes(location.pathname) ? <Footer /> : ''}

    </div>
  );
}

export default App;
