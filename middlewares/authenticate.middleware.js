const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()
const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decoded_token = jwt.verify(token,process.env.SECRETKEY);
        const {userId}= decoded_token

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message:"You are Not Authorized"})
        } 
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message:"You are Not Authorized"})
    }
      
}
module.exports = {authenticate}