const { queryAsync, getUserWithTasks } = require("./taskUtils");

const handleAddTask = async (req, res, connection) => {
  try {
    const { task, index, destination, userID } = req.body;

    const updateTaskSql = `UPDATE Tasks
                            SET ${destination} = JSON_ARRAY_APPEND(${destination}, '$', ?)
                            WHERE UserID = ? AND TaskIndex = ?;`;

    await queryAsync(connection, updateTaskSql, [task, userID, index]);

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

module.exports = handleAddTask;
