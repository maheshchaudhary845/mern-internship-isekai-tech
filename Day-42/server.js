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

async function getUsers(file) {
    const data = await fsPromises.readFile(file)
    let users = JSON.parse(data);
    return users;
}

app.get('/', (req, res) => {
    // res.send("Hello from express server");
    res.render("index", { name: "" });
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
    const file = path.join(__dirname, 'public/users.json')
    const { id } = req.params;

    let users = await getUsers(file)
    let user = users.find(user => user.id == id)
    res.render('edit', { user })
})
// app.post('/edit')

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})