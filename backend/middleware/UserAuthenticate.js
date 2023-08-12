const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

//getting the database connection with respect to the collection in database
const UserData = require('../database/connection');

route.use(express.json());

const UserAuth = async (req,res,next) =>{
    if(!req.cookies.token){
        res.json({message:"Not signed in"});
    }
    else{
        try{
            console.log('from userauth');
            const token = req.cookies.token;
            const verify = jwt.verify(token,process.env.SECRET_KEY);
            const user = await UserData.findOne({_id:verify._id, 'tokens.token':token});
            if(user){
                req.user = user;
                next();
            }
            else{
                res.status(404).json({error:'User not found'});
            }
        }catch(err){
            res.status(401).json({error:"Not authorized"});
        }
        
    }
}

module.exports = UserAuth;