import React, { useContext, useState } from "react";
import { Task } from "./Task";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";
import Button from "../../../shared/components/Button";

export const TasksList = ({ taskIndex, onSetTaskIndex }) => {
  const [activeUser] = useContext(userContext);
  const [newTask, setNewTask] = useState("");

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

  const handleAddTask = () => {};

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
        <div className="add-task">
          <input
            className="add-task-input"
            key={taskState.name}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Dodaj zadanie..."
          ></input>
          <Button onClick={handleAddTask} styles="task-list">
            aaa
          </Button>
        </div>
      </div>
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
        <SingleList taskState={TaskState.ToDo} />
        <SingleList taskState={TaskState.InProgress} />
        <SingleList taskState={TaskState.Done} />
      </div>
    </div>
  );
};
