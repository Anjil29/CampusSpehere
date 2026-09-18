

const {createPost,getAllPosts,getPostById,updatePost,deletePost,likePost,unlikePost} =require("../services/postService");
const CreatePost= async(req,res)=>{
    try{
        const post= await createPost(req.body,req.user);
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });


    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }
};

const GetAllPosts=async(req,res)=>{
    try{
        const posts=await getAllPosts();
        res.status(200).json({
            success:true,
            message:"Posts fetched successfully",
            posts:posts
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const GetPostById=async(req,res)=>{
    try{
        const post = await getPostById(req.params.id);
        res.status(200).json({
            success:true,
            message:"Fetched post successfully",
            post:post
        })

    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const UpdatePost=async(req,res)=>{
    try{
        const post =await updatePost(
            req.params.id,
            req.body,
            req.user
        );
        res.status(200).json({
            success:true,
            message:"Post updated successfully",
            data:post
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};
const DeletePost= async(req,res)=>{
    try{
    const post= await deletePost(req.params.id,req.user);
    res.status(200).json({
        success:true,
        message:"Post deleted successfully",
        post:post
    });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
   
};
const LikePost= async(req,res)=>{
    try{
        const post = await likePost(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"Post liked successfully",
            post:post
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};
const UnlikePost=async(req,res)=>{
    try{
        const post = await unlikePost(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"Post liked successfully",
            post:post
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={CreatePost,GetAllPosts,GetPostById,UpdatePost,DeletePost,LikePost,UnlikePost};