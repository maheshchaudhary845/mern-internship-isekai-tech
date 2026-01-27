const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '../public/products.json');

exports.addUser = async (body) => {
    const { title, description, price, image } = body;
    let products = []
    try {
        let data = await fs.readFile(file)
        products = JSON.parse(data);
    }catch(err){
        console.error("Error reading file");
    }
    finally {
        let newProduct = {
            id: Date.now(),
            title,
            description,
            price,
            image
        }
        products.push(newProduct);
        fs.writeFile(file, JSON.stringify(products, null, 2), (err) => {
            console.error("Error writing file!");
        })
    }
}