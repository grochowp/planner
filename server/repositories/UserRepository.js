import { BaseRepository } from "./BaseRepository.js";
import { queryAsync } from "../utils.js";

export class UserRepository extends BaseRepository {
  findUserByID = async (userID) => {
    const query = `SELECT * FROM Users WHERE UserID = ?`;
    const results = await queryAsync(this._connection, query, userID);
    const user = {
      userID: results[0].UserID,
      name: results[0].Name,
      surname: results[0].Surname,
      email: results[0].Email,
    };
    return user;
  };

  findUsersFromTask = async (taskID) => {
    const query = `SELECT Users.Name, Users.Surname, Users.UserID
    FROM Users
    JOIN UserTasks ON Users.UserID = UserTasks.UserID
    WHERE UserTasks.TaskID = ?;`;
    const results = await queryAsync(this._connection, query, taskID);

    return results;
  };

  deleteUserFromTask = async (userID) => {
    const query = `DELETE FROM Users WHERE UserID = ?`;
    await queryAsync(this._connection, query, userID);
  };
}
