const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://manoj7778:test123@cluster0.9zmdjc5.mongodb.net/ecommerce?retryWrites=true&w=majority");
        console.log(`Connected to MongoDB`)

    } catch(error){
        console.log(`Error in MongoDB ${error}`)

    }
}

module.exports = {connectDB};