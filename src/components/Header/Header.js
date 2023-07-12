import "./Header.css";
import logo from "../../images/logo.svg"
import Navigation from "../Navigation/Navigation";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {
  MAIN_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE
} from "../../utils/constants/routes";

function Header({ signedIn }) {
  const currentPath = useLocation().pathname;
  const isOnMain = currentPath === MAIN_ROUTE;
  const isRegistration = currentPath === SIGNUP_ROUTE;
  const isLogin = currentPath === SIGNIN_ROUTE;

  return (
    <header className={`header ${isOnMain && 'header_type_main'}`}>
      <div className={`header__container ${(isRegistration || isLogin) && 'header__container_type_form'}`}>
        <Link to={MAIN_ROUTE} className='header__logo-link'>
          <img src={logo} alt='Логотип'/>
        </Link>
        {!(isRegistration || isLogin) && <Navigation currentPath={currentPath} signedIn={signedIn}/>}
      </div>
    </header>
  );
}

export default Header;
