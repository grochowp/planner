import React, { useContext } from "react";
import { taskContext } from "../../../App";
import Button from "../../../shared/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Task } from "./Task";

export const TasksList = () => {
  const [activeTask, setActiveTask] = useContext(taskContext);

  const tasksToDisplay = activeTask
    ? [
        {
          text: "Backlog",
          name: "Backlog",
          tasks: activeTask.Backlog,
        },
        {
          text: "To do",
          name: "ToDo",
          tasks: activeTask.ToDo,
        },
        {
          text: "Doing",
          name: "InProgress",
          tasks: activeTask.InProgress,
        },
        {
          text: "Done",
          name: "Done",
          tasks: activeTask.Done,
        },
      ]
    : "";

  return (
    <div className="tasks-list-container">
      <div className="tasks-lists-top">
        <Button
          styles="tasks-list"
          route="/selection"
          onClick={() => setActiveTask("")}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff" }} />
        </Button>
        <h3 className="tasks-list-task-name">
          {activeTask ? activeTask.taskName : "Choose task"}
        </h3>
      </div>
      {activeTask ? (
        <div className="tasks-lists-bottom">
          {tasksToDisplay.map((tasks, index) => (
            <Task
              key={index}
              tasks={tasksToDisplay}
              index={index}
              taskID={activeTask.taskID}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
