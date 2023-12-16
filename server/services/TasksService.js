import { TasksRepository } from "../repositories/TasksRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class TasksService {
  constructor(connection) {
    this.userRepository = new UserRepository(connection);
    this.tasksRepository = new TasksRepository(connection);
  }

  addMainTask = async (req, res) => {
    const { mainTask, userID } = req.body;

    const nextTaskIndex = await this.tasksRepository.getNextTaskIndexForUser(
      userID
    );
    const user = await this.userRepository.findUserByID(userID);
    const currentUserTasks = await this.tasksRepository.getUserTasks(userID);

    const newTask = await this.tasksRepository.createTask(
      userID,
      nextTaskIndex,
      mainTask
    );
    currentUserTasks.push(newTask);

    const result = { ...user, tasks: currentUserTasks };

    res.json({ message: "Dodano zadanie", user: result });
  };

  addTaskToMainTask = async (req, res) => {
    try {
      const { task, destination, userID, taskID } = req.body;

      await this.tasksRepository.move_addTask(destination, task, taskID);

      const userWithTasks = await this.getUserWithTasks(userID);

      res.status(200).json({ user: userWithTasks });
    } catch (error) {
      console.error("Error during updating task", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  };

  deleteTaskFromMainTask = async (req, res) => {
    try {
      const { task, from, userID, taskID } = req.body;

      await this.tasksRepository.move_removeTask(from, task, taskID);

      const userWithTasks = await this.getUserWithTasks(userID);
      res.status(200).json({ user: userWithTasks });
    } catch (error) {
      console.error("Error during updating task", error);
      res.status(500).json({ message: "Failed to update task" });
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
}
