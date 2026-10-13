const Notification=require("../models/Notification");
// notification create
const createNotification=async(data)=>{
    try{    
        const Newnotification=await Notification.create(data);
        return Newnotification;
    }
    catch(err){
        throw new Error("Error creating notification "+err.message);
    }
};

// logged-in uswr ki notification ki notification fetch krna
const fetchNotification=async(user)=>{
    try{
        const notifications=await Notification.find({recepient:user.id}).sort({createdAt:-1});
        return notifications;
    }
    catch(err){
        throw new Error("Error while fetching the notifications of a user "+err.message);
    }
}
// mark read a notification
const markRead=async(notificationId,user)=>{
    try{
        const notification=await Notification.findOneAndUpdate(
            {
                _id:notificationId,
                recepient:user.id
            },
            {
                $set:{isRead:true}

            },
            {
                new:true,
                runValidators:true
            }
        );
        return notification;
    }
    catch(err){
        throw err;
    }
};
// user ki sari unread notifications read krna hai
const readAllNotifications=async(userId)=>{
    try{
        const notifications=await Notification.updateMany(
        {
            recepient:userId,
            isRead:false
        },
        {
            $set:{isRead:true}
        }
    )
        return notifications;
    }
    catch(err){
        throw new Error('Error marking all notifications as read: ' + err.message);
    }
};

const deleteNotification=async(resourceId,userId)=>{
    try{
        const notification=await Notification.findOneAndDelete(
            {
                _id:resourceId,
                recepient:userId
            }
        )
        return notification;
    }
    catch(err){
        throw new Error(err.message);
    }
};

const unreadNotification=async(userId)=>{
    try{
        const notifications=await Notification.countDocuments({
            recepient:userId,
            isRead:false
        })
        return notifications;
    }
    catch(err){
        throw new Error(err.message);
    }
};
module.exports={createNotification,fetchNotification,markRead,readAllNotifications,deleteNotification,unreadNotification};

