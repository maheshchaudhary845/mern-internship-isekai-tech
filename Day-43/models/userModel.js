const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../public/users.json');

exports.getUsers = async() => {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}