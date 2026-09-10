const {verifyToken}= require("../utils/jwt");
const authMiddleware = (req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).json(
                {
                    success:false,
                    message:"Authentication token required"
                }
            );
        }
        const token = authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : null;
        if(!token)
            return res.status(401).json({
            success:false,
            message:"Invalid authentication format",
        });
        const decoded=verifyToken(token);  // agr is line m error aaya to jwt.very error throe krega or code diret catch pe chla jayega
        
        req.user=decoded;
        next();

    }
    catch(err){
        return res.status(401).json(
            {
                success:false,
                message:"Invalid or expired token"

            }
        );
    }
};

module.exports=authMiddleware;

// req.headers.authorization

// Client request me token bhejega:

// Authorization: Bearer eyJhbGciOi...

// Express me:

// req.headers.authorization

// se ye value milegi.

// Bearer kya hai?

// Standard format:

// Authorization: Bearer <JWT>

// Bearer bas indicate karta hai:

// "Is request ke saath bearer token attached hai."