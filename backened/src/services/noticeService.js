const Notice = require("../models/Notice");
// createdBy: req.user.id
const createNotice= async({title,content,category,priority,createdBy})=>{
    const notice = await Notice.create({title,content,category,priority,createdBy});
    return notice;
};

const getAllNotices= async()=>{
    const notices=await Notice.find().populate("createdBy","name email role")
    .sort({createdAt:-1}); //createdAt ke according notices ko newest first arrange karo
    return notices;
}
const getNoticeById=async(id)=>{
    const notice=await Notice.findById(id);
    // notices k case m agr kuch nhi mila to empty array aajayega to wo thik h [] aajayaega response me but yha nhi mila to null ayega isliye alg s handle kiya hai ise
    if(!notice){
        throw new Error("Notice not found");
    }
    return notice
}
const updateNotice=async({id,updateData})=>{
    const notice=await Notice.findByIdAndUpdate(
        id,
        updateData,
        {
            new:true,
            runValidators:true,
        }
    );
    if(!notice){
        throw new Error("Notice not found");
    }
}
const deleteNotice=async(id)=>{
    const notice=await Notice.findByIdAndDelete(id);
    if(!notice){
        throw new Error("Notice not found");
    }
    return notice;
}
module.exports={createNotice,getAllNotices,getNoticeById,updateNotice,deleteNotice};