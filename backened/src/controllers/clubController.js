
const {createClub,getAllClubs,getClubById,JoinClub,getClubMembers,updateMemberStatus,leaveClub} = require("../services/clubService");
const ClubCreate = async (req,res)=>{
    try{

        const club= await createClub(req.body,req.user);
        
        res.status(201).json({
            success:true,
            message:"Club created successfully",
            data:club,
        });

    }
    catch(err){

        res.status(400).json({
            success:false,
            message:err.message
        })

    }
}
const getClubs=async(req,res)=>{
    try{
        const clubs=await getAllClubs();
        res.status(200).json({
            success:true,
            data:clubs,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to fetch clubs"
        })
    }
};
const getClub=async(req,res)=>{
    try{
        const club=await getClubById(req.params.id);
        res.status(200).json({
            success:true,
            data:club
        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};

const ClubJoin=async(req,res)=>{
    try{
        const membership=await JoinClub(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"Club join request submitted successfully",
            data:membership
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
          
        })
    }
}
const getMembersOfClub=async(req,res)=>{
    try{
        const members=await getClubMembers(req.params.id,req.user);
        res.status(200).json({
            success:true,
            data:members
        })
    }
    catch(err){
        res.status(403).json({
            success:false,
            message:err.message
        })
    }
}
const UpdateStatusOfMembers=async(req,res)=>{
    try{
        const membership=await updateMemberStatus(req.params.id,req.params.userId,req.body.status,req.user);
        res.status(200).json({
            success:true,
            message:"Membership status updated successfully",
            data:membership
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const clubLeave=async(req,res)=>{
    try{
        const membership=await leaveClub(req.params.id,req.user.id);
        res.status(200).json({
            success: true,
            message: "You have left the club successfully",
            data: membership,
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={ClubCreate,getClubs,getClub,ClubJoin,getMembersOfClub,UpdateStatusOfMembers,clubLeave};