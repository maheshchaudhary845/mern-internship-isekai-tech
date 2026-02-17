const express = require('express')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})