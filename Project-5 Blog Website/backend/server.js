require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-internship-isekai-tech.vercel.app"
    ]
}));
app.use('/uploads', express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/uploads', uploadRoutes);

app.use('/', (req, res)=>{
    res.json("API is running");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})