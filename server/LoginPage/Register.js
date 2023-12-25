//Nowe ID uzytkownika, o 1 większy niz ID poprzedniego
const getNextUserID = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT MAX(UserID) + 1 AS nextUserID FROM Users",
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

const addUser = (
  connection,
  nextUserID,
  login,
  password,
  name,
  surname,
  email
) => {
  return new Promise((resolve, reject) => {
    const userInsertSQL = `
      INSERT INTO Users (UserID, Login, Password, Name, Surname, Email)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    connection.query(
      userInsertSQL,
      [nextUserID, login, password, name, surname, email],
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
      INSERT INTO Tasks (TaskName, Backlog, ToDo, InProgress, Done, Description)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const defaultTask = {
      TaskName: "Tasks",
      Backlog: "[]",
      ToDo: "[]",
      InProgress: "[]",
      Done: "[]",
      Description: "List of things to do",
    };

    connection.query(
      tasksInsertSQL,
      [
        defaultTask.TaskName,
        defaultTask.Backlog,
        defaultTask.ToDo,
        defaultTask.InProgress,
        defaultTask.Done,
        defaultTask.Description,
      ],
      (error, tasksResults) => {
        if (error) {
          reject(error);
        } else {
          const result = {
            taskID: tasksResults.insertId,
            taskName: defaultTask.TaskName,
            Backlog: JSON.parse(defaultTask.Backlog),
            ToDo: JSON.parse(defaultTask.ToDo),
            InProgress: JSON.parse(defaultTask.InProgress),
            Done: JSON.parse(defaultTask.Done),
            description: defaultTask.Description,
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
    const { login, password, name, surname, email } = req.body;

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
      correctedSurname,
      email
    );
    if (newUser) {
      const taskResult = await addDefaultTask(connection, nextUserID);
      await addToUsersTask(connection, nextUserID, taskResult.taskID);
      const result = {
        userID: nextUserID,
        name: correctedName,
        surname: correctedSurname,
        login,
        password,
        email,
        tasks: [taskResult],
      };

      res.json({ message: "Rejestracja udana", user: result });
    }
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    res.status(500).json(error);
  }
};
