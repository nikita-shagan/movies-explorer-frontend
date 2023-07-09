import "./Profile.css"
import {useState} from "react";

function Profile({ handleSignOut }) {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('email');

  const handleInputChange = (setter, errorHandler) => {
    return (evt) => {
      setter(evt.target.value)
    }
  }

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h2 className='profile__title'>
          Привет, Виталий!
        </h2>
        <label className='profile__label'>
          Имя
          <input
            className='profile__input'
            type='text'
            minLength='2'
            maxLength='30'
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
        </label>
        <label className='profile__label'>
          E-mail
          <input
            className='profile__input'
            type='email'
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
        </label>
        <button className="profile__edit-button">
          Редактировать
        </button>
      </form>
      <button className="profile__signout-button" onClick={handleSignOut}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
