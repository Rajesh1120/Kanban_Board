import React, { useEffect, useState } from 'react'
import Section from './Section';


function ListofTasks({tasks,setTasks}) {
    const [todos,setTodos] = useState([]);
    const [inProgress,setInprogress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(()=>{
        const fTodos= tasks.filter(task => task.status==="todo")
        const fInProgress= tasks.filter(task => task.status==="inprogress")
        const fDone= tasks.filter(task => task.status==="done")


        setTodos(fTodos)
        setInprogress(fInProgress)
        setDone(fDone)
    },[tasks])

    const [statuses,setStatuses]=useState(["todo","inprogress","done"]) 
    console.log(statuses)
    
  return (
    <div className='flex gap-16 '>
       
        {statuses.map((status,index)=>
            <Section key={index} status ={status} tasks={tasks} setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            done={done}
            statuses={statuses}
            setStatuses={setStatuses}/>
        )}
        
    </div>
  )
}

export default ListofTasks;

