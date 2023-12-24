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
    };
    return user;
  };
}
