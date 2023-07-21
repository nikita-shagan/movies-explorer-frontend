import "./Profile.css"
import {useFormWithValidation} from "../../hooks/useFromWithValidation";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/api/MainApi";
import {useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext, useEffect} from "react";
import {validateEmail, validateName} from "../../utils/validation/inputValidations";
import {
  LOCAL_STORAGE_KEY_WORD,
  LOCAL_STORAGE_MOVIES, LOCAL_STORAGE_SHORTS_TOGGLE,
  PROFILE_UPDATE_ERROR_MESSAGE,
  PROFILE_UPDATE_SUCCESS_MESSAGE
} from "../../utils/constants/constants";
import {MAIN_ROUTE} from "../../utils/constants/routes";

function Profile({ setCurrentUser, setSavedMovies, setSignedIn }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const form = useFormWithValidation({
    initValues: {
      name: currentUser.name,
      email: currentUser.email
    },
    validators: {
      name: validateName,
      email: validateEmail
    }
  })

  useEffect(() => {
    if (currentUser.name === form.values.name && currentUser.email === form.values.email) {
      form.setIsValid(false);
    }
  }, [currentUser, form])

  const handleEditProfile = (evt) => {
    evt.preventDefault();
    form.setIsLoading(true)
    mainApi.updateUser(form.values)
      .then(() => mainApi.getUser())
      .then((user) => {
        setCurrentUser(user)
        form.setSubmitResultMessage(PROFILE_UPDATE_SUCCESS_MESSAGE)
      })
      .catch((err) => {
        form.setSubmitResultMessage(PROFILE_UPDATE_ERROR_MESSAGE)
        console.log(err)
      })
      .finally(() => form.setIsLoading(false))
  }

  const handleSignOut = () => {
    mainApi.signOut()
      .then(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_WORD)
        localStorage.removeItem(LOCAL_STORAGE_MOVIES)
        localStorage.removeItem(LOCAL_STORAGE_SHORTS_TOGGLE)
        setSignedIn(false)
        setCurrentUser({})
        setSavedMovies([])
        navigate(MAIN_ROUTE, {replace: true})
      })
      .catch((err) => console.log(err))
  }

  return (
    <section className='profile'>
      <form className='profile__form' noValidate onSubmit={handleEditProfile}>
        <h2 className='profile__title'>
          Привет, {currentUser.name}!
        </h2>
        <label className='profile__label'>
          Имя
          <input
            name='name'
            type='text'
            className={`profile__input ${form.getError('name') && 'profile__input_state_error'}`}
            value={form.values.name}
            onChange={form.handleChange}
          />
          <p className="profile__input-error">
            {form.getError('name')}
          </p>
        </label>
        <label className='profile__label'>
          E-mail
          <input
            name='email'
            type='email'
            className={`profile__input ${form.getError('email') && 'profile__input_state_error'}`}
            value={form.values.email}
            onChange={form.handleChange}
          />
          <p className='profile__input-error'>
            {form.getError('email')}
          </p>
        </label>
        <div className='profile__edit-container'>
          <p className='profile__edit-results'>
            {form.submitResultMessage}
          </p>
          <button className='profile__edit-button' disabled={!form.isValid || form.isLoading}>
            {form.isLoading ? <Preloader size={10}/> : 'Редактировать'}
          </button>
        </div>
      </form>
      <button className='profile__signout-button' onClick={handleSignOut}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
