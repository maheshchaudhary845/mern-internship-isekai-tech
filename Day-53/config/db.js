const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB Connnected!")
    }
    catch (err) {
        console.error("DB error: " + err.message);
    }
}

module.exports = connectDB;