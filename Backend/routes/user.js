const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
router.post('/register', async (req, res) => {
    const{name,email,password}=req.body; 
    const userExists=await User.findOne({email:email});
    if (userExists) {
        return res.status(400).send('User already exists');
    }       
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
        name,
        email,
        password:hashedPassword
    });
    await user.save();
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET);
    res.status(201).json({token,user:{id:user._id,name,email}});
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(400).send('Invalid email or password');
    }       
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).send('Invalid email or password');
    }
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET);
    res.json({token,user:{id:user._id,name:user.name,email } });
});
module.exports=router;