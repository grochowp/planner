const { queryAsync, getUserWithTasks } = require("./taskUtils");

const handleUpdateTask = async (req, res, connection) => {
  try {
    const { task, from, userID, tasksID } = req.body;

    const updateTaskSql = `
        UPDATE Tasks
        SET ${from} = JSON_REMOVE(${from}, JSON_UNQUOTE(JSON_SEARCH(${from}, 'one', ?)))
        WHERE taskID = ? AND UserID = ?
      `;

    await queryAsync(connection, updateTaskSql, [task, tasksID, userID]);

    const userSQL = `SELECT Users.*
                      FROM Users 
                      WHERE UserID = ?`;

    const userResult = await queryAsync(connection, userSQL, userID);

    const tasksSQL = `SELECT Tasks.*
                      FROM Tasks
                      WHERE UserID = ?`;

    const tasksResult = await queryAsync(connection, tasksSQL, userID);

    const userWithTasks = getUserWithTasks(userResult, tasksResult);

    res.status(200).json({ user: userWithTasks });
  } catch (error) {
    console.error("Error during updating task", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

module.exports = handleUpdateTask;
