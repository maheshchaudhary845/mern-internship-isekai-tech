const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (userData) => {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const newData = {
        ...userData,
        password: hashPassword
    }
    try {
        const user = await User.create(newData);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.login = async ({email, password})=>{
    try{
        const user = await User.findOne({email});

        if(!user){
            throw new Error("INVALID_EMAIL");
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            throw new Error("INVALID_PASSWORD");
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        return{
            token,
            user
        }
        
    }catch(err){
        throw new Error(err.message);
    }
}