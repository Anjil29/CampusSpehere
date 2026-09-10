const rolemiddleware = (...allowedRoles)=>{
    return (req,res,next)=>{
       // Agar req.user exist nahi karta hai / available nahi hai, to andar wala code chalao
        if(!req.user){
            return res.status(401).json(
                {
                    success:false,
                    message:"User is not authenticated"
                }
            );
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json(
                {
                    sucess:false,
                    message:"You are not autorized to perform this action"
                }
            );
        }
        if(allowedRoles.includes(req.user.role)){
            next();
        }
        
    };
};

module.exports=rolemiddleware;