import { BaseRepository } from './BaseRepository';
import { queryAsync } from '../utils';

export class UserRepository extends BaseRepository {

    findUserByID = async (userID) => {
        const query = `SELECT * FROM Users WHERE UserID = ?`;
        const results = await queryAsync(this._connection, query, userID);
        const user = {
            userID: results[0].UserID,
            login: results[0].Login,
            password: results[0].Password,
            name: results[0].Name,
            surname: results[0].Surname,
        };
        return user;
    }
}