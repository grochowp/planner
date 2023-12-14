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
      return { error: "Login must have at least 8 characters" };
    if (password.length < 8)
      return { error: "Password must have at least 8 characters" };
    if (name.length < 2) return { error: "Invalid name" };
    if (surname.length < 2) return { error: "Invalid surname" };

    const url = "http://localhost:3001/register";
    const method = "POST";
    const body = { login, password, name, surname };

    return await sendRequest(url, method, body);
  },
};
