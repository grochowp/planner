export const handleLogin = (req, res, connection) => {
  const { login, password } = req.body;
  const sql = `
              SELECT Users.*, Tasks.*
              FROM Users
              LEFT JOIN UserTasks ON Users.UserID = UserTasks.UserID
              LEFT JOIN Tasks ON UserTasks.TaskID = Tasks.TaskID
              WHERE Users.Login = ? AND Users.Password = ?;
              `;

  connection.query(sql, [login, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (results.length > 0) {
      const combinedUser = results.reduce(
        (acc, result) => {
          const tasks = {
            taskID: result.TaskID,
            taskName: result.TaskName,
            Backlog: JSON.parse(result.Backlog),
            ToDo: JSON.parse(result.ToDo),
            InProgress: JSON.parse(result.InProgress),
            Done: JSON.parse(result.Done),
            description: result.Description,
          };
          acc.tasks.push(tasks);
          if (acc.UserID === undefined) {
            acc.userID = result.UserID;
            acc.name = result.Name;
            acc.email = result.Email;
            acc.surname = result.Surname;
          }
          return acc;
        },
        { tasks: [] }
      );
      res.json({ message: "Login successful", user: combinedUser });
    } else {
      res.status(401).json({ error: "Invalid login or password" });
    }
  });
};
