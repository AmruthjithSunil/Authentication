import classes from "./ProfileForm.module.css";
import env from "../../env";
import { useContext, useRef } from "react";
import LoginContext from "../../store/login-context";
import { Redirect } from "react-router-dom";

const ProfileForm = () => {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${env.apiKey}`;
  const loginCtx = useContext(LoginContext);

  const password = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    console.log(password.current.value);
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        idToken: loginCtx.token,
        password: password.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const data = await res.json();
      let errorMessage = "Authentication Failed";
      if (data.error.message) {
        errorMessage = data.error.message;
      }
      alert(errorMessage);
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      {!loginCtx.isLoggedin && <Redirect to="/auth" />}
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={password} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
