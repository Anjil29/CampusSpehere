const {createComment,getAllComments}=require("../services/commentService");
const CreateComment=async(req,res)=>{
    try{
        const comment= await createComment(req.params.postId,req.user,req.body.content);
        res.status(200).json({
            success:true,
            message:"Comment generated successfully",
            comment:comment
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const GetAllComments=async()=>{
    try{
        const comments=await getAllComments(req.params.postId);
        res.status(200).json({
            success:true,
            data:comments
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={CreateComment};