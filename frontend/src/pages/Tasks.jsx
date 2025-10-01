import { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import {useNavigate} from "react-router-dom";
export default function Tasks() {
  const [tasks,setTasks]=useState([]);
  const navigate=useNavigate();
  const fetchTasks=async()=>{
    try{
      const res=await API.get("/task");
      setTasks(res.data);
    }catch (err){
      console.error(err);
      if(err.response?.status===401){
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };
  useEffect(()=>{
    fetchTasks();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={()=>{
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <TaskForm onTaskAdded={fetchTasks} />
      <div className="grid gap-3 mt-4">
        {tasks.map((t)=>(
          <TaskItem key={t._id} task={t} onChange={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
