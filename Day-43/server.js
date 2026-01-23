const express = require('express')
const ejs = require('ejs')
const homeRoutes = require('./routes/homeRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', homeRoutes);
app.use('/users', userRoutes)


app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
})