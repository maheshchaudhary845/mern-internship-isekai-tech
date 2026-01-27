const fs = require('fs/promises');
const path = require('path')

const file = path.join(__dirname, '../public/products.json')

exports.getProducts = async ()=>{
    try{
        const products = await fs.readFile(file);
        return JSON.parse(products);
    }
    catch(err){
        console.error("Error reading file");
        return false;
    }
}