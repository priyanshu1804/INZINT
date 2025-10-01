const express=require("express");
const task1=require("../models/task");
const auth=require("../middleware/jwt");
const router=express.Router();
router.post("/",auth,async (req,res)=>{
    try{
        const task=await task1.create({...req.body,owner:req.user.id });
        res.status(201).json(task);
    }catch(err){
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Error creating task" });
    }
});

router.get("/",auth,async(req,res)=>{
  try{
    const tasks=await task1.find({owner:req.user.id });
    res.json(tasks);
  }catch (err){
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.get("/:id",auth,async(req,res)=>{
  try{
    const task=await task1.findOne({_id:req.params.id,owner:req.user.id});
    if(!task){
        return res.status(404).json({ message:"Task not found"});
    }
    res.json(task);
  }catch(err){
    res.status(500).json({ message: "Error fetching task" });
  }
});

router.put("/:id",auth,async(req,res)=>{
  try{
    const task=await task1.findOneAndUpdate(
      {_id:req.params.id,owner:req.user.id},
      req.body,
      {new:true}
    );
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }
    res.json(task);
  }catch(err) {
    console.error("Error updating task:", err);
    res.status(500).json({message:"Error updating task"});
  }
});

router.delete("/:id",auth,async(req,res)=>{
  try{
    const task=await task1.findOneAndDelete({_id: req.params.id,owner: req.user.id});
    if(!task){
        return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message:"Task deleted" });
  }catch(err){
    res.status(500).json({ message: "Error deleting task" });
  }
});
module.exports=router;
