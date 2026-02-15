const usersModel = require('../models/usersModel')
const authServices = require('../services/authServices')

exports.getUsers = async(req, res)=>{
    let data = await usersModel.getAllUsers();
    if(data.length>0){
        res.json({
            success: true,
            users: data,
            message: "Data Successfully sent"
        })
    }else{
        res.json({
            success: false,
            message: "Error in sending data"
        })
    }
}

exports.createUser = async(req, res)=>{
    try{

        let user = await authServices.register(req.body);
        res.json({
            success: true,
            user,
            message: "User created successfully!"
        })
    }
    catch(err){
        if(err.message === "USER_EXISTS"){
            return res.status(400).json({
                success: false,
                message:"User already exists!"
            })
        }
        res.status(500).json({
            message: "Server error"
        })
    }
    
}

exports.loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const result = await authServices.login(email, password);

        res.json({
            success: true,
            message: "Login Successful",
            token: result.token,
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role
            }
        })
    }catch(err){
        if(err.message === "INVALID_CREDENTIALS"){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        res.status(500).json({
            message: "Server error"
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