const fs = require('fs/promises')
const path = require('path')

const file = path.join(__dirname, '../public/products.json');

exports.edit = async (body, params) => {
    const { name, description, price, image } = body;
    const { id } = params;
    try {
        const data = await fs.readFile(file);
        let products = JSON.parse(data);

        products = products.map(product => {
            if (product.id == id) {
                return {
                    ...product,
                    name,
                    description,
                    price,
                    image,
                }
            }
            return product;

        })

        await fs.writeFile(file, JSON.stringify(products, null, 2), (err)=>{
            if(err){
                console.error("Error writing file")
            }
        })
    } catch (err) {
        console.error("Error reading file");
    }
}