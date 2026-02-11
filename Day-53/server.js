// MongoDB - 11-02-2026

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})