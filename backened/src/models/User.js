const mongoose = require("mongoose");
const userSchema=new mongoose.Schema(
{
    name:{
       type:String,
       required:true,
       trim:true,

    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true,
    },
    password:{
       type:String,
       required:true,
       minLength:6
    },
    role:{
        type:String,
        enum:["STUDENT","CLUB_ADMIN","ADMIN"],
        default:"STUDENT"
    },
    avatar:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
        trim:true,
    },
    department:{
        type:String,
        default:"",
    },
    year:{
       type:Number,

    },
    interests:{
       type:[String],
       default:[],
    },
    isActive:{
      type:Boolean,
      default:true,
    },
},
{
    timestamps:true
}
)
const User=mongoose.model("User",userSchema);
module.exports=User;