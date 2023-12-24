import { sendRequest } from "../shared/utils";

export const userService = {
  findUser: async (userID) => {
    const url = "http://localhost:3001/findUser";
    const method = "POST";
    const body = { userID };

    return await sendRequest(url, method, body);
  },
};
