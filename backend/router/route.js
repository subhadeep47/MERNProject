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
    res.send(req.user);
})

route.get('/getdata', UserAuth, (req,res)=>{
    res.send(req.user);
})

route.get('/logout', UserAuth, async (req,res)=>{
    res.clearCookie('token');
    const name = req.user.name;
    await UserData.updateOne({name:name}, {$unset:{tokens:""}});
    res.json("Successfully logged out!!");
})

route.post('/addPost', async (req,res)=>{
    try{
        const { _id, post, isAnonymous } = req.body;
        const newMessage = {
            message: post,
            like: 0,
            date: new Date(),
            isAnonymous
        };
        await UserData.updateOne(
            { _id: _id },
            { $push: { messages: newMessage } }
        );
        const data = await UserData.findOne(
            { _id: _id },
            { pass: 0, cpass: 0, tokens: 0 }
        );
        res.send(data);
    }catch(err){
        console.log(err);
        res.status(401).json({err:"Problem with adding post"});
    }
})

route.post('/deletePost', async (req,res)=>{
    try{
        const {msg_id,_id} = req.body;
        await UserData.updateOne({_id:_id},{$pull:{messages:{_id:msg_id}}});
        await UserData.updateMany({}, {$pull:{likedMessages:msg_id}});
        const data = await UserData.findOne({_id:_id},{pass:0,cpass:0,tokens:0});
        res.send(data);
    }catch(err){
        res.status(401).json({err:"Problem with delete post"});
    }
})

route.get('/getFeedData', async (req,res)=>{
    try{
        const data = await UserData.aggregate([
            { $unwind: "$messages" },
            {
                $project: {
                    _id:1,
                    name: 1,
                    email: 1,
                    number: 1,
                    "messages.message": 1,
                    "messages.like": 1,
                    "messages.date": 1,
                    "messages.isAnonymous": 1,
                    "messages._id": 1
                }
            },
            { $sort: { "messages.date": -1 } },
        ]);
        res.send(data);
    }catch(err){
        res.status(401).json({err:"Problem with getting data"});
    }
})

route.post('/like', async (req,res)=>{
    try{
        await UserData.updateOne({'messages._id':req.body.msg_id},{$inc:{'messages.$.like':1}});
        await UserData.updateOne({_id:req.body.my_id},{$push:{likedMessages:req.body.msg_id}});
        const feed = await UserData.aggregate([
            { $unwind: "$messages" },
            {
                $project: {
                    _id:1,
                    name: 1,
                    email: 1,
                    number: 1,
                    "messages.message": 1,
                    "messages.like": 1,
                    "messages.date": 1,
                    "messages.isAnonymous": 1,
                    "messages._id": 1
                }
            },
            { $sort: { "messages.date": -1 } },
        ]);
        const user = await UserData.findOne({_id:req.body.my_id},{pass:0,cpass:0,tokens:0});
        const data = {feed:feed,user:user};
        res.send(data);
    }catch(err){
        res.status(401).json({err:err});
    }
})

route.post('/unlike', async (req,res)=>{
    try{
        await UserData.updateOne({'messages._id':req.body.msg_id},{$inc:{'messages.$.like':-1}});
        await UserData.updateOne({_id:req.body.my_id},{$pull:{likedMessages:req.body.msg_id}});
        const feed = await UserData.aggregate([
            { $unwind: "$messages" },
            {
                $project: {
                    _id:1,
                    name: 1,
                    email: 1,
                    number: 1,
                    "messages.message": 1,
                    "messages.like": 1,
                    "messages.date": 1,
                    "messages.isAnonymous": 1,
                    "messages._id": 1
                }
            },
            { $sort: { "messages.date": -1 } },
        ]);
        const user = await UserData.findOne({_id:req.body.my_id},{pass:0,cpass:0,tokens:0});
        const data = {feed:feed,user:user};
        res.send(data);
    }catch(err){
        res.status(401).json({err:err});
    }
})

route.post('/editmsg', async (req,res)=>{
    try{
        const {msg_id, msg, my_id} = req.body;
        await UserData.updateOne({'messages._id':msg_id},{$set:{'messages.$.message':msg}});
        const user = await UserData.findOne({_id:my_id},{pass:0,cpass:0,tokens:0});
        res.send(user);
    }catch(err){
        res.status(401).json({err:err});
    }
})

route.post('/edituser', async (req, res)=>{
    try{
        const {_id, name, email, number} = req.body;
        await UserData.updateOne({_id:_id}, {$set:{name:name,email:email,number:number}});
        const user = await UserData.findOne({_id:_id},{pass:0,cpass:0,tokens:0});
        res.send(user);
    }catch(err){
        res.status(401).json({err:err});
    }
})

route.get('/check-login', (req, res) => {
    if (req.cookies.token) {
      res.send({ loggedIn: true });
    } else {
      res.send({ loggedIn: false });
    }
  });

module.exports = route;