import { Task } from "./Task";
import check from "../assets/check-solid-full.svg";
import trash from "../assets/trash-solid-full.svg";

function TaskList({ taskList, setTaskList } : { taskList: Task[], setTaskList: React.Dispatch<React.SetStateAction<Task[]>> }) {

    const completeTask = (index: number) => {
        setTaskList(prevTasks => {
            const newTasks = [...prevTasks];
            const [task] = newTasks.splice(index, 1);

            task.completed = !task.completed;
            task.completed ? newTasks.push(task) : newTasks.unshift(task);

            return newTasks;
        });
    }

    const deleteTask = (index: number) => {
        setTaskList(prev => prev.filter((_, i) => i !== index));
    }

    return (
    <div className="h-full">
       {taskList.map((task, index) => (
        <div key={index} data-id={index} className="p-4 border-b border-gray-300 flex items-center h-18">
            <button className={"mx-2 flex justify-center items-center border rounded-full w-6.5 h-6.5 cursor-pointer " + (task.completed ? "bg-green-400 border-green-600" : "bg-gray-100 border-gray-300")} onClick={() => completeTask(index)}><img src={check} className={"pointer-events-none h-10/12 " + (task.completed ? "opacity-100" : "opacity-0")}/></button>
            <span className={"ml-4 " + (task.completed ? "line-through italic" : "")}>{task.name}</span>
            <button className="ml-auto mr-7 h-6 w-6 cursor-pointer" onClick={() => deleteTask(index)}><img src={trash} className="h-full cursor-pointer pointer-events-none" /></button>
        </div>
       ))}
    </div>);
}

export default TaskList;