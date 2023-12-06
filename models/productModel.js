const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true,  
    },
    description:{
        type:String,
        require:true
    },
    rating:{
        type:Decimal128,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    imageOne:{
        type:String,
        require:true
    },
    imageTwo:{
        type:String,
        require:true
    },
    imageThree:{
        type:String,
        require:true
    },
},{timestamps:true}
);

const productModel =  mongoose.model('products', productSchema);
module.exports = productModel