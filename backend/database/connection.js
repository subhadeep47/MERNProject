const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const dburl = process.env.dburl

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection successful!!');
}).catch((err)=>{
    console.log(err);
});

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    pass:{
        type: String,
        required: true,
    },
    cpass:{
        type: String,
        required: true,
    },
    messages:[
        {
            message:{type:String},
            like:{type:Number},
            date:{type:String}
        }
    ],
    tokens:[
        {
            token:{type:String}
        }
    ],
    likedMessages:[
        {
            msgid:{type:String},
        }
    ]
});

schema.methods.setToken = async function(){
    try{
        console.log("from connection");
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const UserData = new mongoose.model('userdatas', schema);

module.exports = UserData;