const jwt = require('jsonwebtoken');

exports.auth = (req, res, next)=>{
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ").pop();

    if(!token){
        return res.status(401).json({message: "Token not found"})
    }

    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
    } catch(err){
        return res.status(403).json({message: "Invalid token!"})
    }
    next();
}

exports.roleAuth = (role)=>{
    return(req, res, next)=>{
        const authHeader = req.header('Authorization');
        const token = authHeader.split(' ').pop();

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(decode.role != role){
            return res.status(403).json({message: "Not Authorized"})
        }
        next();
    }
}