import { useState } from "react";

import { TasksList } from "./components/TasksList";
import { User } from "./components/User";

export const KanbanTree = () => {
  return (
    <div className="right-side">
      <User />
      <TasksList />
    </div>
  );
};
