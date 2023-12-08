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

  const [incorrectData, SetIncorrectData] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async (login, password) => {
    try {
      const loggedUser = await LoginService.login(login, password);

      if (loggedUser) {
        SetIncorrectData(false);
        onSetUser(loggedUser);
      } else {
        SetIncorrectData(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (login, password, name, surname) => {
    try {
      const newUser = await LoginService.register(
        login,
        password,
        name,
        surname
      );
      console.log(newUser);
      onSetUser(newUser);
    } catch (error) {
      console.error(error);
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

  return (
    <div className="login-page">
      {showLogin ? (
        <div className="login">
          {incorrectData ? (
            <p className="incorrect-data">Błędny login lub hasło.</p>
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
            <p className="incorrect-data">
              Istnieje już użytkownik o podanym loginie.
            </p>
          ) : (
            <p className="incorrect-data">Wprowadź swoje dane</p>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Imię..."
          ></input>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nazwisko..."
          ></input>
          <input
            type="text"
            value={registerLogin}
            onChange={(e) => setRegisterLogin(e.target.value)}
            placeholder="Login..."
          ></input>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Hasło..."
          ></input>

          <div className="login-btns">
            <Button onClick={toggleLoginRegister} styles="login">
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
