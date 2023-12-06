import { useEffect, useState } from "react";
import { usersTemp as users } from "../demoData/users";

export const LoginService = {
  login: async (login, password) => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();

    // TODO - stworzenie pojedynczego obiektu z otrzymanych obiektow w data

    return data;
  },
  // const loggedUser = users.find(
  //   (user) => user.login === login && user.password === Number(password)
  // );
  // return loggedUser;

  //   try {
  //     const response = await fetch("http://localhost:3001/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         login: login,
  //         password: password,
  //       }),
  //     });

  //     // Sprawdzenie statusu odpowiedzi
  //     if (!response.ok) {
  //       console.error("Błąd logowania:", response.status, response.statusText);
  //       // Dodaj inne informacje o błędzie, jeśli dostępne
  //       throw new Error("Błąd logowania");
  //     }

  //     // Parsowanie danych JSON z odpowiedzi
  //     const userData = await response.json();

  //     return userData;
  //   } catch (error) {
  //     console.error("Błąd logowania:", error.message);
  //     return null; // Możesz obsłużyć błąd w dowolny sposób
  //   }
  // },

  logout: () => {
    // Implementuj wylogowywanie
  },

  register: () => {
    // Implementuj rejestrację
  },
};
