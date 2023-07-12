import React from 'react';
import "./Navigation.css"
import close from '../../images/close.svg';
import menuButton from '../../images/burger-button.svg'
import {Link} from "react-router-dom";
import profileImage from "../../images/account.svg"
import {
  MAIN_ROUTE,
  MOVIES_ROUTE,
  SAVED_MOVIES_ROUTE
} from "../../utils/constants/routes";

function Navigation({ currentPath, signedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true)
  }

  const handleMobileMenyClose = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className='navigation'>
      {!signedIn
        ? (
          <ul
            className={`navigation__sign`}>
            <li>
              <Link to={'signup'} className='navigation__sign-up'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to={'signin'} className='navigation__sign-in'>
                Войти
              </Link>
            </li>
          </ul>
        )
        : (
          <>
            <img
              src={menuButton}
              alt='Иконка меню'
              className='navigation__signed-menu-button'
              onClick={handleMobileMenuOpen}
            />
            <div
              className={`
                navigation__signed
                ${mobileMenuOpen && 'navigation__signed_visible'}
                ${!mobileMenuOpen && 'navigation__signed_hidden'}`
              }
            >
              <div className={`navigation__signed-container`}>
                <img
                  src={close}
                  alt='Иконка закрыть'
                  className='navigation__signed-close-button'
                  onClick={handleMobileMenyClose}
                />
                <ul className='navigation__signed-items'>
                  <li>
                    <Link
                      to={MAIN_ROUTE}
                      className={`
                        navigation__signed-item
                        navigation__signed-item_extra
                        ${currentPath === MAIN_ROUTE && 'navigation__signed-item_active'}
                      `}
                      onClick={handleMobileMenyClose}
                    >
                      Главная
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'movies'}
                      className={`
                        navigation__signed-item
                        ${currentPath === MOVIES_ROUTE && 'navigation__signed-item_active'}
                      `}
                      onClick={handleMobileMenyClose}
                    >
                      Фильмы
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'saved-movies'}
                      className={`
                        navigation__signed-item
                        ${currentPath === SAVED_MOVIES_ROUTE && 'navigation__signed-item_active'}
                      `}
                      onClick={handleMobileMenyClose}
                    >
                      Сохранённые фильмы
                    </Link>
                  </li>
                </ul>
                <Link
                  to={'profile'}
                  className='navigation__signed-profile'
                  onClick={handleMobileMenyClose}
                >
                  <p className='navigation__signed-profile-text'>
                    Аккаунт
                  </p>
                  <img src={profileImage} alt='Иконка профиля'
                       className='navigation__signed-profile-icon'/>
                </Link>
              </div>
            </div>
          </>
        )
      }
    </nav>
  );
}

export default Navigation;
