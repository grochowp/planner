import React, { useState } from "react";
import { Task } from "./Task";

export const TasksList = ({
  activeUser,
  onSetActiveUser,
  taskIndex,
  onSetTaskIndex,
}) => {
  const handleTaskButtonClick = (newIndex) => {
    onSetTaskIndex(() => newIndex);
  };
  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">
        <div className="tasks-list-task-name">
          <button onClick={() => handleTaskButtonClick(1)}></button>
          {activeUser.tasks[taskIndex].task}
          <button onClick={() => handleTaskButtonClick(0)}></button>
        </div>
      </div>

      <div className="tasks-list-tasks">
        <div className="tasks-list-progress">
          <div className="tasks-list-name">TO DO</div>
          <div className="tasks-list-overflow">
            {activeUser.tasks[taskIndex] &&
              activeUser.tasks[taskIndex].ToDo?.map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  taskIndex={taskIndex}
                  activeUser={activeUser}
                  onSetActiveUser={onSetActiveUser}
                  listType={"ToDo"}
                />
              ))}
          </div>
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">IN PROGRESS</div>
          <div className="tasks-list-overflow">
            {activeUser.tasks[taskIndex] &&
              activeUser.tasks[taskIndex].InProgress.map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  taskIndex={taskIndex}
                  activeUser={activeUser}
                  onSetActiveUser={onSetActiveUser}
                  listType={"InProgress"}
                />
              ))}
          </div>
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">DONE</div>
          <div className="tasks-list-overflow">
            {activeUser.tasks[taskIndex] &&
              activeUser.tasks[taskIndex].Done?.map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  taskIndex={taskIndex}
                  activeUser={activeUser}
                  onSetActiveUser={onSetActiveUser}
                  listType={"Done"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
