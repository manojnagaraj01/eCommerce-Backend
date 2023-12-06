const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        lowercase:true
    }
})

const catagoryModel =  mongoose.model('Category', categorySchema);
module.exports = catagoryModel