import { sendRequest } from "../shared/utils";

export const TaskService = {
  add: async (task, destination, userID, taskID) => {
    const url = "http://localhost:3001/add";
    const method = "POST";
    const body = { task, destination, userID, taskID };

    return await sendRequest(url, method, body);
  },

  delete: async (task, from, userID, taskID) => {
    const url = "http://localhost:3001/delete";
    const method = "POST";
    const body = { task, from, userID, taskID };

    return await sendRequest(url, method, body);
  },

  addMainTask: async (mainTask, userID) => {
    const url = "http://localhost:3001/addMain";
    const method = "POST";
    const body = { mainTask, userID };

    return await sendRequest(url, method, body);
  },

  move: async (task, from, destination, userID, taskID) => {
    try {
      await TaskService.delete(task, from, userID, taskID);

      return await TaskService.add(task, destination, userID, taskID);
    } catch (error) {
      console.log("Failed to move", error);
      throw error;
    }
  },
};
