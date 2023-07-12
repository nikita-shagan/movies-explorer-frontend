const FORM_SUBMIT_ERROR_MESSAGE = 'Что то пошло не так...';
const SEARCH_LIST_STATE = 'list';
const SEARCH_EMPTY_STATE = 'empty';
const SEARCH_LOADING_STATE = 'loading';
const SEARCH_ERROR_STATE = 'error';
const LOCAL_STORAGE_KEY_WORD = 'keyWord';
const LOCAL_STORAGE_MOVIES = 'storedMovies';
const LOCAL_STORAGE_SHORTS_TOGGLE = 'shortFilmsToggle';
const MINUTES_IN_HOUR = 60;
const PROFILE_UPDATE_SUCCESS_MESSAGE = 'Профиль успешно обновлен';
const PROFILE_UPDATE_ERROR_MESSAGE = 'При редактировании профиля произошла ошибка';
const KEY_WORD_ERROR = 'Нужно ввести ключевое слово';
const FIELD_INITIALLY_INVALID = 'initiallyInvalid';
const MOVIES_API_URL = 'https://api.nomoreparties.co';
const MAIN_API_URL = 'https://api.explorer.nomoreparties.sbs';
const SHORT_FILM_DURATION = 40;
const SLUG_REGEX = /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/umi;
const REQUIRED_FIELD_ERROR = 'Обязательное поле';
const INVALID_EMAIL_ERROR = 'Некорректный email';
const INVALID_NAME_LENGTH_ERROR = 'Имя должно быть от 2 до 30 символов';
const INVALID_NAME_FORMAT_ERROR = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.';
const INVALID_PASSWORD_LENGTH_ERROR = 'Минимальная длина пароля: 8 символов';
const MOBILE_SCREEN_RESOLUTION = 520;
const DEFAULT_MOVIES_LIST_COUNT = 99999;
const MOBILE_MOVIES_COUNT = 5;
const DESKTOP_MOVIES_COUNT = 7;

export {
  FORM_SUBMIT_ERROR_MESSAGE,
  SEARCH_LIST_STATE,
  SEARCH_EMPTY_STATE,
  SEARCH_LOADING_STATE,
  SEARCH_ERROR_STATE,
  LOCAL_STORAGE_KEY_WORD,
  LOCAL_STORAGE_MOVIES,
  LOCAL_STORAGE_SHORTS_TOGGLE,
  MINUTES_IN_HOUR,
  DEFAULT_MOVIES_LIST_COUNT,
  PROFILE_UPDATE_SUCCESS_MESSAGE,
  PROFILE_UPDATE_ERROR_MESSAGE,
  KEY_WORD_ERROR,
  FIELD_INITIALLY_INVALID,
  MOVIES_API_URL,
  MAIN_API_URL,
  SHORT_FILM_DURATION,
  SLUG_REGEX,
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_NAME_LENGTH_ERROR,
  INVALID_NAME_FORMAT_ERROR,
  INVALID_PASSWORD_LENGTH_ERROR,
  MOBILE_SCREEN_RESOLUTION,
  MOBILE_MOVIES_COUNT,
  DESKTOP_MOVIES_COUNT,
}
