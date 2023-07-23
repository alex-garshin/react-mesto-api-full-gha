import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

import headerLogo from "../images/logo-place.svg";

function Header(props) {
  const location = useLocation();

  const isMobile = useIsMobile();

  const { email, loggedIn, onSignOut, isOpen, setIsOpen, children } = props;

  const authLinks = () => {
    if (location.pathname === "/sign-in") {
      return (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      );
    }

    if (location.pathname === "/sign-up") {
      return (
        <Link className="header__link" to="sign-in">
          Войти
        </Link>
      );
    }

    return (
      <div className="header__menu">
        <p className="header__email">{email}</p>
        <button className="header__out-button" onClick={onSignOut}>
          Выйти
        </button>
      </div>
    );
  };

  return (
    <header className={isOpen ? "header_type_mobile" : "header page__header"}>
      {children}
      <div className={isMobile ? "header__menu-mobile-container" : null}>
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        {isMobile && loggedIn && (
          <button
            className={`header__auto-menu ${
              isOpen && "header__auto-menu-btn_opened"
            }`}
            onClick={() => setIsOpen()}
          />
        )}
        {isMobile && authLinks()}
      </div>
      {!isMobile && authLinks()}
    </header>
  );
}

export default Header;
