const express = require('express');
const route = express.Router();
const Check = require('../middleware/Check');
const Auth = require('../middleware/Authenticate');

//getting the database connection with respect to the collection in database
const UserData = require('../database/connection');


route.use(express.json());

route.get('/',Check, (req,res)=>{
    console.log('from path');
    res.send(`Requested at ${req.time}`);
})

route.post('/register', (req,res)=>{
    console.log(req.body);
    const data = new UserData(req.body);
    data.save().then(()=>{
        console.log('Successfully registered');
        res.status(200).send();
    }).catch((err)=>{
        console.log('Can not register the user '+err);
        res.status(401).send();
    });
})

route.post('/login', Auth, (req,res)=>{
    console.log();
    res.send(req.user);
})

module.exports = route;