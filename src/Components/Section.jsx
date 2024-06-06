import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const Section = ({ status, tasks, setTasks,statuses, setStatuses,inProgress, done, todos }) => {
  let text = "todo";
  let bg = "bg-red-500";
  let tasksToMap = todos;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  } 
  else if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task Status changed", { icon: "👏" });
      return mTasks;
    });
  };
  
  return (
    <div
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
      ref={drop}
    >

      <Header text={text} bg={bg} statuses={statuses} setStatuses={setStatuses} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
        ))}
    </div>
  );
};

export default Section;

const Header = ({ text, bg, statuses, setStatuses, count }) => {
  const [isEdit, setIsEdit] = useState(false);
const [editTask,setEditTask]=useState("")

  function handleEdit(text) {
    
    setIsEdit(true);
  }
  function handleSave(text){
    
    statuses.map((s,index)=>{
        
        if (s===text){
            const deleted_s=statuses.filter(f=>f!==text)
            setStatuses([
                statuses[index]=editTask,
                ...deleted_s
            ])
            setIsEdit(false)
        }
       
    })
   
    

  }

  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm
        text-white`}
    >
      {isEdit ? <input value={editTask} onChange={(e)=>setEditTask(e.target.value)} className="border-2 text-black bg-black-100 border-slate-400 rounded-md mr-1 h-10
        w-40 px-1" autoFocus type="text" /> : text + " "}

      <div
        className="ml-2 bg-white w-5 h-5 text-black rounded-full flex
            items-center justify-center"
      >
        {count}
      </div>

      <div className="p-2">
        {!isEdit ? (
          <button onClick={() => handleEdit(text)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        ) : (
          <button onClick={()=>handleSave(text)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
const Task = ({ task, tasks, setTasks }) => {
  // this drag is taken from ReactDnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function handleRemove(id) {
    const afterRemoveTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(afterRemoveTask));
    setTasks(afterRemoveTask);
    toast("Task removed", { icon: "👽" }); // this icon taken from getemoji.com
  }

  return (
    <div
      ref={drag}
      className={`relative ${
        isDragging ? "opacity-25" : "opacity-100"
      } p-4 mt-8 shadow-md rounded-md cursor-grab`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
