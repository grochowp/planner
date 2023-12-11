//Nowe ID uzytkownika, o 1 większy niz ID poprzedniego
const getNextUserID = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT MAX(userID) + 1 AS nextUserID FROM Users",
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].nextUserID || 0);
        }
      }
    );
  });
};

// Dodanie nowego Usera do tabeli Users w SQL
const addUser = (connection, nextUserID, login, password, name, surname) => {
  return new Promise((resolve, reject) => {
    const userInsertSQL = `
      INSERT INTO Users (UserID, Login, Password, Name, Surname)
      VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(
      userInsertSQL,
      [nextUserID, login, password, name, surname],
      (error, userResults) => {
        if (error) {
          reject({ error: "Istnieje użytkownik o podanym loginie" });
        } else {
          resolve(userResults);
        }
      }
    );
  });
};

// Dodanie nowego taska do tabeli Tasks w SQL, z UserID utworzonego wczesniej uzytkownika
const addDefaultTask = (connection, nextUserID) => {
  return new Promise((resolve, reject) => {
    const tasksInsertSQL = `
      INSERT INTO Tasks (UserID, TaskIndex, TaskName, ToDo, InProgress, Done) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const defaultTask = {
      TaskIndex: 1,
      TaskName: "Zadania",
      ToDo: "[]",
      InProgress: "[]",
      Done: "[]",
    };

    connection.query(
      tasksInsertSQL,
      [
        nextUserID,
        defaultTask.TaskIndex,
        defaultTask.TaskName,
        defaultTask.ToDo,
        defaultTask.InProgress,
        defaultTask.Done,
      ],
      (error, tasksResults) => {
        if (error) {
          reject(error);
        } else {
          const result = {
            taskID: tasksResults.insertId,
            taskName: defaultTask.TaskName,
            ToDo: JSON.parse(defaultTask.ToDo),
            InProgress: JSON.parse(defaultTask.InProgress),
            Done: JSON.parse(defaultTask.Done),
          };
          resolve(result);
        }
      }
    );
  });
};

const handleRegister = async (req, res, connection) => {
  try {
    const { login, password, name, surname } = req.body;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
      res.json({ error: "bad password" });
      return;
    }

    const correctedName =
      name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    const correctedSurname =
      surname.charAt(0).toUpperCase() + surname.substring(1).toLowerCase();

    let taskResult;
    const nextUserID = await getNextUserID(connection);
    const newUser = await addUser(
      connection,
      nextUserID,
      login,
      password,
      correctedName,
      correctedSurname
    );
    if (newUser) {
      taskResult = await addDefaultTask(connection, nextUserID);

      const result = {
        id: nextUserID,
        name: correctedName,
        surname: correctedSurname,
        login,
        password,
        tasks: [taskResult],
      };

      res.json({ message: "Rejestracja udana", user: result });
    }
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    res.status(500).json(error);
  }
};

module.exports = handleRegister;
