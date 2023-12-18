import { TasksList } from "./components/TasksList";
import { User } from "../../shared/components/User";

export const KanbanTree = () => {
  return (
    <div className="right-side">
      <User />
      <TasksList />
    </div>
  );
};
