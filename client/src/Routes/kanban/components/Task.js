import React, { useContext } from "react";
import Button from "../../../shared/components/Button";
import { TaskState } from "../../../shared/utils";
import { userContext } from "../../../App";
import { TaskService } from "../../../Services/TaskService";

export const Task = ({ task, taskIndex, listType, taskID }) => {
  const [activeUser, setActiveUser] = useContext(userContext);
  const moveTask = async (fromList, toList, task) => {
    try {
      const userAfterMove = await TaskService.move(
        task,
        taskIndex + 1,
        fromList,
        toList,
        activeUser.userID
      );

      setActiveUser(userAfterMove.user);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteTask = async (task) => {
    try {
      const userAfterDelete = await TaskService.delete(
        task,
        listType,
        activeUser.userID,
        taskID
      );
      setActiveUser(userAfterDelete.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tasks-list-task-container">
      <div className="tasks-list-task">
        {task}
        <div className="btn-in-task">
          {listType === TaskState.ToDo.name || (
            <Button
              styles="none"
              onClick={() => {
                if (listType === TaskState.InProgress.name) {
                  moveTask(
                    TaskState.InProgress.name,
                    TaskState.ToDo.name,
                    task
                  );
                } else if (listType === TaskState.Done.name) {
                  moveTask(
                    TaskState.Done.name,
                    TaskState.InProgress.name,
                    task
                  );
                }
              }}
            >
              <i className="gg-push-chevron-left"></i>
            </Button>
          )}
          <Button styles="none">
            <i className="gg-trash" onClick={() => handleDeleteTask(task)}></i>
          </Button>
          {listType === TaskState.Done.name || (
            <Button
              styles="none"
              onClick={() => {
                if (listType === TaskState.ToDo.name) {
                  moveTask(
                    TaskState.ToDo.name,
                    TaskState.InProgress.name,
                    task
                  );
                } else if (listType === TaskState.InProgress.name) {
                  moveTask(
                    TaskState.InProgress.name,
                    TaskState.Done.name,
                    task
                  );
                }
              }}
            >
              <i className="gg-push-chevron-right"></i>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
