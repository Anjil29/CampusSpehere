const express= require("express");
const router=express.Router();
const {CreateComment,GetAllComments,UpdateComment,DeleteComment}=require("../controllers/commentController");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
router.post("/createComment/:postId",authMiddleware,CreateComment);
router.get("/getAllComments",authMiddleware,GetAllComments);
router.put("/updateComment",authMiddleware,UpdateComment);
router.delete("/deleteComment",authMiddleware,DeleteComment)
module.exports=router;