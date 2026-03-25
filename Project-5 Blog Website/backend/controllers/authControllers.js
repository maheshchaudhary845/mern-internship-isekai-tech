const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            success: true,
            token,
            data: {
                id: user.id,
                email: user.email,
                name: user.fullName
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.logout = async(req, res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.json({
            success: true,
            message: "Logged out successfully"
        })
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}