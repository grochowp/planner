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

      return data;
    } catch (error) {
      console.log("Error during login: ", error);
    }
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

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        body: JSON.stringify({ login, password, name, surname }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
