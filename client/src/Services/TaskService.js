export const TaskService = {
  add: async (task, index, destination, userID) => {
    try {
      const res = await fetch("http://localhost:3001/add", {
        method: "POST",
        body: JSON.stringify({ task, index, destination, userID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log("Failed to add task", error);
    }
  },
  delete: () => {},
  move: () => {},
};
