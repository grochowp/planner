const getNextTaskIndex = (connection, userID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT MAX(TaskIndex) + 1 AS nextTaskIndex FROM Tasks WHERE UserID = ?`,
      [userID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].nextTaskIndex || 0);
        }
      }
    );
  });
};

const selectUser = (connection, userID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * From Users Where UserID = ?`,
      [userID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const result = {
            userID: results[0].UserID,
            login: results[0].Login,
            password: results[0].Password,
            name: results[0].Name,
            surname: results[0].Surname,
          };
          resolve(result);
        }
      }
    );
  });
};

const findTasks = (connection, userID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * From Tasks Where UserID = ?`,
      [userID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const transformedResults = results.map((result) => ({
            taskID: result.TaskID,
            userID: result.UserID,
            taskIndex: result.TaskIndex,
            taskName: result.TaskName,
            ToDo: JSON.parse(result.ToDo),
            InProgress: JSON.parse(result.InProgress),
            Done: JSON.parse(result.Done),
          }));

          resolve(transformedResults);
        }
      }
    );
  });
};

const addNewMainTask = (connection, mainTask, nextTaskIndex, userID) => {
  return new Promise((resolve, reject) => {
    const tasksInsertSQL = `
          INSERT INTO Tasks (UserID, TaskIndex, TaskName, ToDo, InProgress, Done) 
          VALUES (?, ?, ?, ?, ?, ?);
        `;

    const defaultTask = {
      ToDo: "[]",
      InProgress: "[]",
      Done: "[]",
    };

    connection.query(
      tasksInsertSQL,
      [
        userID,
        nextTaskIndex,
        mainTask,
        defaultTask.ToDo,
        defaultTask.InProgress,
        defaultTask.Done,
      ],
      (error, tasksResults) => {
        if (error) {
          reject(error);
        } else {
          const result = {
            taskName: mainTask,
            taskIndex: nextTaskIndex,
            userID: userID,
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

const handleAddMainTask = async (req, res, connection) => {
  const { mainTask, userID } = req.body;

  const nextTaskIndex = await getNextTaskIndex(connection, userID);
  const user = await selectUser(connection, userID);
  const currentUserTasks = await findTasks(connection, userID);

  const newTask = await addNewMainTask(
    connection,
    mainTask,
    nextTaskIndex,
    userID
  );
  currentUserTasks.push(newTask);

  const result = { ...user, tasks: currentUserTasks };

  res.json({ message: "Dodano zadanie", user: result });
};

module.exports = handleAddMainTask;
