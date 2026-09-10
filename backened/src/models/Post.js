const mongoose = require("mongoose");
const postschema=new mongoose.Schema(
    {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        attachments:{
            type:[String],
            default:[],
        },
        club:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Club",
        },
        likesCount:{
            type:Number,
            default:0,
        }
        ,commentCount:{
            type:Number,
            default:0,
        }
    },
    {
        timestamps:true,
    }
);
const Post=mongoose.model("Post",postschema);
module.exports=Post;