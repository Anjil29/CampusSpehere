const express= require("express");

require("dotenv").config();
const app=require("./src/app");

// db connection
const dbConnect=require("./src/config/db");
dbConnect();

//route
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("server is running successfully on port :",PORT);
})