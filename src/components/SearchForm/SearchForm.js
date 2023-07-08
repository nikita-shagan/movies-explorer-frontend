import "./SearchForm.css"

function SearchForm() {
  return (
    <form action='#' name='search' className='search-form'>
      <div className='search-form__input-container'>
        <input
          type='text'
          className='search-form__text-input'
          name='movie'
          placeholder='Фильм'
          required
        />
        <button className='search-form__submit' type='submit'/>
      </div>
      <label className="search-form__switch-label">
        <div className="search-form__switch-body">
          <input type="checkbox" className='search-form__switch-checkbox'/>
          <span className="search-form__switch-slider"></span>
        </div>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
