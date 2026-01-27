const signinModel = require('../model/signinModel')

exports.getSigninPage = (req, res)=>{
    res.render('signin');
}

exports.getAuthenticateUser = async(req, res)=>{
    let isAuthenticated = await signinModel.authenticateUser(req.body);
    if(isAuthenticated){
        res.redirect('/');
    }else{
        res.render('signin', {error: "email or password is incorrect!"});
    }
}