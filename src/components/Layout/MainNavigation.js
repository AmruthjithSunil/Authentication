import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import LoginContext from "../../store/login-context";

const MainNavigation = () => {
  const loginCtx = useContext(LoginContext);

  function logoutHandler(e) {
    loginCtx.updateToken("");
    loginCtx.updateIsLoggedin(false);
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!loginCtx.isLoggedin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {loginCtx.isLoggedin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {loginCtx.isLoggedin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
