import { useState } from "react";
import LoginContext from "./login-context";

export default function LoginProvider({ children }) {
  const [token, setToken] = useState();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const loginContext = {
    isLoggedin,
    token,
    updateToken(token) {
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
