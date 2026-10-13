const {createResource,getAllResources,getResouceById,downloadResource,updateResource,deleteResource,updateStatus}=require("../services/resourceService");
const CreateResource=async(req,res)=>{
    try{
        const resource=await createResource(req.body,req.user.id,req.file);
        res.status(200).json({
            success:true,
            message:"Resource created successfully",
            data:resource
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
};

const GetAllResources=async(req,res)=>{
    try{
        const resources=await getAllResources();
        res.status(200).json({
            success:true,
            data:resources
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
};

const GetResourceById=async(req,res)=>{
    try{
        const resource=await getResouceById(req.params.id);
        res.status(200).json({
            success:true,
            resource:resource
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
  
};
const DownloadResource=async(req,res)=>{
    try{
        const resource=downloadResource(req.params.id);
        res.status(200).json({
            success:true,
            message:"Resouce downloaded successfully"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message

        })
        
    }
   

};
const UpdateResouce=async(req,res)=>{
    try{
        const resource=await updateResource(req.params.id,req.body,req.user);
        res.status(200).json({
            success:true,
            message:"Resource updated successfully"
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
    
};
const DeleteResource=async(req,res)=>{
    try{
        const resource=await deleteResource(req.params.id,req.user);
        res.status(200).json({
            success:true,
            message:"resource deleted successfully",
            resource:resource
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
    
}
const UpdateResource=async(req,res)=>{
    try{
        const resource=await updateResource(req.params.id,req.body,req.user);
        res.status(200).json({
            success:true,
            message:"Resource updated successfully"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={CreateResource,GetAllResources,GetResourceById,DownloadResource,UpdateResouce,DeleteResource,UpdateResouce};