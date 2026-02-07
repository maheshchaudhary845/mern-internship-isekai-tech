exports.validate = (schema)=>{
    return (req, res, next)=>{
            const {error, value} = schema.validate(req.body);
            if(error){
                return res.json({
                    success: false,
                    message: error.details[0].message
                })
            }
            next();
    }
}