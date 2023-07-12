import "./Profile.css"
import {useFormWithValidation} from "../../hooks/useFromWithValidation";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/api/MainApi";
import {useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext, useEffect} from "react";
import {validateEmail, validateName} from "../../utils/validation/inputValidations";

function Profile({ setCurrentUser, setSignedIn }) {
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
        form.setSubmitResultMessage('Профиль успешно обновлен')
      })
      .catch((err) => {
        form.setSubmitResultMessage('При редактировании профиля произошла ошибка')
        console.log(err)
      })
      .finally(() => form.setIsLoading(false))
  }

  const handleSignOut = () => {
    mainApi.signOut()
      .then(() => {
        setSignedIn(false)
        navigate('/', {replace: true})
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
