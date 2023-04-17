import React from "react";

const LoginContext = React.createContext({
  token: "",
  isLoggedin: false,
  updateToken: (token) => {},
  updateIsLoggedin: (status) => {},
});

export default LoginContext;
