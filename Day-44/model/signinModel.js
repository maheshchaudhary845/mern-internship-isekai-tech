const fs = require('fs/promises')
const path = require('path')

const file = path.join(__dirname, '../public/users.json')

exports.authenticateUser = async(body)=>{
    const {email, password} = body;
    try{
        const data = await fs.readFile(file)
        const users = JSON.parse(data);
        const user = users.find(user => user.email === email && user.password === password)
        if(user){
            return true;
        }else{
            return false;
        }
    } catch(err){
        console.error("Error reading file");
        return false;
    }
}