const {registerUser,loginUser}= require("../services/authService");
const User= require("../models/User");
const register = async (req,res)=>{
    try{
        const result= await registerUser(req.body);
        res.status(201).json(
            {
                success:true,
                message:"User registered successfully",
                data:result
            }
        );
    }
    catch(err){
        res.status(400).json(
            {
                success:false,
                message:err.message
            }
        );
    }
};

// now we will add login controller login as well
const login= async(req,res)=>{
    try{
        const result = await loginUser(req.body);
        res.status(200).json(
            {
                success:true,
                message:"Login Successfull",
                data:result,
            }
        );
    }
    catch(err){
        res.status(400).json(
            {
                success:false,
                message:err.message
            }
        )
    }
}
const getMe = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password") //Database me password hash stored hai, lekin API response me password nahi chahiye.password field ko result se hata do.
        if(!user){
            return res.status(404).json(
                {
                    success:true,
                    message:"User not found"
                }
            )
        }
        res.status(200).json({
            success:true,
            data:user
        })
    }
    catch(err){
        res.status(500).json(
            {
                success:false,
                message:"Failed to fetch the data"
            }
        )
    }
}
module.exports={register,login,getMe};