const express = require('express');
const cors = require('cors')
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


app.use('/users', usersRoutes);


app.listen(port, ()=>{
    console.log("Server is running on http://localhost:"+port);
})