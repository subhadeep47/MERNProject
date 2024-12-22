const express = require('express');
const route = express.Router();

//getting the database connection with respect to the collection in database
const UserData = require('../database/connection');

route.use(express.json());

const LoginAuth = async (req, res, next) =>{
    try{
        const {email, pass} = req.body;
        const user = await UserData.findOne({email:email});
        console.log(user);
        if(pass===user.pass){
            console.log('Successfully logged in!!');
            const cookie = await user.setToken();
            console.log(cookie);
            res.cookie('token', cookie, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            });
            req.user = user;
            next();
        }
        else{
            res.status(401).json({error:'Invalid credential!!'});
        }
    }catch(err){
        res.status(401).json({error:'User not found!!'});
    }
}



module.exports = LoginAuth;