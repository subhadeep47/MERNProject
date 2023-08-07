const express = require('express');
const route = express.Router();

route.use(express.json());

const Check = (req,res,next)=>{
    console.log('from middlewire');
    let date = new Date()
    req.time = date.getHours() +':' +date.getMinutes() + ':' + date.getSeconds();
    next();
}

module.exports = Check;