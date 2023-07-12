const { validate: isEmail } = require("email-validator");

const slugRegex = /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/umi;
const requiredError = 'Обязательное поле'

module.exports.validateEmail = (value) => {
  if (!value) {
    return requiredError;
  }

  if (!isEmail(value)) {
    return 'Некорректный email';
  }

  return '';
}

module.exports.validateName = (value) => {
  if (!value) {
    return requiredError;
  }

  if (value.length < 2 || value.length > 30) {
    return 'Имя должно быть от 2 до 30 символов';
  }

  if (!value.match(slugRegex)) {
    return 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.';
  }

  return '';
}

module.exports.validatePassword = (value) => {
  if (!value) {
    return requiredError;
  }

  if (value.length < 8) {
    return 'Минимальная длина пароля: 8 символов'
  }

  return '';
}
