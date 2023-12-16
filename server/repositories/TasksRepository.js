import { BaseRepository } from './BaseRepository';
import { queryAsync } from '../utils';

const findTaskByIdSQL = `SELECT Users.* FROM Users WHERE UserID = ?`;

export class TasksRepository extends BaseRepository {

    findTaskById = async (taskID) => {
        //TODO
        return null;
    }

    createTask = async (userID, nextTaskIndex, mainTask) => {
        const query = `
          INSERT INTO Tasks (UserID, TaskIndex, TaskName, ToDo, InProgress, Done) 
          VALUES (?, ?, ?, ?, ?, ?);
        `;

        const defaultTask = {
            ToDo: "[]",
            InProgress: "[]",
            Done: "[]",
        };

        await queryAsync(this._connection, query, [
            userID,
            nextTaskIndex,
            mainTask,
            defaultTask.ToDo,
            defaultTask.InProgress,
            defaultTask.Done,
        ]);

        const newTask = {
            taskName: mainTask,
            taskIndex: nextTaskIndex,
            userID: userID,
            ToDo: JSON.parse(defaultTask.ToDo),
            InProgress: JSON.parse(defaultTask.InProgress),
            Done: JSON.parse(defaultTask.Done),
        };

        return newTask;
    }

    updateTask_append = async (destination, task, index, userID) => {
        const updateTaskSql = `UPDATE Tasks
            SET ${destination} = JSON_ARRAY_APPEND(${destination}, '$', ?)
            WHERE UserID = ? AND TaskIndex = ?;`;
        await queryAsync(this._connection, updateTaskSql, [task, userID, index]);
    }

    // Dziwna ta funkcja muszę tą bazę twoją zobaczyć
    updateTask_remove = async (from, task, index, userID) => {
        const updateTaskSql = `
                UPDATE Tasks
                SET ${from} = JSON_REMOVE(${from}, JSON_UNQUOTE(JSON_SEARCH(${from}, 'one', ?)))
                WHERE TaskIndex = ? AND UserID = ?
            `;
        await queryAsync(this._connection, updateTaskSql, [task, index, userID]);
    }

    getNextTaskIndexForUser = async (userID) => {
        const query = `SELECT MAX(TaskIndex) + 1 AS nextTaskIndex FROM Tasks WHERE UserID = ?`;
        const results = await queryAsync(this._connection, query, [userID]);
        return results[0].nextTaskIndex || 0
    }

    getUserTasks = async (userID) => {
        const query = `SELECT * From Tasks Where UserID = ?`;
        const results = await queryAsync(this._connection, query, [userID]);
        //To powinno być jako oddzielna funkcja np mapTasksToTaskTableFormat
        const transformedResults = results.map((result) => ({
            taskID: result.TaskID,
            userID: result.UserID,
            taskIndex: result.TaskIndex,
            taskName: result.TaskName,
            ToDo: JSON.parse(result.ToDo),
            InProgress: JSON.parse(result.InProgress),
            Done: JSON.parse(result.Done),
          }));
        return transformedResults;
    }
}