require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use('/uploads', express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})