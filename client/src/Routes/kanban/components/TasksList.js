import React, { useContext, useState } from "react";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";
import { SingleList } from "./SingleList";
import Button from "../../../shared/components/Button";
import { TaskService } from "../../../Services/TaskService";

export const TasksList = ({ taskIndex, onSetTaskIndex }) => {
  const [activeUser, setActiveUser] = useContext(userContext);
  const [newMainTask, setNewMainTask] = useState("");

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

  const handleAddMainTask = async () => {
    if (!newMainTask) return;
    try {
      const userAfterDelete = await TaskService.addMainTask(
        newMainTask,
        activeUser.userID
      );
      setActiveUser(userAfterDelete.user);
      setNewMainTask("");
    } catch (err) {
      console.error(err);
    }
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
          <Button onClick={handleAddMainTask} styles="main-task-add">
            <i className="gg-math-plus"></i>
          </Button>
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
