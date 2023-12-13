import React, { useContext } from "react";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";
import { SingleList } from "./SingleList";

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

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">
        <div className="tasks-list-task-name">
          <button
            className="btn-previous-task"
            onClick={() => handlePreviousTask()}
          >
            {previousTask}
          </button>
          <p>{activeUser.tasks[taskIndex].taskName.toUpperCase()}</p>

          <button className="btn-next-task" onClick={() => handleNextTask()}>
            {NextTask}
          </button>
        </div>
      </div>

      <div className="tasks-list-tasks">
        <SingleList taskState={TaskState.ToDo} taskIndex={taskIndex} />
        <SingleList taskState={TaskState.InProgress} taskIndex={taskIndex} />
        <SingleList taskState={TaskState.Done} taskIndex={taskIndex} />
      </div>
    </div>
  );
};
