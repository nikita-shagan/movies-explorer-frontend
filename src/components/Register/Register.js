import SignForm from "../SignForm/SignForm";
import Input from "../Input/Input";
import { useFormWithValidation } from "../../hooks/useFromWithValidation";
import mainApi from "../../utils/api/MainApi";
import {validateEmail, validateName, validatePassword} from "../../utils/validation/inputValidations";
import {FORM_SUBMIT_ERROR_MESSAGE} from "../../utils/constants/constants";
import {SIGNIN_ROUTE} from "../../utils/constants/routes";

function Register({ handleAuth }) {
  const form = useFormWithValidation({
    initValues: {
      name: '',
      email: '',
      password: ''
    },
    validators: {
      name: validateName,
      email: validateEmail,
      password: validatePassword
    }
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    form.setIsLoading(true);
    mainApi.signUp(form.values)
      .then(() => handleAuth(form.values))
      .catch((err) => {
        console.log(err)
        setTimeout(() => form.setSubmitResultMessage(FORM_SUBMIT_ERROR_MESSAGE), 500)
      })
      .finally(() => {
        setTimeout(() => form.setIsLoading(false), 500)
      })
  }

  return (
    <SignForm
      title='Добро пожаловать!'
      submitText='Зарегистрироваться'
      footer={{text: 'Уже зарегистрированы?', link: SIGNIN_ROUTE, button: 'Войти'}}
      isValid={form.isValid}
      onSubmit={handleSubmit}
      submitError={form.submitResultMessage}
      isLoading={form.isLoading}
    >
      <Input
        label='Имя'
        name='name'
        type='text'
        error={form.getError('name')}
        value={form.values.name}
        onChange={form.handleChange}
      />
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


export default Register;
