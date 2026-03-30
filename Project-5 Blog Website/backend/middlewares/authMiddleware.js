const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    const token = authHeader.split(" ").pop();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        res.status(403).json({
            sucess: false,
            message: err.message
        })
    }

}

exports.roleAuth = (role) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        const token = authHeader.split(" ").pop();

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if (decode.role != role) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized"
                })
            }
            next();
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
}