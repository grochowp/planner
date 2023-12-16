//Nowe ID uzytkownika, o 1 większy niz ID poprzedniego
const getNextUserID = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT MAX(UserID) + 1 AS nextUserID FROM UserTasks",
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

const addDefaultTask = (connection, nextUserID) => {
  return new Promise((resolve, reject) => {
    const tasksInsertSQL = `
      INSERT INTO Tasks (UsersIDs, TaskName, ToDo, InProgress, Done)
      VALUES (?, ?, ?, ?, ?);
    `;

    const defaultTask = {
      TaskName: "Zadania",
      ToDo: "[]",
      InProgress: "[]",
      Done: "[]",
    };

    const usersIDsArray = [nextUserID]; // Teraz UsersIDs to tablica z jednym elementem

    connection.query(
      tasksInsertSQL,
      [
        JSON.stringify(usersIDsArray), // Konwertuj tablicę na JSON
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

const addToUsersTask = async (connection, userID, taskID) => {
  return new Promise((resolve, reject) => {
    const addUserTaskSQL = `
      INSERT INTO UserTasks (UserID, TaskID)
      VALUES (?, ?);
    `;

    connection.query(addUserTaskSQL, [userID, taskID], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const handleRegister = async (req, res, connection) => {
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
      const taskResult = await addDefaultTask(connection, nextUserID);
      await addToUsersTask(connection, nextUserID, taskResult.taskID);
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
