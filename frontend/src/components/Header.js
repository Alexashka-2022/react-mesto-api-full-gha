import React from 'react';
import logoPath from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    const [isHeaderMenuOpen, setHeaderMenu] = React.useState(false);
    const [isDesktopResolution, setDesktopResolution] = React.useState(window.innerWidth > 425);

    React.useEffect(() => {
        window.addEventListener('resize', updateResolutionInfo);

        return () => {
            window.removeEventListener('resize', updateResolutionInfo);
        }
    });

    function updateResolutionInfo() {
        setDesktopResolution(window.innerWidth > 425);
    }

    function toggleHeaderMenu() {
        setHeaderMenu(!isHeaderMenuOpen);
    }

    function LogOut() {
        props.signOut();
        setHeaderMenu(false);
    }

    return (
        <header className="header">
            {
                (props.loggedIn) ?
                    //если клиент авторизировался
                    isDesktopResolution ?
                        //если используется версия для десктопа
                        <>
                            <img className="header__logo" src={logoPath} alt="Логотип Место" />
                            <div className="header__authentification">
                                <p className="header__user-email">{props.email}</p>
                                <Link to={props.redirectPath} className="header__logout-btn" onClick={LogOut}>
                                    {props.linkTitle}
                                </Link>
                            </div>
                        </>
                        :
                        //если используется мобильная версия
                        <div className={`${isHeaderMenuOpen ? "header__menu_open" : "header__menu"}`} >
                            <div className={`${isHeaderMenuOpen ? "header__wrapper_open" : "header__wrapper"}`}>
                                <img className="header__logo" src={logoPath} alt="Логотип Место" />
                                <button className={`${isHeaderMenuOpen ? "header__menu-exit" : "header__menu-button"}`} type="button" onClick={toggleHeaderMenu} />
                            </div>
                            {isHeaderMenuOpen && (
                                <div className="header__authentification">
                                    <p className="header__user-email">{props.email}</p>
                                    <Link to={props.redirectPath} className="header__logout-btn" onClick={LogOut}>
                                        {props.linkTitle}
                                    </Link>
                                </div>)
                            }
                        </div>
                    :
                    //если клиент не авторизировался
                    <>
                        <img className="header__logo" src={logoPath} alt="Логотип Место" />
                        <Link to={props.redirectPath} className="header__link">
                            {props.linkTitle}
                        </Link>
                    </>
            }
        </header>
    );
}

export default Header;