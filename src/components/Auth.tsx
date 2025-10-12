import 'firebaseui/dist/firebaseui.css'
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { Task } from './Task';

function Auth({ setTaskList } : { setTaskList: React.Dispatch<React.SetStateAction<any[]>> }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const authContainer = document.getElementById('auth-container') as HTMLElement;
        const screen = document.querySelector('.auth-screen') as HTMLElement;
        authContainer.classList.remove('scale-100');
        authContainer.classList.add('scale-0');
        screen.classList.add('opacity-0');
        screen.classList.remove('opacity-30');
        screen.classList.add('pointer-events-none');

        setTaskList([]);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; 
        console.log(user);
        const authContainer = document.getElementById('auth-container') as HTMLElement;
        const screen = document.querySelector('.auth-screen') as HTMLElement;
        authContainer.classList.remove('scale-100');
        authContainer.classList.add('scale-0');
        screen.classList.add('opacity-0');
        screen.classList.remove('opacity-30');
        screen.classList.add('pointer-events-none');

        fetchData();
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const getData = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user signed in");
      window.location.reload();
      return;
    }
    const data: any[] = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "todos"));
    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });
    return data;
  }

  const fetchData = async () => {
      const rawData = await getData();
      if (!rawData) {
        setTaskList([]);
        return;
      }
      const tasks = rawData.map(item => new Task(item.id, item.text, item.completed));
      setTaskList(tasks);
  }

  return (<>
    <div id="auth-container" className='z-10 w-xl h-60 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg scale-100 duration-300 flex flex-col gap-4'>
      <h1 className='mb-2'>Sign Up / Sign In</h1>
      <input type="email" placeholder='email' value={email} className='border-b-1 focus:outline-0' onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder='password' value={password} className='border-b-1 focus:outline-0' onChange={(e) => setPassword(e.target.value)}/>
      <div className='mt-auto'>
        <button className='bg-blue-500 rounded p-2 cursor-pointer text-white text-xs' onClick={signUp}>Sign Up</button>
        <button className='bg-blue-500 rounded p-2 cursor-pointer text-white text-xs ml-4' onClick={signIn}>Sign In</button>
      </div>
    </div>
    <div className="auth-screen absolute inset-0 bg-gray-500 opacity-30 pointer-events-all duration-300">
    </div>
  </>);
}

export default Auth;
