const express= require("express");
const router=express.Router();
const {CreateComment}=require("../controllers/commentController");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
router.post("/createComment/:postId",authMiddleware,CreateComment);
module.exports=router;