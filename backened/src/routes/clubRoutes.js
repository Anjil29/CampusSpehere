const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");

const {ClubCreate,getClubs,getClub,ClubJoin,getMembersOfClub,UpdateStatusOfMembers}= require("../controllers/clubController");
const router=express.Router();
router.get("/createClub",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),ClubCreate);
router.get("/getClubs",authMiddleware,getClubs);
router.get("/getClub/:id",authMiddleware,getClub);
router.post("/joinClub/:id",authMiddleware,ClubJoin);
router.get("/getClubMembers/:id",authMiddleware,roleMiddleware("ADMIN", "CLUB_ADMIN"),getMembersOfClub);
router.patch("/updateStatus/:id/:userId",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),UpdateStatusOfMembers);
module.exports=router;