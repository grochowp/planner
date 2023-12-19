import React, { useContext } from "react";
import { userContext } from "../../../App";
import Button from "../../../shared/components/Button";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const TasksList = () => {
  const [activeUser] = useContext(userContext);

  const location = useLocation();
  const { task } = location.state || {};

  return (
    <div className="tasks-list-container">
      <div className="tasks-lists-top">
        <Button styles="tasks-list" route="/selection">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff" }} />
        </Button>
        <h3 className="tasks-list-task-name">
          {task ? task.taskName : "Choose task"}
        </h3>
      </div>
      <div className="tasks-lists-bottom"></div>
    </div>
  );
};
