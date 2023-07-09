import SignForm from "../SignForm/SignForm";
import {Link} from "react-router-dom";
import {useState} from "react";

function Register({ handleSignUp }) {
  const [ errorsVisible, setErrorsVisible ] = useState(false);

  const handleSubmit = ({ name, email, password, nameError, emailError, passwordError }) => {
    if (nameError || emailError || passwordError) {
      setErrorsVisible(true);
    } else {
      handleSignUp({ name, email, password });
    }
  }

  return (
    <SignForm
      formName='registration'
      title='Добро пожаловать!'
      submitText='Зарегистрироваться'
      footer={
        <>
          <p className='sign-form__footer-text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='sign-form__footer-link'>Войти</Link>
        </>
      }
      onSubmit={handleSubmit}
      errorsVisible={errorsVisible}
    />
  );
}

export default Register;
