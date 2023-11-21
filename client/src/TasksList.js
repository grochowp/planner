import React from "react";
import { Task } from "./Task";

export const TasksList = ({
  activeUser,
  onSetActiveUser,
  taskIndex,
  onSetTaskIndex,
}) => {
  let NextTask =
    activeUser.tasks[
      (taskIndex + 1) % activeUser.tasks.length
    ].task.toUpperCase();
  let previousTask =
    activeUser.tasks[
      (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    ].task.toUpperCase();

  const handleNextTask = () => {
    onSetTaskIndex(() => (taskIndex + 1) % activeUser.tasks.length);
  };
  const handlePreviousTask = () => {
    onSetTaskIndex(
      () => (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    );
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">
        <div className="tasks-list-task-name">
          {activeUser.tasks.length > 1 ? (
            <button
              className="btn-previous-task"
              onClick={() => handlePreviousTask()}
            >
              {previousTask}
            </button>
          ) : (
            ""
          )}
          {activeUser.tasks[taskIndex].task.toUpperCase()}
          {activeUser.tasks.length > 1 ? (
            <button className="btn-next-task" onClick={() => handleNextTask()}>
              {NextTask}
            </button>
          ) : (
            ""
          )}
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
