const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '../public/products.json')

async function fetchProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        let products = JSON.parse(data);
        if (products.length > 0) {
            return products;
        }
        return false;
    }
    catch (err) {
        console.error("Error reading file!");
        return false;
    }
}

exports.getAllProducts = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        const products = JSON.parse(data);
        if (products.length === 0) {
            throw new Error("products are Empty")
        }
        return {
            success: true,
            products,
            message: "Products are successfully fetched!"
        }
    } catch (err) {
        console.error(err);
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
            id: Date.now(),
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
            product: products[products.length - 1],
            message: "Product added successfully"
        };
    }
}

exports.getProduct = async ({ id }) => {
    let products = await fetchProducts();
    if (products) {
        let product = products.find(product => product.id == id);
        if (product) {
            return {
                success: true,
                data: product,
                message: "Product fetched successfully"
            }
        }
    }
    return {
        success: false,
        message: "Failed to get product!"
    }
}

exports.updateProduct = async({id}, {title, description, price, category, image})=>{
    let products = await fetchProducts();
    let validProduct = products.find(product => product.id == id)
    if(products && validProduct){
        products = products.map(product =>{
            if(product.id == id){
                return{
                    ...product,
                    title,
                    description,
                    price,
                    image,
                    category
                }
            }
            return product;
        })
        fs.writeFile(filePath, JSON.stringify(products, null, 2), (err)=>{
            if(err) console.error("Error writing file!");
        })
        return{
            success: true,
            data: products,
            message: "Product successfully edited!"
        }
    }
    return {
       success: false,
       message: "Failed to edit the product!" 
    }
}

exports.deleteProduct = async({id})=>{
    let products = await fetchProducts();
    if(products){
        let deletedProduct = products.find(product => product.id == id);

        products =  products.filter(product => product.id != id);
        console.log("products", products, "deleted product:", deletedProduct)
        if(deletedProduct){
            fs.writeFile(filePath, JSON.stringify(products, null, 2), (err)=>{
                if(err) console.error("Error writing file!")
            })
            return{
                success: true,  
                data: deletedProduct,
                message: "Product deleted successfully!"
            }
        }
        return{
            success: false,
            message: "Failed to delete the product!"
        }
    }
}