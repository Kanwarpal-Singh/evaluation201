const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const connnection = mongoose.connect(process.env.MONGODB_URI)
module.exports = {connnection}