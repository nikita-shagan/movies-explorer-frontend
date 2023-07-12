import SignForm from "../SignForm/SignForm";
import {useFormWithValidation} from "../../hooks/useFromWithValidation";
import Input from "../Input/Input";
import {validateEmail, validatePassword} from "../../utils/validation/inputValidations";
import {FORM_SUBMIT_ERROR_MESSAGE} from "../../utils/constants/constants";
import {SIGNUP_ROUTE} from "../../utils/constants/routes";

function Login({ handleAuth }) {
  const form = useFormWithValidation({
    initValues: {
      email: '',
      password: ''
    },
    validators: {
      email: validateEmail,
      password: validatePassword
    }
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    form.setIsLoading(true)
    handleAuth(form.values)
      .catch((err) => {
        setTimeout(() => form.setSubmitResultMessage(FORM_SUBMIT_ERROR_MESSAGE), 500)
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => form.setIsLoading(false), 500)
      })
  }

  return (
    <SignForm
      title='Рады видеть!'
      submitText='Войти'
      footer={{text: 'Ещё не зарегистрированы?', link: SIGNUP_ROUTE, button: 'Регистрация'}}
      isValid={form.isValid}
      onSubmit={handleSubmit}
      submitError={form.submitResultMessage}
      isLoading={form.isLoading}
    >
      <Input
        label='E-mail'
        name='email'
        type='email'
        error={form.getError('email')}
        value={form.values.email}
        onChange={form.handleChange}
      />
      <Input
        label='Пароль'
        name='password'
        type='password'
        error={form.getError('password')}
        value={form.values.password}
        onChange={form.handleChange}
      />
    </SignForm>
  );
}

export default Login;
