const handleLogin = (req, res, connection) => {
  const { login, password } = req.body;

  const sql = `
      SELECT users.*, tasks.*
      FROM users
      LEFT JOIN tasks ON users.userID = tasks.userID
      WHERE users.login = ? AND users.password = ?
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
            taskIndex: result.TaskIndex,
            taskName: result.TaskName,
            ToDo: JSON.parse(result.ToDo),
            InProgress: JSON.parse(result.InProgress),
            Done: JSON.parse(result.Done),
          };
          acc.tasks.push(tasks);
          if (acc.UserID === undefined) {
            acc.userID = result.UserID;
            acc.name = result.Name;
            acc.surname = result.Surname;
            acc.login = result.Login;
            acc.password = result.Password;
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

module.exports = handleLogin;
