const multer= require("multer");
const path=require("path");
//File ko disk par save karne ki configuration banao.
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
// cb          -> Callback fn
// null        → error nahi hai
// "upload/"   → destination
        cb(null,"upload/");
    },
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+"_"+Math.round(Math.random()*1E9)+path.extname(file.originalname);
        cb(null,uniqueName);
        //No error, file ko is naam se save karo.
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=[
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error("Only pdf , jpg , png and word files are allowed"));
    }
};



const upload=multer({
    
    storage:storage,
    limits:{
        fileSize:10*2024*1024
    },
    fileFilter:fileFilter

});
module.exports=upload;
upload.single("file")

// Multer ko bolta hai:
// Ek single file expect karo jiska field name file hai.