import React, { useContext, useEffect, useState } from "react";
import { TaskService } from "../../../Services/TaskService";
import { taskContext, userContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/userService";

export const Selection = ({
  onHandleShowForm,
  onHandleAddUser,
  setCurrentTaskUsers,
}) => {
  const [activeUser, setActiveUser] = useContext(userContext);
  const [activeTask, setActiveTask] = useContext(taskContext);
  // const [userCounts, setUserCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTask) {
          const results = await userService.findUsersFromTask(
            activeTask.taskID
          );
          setCurrentTaskUsers(results.users);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [activeTask]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (activeUser) {
  //         const promises = activeUser.tasks.map(async (task) => {
  //           const results = await userService.findUsersFromTask(task.taskID);
  //           return results.users.length;
  //         });
  //         const counts = await Promise.all(promises);
  //         console.log(counts);
  //         setUserCounts(counts);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, [activeUser]);

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

  const handleSelectTask = async (task) => {
    try {
      const selectedTask = await TaskService.selectActiveTask(task.taskID);
      setActiveTask(() => selectedTask.tasks);
      navigate("/kanban");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="select-task">
      {activeUser.tasks.map((task, index) => {
        return (
          <div className="task-card" key={index}>
            <div className="task-card-data">
              <p
                onClick={() => {
                  onHandleAddUser(true, task);
                }}
                className="task-card-users"
              >
                {/* <span>{userCounts[index]}</span> */}
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
            <div
              onClick={() => handleSelectTask(task)}
              className={`task-card-info  color-${index % 4}`}
            >
              <h1 className="task-card-name">{task.taskName}</h1>
              <h4 className="task-card-description">{task.description}</h4>
            </div>
          </div>
        );
      })}
      <div className="task-card  select-task-add">
        <button onClick={() => onHandleShowForm(true)}></button>
      </div>
    </div>
  );
};
