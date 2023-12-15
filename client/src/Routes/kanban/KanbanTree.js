import { useState } from "react";

import { TasksList } from "./components/TasksList";
import { User } from "./components/User";

export const KanbanTree = () => {
  const [taskIndex, setTaskIndex] = useState(0);

  return (
    <div className="right-side">
      <User />
      <TasksList taskIndex={taskIndex} onSetTaskIndex={setTaskIndex} />
    </div>
  );
};
