import React, { useState } from "react";
import Button from "./Button";

export const TasksList = ({ tasks }) => {
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">{currentTask.task}</div>
      <div className="tasks-list-tasks">
        <div className="tasks-list-progress">
          <div className="tasks-list-name">TO DO</div>
          {currentTask?.ToDo.map((el, index) => (
            <div className="tasks-list-task-container" key={index}>
              <p className="tasks-list-task">
                {el}
                <div className="btn-in-task">
                  <i class="gg-trash"></i>
                  <i class="gg-trash"></i>
                  <i class="gg-trash"></i>
                </div>
              </p>
            </div>
          ))}
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">IM PROGRESS</div>
          <div className="tasks-list-overflow">
            {currentTask?.InProgress.map((el, index) => (
              <div className="tasks-list-task-container" key={index}>
                <p className="tasks-list-task">
                  {el}
                  <div className="btn-in-task">
                    <i class="gg-trash"></i>
                    <i class="gg-trash"></i>
                    <i class="gg-trash"></i>
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">DONE</div>
          <div className="tasks-list-overflow">
            {currentTask?.Done.map((el, index) => (
              <div className="tasks-list-task-container" key={index}>
                <p className="tasks-list-task">
                  {el}
                  <div className="btn-in-task">
                    <i class="gg-trash"></i>
                    <i class="gg-trash"></i>
                    <i class="gg-trash"></i>
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
