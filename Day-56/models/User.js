const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName;
})

userSchema.pre('save', function(){
    console.log("password hash logic goes here like bcrypt")
});

userSchema.post('save', function(doc){
    console.log("Doc email:", doc.email);
})

module.exports = mongoose.model('User', userSchema);