import AddButton from "./components/AddButton";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
    <div>
      <h1 className="text-5xl p-6 pb-8 bg-gray-200">To-Do</h1>
    </div>
    <TaskList />
    <AddButton />
    </>
  );
}

export default App;
