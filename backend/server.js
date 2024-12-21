const express = require('express');
const cors = require('cors')
const app = express();

//for securing the important file in config.env
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//using middlewires for all routing paths using express router
app.use(require('./router/route'));

const corsOption = {
    origin: ['https://social-app-backend-vcwx.onrender.com'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if(err)
        console.log('there is some error');
    else   
        console.log(`Server running at ${PORT}`);
})
