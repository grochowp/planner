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
};
