const {createNotice,getAllNotices,getNoticeById,updateNotice,deleteNotice} = require("../services/noticeService");
const noticeCreate=async(req,res)=>{
    try{
        const notice= await createNotice({...req.body,createdBy:req.user.id});
        res.status(200).json({
            success:true,
            message:"Notice created successfully",
            data:notice
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const getNotices=async(req,res)=>{
    try{
        const notices = await getAllNotices();
        res.status(200).json({
        success:true,
        data:notices
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to fetch notices"
        })
    }
    
}
const NoticeById=async(req,res)=>{
    try{
        const notice= await getNoticeById(req.params.id);
        res.status(200).json({
            success:true,
            data:notice,
        });
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            success:false,
            message:"Not able to fetch notice by id"
        })
    }
}
const noticeUpdate=async(req,res)=>{
    try{
        const notice= await updateNotice(req.params.id,req.body);
        res.status(200).json({
            success:true,
            message:"Notice updated Successfully",
            data:notice
        })
    }
    catch(err){
        console.log(err.message);
        res.status(200).json({
            success:true,
            message:"Not able to update the notice"
        })
    }
}
const noticeDelete=async(req,res)=>{
    try{
        const notice = await deleteNotice(req.params.id);
        res.status(200).json({
            success:true,
            message:"Notice deleted Successfully"
        });

    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            success:false,
            message:"error while deleting the notice"
        })
    }
}
module.exports={noticeCreate,getNotices,NoticeById,noticeUpdate,noticeDelete};