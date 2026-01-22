// 21-01-26
const express = require('express');
const ejs = require('ejs');
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // it gives body in the req
// app.use(express.json())
app.use(express.static('public'));

async function getUsers() {
    const file = path.join(__dirname, 'public/users.json')

    const data = await fsPromises.readFile(file)
    let users = JSON.parse(data);
    return users;
}

app.get('/', (req, res) => {
    // res.send("Hello from express server");
    let file = path.join(__dirname, 'public/products.json')

    fs.readFile(file, (err, data)=>{
        
        if(err){
            console.error("Error reading file");
            res.render('index', {name: "", products: ""})
        } else{
            let products = JSON.parse(data);

            res.render("index", { name: "", products });
        }
    })

})
app.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    res.render("index", { name })
})

app.get('/signin', (req, res) => {
    res.render('signin', { error: "" })
})
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const file = path.join(__dirname, 'public/users.json')

    fs.readFile(file, (err, data) => {
        let users = [];
        let userFound = false;
        if (!err && data) {
            users = JSON.parse(data);

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    userFound = true;
                    res.redirect('/');
                }
            }
            if (!userFound) {
                res.render("signin", { error: "Invalid Email or Password!" });
            }
        }
    })
})

app.get('/signup', (req, res) => {
    res.render('signup');
})
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const file = path.join(__dirname, 'public/users.json');

    fs.readFile(file, (err, data) => {
        let users = [];

        if (!err && data) {
            users = JSON.parse(data);
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser)

        fs.writeFile(file, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error in writing file")
            } else {
                console.log("File Created Successfully")
            }
        })
    })

    res.render("signup")
})


app.get('/admin', (req, res) => {
    const file = path.join(__dirname, 'public/users.json');
    fs.readFile(file, (err, data) => {
        let users = [];
        if (err) {
            return res.send("Error reading users")
        }
        users = JSON.parse(data);

        res.render('admin', { users });

    })
})

app.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    let users = await getUsers()
    let user = users.find(user => user.id == id)
    res.render('edit', { user })
})
app.post('/edit/:id', async(req, res)=>{
    const {name, email, password} = req.body;
    const {id} = req.params;
    const file = path.join(__dirname, 'public/users.json')

    let users = await getUsers();

    let newUsers = users.map(user =>{
        if(user.id == id){
           return{
            ...user,
            name,
            email,
            password
           } 
        }
        return user;
    })

    fs.writeFile(file, JSON.stringify(newUsers, null, 2), (err)=>{
        if(err) console.errro("Error in writing file");
    })

    res.redirect('/admin')

})

app.get('/delete/:id', async(req, res)=>{
    let {id} = req.params;
    const file = path.join(__dirname, 'public/users.json')

    let users = await getUsers();

    let newUsers = users.filter(user => user.id != id)

    fs.writeFile(file, JSON.stringify(newUsers, null, 2), (err)=>{
        if(err) console.error("Error in writing file");
    })

    res.redirect('/admin');
})



app.get('/addproduct', (req, res)=>{
    res.render('addproduct')
})
app.post('/addproduct', (req, res)=>{
    const {title, description, price, image} = req.body;
    const file = path.join(__dirname, 'public/products.json')

    fs.readFile(file, (err, data)=>{
        let products = [];
        if(!err && data){
            products = JSON.parse(data);
        }
        
        let newProduct = {
            id: Date.now(),
            title,
            description,
            price,
            image,
        }

        products.push(newProduct);
        fs.writeFile(file, JSON.stringify(products, null, 2), (err)=>{
            if(err) console.error("Error writing file");
        })
    })
    res.render('addproduct');
})

app.get('/showproducts', (req, res)=>{
    const file = path.join(__dirname, 'public/products.json')
    fs.readFile(file, (err, data)=>{
        if(err){
            console.error("Error reading file")
        } else{
            let products = JSON.parse(data);
            res.render('showproducts', {products})
        }
    })
})

app.get('/editproduct/:id', (req, res)=>{
    const {id} = req.params;
    const file = path.join(__dirname, 'public/products.json');

    fs.readFile(file, (err, data)=>{
        let products = [];
        if(!err && data){
            products = JSON.parse(data);
            let product = products.find(product => product.id == id);

            res.render('editproduct', {product});
        }
    })
})
app.post('/editproduct/:id', (req, res)=>{
    const {title, description, price, image} = req.body;
    const {id} = req.params;
    const file = path.join(__dirname, 'public/products.json')

    fs.readFile(file, (err, data)=>{
        if(err){
            console.error("Error reading file")
        }
        else{
            let products = JSON.parse(data);
            let newProducts = products.map(product=>{
                if(product.id == id){
                    return{
                        ...product,
                        title,
                        description,
                        price,
                        image,
                    }
                }
                return product;
            })
            fs.writeFile(file, JSON.stringify(newProducts, null, 2), (err)=>{
                console.error("Error writing file")
            })
            res.redirect('/showproducts')
        }
    })

})

app.get('/deleteproduct/:id', (req, res)=>{
    const {id} = req.params;
    const file = path.join(__dirname, 'public/products.json')

    fs.readFile(file, (err, data)=>{
        if(err){
            console.error("Error reading file")
        }
        else{
            let products = JSON.parse(data);
            let updatedProducts = products.filter(product => product.id != id);

            fs.writeFile(file, JSON.stringify(updatedProducts, null, 2), (err)=>{
                if(err){
                    console.error("Error writing file");
                }
            })
            res.redirect('/showproducts');
        }
    })
})






app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})