import { sendRequest } from "../shared/utils";

export const userService = {
  findUsersFromTask: async (taskID) => {
    const url = "http://localhost:3001/findUsersFromTask";
    const method = "POST";
    const body = { taskID };

    return await sendRequest(url, method, body);
  },

  setUserWithTasks: async (userID) => {
    const url = "http://localhost:3001/setUserWithTasks";
    const method = "POST";
    const body = { userID };

    return await sendRequest(url, method, body);
  },

  findCertainUsers: async (data) => {
    const url = "http://localhost:3001/findCertainUsers";
    const method = "POST";
    const body = { data };

    return await sendRequest(url, method, body);
  },

  addUserToCurrentUsers: async (userID, taskID) => {
    const url = "http://localhost:3001/addUserToCurrentUsers";
    const method = "POST";
    const body = { userID, taskID };

    return await sendRequest(url, method, body);
  },
};
