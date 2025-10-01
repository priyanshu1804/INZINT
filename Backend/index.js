const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();
const userRoutes=require("./routes/user");
const taskRoutes=require("./routes/task");
const app=express();
const db=require('./db');
// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"], 
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(cors());
db();
app.use(express.json());
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on port",process.env.PORT || 3000);
});
