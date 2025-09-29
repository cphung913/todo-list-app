let taskList: Array<string> = ["Task 1", "Task 2", "Task 3"];

function TaskList() {
    return (
    <div className="h-full">
       {taskList.map((task, index) => (
        <div key={index} className="p-4 border-b border-gray-300">
            {task}
        </div>
       ))}
    </div>);
}

export function addTask(task: string) {
    taskList.push(task);
    window.location.reload();
}

export default TaskList;