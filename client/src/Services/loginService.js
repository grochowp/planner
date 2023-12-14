import { sendRequest } from "../shared/utils";

export const LoginService = {
  login: async (login, password) => {
    const url = "http://localhost:3001/login";
    const method = "POST";
    const body = { login, password };

    return await sendRequest(url, method, body);
  },
  logout: () => {
    return "";
  },

  register: async (login, password, name, surname) => {
    if (login.length < 8)
      return { error: "Login musi być dłuższy niż 8 znaków" };
    if (password.length < 8)
      return { error: "Hasło musi być dłuższe niż 8 znaków" };
    if (name.length < 2) return { error: "Nieprawidłowe imię" };
    if (surname.length < 2) return { error: "Nieprawidłowe nazwisko" };

    const url = "http://localhost:3001/register";
    const method = "POST";
    const body = { login, password, name, surname };

    return await sendRequest(url, method, body);
  },
};
