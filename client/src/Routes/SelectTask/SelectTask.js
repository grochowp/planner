import { useState } from "react";
import { User } from "../../shared/components/User";
import { NewTaskForm } from "./components/NewTaskForm";
import { Selection } from "./components/Selection";

export const SelectTask = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (formState) => {
    setShowForm(formState);
  };

  return (
    <>
      <div className="right-side">
        <User />
        <Selection onHandleShowForm={handleShowForm} />
      </div>
      <NewTaskForm showForm={showForm} onHandleShowForm={handleShowForm} />
    </>
  );
};
