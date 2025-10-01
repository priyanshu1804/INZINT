import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
export default function Register(){
  const [form,setForm]=useState({name:"",email:"",password:"" });
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await API.post("/user/register",form);
      localStorage.setItem("token",res.data.token);
      navigate("/");
    } catch(err){
      alert(err.response?.data?.message||"Error registering");
    }
  };
  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          className="w-full p-2 border rounded mb-3"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
