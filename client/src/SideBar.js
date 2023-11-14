import { Button } from "./Button";
import { apps } from "./App";

export function SideBar({ activeUser }) {
  return (
    <div className="left-side">
      <div className="search-bar">
        <h4 className="welcome-message">Witaj, {activeUser.name}!</h4>
      </div>
      <div className="users">
        {apps.map((app) => (
          <Button key={app.id} styles="apps" route={app.route}>
            {app.name}
          </Button>
        ))}
      </div>
      <div className="logo">Tablica Kanban - Patryk Grochowski</div>
    </div>
  );
}

export default SideBar;
