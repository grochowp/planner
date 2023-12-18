import React, { useContext, useState } from "react";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";
import { SingleList } from "./SingleList";
import Button from "../../../shared/components/Button";

export const TasksList = () => {
  const [activeUser] = useContext(userContext);
  const [newMainTask, setNewMainTask] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);

  const NextTask =
    activeUser.tasks[
      (taskIndex + 1) % activeUser.tasks.length
    ].taskName.toUpperCase();
  const previousTask =
    activeUser.tasks[
      (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    ].taskName.toUpperCase();

  const handleNextTask = () => {
    setTaskIndex(() => (taskIndex + 1) % activeUser.tasks.length);
  };

  const handlePreviousTask = () => {
    setTaskIndex(
      () => (taskIndex + activeUser.tasks.length - 1) % activeUser.tasks.length
    );
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-task-name">
        <div className="previous-next-buttons">
          <Button
            styles="previous-next-task"
            onClick={() => handlePreviousTask()}
          >
            {previousTask}
          </Button>
          <Button styles="previous-next-task" onClick={() => handleNextTask()}>
            {NextTask}
          </Button>
        </div>

        <p>{activeUser.tasks[taskIndex].taskName.toUpperCase()}</p>
        <div className="add-main-task">
          <input
            className="add-main-task-input"
            key={activeUser.userID}
            type="text"
            value={newMainTask}
            onChange={(e) => setNewMainTask(e.target.value)}
            placeholder="Dodaj zadanie..."
          ></input>
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
