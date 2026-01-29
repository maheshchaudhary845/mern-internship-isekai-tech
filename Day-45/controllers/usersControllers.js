const usersModel = require('../models/usersModel')

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
    let user = await usersModel.editUser(req.body, req.params);
    if(user){
        res.json({
            user,
            message: "User Edited Successfully!"
        })
    }else{
        res.json({
            message: "User not Edited!"
        })
    }
}