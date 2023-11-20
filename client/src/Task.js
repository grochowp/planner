import React from "react";
import Button from "./reusableComponents/Button";

export const Task = ({ task, tasks, setTasks, listType, onSetActiveUser }) => {
  const moveTask = (fromList, toList, task) => {
    const updatedTasks = {
      ...tasks,
      [fromList]: tasks[fromList].filter((t) => t !== task),
      [toList]: [...tasks[toList], task],
    };
    setTasks(updatedTasks);
    onSetActiveUser((prevActiveUser) => ({
      ...prevActiveUser,
      tasks: prevActiveUser.tasks.map((task) =>
        task.taskID === updatedTasks.taskID
          ? { ...task, ...updatedTasks }
          : task
      ),
    }));
  };

  const handleDeleteTask = () => {
    const updatedTasks = { ...tasks };

    updatedTasks[listType] = updatedTasks[listType].filter((t) => t !== task);

    setTasks(updatedTasks);
  };

  const handleMove = (direction) => {
    if (listType === "ToDo" && direction === "right") {
      moveTask("ToDo", "InProgress", task);
    } else if (listType === "InProgress" && direction === "right") {
      moveTask("InProgress", "Done", task);
    } else if (listType === "InProgress" && direction === "left") {
      moveTask("InProgress", "ToDo", task);
    } else if (listType === "Done" && direction === "left") {
      moveTask("Done", "InProgress", task);
    }
  };

  return (
    <div className="tasks-list-task-container">
      <p className="tasks-list-task">
        {task}
        <div className="btn-in-task">
          {(listType === "InProgress" || listType === "Done") && (
            <Button styles="none" onClick={() => handleMove("left")}>
              <i className="gg-push-chevron-left"></i>
            </Button>
          )}
          <Button styles="none">
            <i className="gg-trash" onClick={handleDeleteTask}></i>
          </Button>
          {(listType === "InProgress" || listType === "ToDo") && (
            <Button styles="none" onClick={() => handleMove("right")}>
              <i className="gg-push-chevron-right"></i>
            </Button>
          )}
        </div>
      </p>
    </div>
  );
};
