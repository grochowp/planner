import React, { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { taskContext, userContext } from "../../../App";
import { userService } from "../../../Services/userService";
import Button from "../../../shared/components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddUserForm = ({ showAddUser, onHandleAddUser }) => {
  const [activeTask] = useContext(taskContext);
  const [activeUser] = useContext(userContext);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTask) {
          const fetchedUsers = await Promise.all(
            activeTask.usersIDs.map((userID) => userService.findUser(userID))
          );
          setUsersToDisplay(fetchedUsers.map((user) => user.user));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [activeTask]);

  const handleDeleteUser = (userID) => {
    console.log(userID);
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
              <p className="add-task-name">Add a new user</p>
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
              {usersToDisplay.map((user, index) => (
                <div className="selected-task-user">
                  <div key={index}>
                    <p>
                      {user.name} {user.surname}{" "}
                      {user.userID === activeUser.userID ? (
                        <Button
                          styles="delete-user-from-task"
                          onClick={() => handleDeleteUser(user.userID)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </Button>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-new-user">
              <form>
                <input
                  placeholder="Search users..."
                  className="add-new-user-input"
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
