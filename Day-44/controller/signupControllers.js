const signupModel = require('../model/signupModel')

exports.getSignupPage = async(req, res)=>{
    await signupModel.addUser(req.body);
    res.redirect('/signin');
}