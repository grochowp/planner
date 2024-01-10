import { TasksRepository } from "../repositories/TasksRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
  constructor(connection) {
    this.userRepository = new UserRepository(connection);
    this.tasksRepository = new TasksRepository(connection);
  }

  findUsersFromTask = async (req, res) => {
    const { taskID } = req.body;

    const users = await this.userRepository.findUsersFromTask(taskID);

    res.json({ message: "Users found", users });
  };

  setUserWithTasks = async (req, res) => {
    const { userID } = req.body;

    const user = await this.userRepository.findUserByID(userID);
    const tasks = await this.tasksRepository.getUserTasks(userID);

    const result = { ...user, tasks: [...tasks] };

    res.json({ message: "User found", result });
  };

  findCertainUsers = async (req, res) => {
    const { data } = req.body;

    const users = await this.userRepository.findCertainUsers(data);

    res.json({ message: "Users found", users });
  };

  addUserToCurrentUsers = async (req, res) => {
    const { userID, taskID } = req.body;

    await this.tasksRepository.addUserToTask(taskID, userID);
    const users = await this.userRepository.findUsersFromTask(taskID);

    res.json({ message: "Users found", users });
  };
}
