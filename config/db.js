const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
const cloudUrl = "mongodb+srv://manoj7778:test123@cluster0.9zmdjc5.mongodb.net/ecommerce?retryWrites=true&w=majority"

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(cloudUrl);
        console.log(`Connected to MongoDB`)

    } catch(error){
        console.log(`Error in MongoDB ${error}`)

    }
}

module.exports = {connectDB};