import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import env from "../../env";
import LoginContext from "../../store/login-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.apiKey}`;
  const loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.apiKey}`;

  const email = useRef();
  const password = useRef();

  const loginCtx = useContext(LoginContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      const res = await fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (res.ok) {
        const data = await res.json();
        loginCtx.updateToken(data.idToken);
        loginCtx.updateIsLoggedin(true);
      } else {
        const data = await res.json();
        let errorMessage = "Authentication Failed";
        if (data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      }
    } else {
      const res = await fetch(signupEndpoint, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (res.ok) {
        const data = await res.json();
        loginCtx.updateToken(data.idToken);
        loginCtx.updateIsLoggedin(true);
      } else {
        const data = await res.json();
        let errorMessage = "Authentication Failed";
        if (data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={password} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Sign Up"}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
