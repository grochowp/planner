import { useState } from "react";
import { User } from "./components/User";
import { NewTaskForm } from "./components/NewTaskForm";
import { TaskService } from "../../Services/TaskService";

export const SelectTask = ({ activeUser, setActiveUser }) => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (formState) => {
    setShowForm(formState);
  };

  const handleDeleteTask = async (taskID) => {
    try {
      const userWithDeletedTask = await TaskService.deleteMainTask(
        taskID,
        activeUser.userID
      );
      setActiveUser(userWithDeletedTask.user);
    } catch (err) {
      console.error(err);
    }
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
                  <p
                    onClick={() => handleDeleteTask(task.taskID)}
                    className="task-card-delete-task"
                  >
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
      <NewTaskForm
        showForm={showForm}
        setShowForm={setShowForm}
        onhandleShowForm={handleShowForm}
      />
    </>
  );
};
