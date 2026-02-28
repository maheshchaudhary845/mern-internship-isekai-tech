const User = require("../models/User");

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json({
                success: true,
                data: users,
                message: "Users fetched successfully"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async getCurrentUser(req, res){
        try{
            res.json({
                success: true,
                data: req.user,
                message: "Current user fetched!"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
    
}