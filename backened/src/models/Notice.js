const mongoose = require("mongoose");
const noticeschema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        priority:{
            type:String,
            enum:["LOW","HIGH","NORMAL","URGENT"],
            default:"NORMAL"
        },
        attachments:{
            type:[String],
            default:[],
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        publishedAt:{
            type:Date,
            default:Date.now(),
        },
        expiresAt:{
            type:Date,
        },
        isPublished:{
            type:Boolean,
            default:true,
        }
    },
    {
        timestamps:true,
    }
);

const Notice = mongoose.model("Notice",noticeschema);
module.exports=Notice;