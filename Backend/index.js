const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();
const userRoutes=require("./routes/user");
const taskRoutes=require("./routes/task");
const app=express();
const db=require('./db');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://inzint.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }
  
  next();
});

app.use(express.json());
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on port",process.env.PORT || 3000);
});
