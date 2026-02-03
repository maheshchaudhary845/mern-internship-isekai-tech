const usersModel = require('../models/usersModel')

exports.getUsers = async(req, res)=>{
    let data = await usersModel.getAllUsers();
    if(data){
        res.json({
            users: data,
            message: "Data Successfully sent"
        })
    }else{
        res.json({
            message: "Error in sending data"
        })
    }
}

exports.createUser = async(req, res)=>{
    let data = await usersModel.addUser(req.body);
    if(data){
        res.json({
            success: true,
            user: data,
            message: "User created successfully!"
        })
    }else{
        res.json({
            success: false,
            message:"User already exists!"
        })
    }
}

exports.updateUser = async(req, res)=>{
    let data = await usersModel.editUser(req.body, req.params);
    if(data){
        res.json({
            success: true,
            user: data,
            message: "User Edited Successfully!"
        })
    }else{
        res.json({
            success: false,
            message: "User not Edited!"
        })
    }
}

exports.deleteUser = async (req, res)=>{
    let data = await usersModel.deleteUser(req.params);
    res.json(data);
}