export const TaskState = {
  Backlog: {
    text: "BACKLOG",
    name: "Backlog",
  },
  ToDo: {
    text: "TO DO",
    name: "ToDo",
  },
  InProgress: {
    text: "IN PROGRESS",
    name: "InProgress",
  },
  Done: {
    text: "DONE",
    name: "Done",
  },
};

export const sendRequest = async (url, method, body) => {
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
