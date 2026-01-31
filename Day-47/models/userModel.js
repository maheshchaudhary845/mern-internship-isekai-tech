const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '../public/users.json')

exports.createUser = async({name, email, password})=>{
    let users = [];
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        users = JSON.parse(data);
    }
    catch(err){
        console.error("Error reading file!");
        return false;
    }
    finally{
        let newUser = {
            id: Date.now(),
            name,
            email,
            password
        }
        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err)=>{
            if(err){
                console.error("Error writing file");
            }
        })
        return users[users.length-1];
    }
}