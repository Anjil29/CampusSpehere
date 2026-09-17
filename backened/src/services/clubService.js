
const ClubMembership=require("../models/ClubMembership");
const Club=require("../models/Club");

const createClub=async(clubData,user)=>{
    const club=await Club.create({...clubData,createdBy:user.id});
    return club;
}
const getAllClubs=async()=>{
    const clubs=await Club.find({isActive:true})
    .populate("createdBy","name email")
    .sort({createdAt:-1})

    return clubs;

};
const getClubById=async(id)=>{
    const club=await Club.findOne({
        _id:id,
        isActive:true,
    })
    .populate("createdBy","name email");
    if(!club) {
        throw new Error("No such club found");
    }
    return club;
}
// join club

const JoinClub=async(clubId,user)=>{
    const club=await Club.findOne({
        _id:clubId,
        isActive:true,
    });

    if(!club){
        throw new Error("No such club exists");
    }
    const existingMemberShip=await ClubMembership.findOne({
        club:clubId,
        user:user.id
    });
    if(existingMemberShip){
        if(existingMemberShip.status==="ACTIVE")throw new Error("Already a member of this club");
        if(existingMemberShip.status==="PENDING") throw new Error("Your join request is already pending");
        if(existingMemberShip.status==="REJECTED") throw new Error("Your previous join request was rejected");
    }
    const membership=await ClubMembership.create({
        club:clubId,
        user:user.id,
        role:"MEMBER",
        status:"PENDING",

    });
    return membership;

};

const getClubMembers=async(clubId,user)=>{
    const club=await Club.findOne({
        _id:clubId,
        isActive:true,
    });
    if(!club){
        throw new Error("Club not found");
    }
    if(user.role==="ADMIN"){
        const members=await ClubMembership.findOne({
            club:clubId,
            status:"ACTIVE"
        }).populate("user","name email department year role");
        return members;
    }
    if(user.role==="CLUB_ADMIN"){
        // we'll check if he is trying to get the deetails of his club only
        const membership=await ClubMembership.find({
            club:clubId,
            user:user.id,
            role:"ADMIN",
            status:"ACTIVE"
        });
        if(!membership){
            throw new Error("You are not the admin of this club");
        }
        const members=await ClubMembership.find({
            club:clubId,
            status:"ACTIVE"
        }).populate("user","name email department year role");
        return members;
    }
    throw new Error(
        "You are not authorized to view club members"
    );

}
const updateMemberStatus=async(clubId,userId,newStatus,user)=>{
    const club=await Club.findOne({
        _id:clubId,
        isActive:true,
    });

    if(!club){
        throw new Error("Club not found");

    }

    if(newStatus!=="ACTIVE" && newStatus!=="REJECTED"){
        throw new Error("Invalid memebership status");
    }

    if(user.role==="ADMIN"){

    }

    else if(user.role==="CLUB_ADMIN"){
        const adminMembership=await ClubMembership.findOne({
            club:clubId,
            user:user.id,
            role:"ADMIN",
            status:"ACTIVE"
        });
        if(!adminMembership){
            throw new Error("You are not admin of this club");
        }
    }
    else{
        throw new Error("You are not authorized to mmanage the club memebrs");
    }
    const memberShip= await ClubMembership.findOne({
        club:clubId,
        user:userId,
    });
    if(!memberShip){
        throw new Error("Membership request not found");
    }
    if(memberShip.status!=="PENDING"){
        throw new Error("Only pending requests can be processed");
    }
    memberShip.status=newStatus;
    if(newStatus=="ACTIVE"){
        memberShip.joinedAt=new Date();
    }
    await memberShip.save();
    return await memberShip.populate("user","name email department year role");
}

const leaveClub=async(clubId,userId)=>{
    const club=await Club.findOne({
        _id:clubId,
        isActive:true,
    });
    if(!club){
        throw new Error("Club not found");
    }
    const membership=await ClubMembership.findOne({
        club:clubId,
        user:userId,
    });
    if(!membership){
        throw new Error("You are not a member of this club");
    }
    if(membership.status!=="ACTIVE"){
        throw new Error("Only active members can leave the club");
    }
    membership.status="LEFT";
    await membership.save();
    return membership;
}






module.exports={createClub,getAllClubs,getClubById,JoinClub,getClubMembers,updateMemberStatus,leaveClub};