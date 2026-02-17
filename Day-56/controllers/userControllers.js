const User = require('../models/User');

module.exports = {
    async getUsers(req, res){
        try{
            const users = await User.find();
            
            res.json({
                success: true,
                data: users,
                message: "Users fetched successfully"
            })
        } catch (err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            user.save();
            res.json({
                success: true,
                data: user,
                message: "User created successfully"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}