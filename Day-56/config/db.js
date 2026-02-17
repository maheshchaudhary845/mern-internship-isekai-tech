const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/testDB');

        console.log("DB Connected!");
    }
    catch(err){
        console.error("Error in connecting DB: ", err.message);
    }
}

module.exports = connectDB;