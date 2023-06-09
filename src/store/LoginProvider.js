import { useState } from "react";
import LoginContext from "./login-context";

export default function LoginProvider({ children }) {
  const lastLoggedin = localStorage.getItem("lastLoggedin");
  if (lastLoggedin == null || Date.now() - lastLoggedin > 300000) {
    localStorage.setItem("token", "");
  }

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("token") != ""
  );

  const loginContext = {
    isLoggedin,
    token,
    updateToken(token) {
      localStorage.setItem("token", token);
      setToken(token);
    },
    updateIsLoggedin(status) {
      setIsLoggedin(status);
    },
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {children}
    </LoginContext.Provider>
  );
}
