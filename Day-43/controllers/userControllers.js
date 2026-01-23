const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res)=>{
    const users = await userModel.getUsers();
    res.render('users', {users})
}