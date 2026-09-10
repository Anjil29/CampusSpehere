const mongoose = require("mongoose");
const eventregistration= new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        event:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event",
            required:true,
        },
        status:{
            type:String,
            enum:["REGISTERED","CANCELLED"],
            default:"REGISTERED"
        },
        registeredAt:{
            type:Date,
            default:Date.now
        }
    },{
        timestamps:true,
    }
);

eventregistration.index(
    {event:1,user:1},
    {unique:true}
)
const EventRegistration=mongoose.model("EventRegistration",eventregistration);
module.exports=EventRegistration;