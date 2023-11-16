import React, { useState } from "react";

export const TasksList = ({ tasks }) => {
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">{currentTask.task}</div>
      <div className="tasks-list-tasks">
        <div className="tasks-list-progress">
          {currentTask.ToDo.map((el, index) => (
            <div key={index}>
              <p className="tasks-list-task">{el}</p>
            </div>
          ))}
        </div>
        <div className="tasks-list-progress">
          {currentTask.InProgress.map((el, index) => (
            <div key={index}>
              <p className="tasks-list-task">{el}</p>
            </div>
          ))}
        </div>
        <div className="tasks-list-progress">
          {currentTask.Done.map((el, index) => (
            <div key={index}>
              <p className="tasks-list-task">{el}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
