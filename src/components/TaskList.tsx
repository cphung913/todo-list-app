let taskList: [string, string, string] = ["Task 1", "Task 2", "Task 3"];

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

export default TaskList;