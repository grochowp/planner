import { Task } from "./Task";

export const RenderTaskList = ({ listType, tasks, setTasks, children }) => {
  return (
    <div className="tasks-list-progress">
      <div className="tasks-list-name">{children}</div>
      <div className="tasks-list-overflow">
        {tasks &&
          tasks[listType].map((el, index) => (
            <Task
              key={index}
              task={el}
              tasks={tasks}
              setTasks={setTasks}
              listType={listType}
            />
          ))}
      </div>
    </div>
  );
};
