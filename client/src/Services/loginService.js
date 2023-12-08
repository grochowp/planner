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
  },
  logout: () => {
    // Implementuj wylogowywanie
  },

  register: async (login, password, name, surname) => {
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        body: JSON.stringify({ login, password, name, surname }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data.user;
    } catch (error) {
      console.log("Error during login: ", error);
    }
  },
};
