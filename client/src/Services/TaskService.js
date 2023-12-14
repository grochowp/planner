const sendRequest = async (url, method, body) => {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(`Request failed for ${url}`, error);
    throw error;
  }
};

export const TaskService = {
  add: async (task, index, destination, userID) => {
    const url = "http://localhost:3001/add";
    const method = "POST";
    const body = { task, index, destination, userID };

    return await sendRequest(url, method, body);
  },

  delete: async (task, index, from, userID) => {
    const url = "http://localhost:3001/delete";
    const method = "POST";
    const body = { task, index, from, userID };

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
