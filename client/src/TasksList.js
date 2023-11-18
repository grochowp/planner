import React, { useState, useEffect } from "react";
import { RenderTaskList } from "./renderTasksList";

export const TasksList = ({ activeUser, currentTask, setCurrentTask }) => {
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
        <RenderTaskList
          listType="ToDo"
          tasks={currentTask}
          setTasks={setCurrentTask}
        >
          TO DO
        </RenderTaskList>

        <RenderTaskList
          listType="InProgress"
          tasks={currentTask}
          setTasks={setCurrentTask}
        >
          IN PROGRESS
        </RenderTaskList>

        <RenderTaskList
          listType="Done"
          tasks={currentTask}
          setTasks={setCurrentTask}
        >
          DONE
        </RenderTaskList>
      </div>
    </div>
  );
};
