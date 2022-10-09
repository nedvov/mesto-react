
function Header({isLogged, children}) {
    return (        
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__info">
                {isLogged && <p className="header__email">email@email.ru</p>}
                {children}
            </div>
        </header>
    );
  }
  
export default Header;