const express = require('express');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use((req, res, next)=>{
//     console.log(req);
//     next();
// })

// app.get('/', (req, res)=>{
//     res.send("<h1>Hello from server!</h1>")
//     // res.status(200).json({message: "Hello"})
// })

app.use('/users', usersRoutes);


app.listen(port, ()=>{
    console.log("Server is running on http://localhost:"+port);
})