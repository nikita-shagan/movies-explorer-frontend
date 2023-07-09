import "./SignForm.css"
import { useState } from "react";

function SignForm({ formName, title, submitText, footer, onSubmit, errorsVisible }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('Обязательное поле');
  const [emailError, setEmailError] = useState('Обязательное поле');
  const [passwordError, setPasswordError] = useState('Обязательное поле');

  const handleInputChange = (setter, errorHandler) => {
    return (evt) => {
      setter(evt.target.value)
      errorHandler(evt.target.validationMessage)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name, nameError, email, emailError, password, passwordError })
  }

  return (
    <section className='sign-form'>
      <form className='sign-form__form' name={formName} noValidate onSubmit={handleSubmit}>
        <h3 className='sign-form__title'>
          {title}
        </h3>
        {
          formName === 'registration' && (
            <label className='sign-form__input-container'>
              Имя
              <input
                type='text'
                className={`
                  sign-form__input
                  ${errorsVisible && nameError && 'sign-form__input_state_error'}
                `}
                value={name}
                required
                minLength='2'
                maxLength='30'
                onChange={handleInputChange(setName, setNameError)}
              />
              <span className='sign-form__error'>
                {errorsVisible && nameError}
              </span>
            </label>
          )
        }
        <label className='sign-form__input-container'>
          E-mail
          <input
            type='email'
            className={`
              sign-form__input
              ${errorsVisible && emailError && 'sign-form__input_state_error'}
            `}
            required
            value={email}
            onChange={handleInputChange(setEmail, setEmailError)}
          />
          <span className='sign-form__error'>
            {errorsVisible && emailError}
          </span>
        </label>
        <label className='sign-form__input-container'>
          Пароль
          <input
            type='password'
            className={`
              sign-form__input
              ${errorsVisible && passwordError && 'sign-form__input_state_error'}
            `}
            required
            minLength='8'
            value={password}
            onChange={handleInputChange(setPassword, setPasswordError)}
          />
          <span className='sign-form__error'>
            {errorsVisible && passwordError}
          </span>
        </label>
        <button className='sign-form__submit-btn' type='submit'>
          {submitText}
        </button>
        <div className="sign-form__footer">
          {footer}
        </div>
      </form>
    </section>
  );
}

export default SignForm;
