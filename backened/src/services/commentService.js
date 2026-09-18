const Comment=require("../models/Comment");
const Post=require("../models/Post");
const createComment=async(postId,user,content)=>{
    const post=await Post.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    const comment=await Comment.create({
        post:postId,
        user:user.id,
        content:content
    });
    post.commentCount+=1;
    await post.save();
    return comment;
};

// getAllComments in a post 
// hme is postId ke sare commentd btane hai
const getAllComments=async(postId)=>{
    const post=await Post.findById(postId);
    if(!post){
        throw new Error("No such post exits");
    }
    const comments=await Comment.find({
        post:postId
    }).populate("author","name email role avatar")
    // .populate("content")  populate() sirf un fields ke liye hota hai jo kisi dusre MongoDB document/model ko reference karti hain.
    .sort({createdAt:1});
    return comments;
}
module.exports={createComment,getAllComments};