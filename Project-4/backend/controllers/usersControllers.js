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
            user: data.user,
            message: "User created successfully!"
        })
    }else{
        res.json({
            message:"User already exists!"
        })
    }
}

exports.updateUser = async(req, res)=>{
    let data = await usersModel.editUser(req.body, req.params);
    if(data){
        res.json({
            user: data,
            message: "User Edited Successfully!"
        })
    }else{
        res.json({
            message: "User not Edited!"
        })
    }
}