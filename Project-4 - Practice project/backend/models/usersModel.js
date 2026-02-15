const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../public/users.json');

async function getUsers() {
    let users = [];
    try {
        const data = await fs.readFile(filePath);
        users = JSON.parse(data);
        return users;
    } catch (err) {
        console.error("Error reading file!");
        return [];
    }
}
async function writeUser(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        console.error("Error writing file!")
    })
}

exports.getAllUsers = async () => {
    return await getUsers();
}

exports.getUserByEmail = async(email)=>{
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(u => u.email == email);
        return user;
    } 
    catch(err){
        console.error("Error reading file!")
        return null;
    }
}

exports.addUser = async (data) => {
    const users = await getUsers();

    const exists = users.find(u => u.email === data.email);

    if (exists) return null;

    const newUser = {
        id: Date.now(),
        ...data
    };

    users.push(newUser);

    await writeUser(users);

    return newUser;
}

exports.editUser = async (data, { id }) => {
    let users = await getUsers();
    let editedUser = null;
    if (users.length>0) {
        users = users.map(user => {
            if (user.id == id) {
                editedUser = {
                    ...user,
                    ...data
                }
                return editedUser;
            }
            return user;
        })

        await writeUser(users);
        return editedUser;
    } else {
        return false;
    }
}

exports.deleteUser = async ({ id }) => {
    let users = await getUsers();
    let deletedUser = users.find(user => user.id == id);
    if (users.length>0 && deletedUser) {
        users = users.filter(user => user.id != id);

        await writeUser(users);
        return {
            success: true,
            data: deletedUser,
            message: "User deleted successfully!"
        }
    }
    return{
        success: false,
        message: "Failed to delete user! No user found."
    }
}