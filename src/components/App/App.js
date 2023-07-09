import React from 'react';
import "./App.css";
import Header from "../Header/Header";
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

function App() {
  const [ signedIn, setSignedIn ] = React.useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setSignedIn(true);
    navigate('/movies', { replace: true })
  }
  const handleSignOut = () => {
    setSignedIn(false);
    navigate('/', { replace: true })
  }

  const handleSignUp = () => {
    navigate('signin', { replace: true })
  }

  return (
    <div className="app">
      <Header signedIn={signedIn}/>
      <main className='content'>
        <Routes>
          <Route
              path="/"
              element={<Main/>}
          />
          <Route
              path="/movies"
              element={<Movies/>}
          />
          <Route
              path="/saved-movies"
              element={<SavedMovies/>}
          />
          <Route
              path="/profile"
              element={<Profile handleSignOut={handleSignOut}/>}
          />
          <Route
              path="/signup"
              element={<Register handleSignUp={handleSignUp}/>}
          />
          <Route
              path="/signin"
              element={<Login handleSignIn={handleSignIn}/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
