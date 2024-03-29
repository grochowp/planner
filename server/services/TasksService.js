import { TasksRepository } from "../repositories/TasksRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class TasksService {
  constructor(connection) {
    this.userRepository = new UserRepository(connection);
    this.tasksRepository = new TasksRepository(connection);
  }

  addMainTask = async (req, res) => {
    try {
      const { userID, newTask, backlog, todo, doing, done, description } =
        req.body;

      if (!newTask) throw new Error("Name of task is required");
      if (!description) throw new Error("Description is required");
      const user = await this.userRepository.findUserByID(userID);

      const currentUserTasks = await this.tasksRepository.getUserTasks(userID);
      const newMainTask = await this.tasksRepository.createMainTask(
        userID,
        newTask,
        backlog,
        todo,
        doing,
        done,
        description
      );
      currentUserTasks.push(newMainTask);

      const result = { ...user, tasks: currentUserTasks };

      res.json({ message: "Dodano zadanie", user: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteMainTask = async (req, res) => {
    const { taskID, userID } = req.body;

    const user = await this.userRepository.findUserByID(userID);

    await this.tasksRepository.deleteMainTask(taskID);

    const currentUserTasks = await this.tasksRepository.getUserTasks(userID);

    const result = { ...user, tasks: currentUserTasks };

    res.json({ message: "Dodano zadanie", user: result });
  };

  selectActiveTask = async (req, res) => {
    const { taskID } = req.body;

    const tasks = await this.tasksRepository.findTaskByID(taskID);

    res.json({ message: "Task added", tasks });
  };

  addTaskToMainTask = async (req, res) => {
    try {
      const { task, taskID, destination } = req.body;

      if (task.length < 3) {
        throw new Error("Task must have at least 3 characters");
      }
      if (!destination) {
        throw new Error("Destination is not defined");
      }

      await this.tasksRepository.addTask(task, destination, taskID);

      const tasks = await this.tasksRepository.findTaskByID(taskID);
      res.json({ message: "Task added", tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteTaskFromMainTask = async (req, res) => {
    try {
      const { task, from, taskID } = req.body;
      await this.tasksRepository.removeTask(task, from, taskID);
      const tasks = await this.tasksRepository.findTaskByID(taskID);
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  };

  moveTaskBetweenMainTask = async (req, res) => {
    try {
      const { task, from, destination, taskID } = req.body;
      await this.tasksRepository.removeTask(task, from, taskID);
      await this.tasksRepository.addTask(task, destination, taskID);
      const tasks = await this.tasksRepository.findTaskByID(taskID);
      res.status(200).json({ tasks });
    } catch (error) {
      console.log("Failed to move", error);
      throw error;
    }
  };

  getUserWithTasks = async (userID) => {
    const userResult = await this.userRepository.findUserByID(userID);
    const tasksResult = await this.tasksRepository.getUserTasks(userID);
    return {
      ...userResult,
      tasks: tasksResult,
    };
  };

  deleteUserFromTask = async (req, res) => {
    try {
      const { userID, taskID } = req.body;

      await this.tasksRepository.deleteUserFromTask(userID, taskID);
      const users = await this.userRepository.findUsersFromTask(taskID);
      res.status(200).json({ users });
    } catch (err) {
      console.log(err);
    }
  };
}
