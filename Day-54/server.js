// MongoDB pagination - 12/02/2026

require('dotenv').config();

const express = require('express')
const productsRoutes = require('./routes/productsRoutes')
const connectDB = require('./config/db')

const app = express();
const port = 3000;

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/products', productsRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})