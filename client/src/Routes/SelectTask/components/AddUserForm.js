import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { taskContext, userContext } from "../../../App";
import Button from "../../../shared/components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskService } from "../../../Services/TaskService";
import { userService } from "../../../Services/userService";
import UserSearch from "./UserSearch";

export const AddUserForm = ({
  showAddUser,
  onHandleAddUser,
  currentTaskUsers,
  setCurrentTaskUsers,
}) => {
  const [activeTask] = useContext(taskContext);
  const [activeUser, setActiveUser] = useContext(userContext);

  const handleDeleteUser = async (userID) => {
    try {
      const results = await TaskService.deleteUserFromTask(
        userID,
        activeTask.taskID
      );
      if (userID === activeUser.userID) handleRerenderUser();

      setCurrentTaskUsers(results.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRerenderUser = async () => {
    try {
      const user = await userService.setUserWithTasks(activeUser.userID);

      setActiveUser(user.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CSSTransition
      in={showAddUser}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="form-background">
        <CSSTransition
          in={showAddUser}
          timeout={500}
          classNames="form"
          unmountOnExit
        >
          <div className="add-user-form">
            <div className="task-card-data add-task-top">
              <p className="add-task-name">Users - {activeTask?.taskName}</p>
              <p
                className="add-task-close"
                onClick={() => {
                  onHandleAddUser(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </p>
            </div>
            <div className="main-task-container selected-task-all-users">
              {currentTaskUsers.map((user, index) => (
                <div key={index} className="selected-task-user">
                  <div>
                    <p>
                      {user.Name} {user.Surname}
                      <Button
                        styles="delete-user-from-task"
                        onClick={() => handleDeleteUser(user.UserID)}
                      >
                        {currentTaskUsers.length > 1 &&
                        (activeUser.tasks.length > 1 ||
                          user.UserID !== activeUser.userID) ? (
                          <FontAwesomeIcon icon={faXmark} />
                        ) : (
                          ""
                        )}
                      </Button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <UserSearch
              currentTaskUsers={currentTaskUsers}
              setCurrentTaskUsers={setCurrentTaskUsers}
            />
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
