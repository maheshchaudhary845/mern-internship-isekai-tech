// Middlewares with validations(joi package) - 30/01/2026
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const validate = require('./middlewares/validate')

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})