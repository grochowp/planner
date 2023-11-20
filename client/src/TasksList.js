import React from "react";
import { Task } from "./Task";

export const TasksList = ({
  activeUser,
  onSetActiveUser,
  currentTask,
  setCurrentTask,
}) => {
  const handleTaskButtonClick = (selectedTask) => {
    setCurrentTask(selectedTask);
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">
        <div className="tasks-list-task-name">
          <button
            onClick={() => handleTaskButtonClick(activeUser.tasks[1])}
          ></button>
          {currentTask.task.toUpperCase()}
          <button
            onClick={() => handleTaskButtonClick(activeUser.tasks[0])}
          ></button>
        </div>
      </div>

      <div className="tasks-list-tasks">
        <div className="tasks-list-progress">
          <div className="tasks-list-name">TO DO</div>
          <div className="tasks-list-overflow">
            {currentTask &&
              currentTask["ToDo"].map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  tasks={currentTask}
                  onSetActiveUser={onSetActiveUser}
                  setTasks={setCurrentTask}
                  listType={"ToDo"}
                />
              ))}
          </div>
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">IN PROGRESS</div>
          <div className="tasks-list-overflow">
            {currentTask &&
              currentTask["InProgress"].map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  tasks={currentTask}
                  onSetActiveUser={onSetActiveUser}
                  setTasks={setCurrentTask}
                  listType={"InProgress"}
                />
              ))}
          </div>
        </div>

        <div className="tasks-list-progress">
          <div className="tasks-list-name">DONE</div>
          <div className="tasks-list-overflow">
            {currentTask &&
              currentTask["Done"].map((el, index) => (
                <Task
                  key={index}
                  task={el}
                  tasks={currentTask}
                  onSetActiveUser={onSetActiveUser}
                  setTasks={setCurrentTask}
                  listType={"Done"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
