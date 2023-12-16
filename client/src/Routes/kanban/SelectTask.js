import { useState } from "react";
import { User } from "./components/User";
import { CSSTransition } from "react-transition-group";
import "../../styles/FormAnimation.css";
import Button from "../../shared/components/Button";

export const SelectTask = ({ activeUser }) => {
  const [showForm, setShowForm] = useState(false);
  const handleAddMainTask = () => {
    console.log(1);
  };

  const handleShowForm = (formState) => {
    setShowForm(formState);
  };

  return (
    <>
      <div className="right-side">
        <User />
        <div className="select-task">
          {activeUser.tasks.map((task, index) => {
            return (
              <div className="task-card" key={index}>
                <div className="task-card-data">
                  <p className="task-card-users">
                    <span>{task.usersIDs.length}</span>
                    <i className="gg-user"></i>
                    <i className="gg-math-plus"></i>
                  </p>
                  <p className="task-card-delete-task">
                    <i className="gg-trash"></i>
                  </p>
                </div>
                <div className={`task-card-info  color-${index % 4}`}>
                  <h1 className="task-card-name">{task.taskName}</h1>
                  <h4 className="task-card-description">
                    School homework including some projectsdsdasasd as as sdads
                    as assa as d asda sa sasas sa asas
                  </h4>
                </div>
              </div>
            );
          })}
          <div className="task-card  select-task-add">
            <button onClick={() => handleShowForm(true)}></button>
          </div>
        </div>
      </div>

      <CSSTransition
        in={showForm}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="add-task-form">
          <div className="form">
            <form>
              <div className="task-card-data add-task-top">
                <p className="add-task-name">Add a new task!</p>
                <p
                  className="add-task-close"
                  onClick={() => handleShowForm(false)}
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
                  ></textarea>
                  <div className="main-task-tasks">
                    <div>
                      <h5>Backlog</h5>
                      <textarea placeholder="Backlog..."></textarea>
                    </div>
                    <div>
                      <h5>To do</h5>
                      <textarea placeholder="To do..."></textarea>
                    </div>
                    <div>
                      <h5>Doing</h5>
                      <textarea placeholder="Doing..."></textarea>
                    </div>
                    <div>
                      <h5>Done</h5>
                      <textarea placeholder="Done..."></textarea>
                    </div>
                  </div>
                </div>
                <div className="main-task-description">
                  <h5>Description</h5>
                  <textarea placeholder="Description..."></textarea>
                </div>
              </div>
              <div className="add-task-button">
                <Button styles="add-task">ADD TASK</Button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
