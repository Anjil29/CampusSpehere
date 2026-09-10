const express= require("express");
const cors=require("cors");

const app=express();
const authRoutes=require("./routes/authRoutes");
// middlewares
app.use(cors());
app.use(express.json());
// parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.json(
        {
            message:"CampusSphere is running"
        }
    );
});
app.use("/api/v1/auth",authRoutes);
module.exports=app;