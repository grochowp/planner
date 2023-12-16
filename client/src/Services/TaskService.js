import { sendRequest } from "../shared/utils";

export const TaskService = {
  add: async (task, index, destination, userID) => {
    const url = "http://localhost:3001/add";
    const method = "POST";
    const body = { task, index, destination, userID };

    return await sendRequest(url, method, body);
  },

  delete: async (task, from, userID, taskID) => {
    const url = "http://localhost:3001/delete";
    const method = "POST";
    const body = { task, from, userID, taskID };
    console.log(body);
    return await sendRequest(url, method, body);
  },

  addMainTask: async (mainTask, userID) => {
    const url = "http://localhost:3001/addMain";
    const method = "POST";
    const body = { mainTask, userID };

    return await sendRequest(url, method, body);
  },

  move: async (task, index, from, destination, userID) => {
    try {
      await TaskService.delete(task, index, from, userID);

      return await TaskService.add(task, index, destination, userID);
    } catch (error) {
      console.log("Failed to move", error);
      throw error;
    }
  },
};
