import React, { useContext } from "react";
import Button from "../../../shared/components/Button";
import { taskContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { TaskService } from "../../../Services/TaskService";

export const Task = ({
  tasks,
  index,
  taskID,
  setShowAddTask,
  setTaskState,
}) => {
  const [, setActiveTask] = useContext(taskContext);

  const handleDeleteTask = async (task) => {
    try {
      const tasksAfterDelete = await TaskService.delete(
        task,
        tasks[index].name,
        taskID
      );

      setActiveTask(tasksAfterDelete.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveTask = async (task, direction) => {
    try {
      const taskIndex =
        direction === "left" && index > 0
          ? index - 1
          : direction === "right" && index < 3
          ? index + 1
          : "";
      const tasksAfterMove = await TaskService.move(
        task,
        tasks[index].name,
        tasks[taskIndex].name,
        taskID
      );

      setActiveTask(tasksAfterMove.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = (task) => {
    setTaskState({ name: task.name, text: task.text });
    setShowAddTask(true);
  };

  return (
    <div className="single-task">
      <div className="single-task-header">
        <div className="single-task-info">
          <h3>{tasks[index].text}</h3>
          <Button
            styles="add-single-task"
            onClick={() => handleAddTask(tasks[index])}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      {tasks[index].tasks.map((task) => (
        <div className={`task color-${index}`}>
          <div className="task-left">{task}</div>
          <div className="task-right">
            <div>
              <Button
                styles="delete-single-task"
                onClick={() => handleDeleteTask(task)}
              >
                x
              </Button>
            </div>
            <div className="task-right-move">
              <Button
                styles={`move-task ${index === 0 ? "hidden" : ""}`}
                onClick={() => handleMoveTask(task, "left")}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
              <Button
                styles={`move-task ${index === 3 ? "hidden" : ""}`}
                onClick={() => handleMoveTask(task, "right")}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
