import { useEffect, useState } from 'react'
import Create from './Components/Create'
import ListofTasks from './Components/ListofTasks'
import {Toaster} from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
      setTasks(JSON.parse(localStorage.getItem("tasks")))
  },[])


  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster />
    <div className='w-full flex  justify-center py-2 '>
      <h1 className='bg-lime-400 rounded-lg  p-5'>👉🏽  Kanban-Board   👈🏽</h1>
    </div>
      <div className='bg-slate-100 w-screen h-screen flex
       flex-col items-center p-3 pt-12 gap-16 '>
       <Create  tasks={tasks} setTasks={setTasks}/>
       <ListofTasks tasks={tasks} setTasks={setTasks}/>
      </div>
    </DndProvider>
  )
}

export default App
