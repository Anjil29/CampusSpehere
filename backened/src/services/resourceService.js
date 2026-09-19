const Resource=require("../models/Resource");
const createResource=async(resourceData,userId)=>{
    const resource=await Resource.create({
        title:resourceData.title,
        description:resourceData.description || "",
        category:resourceData.category,
        fileUrl:resourceData.fileUrl,
        fileName:resourceData.fileName,
        fileType:resourceData.fileType,
        fileSize:resourceData.fileSize,
        uploadedBy:userId

    });
    return resource;
};
module.exports={createResource};