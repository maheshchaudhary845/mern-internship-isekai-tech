const adminModel = require('../model/adminModel')

exports.getAdminPage = async(req, res)=>{
    let users = await adminModel.getUsers();
    res.render('admin', {users})
}

exports.getEditUserPage = async(req, res)=>{
    let user = await adminModel.getUser(req.params)
    res.render('edituser', {user})
}

exports.editUser = async(req, res)=>{
    await adminModel.updateUser(req.body, req.params)
    res.redirect('/admin');
}

exports.deleteUser = async(req, res)=>{
    await adminModel.deleteUser(req.params);
    res.redirect('/admin');
}