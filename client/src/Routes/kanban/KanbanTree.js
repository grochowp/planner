import { useState } from "react";
import { UserCard } from "./components/UserCard";
import { TasksList } from "./components/TasksList";

export const KanbanTree = () => {
  const [taskIndex, setTaskIndex] = useState(0);

  return (
    <div className="kanbanTree">
      <UserCard taskIndex={taskIndex} />
      <TasksList taskIndex={taskIndex} onSetTaskIndex={setTaskIndex} />
    </div>
  );
};
