import React, { useState } from "react";
import Button from "./Button";

export const TasksList = ({ tasks }) => {
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">{currentTask.task}</div>
      <div className="tasks-list-tasks">
        <div className="tasks-list-progress">
          <div className="tasks-list-name">To do</div>
          {currentTask?.ToDo.map((el, index) => (
            <div className="tasks-list-task-container" key={index}>
              <p className="tasks-list-task">
                {el}
                <div className="btn-in-task">
                  <Button styles="task"></Button>
                  <Button styles="task"></Button>
                  <Button styles="task"></Button>
                </div>
              </p>
            </div>
          ))}
        </div>
        <div className="tasks-list-progress">
          <div className="tasks-list-name">In progress</div>
          <div className="tasks-list-overflow">
            {currentTask?.InProgress.map((el, index) => (
              <div className="tasks-list-task-container" key={index}>
                <p className="tasks-list-task">
                  {el}
                  <div className="btn-in-task">
                    <Button styles="task"></Button>
                    <Button styles="task"></Button>
                    <Button styles="task"></Button>
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="tasks-list-progress">
          <div className="tasks-list-name">Done</div>
          <div className="tasks-list-overflow">
            {currentTask?.Done.map((el, index) => (
              <div className="tasks-list-task-container" key={index}>
                <p className="tasks-list-task">
                  {el}
                  <div className="btn-in-task">
                    <Button styles="task"></Button>
                    <Button styles="task"></Button>
                    <Button styles="task"></Button>
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
