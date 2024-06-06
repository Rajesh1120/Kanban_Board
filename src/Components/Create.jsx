import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast"

function Create({tasks,setTasks}) {

    const [task,setTask]=useState({
        id:"",
        name:"",
        status:"todo"
    })
    
    function handleSubmit(e){
        e.preventDefault();

        if (task.name.length < 3)
            return toast.error("Input must have more than 3 characters")

        if (task.name.length > 100)
            return toast.error("Input must not more than 100")

        setTasks((prevTask)=>{
            const list= [...prevTask,task]
            localStorage.setItem("tasks",JSON.stringify(list))
           
            return list;
        });

        toast .success("Task Created")
        setTask({
            id:"",
            name:"",
            status:"todo"
        })
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <input type="text"  className="border-2 bg-slate-100 border-slate-400 rounded-md mr-4 h-12
        w-64 px-1"
        value={task.name}
        onChange={(e)=> setTask({...task,id:uuidv4(),name:e.target.value})}/>
        <button className='bg-yellow-500 rounded-md px-4 h-12 text-white'>Create</button>
    </form>
  )
}

export default Create