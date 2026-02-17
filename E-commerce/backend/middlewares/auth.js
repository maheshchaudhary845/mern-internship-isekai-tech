const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ").pop();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
    }
    catch (err) {
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        })
    }

    next();
}

exports.roleAuth = async(role)=>{
    return (req, res, next)=>{
        const authHeader = req.header("Authorization");
        const token = authHeader.split(' ').pop();
        
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }
        
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            if(decode.role != role){
                return res.status(403).json({
                    success: false,
                    message: "Not Authorized"
                })
            }
            next();
        }catch(err){
            res.status(403).json({
                success: false,
                message: "Invalid token"
            })
        }
    }
}