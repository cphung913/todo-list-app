import { Task } from "./Task";
import { collection, addDoc } from "firebase/firestore";    
import { db, auth } from "../firebaseConfig";

function AddButton({ setTaskList } : { setTaskList: React.Dispatch<React.SetStateAction<Task[]>> }) {

    const addTask = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert("No user signed in");
            window.location.reload();
            return;
        }

        const input = document.querySelector('.input') as HTMLInputElement;
        const task = input.value.trim();
        if (task.length > 100) {
            alert("Task name cannot exceed 100 characters");
            return;
        }
        if (task !== "") {
            try {
                const docRef = await addDoc(collection(db, "users", user.uid, "todos"), {
                    text: task,
                    completed: false
                });
                console.log("Document written with ID: ", docRef.id);
                const newTask = new Task(docRef.id, task);
                setTaskList(prev => [newTask, ...prev]);
            } catch (e) {
                console.error(e);
            }

            closePopup();
            return;
        }
        alert("Task name cannot be empty");
    }

    const closePopup = () => {
        const screen = document.querySelector('.screen') as HTMLElement;
        const popup = document.querySelector('.popup') as HTMLElement;
        const input = document.querySelector('input') as HTMLInputElement;
        input.value = "";
        popup.classList.remove('scale-100');
        popup.classList.add('scale-0');
        screen.classList.add('opacity-0');
        screen.classList.remove('opacity-50');
        screen.classList.add('pointer-events-none');
        screen.removeEventListener('click', closePopup);
    }

    const viewPopup = () => {
        const screen = document.querySelector('.screen') as HTMLElement;
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.add('scale-100');
        popup.classList.remove('scale-0');
        screen.classList.remove('opacity-0');
        screen.classList.add('opacity-50');
        screen.classList.remove('pointer-events-none');
        screen.addEventListener('click', closePopup);
    }

    return (
        <>
        <button className="bg-blue-500 text-white p-2 rounded fixed right-4 bottom-4 cursor-pointer" onClick={() => viewPopup()}>Add Task</button>
        <div className="screen absolute inset-0 bg-gray-500 opacity-0 pointer-events-none duration-300"></div>
        <div className="popup fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg scale-0 duration-300">
            <h2 className="text-2xl mb-4">Add New Task</h2>
            <input type="text" className="input border border-gray-300 p-2 w-full mb-4" placeholder="Task Name" />
            <div className="flex justify-end">
                <button className="bg-gray-300 text-black p-2 rounded mr-2 cursor-pointer" onClick={() => closePopup()}>Cancel</button>
                <button className="bg-blue-500 text-white p-2 rounded cursor-pointer" onClick={() => addTask()}>Add</button>
            </div>
        </div>
        </>
    );
}


export default AddButton;