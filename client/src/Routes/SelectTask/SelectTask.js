import { useContext, useState } from "react";
import { User } from "../../shared/components/User";
import { NewTaskForm } from "./components/NewTaskForm";
import { Selection } from "./components/Selection";
import { AddUserForm } from "./components/AddUserForm";
import { taskContext } from "../../App";

export const SelectTask = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentTaskUsers, setCurrentTaskUsers] = useState([]);

  const [, setActiveTask] = useContext(taskContext);

  const handleShowForm = (formState) => {
    setShowForm(formState);
  };

  const handleAddUser = (formstate, task) => {
    setShowAddUser(formstate);

    task && setActiveTask(task);
  };

  return (
    <>
      <div className="right-side">
        <User />
        <Selection
          onHandleShowForm={handleShowForm}
          onHandleAddUser={handleAddUser}
          currentTaskUsers={currentTaskUsers}
          setCurrentTaskUsers={setCurrentTaskUsers}
        />
      </div>
      <NewTaskForm showForm={showForm} onHandleShowForm={handleShowForm} />
      <AddUserForm
        showAddUser={showAddUser}
        onHandleAddUser={handleAddUser}
        currentTaskUsers={currentTaskUsers}
        setCurrentTaskUsers={setCurrentTaskUsers}
      />
    </>
  );
};
