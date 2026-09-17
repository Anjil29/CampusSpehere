const {CreateEvent,getAllEvents,getEventById,updateEvent,deleteEvent,registerForEvent,cancelRegistration,getEventRegistrations,getMyEvents}=require("../services/eventService");
const eventCreate=async(req,res)=>{
    try{
        const result= await CreateEvent({...req.body,organizer:req.user});
        res.status(201).json({
            success:true,
            message:"event created sucessfully"
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
};
const getEvents=async(req,res)=>{
    try{
        const events=await getAllEvents();
        res.status(200).json({
            success:true,
            data:events
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch event data",
            
        })
    }
};

// now controller for getbyid
const EventById=async(req,res)=>{
    try{
        const event= await getEventById(req.params.id);
        res.status(200).json({
            success:true,
            message:"Fetched event successfully",
            data:event
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
const EventUpdate=async(req,res)=>{
    try{
        const event=await updateEvent(req.params.id,req.body,req.user);
        res.status(200).json({
            success:true,
            message:"Event updated successfully",
            data:event,
        })
    }
    catch(err){
        res.status(403).json({
            success:false,
            message:err.message
        })
    }
};
const EventDelete=async(req,res)=>{
    try{
        await deleteEvent(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"Event deleted successfully"
        })
    }
    catch(err){
        res.status(403).json({
            success:false,
            message:err.message
        })
    }
};
const registerInEvent=async(req,res)=>{
    try{
        const registration = await registerForEvent(req.params.id,req.user.id);
        res.status(201).json({
            success:true,
            message:"Registered for event successfully",
            data:registration
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });

    }
};
const registrationCancellation = async(req,res)=>{
    try{
        const registration = await cancelRegistration(req.params.id,req.user.id);
            res.status(200).json({
            success: true,
            message: "Event registration cancelled successfully",
            data: registration,
        });

    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const getRegistrationsForEvent=async(req,res)=>{
    try{
        const registrations =await  getEventRegistrations(req.params.id,req.user);
        res.status(200).json({
            success:true,
            data:registrations
        });
    }
    catch(err){
        res.status(403).json({
            success:false,
            message:err.message
        })
    }
};

const myEvents=async(req,res)=>{
    try{
        const events=await getMyEvents(req.user.id);
        res.status(200).json({
            success:true,
            data:events
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
        
    }
}
module.exports={eventCreate,getEvents,EventById,EventUpdate,EventDelete,registerInEvent,registrationCancellation,getRegistrationsForEvent,myEvents};
