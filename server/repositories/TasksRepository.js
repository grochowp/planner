import { BaseRepository } from "./BaseRepository.js";
import { queryAsync } from "../utils.js";

const findTaskByIdSQL = `SELECT Users.* FROM Users WHERE UserID = ?`;

export class TasksRepository extends BaseRepository {
  findTaskById = async (taskID) => {
    //TODO
    return null;
  };

  createTask = async (userID, mainTask) => {
    const taskInsertQuery = `
      INSERT INTO Tasks (UsersIDs, TaskName, ToDo, InProgress, Done) 
      VALUES (?, ?, ?, ?, ?);
    `;

    const usersIDs = [userID];

    const defaultTask = {
      ToDo: "[]",
      InProgress: "[]",
      Done: "[]",
    };

    // Dodanie zadania do tabeli Tasks
    const taskResult = await queryAsync(this._connection, taskInsertQuery, [
      JSON.stringify(usersIDs),
      mainTask,
      defaultTask.ToDo,
      defaultTask.InProgress,
      defaultTask.Done,
    ]);

    const taskID = taskResult.insertId;

    // Dodanie wpisu do tabeli UserTasks
    const userTaskInsertQuery = `
      INSERT INTO UserTasks (UserID, TaskID)
      VALUES (?, ?);
    `;

    await queryAsync(this._connection, userTaskInsertQuery, [userID, taskID]);

    const newTask = {
      taskID: taskID,
      taskName: mainTask,
      usersIDs: JSON.parse(JSON.stringify(usersIDs)),
      ToDo: JSON.parse(defaultTask.ToDo),
      InProgress: JSON.parse(defaultTask.InProgress),
      Done: JSON.parse(defaultTask.Done),
    };

    return newTask;
  };

  addTask = async (destination, task, taskID) => {
    const updateTaskSql = `UPDATE Tasks
            SET ${destination} = JSON_ARRAY_APPEND(${destination}, '$', ?)
            WHERE TaskID = ?;`;
    await queryAsync(this._connection, updateTaskSql, [task, taskID]);
  };

  // Dziwna ta funkcja muszę tą bazę twoją zobaczyć
  removeTask = async (from, task, taskID) => {
    const updateTaskSql = `
                      UPDATE Tasks
                      SET ${from} = JSON_REMOVE(${from}, JSON_UNQUOTE(JSON_SEARCH(${from}, 'one', ?)))
                      WHERE TaskID = ?;
                      `;
    await queryAsync(this._connection, updateTaskSql, [task, taskID]);
  };

  getNextTaskIndexForUser = async (userID) => {
    const query = `SELECT MAX(TaskIndex) + 1 AS nextTaskIndex FROM Tasks WHERE UserID = ?`;
    const results = await queryAsync(this._connection, query, [userID]);
    return results[0].nextTaskIndex || 0;
  };

  getUserTasks = async (userID) => {
    const query = `SELECT Tasks.*
    FROM Tasks
    JOIN UserTasks ON Tasks.TaskID = UserTasks.TaskID
    WHERE UserTasks.UserID = ?;`;

    const results = await queryAsync(this._connection, query, [userID]);

    //To powinno być jako oddzielna funkcja np mapTasksToTaskTableFormat

    const transformedResults = results.map((result) => ({
      taskID: result.TaskID,
      usersIDs: JSON.parse(result.UsersIDs),
      taskName: result.TaskName,
      ToDo: JSON.parse(result.ToDo),
      InProgress: JSON.parse(result.InProgress),
      Done: JSON.parse(result.Done),
    }));

    return transformedResults;
  };
}
