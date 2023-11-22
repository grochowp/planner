import { Button } from '../shared/components/Button';

const apps = [
    {
        id: 0,
        name: 'Tablica Kanban',
        route: '/kanban',
    },
    {
        id: 1,
        name: 'testApp',
        route: '/test',
    },
];

export function SideBar({ activeUser }) {
    return (
        <div className="left-side">
            <div className="search-bar">
                <h4 className="welcome-message">
                    {activeUser ? `Witaj, ${activeUser.name}!` : '...'}
                </h4>
            </div>
            <div className="apps">
                {apps.map(app => (
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
