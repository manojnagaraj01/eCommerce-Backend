const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    role:{
        type: Number,
        default:0,
    },
    answer:{
        type:String,
        // required:true
    }
},
    {timestamps:true}
)

const userCollection =  mongoose.model('Users',userSchema);
module.exports = userCollection