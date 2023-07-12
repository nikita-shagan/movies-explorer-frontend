const { validate: isEmail } = require("email-validator");
const {SLUG_REGEX, REQUIRED_FIELD_ERROR, INVALID_EMAIL_ERROR,
  INVALID_NAME_LENGTH_ERROR, INVALID_NAME_FORMAT_ERROR,
  INVALID_PASSWORD_LENGTH_ERROR
} = require("../constants/constants");

module.exports.validateEmail = (value) => {
  if (!value) {
    return REQUIRED_FIELD_ERROR;
  }

  if (!isEmail(value)) {
    return INVALID_EMAIL_ERROR;
  }

  return '';
}

module.exports.validateName = (value) => {
  if (!value) {
    return REQUIRED_FIELD_ERROR;
  }

  if (value.length < 2 || value.length > 30) {
    return INVALID_NAME_LENGTH_ERROR;
  }

  if (!value.match(SLUG_REGEX)) {
    return INVALID_NAME_FORMAT_ERROR;
  }

  return '';
}

module.exports.validatePassword = (value) => {
  if (!value) {
    return REQUIRED_FIELD_ERROR;
  }

  if (value.length < 8) {
    return INVALID_PASSWORD_LENGTH_ERROR
  }

  return '';
}
