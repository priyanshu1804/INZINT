import {useState} from "react";
import API from "../api";
import {useNavigate,Link} from "react-router-dom";
export default function Login(){
  const [form,setForm]=useState({email:"",password:""});
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/"); 
    }catch (err){
      alert(err.response?.data?.message||"Error logging in");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mb-3">
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
