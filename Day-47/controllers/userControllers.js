const userModel = require('../models/userModel')

 exports.createUser = async(req, res)=>{
    let user = await userModel.createUser(req.body);
    if(user){
        res.json({
            user,
            message: "User created successfully!"
        })
    }else{
        res.json({
            message: "User is not created!"
        })
    }
 }