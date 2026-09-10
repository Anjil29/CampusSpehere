const mongoose =require("mongoose");
require("dotenv").config();
const dbconnect=()=>{
    mongoose.connect(process.env.MongoDB_URL)
    .then(()=>{
        console.log("db connected successfully");
    })
    .catch((err)=>{
        console.log("db connection failed",err);
    })
}
module.exports=dbconnect;