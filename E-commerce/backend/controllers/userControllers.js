const User = require('../models/User');
const authServices = require('../services/authServices');

module.exports = {
    async getUsers(req, res){
        try{
            const users = await User.find();

            res.json({
                success: true,
                data: users,
                message: "Users fetched successfully!"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async createUser(req, res){
        try{
            const user = await authServices.register(req.body)

            res.json({
                success: true,
                data: user,
                message: "User Created Successfully!"
            })
        } catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async loginUser(req, res){
        try{
            const result = await authServices.login(req.body)

            res.json({
                success: true,
                token: result.token,
                data: {
                    name: result.user.name,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role
                }
            })
        } catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
}