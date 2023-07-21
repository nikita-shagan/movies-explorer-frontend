import "./SignForm.css"
import {Link} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function SignForm({children, title, submitText, footer, onSubmit, isValid, submitError, isLoading }) {
  return (
    <section className='sign-form'>
      <form className='sign-form__form' noValidate onSubmit={onSubmit}>
        <h3 className='sign-form__title'>
          {title}
        </h3>
        {children}
        <div className="sign-form__submit-container">
          <p className="sign-form__submit-error">{!isLoading && submitError}</p>
          <button className='sign-form__submit-btn' type='submit' disabled={!isValid || isLoading}>
            {isLoading ? <Preloader size={21}/> : submitText}
          </button>
        </div>
        <div className="sign-form__footer">
          <p className='sign-form__footer-text'>
            {footer.text}
          </p>
          <Link to={footer.link} className='sign-form__footer-link'>
            {footer.button}
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignForm;
