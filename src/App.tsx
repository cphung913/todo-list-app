import { useState } from "react";
import AddButton from "./components/AddButton";
import TaskList from "./components/TaskList";
import { Task } from "./components/Task";
import Auth from "./components/Auth"

function App() {
  const [taskList, setTaskList] = useState([new Task("Sample Task 1"), new Task("Sample Task 2"), new Task("Sample Task 3", true)]);
  
  return (
    <>
    <div>
      <h1 className="text-5xl p-6 pb-8 bg-gray-200">To-Do</h1>
    </div>
    <TaskList taskList={taskList} setTaskList={setTaskList}/>
    <AddButton setTaskList={setTaskList}/>
    <Auth setTaskList={setTaskList}/>
    </>
  );
}

export default App;
