import { BaseRepository } from "./BaseRepository.js";
import { queryAsync } from "../utils.js";

const findTaskByIdSQL = `SELECT Users.* FROM Users WHERE UserID = ?`;

export class TasksRepository extends BaseRepository {
  findTaskById = async (taskID) => {
    //TODO
    return null;
  };

  createTask = async (
    userID,
    newTask,
    backlog,
    todo,
    doing,
    done,
    description
  ) => {
    const taskInsertQuery = `
      INSERT INTO Tasks (UsersIDs, TaskName, Backlog, ToDo, InProgress, Done) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const usersIDs = [userID];

    const defaultTask = {
      Backlog: [backlog],
      ToDo: [todo],
      InProgress: [doing],
      Done: [done],
    };
    // Dodanie zadania do tabeli Tasks
    const taskResult = await queryAsync(this._connection, taskInsertQuery, [
      JSON.stringify(usersIDs),
      newTask,
      JSON.stringify(defaultTask.Backlog),
      JSON.stringify(defaultTask.ToDo),
      JSON.stringify(defaultTask.InProgress),
      JSON.stringify(defaultTask.Done),
    ]);

    const taskID = taskResult.insertId;

    // Dodanie wpisu do tabeli UserTasks
    const userTaskInsertQuery = `
      INSERT INTO UserTasks (UserID, TaskID)
      VALUES (?, ?);
    `;

    await queryAsync(this._connection, userTaskInsertQuery, [userID, taskID]);

    const newMainTask = {
      taskID: taskID,
      taskName: newTask,
      usersIDs: JSON.parse(JSON.stringify(usersIDs)),
      Backlog: defaultTask.Backlog,
      ToDo: defaultTask.ToDo,
      InProgress: defaultTask.InProgress,
      Done: defaultTask.Done,
    };

    return newMainTask;
  };

  deleteTask = async (taskID) => {
    const updateUserTasksSQL = "DELETE FROM UserTasks WHERE TaskID = ?;";
    await queryAsync(this._connection, updateUserTasksSQL, [taskID]);

    const updateTasksSQL = "DELETE FROM Tasks WHERE TaskID = ?;";
    await queryAsync(this._connection, updateTasksSQL, [taskID]);
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
      Backlog: JSON.parse(result.Backlog),
      ToDo: JSON.parse(result.ToDo),
      InProgress: JSON.parse(result.InProgress),
      Done: JSON.parse(result.Done),
    }));

    return transformedResults;
  };
}
