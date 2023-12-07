import { useEffect, useState } from "react";
import { usersTemp as users } from "../demoData/users";

export const LoginService = {
  login: async (login, password) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      return data.user;
    } catch (error) {
      console.log("Error during login: ", error);
    }

    // TODO - wyszukanie z bazy danych uzytkownika dla ktorego login i haslo beda sie zgadzaly

    // TODO - znalezc taski ktorych UserID = UserID znalezionego wczesniej uzytkownika
  },
  logout: () => {
    // Implementuj wylogowywanie
  },

  register: () => {
    // Implementuj rejestrację
  },
};
