const User = require("../models/User");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json({
                success: true,
                data: users,
                message: "Users fetched successfully"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async getCurrentUser(req, res) {
        try {
            const user = await User.findById(req.user.id)

            res.json({
                success: true,
                data: user,
                message: "Current user fetched!"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async updateUser(req, res) {
        try {
            const { firstName, lastName, currentPassword, newPassword } = req.body;
            const user = await User.findById(req.user.id).select("+password");  

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            
            if (firstName) {
                user.firstName = firstName;
            }
            
            if (lastName) {
                user.lastName = lastName;
            }
            
            if (currentPassword && newPassword) {
                const isMatch = await user.comparePassword(currentPassword);
                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid current password"
                    })
                }

                user.password = newPassword;
            }

            await user.save();

            res.json({
                success: true,
                data: user,
                message: "User updated successfully"
            })


        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

}