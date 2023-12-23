import { sendRequest } from "../shared/utils";

export const TaskService = {
  add: async (task, destination, userID, taskID) => {
    const url = "http://localhost:3001/add";
    const method = "POST";
    const body = { task, destination, userID, taskID };

    return await sendRequest(url, method, body);
  },

  delete: async (task, from, taskID) => {
    const url = "http://localhost:3001/delete";
    const method = "POST";
    const body = { task, from, taskID };

    return await sendRequest(url, method, body);
  },

  move: async (task, from, destination, taskID) => {
    const url = "http://localhost:3001/move";
    const method = "POST";
    const body = { task, from, destination, taskID };

    return await sendRequest(url, method, body);
  },

  addMainTask: async (
    userID,
    newTask,
    backlog,
    todo,
    doing,
    done,
    description
  ) => {
    const url = "http://localhost:3001/addMain";
    const method = "POST";
    const body = { userID, newTask, backlog, todo, doing, done, description };

    return await sendRequest(url, method, body);
  },

  deleteMainTask: async (taskID, userID) => {
    const url = "http://localhost:3001/deleteMain";
    const method = "POST";
    const body = { taskID, userID };

    return await sendRequest(url, method, body);
  },

  selectActiveTask: async (taskID) => {
    const url = "http://localhost:3001/selectTask";
    const method = "POST";
    const body = { taskID };

    return await sendRequest(url, method, body);
  },
};
