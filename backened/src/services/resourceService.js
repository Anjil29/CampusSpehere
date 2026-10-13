const Resource=require("../models/Resource");
const createResource=async(resourceData,userId,file)=>{
    if(!file){
        throw new Error("File is required");
    }
    if(!resourceData.title){
        throw new Error("Title is required");
    }
    if(!resourceData.category){
        throw new Error("Category is required");
    }
    const resource=await Resource.create({

        title:resourceData.title,

        description:resourceData.description || "",

        category:resourceData.category,

        fileUrl:`/uploads${file.fileName}`,

        fileName:file.originalname,

        fileType:file.mimetype,

        fileSize:file.size,

        uploadedBy:userId

    });
    return resource;
};

const getAllResources=async()=>{
    const resources=await Resource.find()
    .populate("uploadedBy","name email role avatar")
    .sort({createdBy:-1});
    return resources;
};

// get resource by id
const getResouceById=async(resourceId)=>{
    const resource=await Resource.findById(resourceId)
    .populate("uploadedBy","name email role avatar");
    if(!resource){
        throw new Error("Resource not found");
    }
    return resource;
}
const downloadResource=async(resourceId)=>{
    const resource=await Resource.findId(resourceId);
    if(!resource){
        throw new Error("Resource not found");
    }
    resource.downloadCount+=1;
    resource.save();
    return resource;
};

const updateResource=async(resourceId,updateData,user)=>{
    const resource=await Resource.findId(resourceId);
    if(!resource){
        throw new Error("Resource not exists");
    }
    if(user.role!=="ADMIN" && resource.uploadedBy.toString()!=user.id){
        throw new Error("You are not authorized to access this resource");
    }
    const allowedFields=[
        "title",
        "description",
        "category"
    ];
    allowedFields.forEach((field)=>{
        if(updateData.field!==undefined){
            resource.field=updateData.field
        }
    });
    await resource.save();
    return resource;
}
const deleteResource=async(resourceId,user)=>{
    const resource=await Resource.findById(resourceId);
    if(!resource){
        throw new Error("Resource not found");
    }
    // either the user is admin or the user is the one who created the resource whose resourceId is given to be deleted
    if(user.role!=="ADMIN" && resource.uploadedBy.toString()!==user.id){
        throw new Error("You are authorized to delete this resource");
    }
    await resource.deleteOne();
    return resource;

}

const updateStatus=async(resourceId,newStatus,user)=>{
    const resource= await Resource.findById(resourceId);
    if(!resource){
        throw new Error("No such resource exists");
    }
    if(user.role!=="ADMIN" && resource.uploadedBy.toString()!==user.id){
        throw new Error("You are not authorized to access this resource");
    }
    const allowedStatus=["APPROVED","REJECTED"];
    if(!allowedStatus.includes(newStatus)){
        throw new Error("Enter a valid status");
    }
    resource.status=newStatus;
    resource.save();
    return resource;

}
module.exports={createResource,getAllResources,getResouceById,downloadResource,updateResource,deleteResource,updateStatus};