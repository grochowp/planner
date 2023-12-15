import { User } from "./components/User";

export const SelectTask = ({ activeUser }) => {
  console.log(activeUser);
  return (
    <div className="right-side">
      <User />
      <div className="select-task">
        {activeUser.tasks.map((task, index) => {
          return (
            <div className="task-card">
              <div className="task-card-data">
                <p className="task-card-users">
                  <span>{task.usersIDs.length}</span>
                  <i class="gg-user"></i>
                  <span>+</span>
                </p>
                <p className="task-card-delete-task">
                  <i class="gg-trash"></i>
                </p>
              </div>
              <div className={`task-card-info  color-${index % 4}`}>
                <h1 className="task-card-name">{task.taskName}</h1>
                <h4 className="task-card-description">
                  School homework including some projects
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
