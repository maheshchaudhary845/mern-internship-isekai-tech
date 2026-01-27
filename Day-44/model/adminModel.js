const fs = require('fs/promises')
const path = require('path')

const file = path.join(__dirname, '../public/users.json')

async function fetchUsers(){
    try{
        const data = await fs.readFile(file);
        let users = JSON.parse(data)
        return users;
    }catch(err){
        console.error("Error reading file");
        return false;
    }
}
exports.getUsers = async()=>{
    let users = await fetchUsers();
    return users;
}

exports.getUser = async({id})=>{
    let users = await fetchUsers();
    let user = users.find(user => user.id == id);
    return user;
}

exports.updateUser = async({name, email, password},{id})=>{
    let users = await fetchUsers();
    users = users.map(user=>{
        if(user.id == id){
            return{
                ...user,
                name,
                email,
                password,
            }
        }
        return user;
    })

    fs.writeFile(file, JSON.stringify(users, null, 2), (err)=>{
        if(err){
            console.error("Error writing file");
        }
    })
}

exports.deleteUser = async({id})=>{
    let users = await fetchUsers();
    users = users.filter(user => user.id != id);

    fs.writeFile(file, JSON.stringify(users, null, 2), (err)=>{
        console.error("Error writing file");
    })
}