const handleUpdateTask = async (req, res, connection) => {
  try {
    const { task, index, from, userID, tasksID } = req.body;

    const updateTaskSql = `
        UPDATE Tasks
        SET ${from} = JSON_REMOVE(${from}, JSON_UNQUOTE(JSON_SEARCH(${from}, 'one', ?)))
        WHERE taskID = ? AND UserID = ?
      `;

    console.log(task, index, from, userID);

    //   UPDATE Tasks
    //     SET ToDo = JSON_REMOVE(ToDo, JSON_UNQUOTE(JSON_SEARCH(ToDo, 'one', 'b')))
    //     WHERE taskID = 48 AND UserID = 1;
    //   ;
    await queryAsync(connection, updateTaskSql, [task, tasksID, userID]);

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

    console.log(formattedTasks);

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

module.exports = handleUpdateTask;
