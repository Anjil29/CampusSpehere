const Event= require("../models/Event");
const ClubMembership=require("../models/ClubMembership");
const EventRegistration=require("../models/EventRegistration");
const CreateEvent=async(eventData,user)=>{
    // hmne middleware to lgadiya ki bs admin or club_admin hi access kr ske but but club admin bs apne hi club ka kr paye uske liye explicitly handle krna padega
    if(user.role=="ADMIN"){
        const event=await Event.create({...eventData,organizer:user.id});
        return event;
    }
    if(!eventData.club){
        throw new Error("Club is required for club admin");
    }
    const membership=await ClubMembership.findOne({
        user:user.id,
        club:eventData.club,
        role:"ADMIN",
        status:"ACTIVE"
    });

    if(!membership){
        throw new Error("You are not an admin of the club");

    }
    const event=await Event.create({...eventData,organizer:user.id});
    return event;
   
};
// get All event service that is accessible to all
const getAllEvents=async()=>{
    const events=await Event.find()
    .populate("organizer","name email role")
    .populate("club","name category")
    .sort({createdAt:-1})//Agar newest event pehle chahiye,for oldest first use 1 only
    return events;
    
}
const getEventById=async(id)=>{
    const event=await Event.findById(id)
    .populate("organizer","name email role")
    .populate("club","name description category")

    if(!event){
        throw new Error("event not found");
    }
    return event;
};
const updateEvent=async(id,updateData,user)=>{
    const event = await Event.findById(id);
    if(!event){
        throw new Error("event not found");
    }
    // admin can update any event
    if(user.role==="ADMIN"){
        // const event=await Event.findByIdAndUpdate()
        Object.assign(event,updateData);
        await event.save();
        return event;

    }
    const membership=await ClubMembership.findOne({
        user:user.id,
        club:event.club,
        role:"ADMIN",
        status:"ACTIVE"
    });

    if(!membership){
        throw new Error("Your are not admin of this club")
    }
    Object.assign(event,updateData);
    await event.save();
    return event;
}
const deleteEvent=async(id,user)=>{
    const event=await Event.findById(id);
    if(!event){
        throw new Error("Event not found");

    }
    if(user.role==="ADMIN"){
        await event.deleteOne();
        return;
    }
    const membership= await ClubMembership.findOne({
        user:user.id,
        club:event.club,
        role:"ADMIN",
        status:"ACTIVE"

    });
    if(!membership){
        throw new Error("You are not an admin of this club");
    }
    await event.deleteOne();
    return;
};
const registerForEvent=async(eventId,userId)=>{
    const event = await Event.findById(eventId);
    if(!event){
        throw new Error("Error not found");
    }
    if(event.status==="CANCELLED"){
        throw new Error("Event is cancelled");
    }
    if(event.registrationDeadline && new Date()>event.registrationDeadline){
        throw new Error("Registration deadline has passed");
    }
    const existingRegistration = await EventRegistration.findOne({
        event:eventId,
        user:userId
    });
    if(existingRegistration && existingRegistration.status=="REGISTERED"){
        throw new Error("You are already registered for this event");
    }
    if(event.capacity){
        const registeredCount= await EventRegistration.countDocuments({
            event:eventId,
            status:"REGISTERED",
        });
        if(registeredCount>=event.capacity){
            throw new Error("Event capacity is full");
        }
    }
    const registration = await EventRegistration.create({
        event:eventId,
        user:userId,
        status:"REGISTERED"
    });
    return registration;
}

const cancelRegistration = async(eventId,userId)=>{
    const registration=await EventRegistration.findOne({
        event:eventId,
        user:userId,
        status:"REGISTERED"
    });
    if(!registration){
        throw new Error("You are not registered for this event");
    }
    registration.status="CANCELLED";
    await registration.save();
    return registration;
};

// to view the registrations done 
// admin : can view all registrations
// club_admin: can view registration of their club only
const getEventRegistrations=async(eventId,user)=>{
    const event=await Event.findById(eventId);
    if(!event){
        throw new Error("Event not found");
    }
    if(user.role==="ADMIN"){
        const registration=await EventRegistration.find({
            event:eventId,
            status:"REGISTERED",
        })
        .populate("user","name email department year")
        .sort({registeredAt: 1});
        return registration
    }
    // we'll check if he is club admin and getting his club registration only
    if(user.role=="CLUB_ADMIN"){
        if(!event.club){
            throw new Error("You are not authorized to view these registrations");
        }
        const membership=await ClubMembership.findOne({
            user:user.id,
            club:event.club,
            status:"ACTIVE",
            role:"ADMIN"
        });
        if(!membership){
            throw new Error("You are not an admin of this club");
        }
        const registrations = await EventRegistration.find({
            event:eventId,
            status:"REGISTERED"
        })
        .populate("user" ,"name email department year")
        .sort({registeredAt:1});

        return registrations;
    }
    throw new Error("You are not authorized to view these registrations");
}
// my events
const getMyEvents=async(userId)=>{
    const registrations=await EventRegistration.find({
        user:userId,
        status:"REGISTERED",
    })
    .populate({path:"event",
        populate:{
            path:"club",
            select:"name category",
        },
    });
    return registrations;
}
module.exports={CreateEvent,getAllEvents,getEventById,updateEvent,deleteEvent,registerForEvent,cancelRegistration,getEventRegistrations,getMyEvents};