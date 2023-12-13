import React, { useContext, useState } from "react";
import { Task } from "./Task";
import { userContext } from "../../../App";
import Button from "../../../shared/components/Button";
import { TaskService } from "../../../Services/TaskService";

export const SingleList = ({ taskState, taskIndex }) => {
  const [activeUser, setActiveUser] = useContext(userContext);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (!newTask) return;

    try {
      const userWithNewTask = await TaskService.add(
        newTask,
        taskIndex + 1,
        taskState.name,
        activeUser.userID
      );
      console.log(userWithNewTask);
      setActiveUser(userWithNewTask.user);
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
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
          <i className="gg-math-plus"></i>
        </Button>
      </div>
    </div>
  );
};
