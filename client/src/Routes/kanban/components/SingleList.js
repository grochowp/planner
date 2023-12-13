import React, { useContext, useState } from "react";
import { Task } from "./Task";
import { userContext } from "../../../App";
import Button from "../../../shared/components/Button";

export const SingleList = ({ taskState, taskIndex }) => {
  const [activeUser] = useContext(userContext);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask) return;

    // Logika w backendzie

    setNewTask("");
  };

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
