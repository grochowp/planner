import { TasksRepository } from "../repositories/TasksRepository";
import { UserRepository } from "../repositories/UserRepository";

export class TasksService {

    constructor(connection) {
        this.userRepository = new UserRepository(connection);
        this.tasksRepository = new TasksRepository(connection);
    }

    addMainTask = async (req, res) => {
        const { mainTask, userID } = req.body;

        const nextTaskIndex = await this.tasksRepository.getNextTaskIndexForUser(userID);
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
            const { task, index, destination, userID } = req.body;

            await this.tasksRepository.updateTask_append(destination, task, index, userID);
            const userWithTasks = await this.getUserWithTasks(userID);
            res.status(200).json({ user: userWithTasks });
        } catch (error) {
            console.error("Error during updating task", error);
            res.status(500).json({ message: "Failed to update task" });
        }
    }

    deleteTaskFromMainTask = async (req, res) => {
        try {
            const { task, index, from, userID } = req.body;
            
            await this.tasksRepository.updateTask_remove(from, task, index, userID);
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

        const user = {
            name: userResult[0].Name,
            surname: userResult[0].Surname,
            login: userResult[0].Login,
            password: userResult[0].Password,
            userID: userResult[0].UserID,
        };

        const formattedTasks = tasksResult.map((task) => ({
            taskID: task.TaskID,
            UserID: task.UserID,
            taskIndex: task.TaskIndex,
            taskName: task.TaskName,
            ToDo: JSON.parse(task.ToDo),
            InProgress: JSON.parse(task.InProgress),
            Done: JSON.parse(task.Done),
        }));

        return {
            ...user,
            tasks: formattedTasks,
        };
    };
}