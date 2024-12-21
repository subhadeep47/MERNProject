const express = require('express');
const cors = require('cors')
const app = express();

//for securing the important file in config.env
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//using middlewires for all routing paths using express router
app.use(require('./router/route'));

app.use(cors({
    origin: 'https://social-app-frontend-2l19.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if(err)
        console.log('there is some error');
    else   
        console.log(`Server running at ${PORT}`);
})
