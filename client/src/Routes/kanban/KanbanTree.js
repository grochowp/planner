import { TasksList } from "./components/TasksList";
import { User } from "../../shared/components/User";
import { AddTaskForm } from "./components/addTaskForm";
import { useState } from "react";

export const KanbanTree = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskState, setTaskState] = useState({});
  const handleAddTask = (state) => {
    setShowAddTask(state);
  };

  return (
    <>
      <div className="right-side">
        <User />
        <TasksList
          setShowAddTask={setShowAddTask}
          setTaskState={setTaskState}
        />
      </div>
      <AddTaskForm
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        onHandleAddTask={handleAddTask}
        taskState={taskState}
      />
    </>
  );
};
