import React, { useState } from "react";
import Button from "../../shared/components/Button";
import { LoginService } from "../../Services/loginService";
import { LoginMessage } from "./components/LoginMessage";

export const Login = ({ onSetUser }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const [err, setErr] = useState("");
  const [incorrectData, SetIncorrectData] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showValid, setShowValid] = useState(false);

  const handleLogin = async (login, password) => {
    try {
      const loggedUser = await LoginService.login(login, password);

      if (loggedUser.user) {
        onSetUser(loggedUser.user);
      } else {
        SetIncorrectData(true);
        setErr(loggedUser.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (login, password, name, surname, email) => {
    try {
      const data = await LoginService.register(
        login,
        password,
        name,
        surname,
        email
      );

      if (data.user) onSetUser(data.user);
      else {
        SetIncorrectData(true);
        setErr(data.error);
      }
    } catch (error) {
      setErr(error);
    }
  };

  const toggleLoginRegister = () => {
    setShowLogin(!showLogin);
    setLogin("");
    setPassword("");
    setRegisterLogin("");
    setRegisterPassword("");
    setName("");
    setSurname("");
    SetIncorrectData(false);
  };

  const handlePasswordFocus = (state) => {
    setShowValid(state);
  };

  return (
    <div className="login-page">
      <div className="login-left-side">
        <div className="login-welcome">
          <h1>{showLogin ? "Welcome back!" : "Create new account!"}</h1>
          <p>{showLogin ? "Sign in to your account" : "Sign up to start"}</p>
        </div>

        {showLogin ? (
          <div className="login">
            <h5>Login</h5>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Login..."
            ></input>
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
            ></input>

            <Button onClick={() => handleLogin(login, password)} styles="login">
              Login
            </Button>
            {incorrectData ? <p className="login-error-message">{err}</p> : ""}
            <h3>
              Don`t have account? <a onClick={toggleLoginRegister}>Sign Up</a>
            </h3>
          </div>
        ) : (
          <div className="register">
            <h5>Login</h5>
            <input
              type="text"
              value={registerLogin}
              onChange={(e) => setRegisterLogin(e.target.value)}
              placeholder="Login..."
              required
            ></input>
            <h5>Password</h5>
            <input
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              onFocus={() => handlePasswordFocus(true)}
              onBlur={() => handlePasswordFocus(false)}
              placeholder="Password..."
              required
            ></input>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Name..."
              required
            ></input>
            <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name..."
              required
            ></input>
            <h5>Surname</h5>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname..."
              required
            ></input>

            <div className={`message ${showValid ? "expanded" : ""}`}>
              <h3>Password must contain:</h3>
              <ul>
                <li className="requirement">
                  <b>Lowercase</b> letter
                </li>
                <li className="requirement">
                  <b>Uppercase</b> letter
                </li>
                <li className="requirement">
                  a <b>Number</b>
                </li>
                <li className="requirement">
                  Minimum <b>8 characters</b>
                </li>
              </ul>
            </div>

            <Button
              onClick={() =>
                handleRegister(
                  registerLogin,
                  registerPassword,
                  name,
                  surname,
                  email
                )
              }
              styles="register"
            >
              Register
            </Button>
            {incorrectData ? <p className="login-error-message">{err}</p> : ""}
            <h3>
              Already have account? <a onClick={toggleLoginRegister}>Login</a>
            </h3>
          </div>
        )}
      </div>
      <LoginMessage />
    </div>
  );
};
