const mongoose = require('mongoose');

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
            date:{type:String}
        }
    ]
});

const UserData = new mongoose.model('userdatas', schema);

module.exports = UserData;