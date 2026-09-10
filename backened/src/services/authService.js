// here we'll write the register/login business logic
const User= require("../models/User");
const {hashPassword,comparePassword}= require("../utils/password");
const {generateToken}= require("../utils/jwt");
const registerUser=async ({name,email,password,department,year,interests,role})=>{
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error("User already exists"); 
    }
    const hashedPassword=await hashPassword(password);
    const user= await User.create(
        {
            name,
            email,
            password:hashedPassword,
            department,
            year,
            interests,
            role
        }
    );
    const token= generateToken(user);
    return {
        user :{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        },
        token
    };
};

const loginUser=async({email,password})=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Invalid email id");
    }

    const isPasswordCorrect = await comparePassword(password,user.password);
    if(!isPasswordCorrect){
        throw new Error("Incorrect password");
    }
    const token=generateToken(user);
    
    return {
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        },token
    };
};
module.exports={registerUser,loginUser};