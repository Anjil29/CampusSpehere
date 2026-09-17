const express= require("express");
const router=express.Router();
const {eventCreate,getEvents,EventById,EventUpdate,EventDelete,registerInEvent,registrationCancellation,getRegistrationsForEvent,myEvents}= require("../controllers/eventController");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
const {validateCreateEvent,validateUpdateEvent}= require("../validators/eventValidators")
router.post("/createEvent",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),validateCreateEvent,eventCreate);
router.get("/getAllEvents",authMiddleware,getEvents);
router.get("/getEvent/:id",authMiddleware,EventById);
router.put("/updateEvent/:id",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),validateUpdateEvent,EventUpdate);
router.delete("/deleteEvent",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),EventDelete);
router.post( "/:id/register",authMiddleware,registerInEvent);
router.delete("/deleteRegistration/:id",authMiddleware,registrationCancellation);
router.get("/getRegitrations/:id",authMiddleware,roleMiddleware("ADMIN","CLUB_ADMIN"),getRegistrationsForEvent);
router.get("/myEvents",authMiddleware,myEvents);
module.exports=router;