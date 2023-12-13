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

const formatTasks = (tasks) => {
  return tasks.map((task) => ({
    taskID: task.TaskID,
    UserID: task.UserID,
    taskIndex: task.TaskIndex,
    taskName: task.TaskName,
    ToDo: JSON.parse(task.ToDo),
    InProgress: JSON.parse(task.InProgress),
    Done: JSON.parse(task.Done),
  }));
};

const getUserWithTasks = (userResult, tasksResult) => {
  const user = {
    name: userResult[0].Name,
    surname: userResult[0].Surname,
    login: userResult[0].Login,
    password: userResult[0].Password,
    userID: userResult[0].UserID,
  };

  const formattedTasks = formatTasks(tasksResult);

  return {
    ...user,
    tasks: formattedTasks,
  };
};

module.exports = { queryAsync, formatTasks, getUserWithTasks };
