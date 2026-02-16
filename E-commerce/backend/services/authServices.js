const bcrypt = require('bcrypt');
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