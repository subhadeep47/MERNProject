const express = require('express');
const app = express();

//for securing the important file in config.env
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//using middlewires for all routing paths using express router
app.use(require('./router/route'));

PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if(err)
        console.log('there is some error');
    else   
        console.log(`Server running at ${PORT}`);
})