const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken');

exports.register = async (userData)=>{
    const hashPassword = bcrypt.hashSync(userData.password, 10);

    const user = await usersModel.addUser({
        ...userData,
        password: hashPassword
    })

    if(!user) {
        throw new Error("USER_EXISTS");
    };

    return user;
}

exports.login = async (email, password)=>{
    const user = await usersModel.getUserByEmail(email);

    if(!user){
        throw new Error("INVALID_CREDENTIALS");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if(!passwordMatch){
        throw new Error("INVALID_CREDENTIALS");
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


}