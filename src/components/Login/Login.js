import SignForm from "../SignForm/SignForm";
import {Link} from "react-router-dom";
import {useState} from "react";

function Login({ handleSignIn }) {
  const [errorsVisible, setErrorsVisible] = useState(false);

  const handleSubmit = ({ email, password, emailError, passwordError }) => {
    if (emailError || passwordError) {
      setErrorsVisible(true);
    } else {
      handleSignIn({ email, password });
    }
  }

  return (
    <SignForm
      formName='login'
      title='Рады видеть!'
      submitText='Войти'
      footer={
        <>
          <p className='sign-form__footer-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='sign-form__footer-link'>Регистрация</Link>
        </>
      }
      onSubmit={handleSubmit}
      errorsVisible={errorsVisible}
    />
  );
}

export default Login;
