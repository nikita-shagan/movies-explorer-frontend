import "./SearchForm.css"
import {useState} from "react";
import {KEY_WORD_ERROR} from "../../utils/constants/constants";

function SearchForm({ onSubmit, keyWord, onKeyWordChange, shortFilmsToggle, onShortFilmsChange }) {
  const [keyWordError, setKeyWordError] = useState('')

  const handleKeyWordChange = (evt) => {
    setKeyWordError('');
    onKeyWordChange(evt);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (keyWord) {
      onSubmit({ keyWord, shortFilmsToggle });
    } else {
      setKeyWordError(KEY_WORD_ERROR)
    }
  }

  return (
    <form action='#' name='search' noValidate className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__input-container'>
        <input
          type='text'
          className='search-form__text-input'
          name='movie'
          placeholder='Фильм'
          required
          value={keyWord}
          onChange={handleKeyWordChange}
        />
        <span className='search-form__error'>
          {keyWordError}
        </span>
        <button className='search-form__submit' type='submit'/>
      </div>
      <label className="search-form__switch-label">
        <div className="search-form__switch-body">
          <input
            name='shortFilms'
            type="checkbox"
            className='search-form__switch-checkbox'
            value=''
            onChange={onShortFilmsChange}
            checked={shortFilmsToggle}
          />
          <span className="search-form__switch-slider"></span>
        </div>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
