const Post= require("../models/Post");
const PostLike=require("../models/PostLike");
const createPost=async(postData,user)=>{
    const post = await Post.create({
        content:postData.content,
        attachments:postData.attachments||[],
        club:postData.club||null,
        author:user.id
    });
    return post;
};

const getAllPosts=async()=>{
    const posts=await Post.find()
    .populate("author","name email role avatar")
    .populate("club","name category")
    .sort({createdAt:-1});
    return posts;
};

const getPostById=async(id)=>{
    const post= await Post.findById(id)
    .populate("author","name email role avatar")
    .populate("club","name category");

    if(!post){
        throw new Error("Post not found");
    }
    return post;
};

const updatePost= async(postId,updateData,user)=>{
    const post= await Post.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    if(user.role!=="ADMIN"){
        if(post.author.toString()!==user.id){
            throw new Error("You are not authorized to update this post");
        }
    }
    const allowedfields=[
        "content",
        "attachments",
        "club"
    ]
    allowedfields.forEach((field)=>{
        if(updateData[field]!==undefined){
            post[field]=updateData[field];
        }
    });
    await post.save();
    return post;
};

const deletePost= async(postId,user)=>{
    const post = await Post.findById(postId);
    if(!post){
        throw new Error("No such post exits");
    }
    if(user.role!=="ADMIN"){
        if(post.author.toString()!==user.id){
            throw new Error("You are not authorized to delete this post");
        }
    }
    await post.deleteOne();
// deleteOne() ke baad post variable kya hota hai?
// Database se document delete hota hai, JavaScript ka post object nahi.
    return post;
};

const likePost=async(postId,user)=>{
    const post= await Post.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    const exisitingLike= await PostLike.findOne({
        post:postId,
        user:user.id
    });
    if(exisitingLike){
        throw new Error("You have already liked this post");
    }
    await PostLike.create({
        post:postId,
        user:user.id,
    });
    post.likesCount+=1;
    await post.save();
    return post;
};

const unlikePost= async(postId,user)=>{
    const post= await Post.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    const exisitingLike= await PostLike.findOne({
        post:postId,
        user:user.id
    });
    if(!exisitingLike){
        throw new Error("You have not liked this post");
    }
    // await PostLike.deleteOne({
    //     post:postId,
    //     user:user.id,
    // });
    await exisitingLike.deleteOne();
    post.likesCount-=1;
    await post.save();
    return post;
}
module.exports={createPost,getAllPosts,getPostById,updatePost,deletePost,likePost,unlikePost};