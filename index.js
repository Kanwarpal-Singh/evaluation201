const express = require("express");
const {connection} = require("./config/db")
const dotenv = require("dotenv")
dotenv.config()

const userRouter = require("./routes/userRoutes")

const app = express();

app.use(express.json());
app.use("/users",userRouter)

app.get("/",(req,res,next)=>{
    console.log("home page")
})
const port = process.env.PORT
app.listen(port,async()=>{
    try {
        await connection
        console.log("Connected to the Database")
    } catch (error) {
        console.log(error, "error while connection to the db")
    }
    console.log(`server is running at PORT ${port}`)
})