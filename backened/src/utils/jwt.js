const jwt = require("jsonwebtoken");

const  generateToken= (user)=>{
    // payload
    // secret
    // options
    return jwt.sign(
        {
            id:user._id,
            role:user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
};
const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
};
module.exports={generateToken,verifyToken};


// {
//     id: "68abc123...",
//     role: "STUDENT",
//     iat: 1757...,
//     exp: 1757...
// }
// iat aur exp bhi hote hain

// Ye JWT library automatically add karti hai:

// iat → token kab issue hua
// exp → token kab expire hoga

// So technically:

// req.user
// ├── id      ← tumne dala
// ├── role    ← tumne dala
// ├── iat     ← JWT automatically
// └── exp     ← JWT automatically