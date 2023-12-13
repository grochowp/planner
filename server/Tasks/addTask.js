const handleAddTask = async (req, res, connection) => {
  try {
    const { task, index, destination, userID } = req.body;

    const updateTaskSql = `UPDATE Tasks
                            SET ${destination} = JSON_ARRAY_APPEND(${destination}, '$', ?)
                            WHERE UserID = ? AND TaskIndex = ?;`;

    // Aktualizacja zadania
    await queryAsync(connection, updateTaskSql, [task, userID, index]);

    const userSQL = `SELECT Users.*
                      FROM Users 
                      WHERE UserID = ?`;

    const userResult = await queryAsync(connection, userSQL, userID);
    const user = {
      name: userResult[0].Name,
      surname: userResult[0].Surname,
      login: userResult[0].Login,
      password: userResult[0].Password,
      userID: userResult[0].UserID,
    };

    const tasksSQL = `SELECT Tasks.*
                      FROM Tasks
                      WHERE UserID = ?`;

    const tasksResult = await queryAsync(connection, tasksSQL, userID);

    const formattedTasks = tasksResult.map((task) => ({
      taskID: task.TaskID,
      UserID: task.UserID,
      taskIndex: task.TaskIndex,
      taskName: task.TaskName,
      ToDo: JSON.parse(task.ToDo),
      InProgress: JSON.parse(task.InProgress),
      Done: JSON.parse(task.Done),
    }));

    const userWithTasks = {
      ...user,
      tasks: formattedTasks,
    };

    res.status(200).json({ user: userWithTasks });
  } catch (error) {
    console.error("Error during updating task", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

const queryAsync = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = handleAddTask;
