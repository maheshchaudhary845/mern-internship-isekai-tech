const User = require('../models/User')
const mongoose = require('mongoose')

exports.createUser = async(req, res)=>{
    try{
        const {email} = req.body;
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                success: false,
                message: "User already exist!"
            })
        }
        
        const user = await User.create(req.body);
        
        res.status(201).json({
            user,
            message: "User created successfully"
        })

    } catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

exports.getUsers = async(req, res)=>{
    try{
        const users = await User.find();
        
        res.json({
            success: true,
            users,
            message: "Users fetched!"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const allowedFields = ["name", "email", "phone"];
        const updates = {};

        allowedFields.forEach(field=>{
            if(req.body[field] !== undefined){
                updates[field] = req.body[field];
            }
        });
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: updates},
            {
                new: true,
                runValidators: true
            }
        )

        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        res.json({
            user, 
            message: "User updated successfully"
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "Invalid ID"
            })
        }

        // const user = await User.findByIdAndDelete(id);
        // if(!user){
        //     return res.status(404).json({
        //         message: "User not found"
        //     })
        // }

        const user = await User.findById(id);
        if(!user || user.isDeleted){
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.isDeleted = true;
        await user.save();

        res.json({
            success: true,
            message: "User deleted"
        })
        
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}