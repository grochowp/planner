import React from "react";
import Button from "../../../shared/components/Button";
import { TaskState } from "../../../shared/utils";

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

  return (
    <div className="tasks-list-task-container">
      <p className="tasks-list-task">
        {task}
        <div className="btn-in-task">
          {listType === TaskState.ToDo.name || (
            <Button styles="none" onClick={() => {
              if (listType === TaskState.InProgress.name) {
                moveTask(
                  TaskState.InProgress.name,
                  TaskState.ToDo.name,
                  task);
              } else if (listType === TaskState.Done.name) {
                moveTask(
                  TaskState.Done.name,
                  TaskState.InProgress.name,
                  task);
              }
            }}>
              <i className="gg-push-chevron-left"></i>
            </Button>
          )}
          <Button styles="none">
            <i className="gg-trash" onClick={() => handleDeleteTask(task)}></i>
          </Button>
          {listType === TaskState.Done.name || (
            <Button styles="none" onClick={() => {
              if (listType === TaskState.ToDo.name) {
                moveTask(
                  TaskState.ToDo.name,
                  TaskState.InProgress.name,
                  task);
              } else if (listType === TaskState.InProgress.name) {
                moveTask(
                  TaskState.InProgress.name,
                  TaskState.Done.name,
                  task);
              }
            }}>
              <i className="gg-push-chevron-right"></i>
            </Button>
          )}
        </div>
      </p>
    </div>
  );
};