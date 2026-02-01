const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '../public/products.json')

exports.getAllProducts = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        const products = JSON.parse(data);
        if (products.length === 0) {
            throw new Error("")
        }
        return {
            success: true,
            products,
            message: "Products are successfully fetched!"
        }
    } catch (err) {
        console.error("Error reading file");
        return {
            success: false,
            message: "Error in fetching products!"
        }
    }
}

exports.addProduct = async ({ title, description, price, category, image }) => {
    let products = [];
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        products = JSON.parse(data);
    }
    catch (err) {
        console.error("Error reading products file");
    }
    finally {
        let newProduct = {
            title,
            description,
            price,
            image,
            category
        }
        products.push(newProduct);

        fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error("Error writing file!")
                return {
                    success: false,
                    message: "Failed to add product!"
                };
            }
        })

        return {
            success: true,
            product: products[products.length-1],
            message: "Product added successfully"
        };
    }
}