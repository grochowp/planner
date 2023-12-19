import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../../styles/FormAnimation.css";
import Button from "../../../shared/components/Button";
import { TaskService } from "../../../Services/TaskService";
import { userContext } from "../../../App";

export const NewTaskForm = ({ showForm, onHandleShowForm }) => {
  const [activeUser, setActiveUser] = useContext(userContext);

  const [newTask, setNewTask] = useState("");
  const [backlog, setBacklog] = useState("");
  const [todo, setTodo] = useState("");
  const [doing, setDoing] = useState("");
  const [done, setDone] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const userWithNewTask = await TaskService.addMainTask(
        activeUser.userID,
        newTask,
        backlog,
        todo,
        doing,
        done,
        description
      );
      setActiveUser(userWithNewTask.user);

      onHandleShowForm(false);

      setNewTask("");
      setBacklog("");
      setTodo("");
      setDoing("");
      setDone("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CSSTransition in={showForm} timeout={500} classNames="fade" unmountOnExit>
      <div className="add-task-form">
        <CSSTransition
          in={showForm}
          timeout={500}
          classNames="form"
          unmountOnExit
        >
          <div className="form">
            <form>
              <div className="task-card-data add-task-top">
                <p className="add-task-name">Add a new task!</p>
                <p
                  className="add-task-close"
                  onClick={() => onHandleShowForm(false)}
                >
                  x
                </p>
              </div>
              <div className="main-task-container">
                <div className="main-task">
                  <h5>New task</h5>
                  <textarea
                    className="main-task-input"
                    placeholder="New task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                  ></textarea>
                  <div className="main-task-tasks">
                    <div>
                      <h5>Backlog</h5>
                      <textarea
                        placeholder="Backlog..."
                        value={backlog}
                        onChange={(e) => setBacklog(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <h5>To do</h5>
                      <textarea
                        placeholder="To do..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <h5>Doing</h5>
                      <textarea
                        placeholder="Doing..."
                        value={doing}
                        onChange={(e) => setDoing(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <h5>Done</h5>
                      <textarea
                        placeholder="Done..."
                        value={done}
                        onChange={(e) => setDone(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="main-task-description">
                  <h5>Description</h5>
                  <textarea
                    placeholder="Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="add-task-button">
                <Button styles="add-task" onClick={handleAddTask}>
                  ADD TASK
                </Button>
              </div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
