const express = require('express');
const route = express.Router();

//getting the database connection with respect to the collection in database
const UserData = require('../database/connection');

route.use(express.json());

const Auth = (req, res, next) =>{
    const {email, pass} = req.body;
    UserData.findOne({email:email}).then((user)=>{
        console.log(user);
        if(pass===user.pass){
            console.log('Successfully logged in!!');
            req.user = user;
            next();
        }
        else{
            res.status(401).json({error:'Invalid credential!!'});
        }
    }).catch((err)=>{
        res.status(401).json({error:'User not found!!'});
    });
}



module.exports = Auth;