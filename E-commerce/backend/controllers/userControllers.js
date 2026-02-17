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
    },

    async updateUser(req, res){
        try{
            const allowedFields = ["name", "email", "username", "role"];
            const updates = {};
            allowedFields.forEach(field=>{
                if(req.body[field] !== undefined){
                    updates[field] = req.body[field];
                }
            })
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {$set: updates},
                {
                    new: true,
                    runValidators: true
                }
            )
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            res.json({
                success: true,
                data: user,
                message: "User updated successfully"
            })
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async deleteUser(req, res){
        try{
            const user = await User.findById(req.params.id);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            user.isDeleted = true;
            user.save()
            res.json({
                success: true,
                data: user,
                message: "User deleted successfully"
            })

        } catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}