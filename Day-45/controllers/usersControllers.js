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