const mongoose = require("mongoose");
const clubmembershipSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        club:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Club,
            required:true,
        },
        role:{
            type:String,
            enum:["MEMBER","ADMIN"],
            default:"MEMBER"
        },
        status:{
            type:Boolean,
            default:true,
        },
        joinedAt:{
            type:Date,
        }
    }
    ,
    {
        timestamps:true
    }
);


const ClubMembership=mongoose.model("ClubMembership",clubmembershipSchema);
module.exports=ClubMembership;