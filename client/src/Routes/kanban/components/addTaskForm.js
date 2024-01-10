import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { useContext, useState } from "react";
import { taskContext, userContext } from "../../../App";
import { TaskService } from "../../../Services/TaskService";

export const AddTaskForm = ({
  showAddTask,
  setShowAddTask,
  onHandleAddTask,
  taskState,
}) => {
  const [activeTask, setActiveTask] = useContext(taskContext);
  const [activeUser] = useContext(userContext);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      //   setActiveTask("");
      const tasks = await TaskService.add(
        inputValue,
        activeTask.taskID,
        taskState.name,
        activeUser
      );

      setActiveTask(tasks.tasks);
      setInputValue("");
      setShowAddTask(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CSSTransition
      in={showAddTask}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="form-background">
        <CSSTransition
          in={showAddTask}
          timeout={500}
          classNames="form"
          unmountOnExit
        >
          <div className="add-user-form">
            <div className="task-card-data add-task-top">
              <p className="add-task-name">
                {activeTask?.taskName} - {taskState.text}
              </p>
              <p
                className="add-task-close"
                onClick={() => {
                  onHandleAddTask(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </p>
            </div>

            <div className="add-new-user">
              <form onSubmit={handleAddTask}>
                <input
                  placeholder="Add task..."
                  className="add-new-task-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                ></input>
                {/* <Button styles="add-user">---x</Button> */}
              </form>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
