import { useState } from "react";
import AddButton from "./components/AddButton";
import TaskList from "./components/TaskList";
import { Task } from "./components/Task";

function App() {
  const [taskList, setTaskList] = useState([
        new Task("Sample Task 1"),
        new Task("Sample Task 2", true)
    ]);
  
  return (
    <>
    <div>
      <h1 className="text-5xl p-6 pb-8 bg-gray-200">To-Do</h1>
    </div>
    <TaskList taskList={taskList} setTaskList={setTaskList}/>
    <AddButton setTaskList={setTaskList}/>
    </>
  );
}

export default App;
