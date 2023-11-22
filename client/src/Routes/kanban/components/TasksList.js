import React from "react";
import { Task } from "./Task";
import { TaskState } from "../../../shared/utils";

export const TasksList = ({
  activeUser,
  onSetActiveUser,
  taskIndex,
  onSetTaskIndex,
}) => {
  const NextTask =
    activeUser.tasks[
      (taskIndex + 1) % activeUser.tasks.length
    ].task.toUpperCase();
  const previousTask =
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

  const SingleList = ({taskState}) => {
    return (
      <div className="tasks-list-progress">
        <div className="tasks-list-name">{taskState.text}</div>
        <div className="tasks-list-overflow">
          {activeUser.tasks[taskIndex] &&
            activeUser.tasks[taskIndex][taskState.name].map((el, index) => (
              <Task
                key={index}
                task={el}
                taskIndex={taskIndex}
                activeUser={activeUser}
                onSetActiveUser={onSetActiveUser}
                listType={taskState.name}
              />
            ))}
        </div>
      </div>
    );
  }

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
        <SingleList taskState={TaskState.ToDo}/>
        <SingleList taskState={TaskState.InProgress}/>
        <SingleList taskState={TaskState.Done}/>
      </div>
    </div>
  );
};
