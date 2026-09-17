const express= require("express");
const cors=require("cors");

const app=express();
const authRoutes=require("./routes/authRoutes");
const noticeRoutes=require("./routes/noticeRoutes");
const eventRoutes=require("./routes/eventRoutes");
const clubRoutes=require("./routes/clubRoutes");
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
app.use("/api/v1/notice",noticeRoutes);
app.use("/api/v1/event",eventRoutes);
app.use("/api/v1/club",clubRoutes);
module.exports=app;