import React, { useState, useEffect, useContext } from "react";
import { userService } from "../../../Services/userService";
import { taskContext } from "../../../App";

const UserSearch = ({ currentTaskUsers, setCurrentTaskUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTask] = useContext(taskContext);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const { users } = await userService.findCertainUsers(searchTerm);
        const filteredResults = users.filter(
          (user) =>
            !currentTaskUsers.some(
              (taskUser) => taskUser.UserID === user.UserID
            )
        );

        setFilteredUsers(filteredResults);
      } catch (error) {
        console.error("Błąd podczas pobierania użytkowników", error);
      }
    };

    if (searchTerm.trim() !== "") {
      searchUsers();
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, currentTaskUsers]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUser = async (userID) => {
    const { users } = await userService.addUserToCurrentUsers(
      userID,
      activeTask.taskID
    );
    setCurrentTaskUsers(users);
    setFilteredUsers([]);
    setSearchTerm("");
  };

  return (
    <div className="add-new-user">
      <div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.UserID} onClick={() => handleAddUser(user.UserID)}>
            {user.Name} {user.Surname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
