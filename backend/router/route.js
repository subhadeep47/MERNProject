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

route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
    // console.log('From login');
    res.send(req.user);
})

route.get('/getdata', UserAuth, (req,res)=>{
    // console.log("from getdata");
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
        const {_id, post} = req.body;
        let currentdate = new Date(); 
        let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        await UserData.updateOne({_id:_id},{$push:{messages:{message:post,like:0,date:datetime}}});
        const data = await UserData.findOne({_id:_id},{pass:0,cpass:0,tokens:0});
        res.send(data);
    }catch(err){
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
        const data = await UserData.find({},{pass:0,cpass:0,tokens:0}).sort({'messages.date':-1});
        res.send(data);
    }catch(err){
        res.status(401).json({err:"Problem with getting data"});
    }
})

route.post('/like', async (req,res)=>{
    try{
        await UserData.updateOne({'messages._id':req.body.msg_id},{$inc:{'messages.$.like':1}});
        await UserData.updateOne({_id:req.body.my_id},{$push:{likedMessages:req.body.msg_id}});
        const feed = await UserData.find({},{pass:0,cpass:0,tokens:0}).sort({'messages.date':-1});
        const user = await UserData.findOne({_id:req.body.my_id},{pass:0,cpass:0,tokens:0});
        const data = {feed:feed,user:user};
        res.send(data);
    }catch(err){
        console.log(err);
        res.status(401).json({err:err});
    }
})

route.post('/unlike', async (req,res)=>{
    try{
        await UserData.updateOne({'messages._id':req.body.msg_id},{$inc:{'messages.$.like':-1}});
        await UserData.updateOne({_id:req.body.my_id},{$pull:{likedMessages:req.body.msg_id}});
        const feed = await UserData.find({},{pass:0,cpass:0,tokens:0}).sort({'messages.date':-1});
        const user = await UserData.findOne({_id:req.body.my_id},{pass:0,cpass:0,tokens:0});
        const data = {feed:feed,user:user};
        res.send(data);
    }catch(err){
        console.log(err);
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


module.exports = route;