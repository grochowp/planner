import React from "react";
import Button from "./reusableComponents/Button";

export const Task = ({
  task,
  taskIndex,
  activeUser,
  onSetActiveUser,
  listType,
}) => {
  const moveTask = (fromList, toList, task) => {
    const updatedTasks = {
      ...activeUser.tasks[taskIndex],
      [fromList]: activeUser.tasks[taskIndex][fromList].filter(
        (t) => t !== task
      ),
      [toList]: [...activeUser.tasks[taskIndex][toList], task],
    };

    onSetActiveUser((prevActiveUser) => ({
      ...prevActiveUser,
      tasks: prevActiveUser.tasks.map((userTask) =>
        userTask.taskID === updatedTasks.taskID
          ? {
              ...userTask,
              [fromList]: userTask[fromList].filter((t) => t !== task),
              [toList]: [...userTask[toList], task],
            }
          : userTask
      ),
    }));
  };

  const handleDeleteTask = (task, fromList) => {
    const updatedTasks = { ...activeUser.tasks[taskIndex] };
    updatedTasks[listType] = updatedTasks[listType].filter((t) => t !== task);
    console.log(updatedTasks);

    onSetActiveUser((prevActiveUser) => ({
      ...prevActiveUser,
      tasks: prevActiveUser.tasks.map((userTask) =>
        userTask.taskID === updatedTasks.taskID ? { ...updatedTasks } : userTask
      ),
    }));
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
            <i className="gg-trash" onClick={() => handleDeleteTask(task)}></i>
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
