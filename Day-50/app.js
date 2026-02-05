const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const user= {
    id: 1,
    name: "Mahesh Chaudhary",
    email: "maheshchaudhary@gmail.com",
    password: bcrypt.hashSync('mahesh123', 10),
    role: "admin"
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const jwt_secret = "aDzItZu8PsiwpfOF0WFyEgf7xY2HrYAjKnMCa20F8CU=";

app.get('/', (req, res)=>{
    res.status(200).json({
        message: "Hello from server"
    })
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if(email != user.email){
        return res.status(401).json({
            message: "Email is incorrect"
        })
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch){
       return res.status(401).json({message: "Password is incorrect"});
    }

    const token = jwt.sign(
        {id: user.id, role: user.role},
        jwt_secret,
        {expiresIn: "1d"}
    )

    res.json({
        data: user,
        token
    })


})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})