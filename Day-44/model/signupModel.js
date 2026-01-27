const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../public/users.json');

exports.addUser = async (body) => {
    const { name, email, password } = body;
    let users = [];
    let newUser = {
        id: Date.now(),
        name,
        email,
        password
    }
    try {
        const data = await fs.readFile(file);

        users = JSON.parse(data)

        users.push(newUser);
    }
    catch (err) {
        users.push(newUser);
    }
    finally{
        fs.writeFile(file, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing file");
            }
        });
    }
}