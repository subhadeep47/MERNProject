const express = require('express');
const route = express.Router();
const Check = require('../middleware/Check');
const LoginAuth = require('../middleware/LoginAuthenticate');
const cookieParser = require('cookie-parser');

//getting the database connection with respect to the collection in database
const UserData = require('../database/connection');
const UserAuth = require('../middleware/UserAuthenticate');

route.use(cookieParser());
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

route.post('/login', LoginAuth, (req,res)=>{
    console.log('From login');
    res.send(req.user);
})

route.get('/getdata', UserAuth, (req,res)=>{
    console.log("from getdata");
    res.send(req.user);
})

route.get('/logout', UserAuth, async (req,res)=>{
    res.clearCookie('token');
    const name = req.user.name;
    await UserData.updateOne({name:name}, {$unset:{tokens:""}});
    res.json("Successfully logeed out!!");
})

module.exports = route;