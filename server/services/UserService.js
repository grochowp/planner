import { TasksRepository } from "../repositories/TasksRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
  constructor(connection) {
    this.userRepository = new UserRepository(connection);
    this.tasksRepository = new TasksRepository(connection);
  }

  findUser = async (req, res) => {
    const { userID } = req.body;
    const user = await this.userRepository.findUserByID(userID);

    res.json({ message: "User found", user });
  };
}
