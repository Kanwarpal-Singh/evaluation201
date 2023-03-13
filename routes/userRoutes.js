const express = require("express");
const userRouter = express.Router()
const {User} = require("../models/UserModel")

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {authenticate} =require("../middlewares/authenticate.middleware")



userRouter.post("/signup",async(req,res)=>{
try {
    const {username,email,password} = req.body;
    const userexists = await User.findOne({$or:[{username},{email}]})
    if(userexists){
        return res.status(400).json({message:"User already existes"})
    }else{
        
        const hashed_pass = bcrypt.hash(password,5,async(err,hashed_pass)=>{
            if(err){
                res.send({message:"something went wrong"})
            }else{
                const user = new User({username,email,password:hashed_pass});
                await user.save()
                res.json({message:`Hello Mr. ${user.username}!, Welcome to our Website`})
            }
        })
        
    }
} catch (error) {
    console.log("something went wrong")
    res.send(error)
}
})

userRouter.post("/login",async(req,res)=>{
try {
    const {username,password} = req.body
    const user = await User.findOne({username});
    if(!user){
        return res.status(401).json({message:"Invalid Username or Password"})
    }else{
        const passwordmatch = await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(401).json({message:"Invalid Password or Username"})
        }else{
            const token = jwt.sign({userId:user._id},process.env.SECRETKEY,{
                expiresIn:60
            })
            const refreshtoken = jwt.sign({userId:user._id},process.env.REFRESH_SECRETKEY,{
                expiresIn:300
            })
            res.send({token,refreshtoken})
        }
    }
} catch (error) {
    res.send(error);
}
})


module.exports = userRouter