import React, { useState } from "react";
import Button from "../shared/components/Button";
import { LoginService } from "../Services/loginService";

export const Login = ({ onSetUser }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

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

  const handleRegister = async (login, password, name, surname) => {
    try {
      const data = await LoginService.register(login, password, name, surname);

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
      {showLogin ? (
        <div className="login">
          {incorrectData ? (
            <p className="incorrect-data">{err}</p>
          ) : (
            <p className="incorrect-data">Wprowadź login i hasło</p>
          )}
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Login..."
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło..."
          ></input>

          <div className="login-btns">
            <Button onClick={toggleLoginRegister} styles="login">
              Zarejestruj się
            </Button>
            <Button onClick={() => handleLogin(login, password)} styles="login">
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="register">
          {incorrectData ? (
            <p className="incorrect-data">{err}</p>
          ) : (
            <p className="incorrect-data">Wprowadź swoje dane</p>
          )}
          <input
            type="text"
            value={registerLogin}
            onChange={(e) => setRegisterLogin(e.target.value)}
            placeholder="Login..."
            required
          ></input>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            onFocus={() => handlePasswordFocus(true)}
            onBlur={() => handlePasswordFocus(false)}
            placeholder="Hasło..."
            required
          ></input>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Imię..."
            required
          ></input>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nazwisko..."
            required
          ></input>
          {showValid ? (
            <div id="message">
              <h3>Hasło musi zawierać:</h3>
              <ul>
                <li className="requirement">
                  <b>Małą</b> literę
                </li>
                <li className="requirement">
                  <b>Wielką</b> litere
                </li>
                <li className="requirement">
                  <b>Cyfrę</b>
                </li>
                <li className="requirement">
                  Minimum <b>8</b>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          <div className="login-btns">
            <Button onClick={toggleLoginRegister} styles="register">
              Powrót do logowania
            </Button>
            <Button
              onClick={() =>
                handleRegister(registerLogin, registerPassword, name, surname)
              }
              styles="register"
            >
              Rejestruj
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
