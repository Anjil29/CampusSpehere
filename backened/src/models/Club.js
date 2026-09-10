const mongoose = require("mongoose");
const clubSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
        },
        logo:{
            type:String,
            default:""
        },
        category:{
            type:String,
            required:true,
            trim:true,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        isActive:{
            type:Boolean,
            default:true
        },
    }
    ,{
        timestamps:true
    }
)
const Club=mongoose.model("Club",clubSchema);
module.exports=Club;