import "./App.css";
import Header from "../Header/Header";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import mainApi from "../../utils/api/MainApi";
import FullScreenMask from "../FullScreenMask/FullScreenMask";
import Preloader from "../Preloader/Preloader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {
  ANY_ROUTE,
  MAIN_ROUTE,
  MOVIES_ROUTE,
  PROFILE_ROUTE,
  SAVED_MOVIES_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE
} from "../../utils/constants/routes";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthChecking(true);
    mainApi.getUser()
      .then((user) => {
        setCurrentUser(user);
        setSignedIn(true);
        return mainApi.getMovies();
      })
      .then((movies) => setSavedMovies(movies))
      .catch((err) => console.log(err))
      .finally(() => setAuthChecking(false))
  }, [])

  const handleAuth = ({ email, password }) => {
    return mainApi.signIn({ email, password })
      .then(() => {
        setSignedIn(true);
        navigate(MOVIES_ROUTE, {replace: true});
        Promise.all([mainApi.getUser(), mainApi.getMovies()])
          .then(([user, savedMovies]) => {
            setCurrentUser(user);
            setSavedMovies(savedMovies);
          })
          .catch((err) => console.log(err))
      })
  }

  return authChecking ? <FullScreenMask><Preloader/></FullScreenMask> : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header signedIn={signedIn}/>
        <main className='content'>
          <Routes>
            <Route
              path={MAIN_ROUTE}
              element={<Main/>}
            />
            <Route
              path={MOVIES_ROUTE}
              element={
                <ProtectedRoute
                  signedIn={signedIn}
                  element={Movies}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              }
            />
            <Route
              path={SAVED_MOVIES_ROUTE}
              element={
                <ProtectedRoute
                  signedIn={signedIn}
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              }
            />
            <Route
              path={PROFILE_ROUTE}
              element={
                <ProtectedRoute
                  signedIn={signedIn}
                  element={Profile}
                  setCurrentUser={setCurrentUser}
                  setSavedMovies={setSavedMovies}
                  setSignedIn={setSignedIn}
                />
              }
            />
            <Route
              path={SIGNUP_ROUTE}
              element={signedIn ? <Navigate to={MAIN_ROUTE}/> : <Register handleAuth={handleAuth}/>}
            />
            <Route
              path={SIGNIN_ROUTE}
              element={signedIn ? <Navigate to={MAIN_ROUTE}/> : <Login handleAuth={handleAuth}/>}
            />
            <Route
              path={ANY_ROUTE}
              element={<NotFound/>}
            />
          </Routes>
        </main>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
