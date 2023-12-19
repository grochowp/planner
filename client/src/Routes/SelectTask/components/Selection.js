import React, { useContext, useState } from "react";
import { TaskService } from "../../../Services/TaskService";
import { taskContext, userContext } from "../../../App";
import { useNavigate } from "react-router-dom";

export const Selection = ({ onHandleShowForm }) => {
  const [activeUser, setActiveUser] = useContext(userContext);
  const [activeTask, setActiveTask] = useContext(taskContext);

  const navigate = useNavigate();

  const handleDeleteTask = async (taskID) => {
    try {
      const userWithDeletedTask = await TaskService.deleteMainTask(
        taskID,
        activeUser.userID
      );
      setActiveUser(userWithDeletedTask.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetActiveTask = (task) => {
    setActiveTask(() => task);

    navigate("/kanban", {
      state: { task },
    });
  };

  return (
    <div className="select-task">
      {activeUser.tasks.map((task, index) => {
        return (
          <div className="task-card" key={index}>
            <div className="task-card-data">
              <p className="task-card-users">
                <span>{task.usersIDs.length}</span>
                <i className="gg-user"></i>
                <i className="gg-math-plus"></i>
              </p>
              <p
                onClick={() => handleDeleteTask(task.taskID)}
                className="task-card-delete-task"
              >
                <i className="gg-trash"></i>
              </p>
            </div>
            <div
              onClick={() => handleSetActiveTask(task)}
              className={`task-card-info  color-${index % 4}`}
            >
              <h1 className="task-card-name">{task.taskName}</h1>
              <h4 className="task-card-description">
                School homework including some projectsdsdasasd as as sdads as
                assa as d asda sa sasas sa asas
              </h4>
            </div>
          </div>
        );
      })}
      <div className="task-card  select-task-add">
        <button onClick={() => onHandleShowForm(true)}></button>
      </div>
    </div>
  );
};
