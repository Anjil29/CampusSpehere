const validateCreateEvent=(req,res,next)=>{
    const {
        title,
        description,
        date,
        startTime,
        endTime,
        venue,
        category,
    }=req.body;
    if(!title || !description || !date || !startTime || !venue || !endTime || !category ){
        return res.status(400).json({
            success:false,
            message:"All required fields are required",
        });
    }
    if(req.body.capacity!==undefined){
        if(typeof req.body.capacity!=="number" || req.body.capacity<1){
            return res.status(400).json({
                success:false,
                message:"Capacity must be a positive number",
            });
        }
    }
    next();
};

const validateUpdateEvent=(req,res,next)=>{
    const allowedFields=[
        "title",
        "description",
        "date",
        "startTime",
        "venue",
        "capacity",
        "registrationDeadline",
        "category",
        "image",
        "status"
    ];
    const invalidFields=Object.keys(req.body).filter((field)=>!allowedFields.includes(field));
    if(invalidFields.length>0){
        return res.status(400).json({
            success:false,
            message:`Invalid fields: ${invalidFields.join(", ")}`
        })
    }
    if(req.body.capacity!==undefined ){
        if(typeof req.body.capacity!=="number" || req.body.capacity<1){
            return res.status(400).json({
                success:false,
                message:"Capacity must be a valid number"
            })
        }
    };
    next();
}
module.exports={validateCreateEvent,validateUpdateEvent};