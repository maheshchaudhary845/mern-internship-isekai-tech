const fs = require('fs/promises')
const path = require('path')

const file = path.join(__dirname, '../public/products.json')

exports.deleteProduct = async(params)=>{
    const {id} = params;
    try{
        const data = await fs.readFile(file);
        let products = JSON.parse(data);
        products = products.filter(product => product.id != id);

        await fs.writeFile(file, JSON.stringify(products, null, 2), (err)=>{
            if(err){
                console.error("Error writing file");
            }
        })

    }catch(err){
        console.error("Error reading file")
    }
}