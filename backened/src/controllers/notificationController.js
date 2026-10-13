const {createNotification,fetchNotification,markRead,readAllNotifications,deleteNotification,unreadNotification}=require("../services/notificationService");
const CreateNotification=async(req,res)=>{
    try{
        const notification=await createNotification(req.body);
        res.status(200).json({
            success:true,
            message:"Notification ceated successfully",
            notification:notification
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const FetchNotification=async(req,res)=>{
    try{
        const notifications=await fetchNotification(req.user.id);
        res.status(200).json({
            success:true,
            message:"Notification ceated successfully",
            notifications:notifications
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};
const MarkRead=async(req,res)=>{
    try{
        const notification=await markRead(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"Notification read successflly",
            notification:notification
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const ReadAllNotifications=async(req,res)=>{
    try{
        const notifications=await readAllNotifications(req.user.id);
        res.status(200).json({
            success:true,
            message:"Notifications read successfully",
            notifications:notifications
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const DeleteNotification= async(req,res)=>{
    try{
        const notification=await deleteNotification(req.params.id,req.user.id);
        res.status(200).json({
            success:true,
            message:"Notifications deleleted successfully",
            notification:notification
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};
const UnreadNotification=async(req,res)=>{
    try{
        const count=await unreadNotification(req.user.id);
        res.status(200).json({
            success:true,
            count:count
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }

}
module.exports={CreateNotification,FetchNotification,MarkRead,ReadAllNotifications,DeleteNotification,UnreadNotification};

