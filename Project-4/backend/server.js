require('dotenv').config();

const express = require('express');
const cors = require('cors')
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


app.use('/users', usersRoutes);
app.use('/products', productsRoutes);


app.listen(port, ()=>{
    console.log("Server is running on http://localhost:"+port);
})