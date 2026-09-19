const {createComment,getAllComments,updateComment,deleteComment}=require("../services/commentService");
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
};
const UpdateComment=async(req,res)=>{
    try{
        const comment=await updateComment(req.params.commentId,req.body.content,req.user);
        res.status(200).json({
            success:true,
            message:"Comment updated successfully",
            date:comment
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            err:err.message
        })
    }
};
const DeleteComment=async(req,res)=>{
    try{
        const comment=await Comment(req.params.commentId,req.user);
        res.status(200).json({
            success:true,
            message:"Comment deleted successfully"
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={CreateComment,GetAllComments,UpdateComment,DeleteComment};