import React, { useContext } from "react";
import { Task } from "./Task";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";

export const TasksList = ({ taskIndex, onSetTaskIndex }) => {
  const [activeUser] = useContext(userContext);

  const NextTask =
    activeUser.tasks[
      (taskIndex + 1) % activeUser.tasks.length
    ].taskName.toUpperCase();
  const previousTask =
    activeUser.tasks[
      (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    ].taskName.toUpperCase();

  const handleNextTask = () => {
    onSetTaskIndex(() => (taskIndex + 1) % activeUser.tasks.length);
  };

  const handlePreviousTask = () => {
    onSetTaskIndex(
      () => (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    );
  };

  const SingleList = ({ taskState }) => {
    return (
      <div className="tasks-list-progress">
        <div className="tasks-list-name">{taskState.text}</div>
        <div className="tasks-list-overflow">
          {activeUser.tasks[taskIndex] &&
            activeUser.tasks[taskIndex][taskState.name].map((task, index) => (
              <Task
                key={index}
                task={task}
                taskIndex={taskIndex}
                listType={taskState.name}
              />
            ))}
        </div>
      </div>
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
          {activeUser.tasks[taskIndex].taskName.toUpperCase()}
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
        <SingleList taskState={TaskState.ToDo} />
        <SingleList taskState={TaskState.InProgress} />
        <SingleList taskState={TaskState.Done} />
      </div>
    </div>
  );
};
