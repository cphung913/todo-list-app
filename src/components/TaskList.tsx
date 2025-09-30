class Task {
    name: string;
    completed: boolean;
    deleted: boolean;

    constructor(name: string, completed: boolean = false, deleted: boolean = false) {
        this.name = name;
        this.completed = completed;
        this.deleted = deleted;
    }
}

let taskList: Array<Task> = [new Task("Sample Task 1"), new Task("Sample Task 2", true)];

function TaskList() {
    return (
    <div className="h-full">
       {taskList.map((task, index) => (
        <div key={index} data-id={index} className="p-4 border-b border-gray-300 flex items-center h-18">
            <button className={"mx-2 flex justify-center items-center border rounded-full w-6.5 h-6.5 cursor-pointer " + (task.completed ? "bg-green-400 border-green-600" : "bg-gray-100 border-gray-300")} onClick={completeTask}><img src="src/assets/check-solid-full.svg" className={"pointer-events-none h-10/12 " + (task.completed ? "opacity-100" : "opacity-0")}/></button>
            <span className={"ml-4 " + (task.completed ? "line-through italic" : "")}>{task.name}</span>
            <button className="ml-auto mr-7 h-6 w-6"><img src="./src/assets/trash-solid-full.svg" className="h-full cursor-pointer" /></button>
        </div>
       ))}
    </div>);
}

function completeTask(e: any) {
    const index = e.target.parentElement.dataset.id;
    const temp = taskList[index];
    taskList.splice(index, 1);
    temp.completed = !temp.completed;
    temp.completed ? taskList.push(temp) : taskList.unshift(temp);
}

export function addTask(task: string) {
    taskList.push(new Task(task));
    window.location.reload();
}

export default TaskList;