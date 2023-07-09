import "./SearchForm.css"
import {useEffect, useState} from "react";

function SearchForm({ onSubmit, initialKeyWord, initialShortFilmsToggle }) {
  const [keyWord, setKeyWord] = useState('')
  const [keyWordError, setKeyWordError] = useState('')
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false)

  useEffect(() => {
    setKeyWord(initialKeyWord)
    setShortFilmsToggle(initialShortFilmsToggle)
  }, [initialKeyWord, initialShortFilmsToggle])

  const handleKeyWordChange = (evt) => {
    setKeyWord(evt.target.value)
    setKeyWordError('')
  }

  const handleShortFilmsChange = (evt) => {
    setShortFilmsToggle(evt.target.checked);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (keyWord) {
      onSubmit({ keyWord, shortFilmsToggle });
    } else {
      setKeyWordError('Нужно ввести ключевое слово')
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
            onChange={handleShortFilmsChange}
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
