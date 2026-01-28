const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../public/users.json');

exports.addUser = async ({ name, email, password }) => {
    let users = [];
    let isUserExists = false;
    try {
        const data = await fs.readFile(filePath);
        users = JSON.parse(data);

        let user = users.find(user => user.email == email);

        if(user){
            isUserExists = true;
            return false;
        }

    } catch (err) {
        console.error("Error reading file!");
    } finally {
        if(!isUserExists){
            let newUser = {
                id: Date.now(),
                name,
                email,
                password
            }
            users.push(newUser)
            await fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
                console.error("Error writing file!");
            })
            return users[users.length-1];
        }

    }
}