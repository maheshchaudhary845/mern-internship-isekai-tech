const jwt = require('jsonwebtoken');

exports.auth = (req, res, next)=>{
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ").pop();

    if(!token){
        return res.status(404).json({
            success: false,
            message: "Token not found"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
        
    }catch(err){
        res.status(403).json({
            sucess: false,
            message: err.message
        })
    }
    
}

exports.roleAuth = (role)=>{
    return(req, res, next)=>{
        const authHeader = req.header("Authorization");
        const token = authHeader.split(" ").pop();

        if(!token){
            return res.status(404).json({
                success: false,
                message: "token not found"
            })
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if(decode.role != role){
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized"
                })
            }
            next();
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
}