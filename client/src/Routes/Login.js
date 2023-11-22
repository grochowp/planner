import React, { useState } from "react";
import Button from "../shared/components/Button";
import { LoginService } from "../Services/loginService";

export const Login = ({ onSetUser }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(login, password) {
    const loggedUser = LoginService.login(login, password);

    if (loggedUser) onSetUser(loggedUser);
  }

  return (
    <div className="login-page">
      <div className="login">
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login..."
        ></input>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PIN..."
        ></input>
        <Button onClick={() => handleLogin(login, password)} styles="login">
          Login
        </Button>
      </div>
    </div>
  );
};
