import React, { useContext } from "react";
import { taskContext } from "../../../App";
import Button from "../../../shared/components/Button";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Task } from "./Task";

export const TasksList = () => {
  const [activeTask, setActiveTask] = useContext(taskContext);

  const location = useLocation();
  const { task } = location.state || {};

  const tasksToDisplay = task
    ? [
        {
          name: "Backlog",
          tasks: task.Backlog,
        },
        {
          name: "ToDo",
          tasks: task.ToDo,
        },
        {
          name: "Doing",
          tasks: task.InProgress,
        },
        {
          name: "Done",
          tasks: task.Done,
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
          {task ? task.taskName : "Choose task"}
        </h3>
      </div>
      {activeTask ? (
        <div className="tasks-lists-bottom">
          {tasksToDisplay &&
            tasksToDisplay.map((tasks, index) => (
              <Task tasks={tasks} index={index} />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
