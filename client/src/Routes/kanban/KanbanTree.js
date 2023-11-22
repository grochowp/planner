import { useState } from 'react';
import { UserCard } from './components/UserCard';
import { TasksList } from './components/TasksList';

export const KanbanTree = ({ activeUser, onSetActiveUser }) => {
    const [taskIndex, setTaskIndex] = useState(0);

    return (
        <div className="kanbanTree">
            <UserCard user={activeUser} tasks={activeUser.tasks[taskIndex]} />
            <TasksList
                activeUser={activeUser}
                onSetActiveUser={onSetActiveUser}
                taskIndex={taskIndex}
                onSetTaskIndex={setTaskIndex}
            />
        </div>
    );
}
