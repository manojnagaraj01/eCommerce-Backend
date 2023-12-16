const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB`)

    } catch(error){
        console.log(`Error in MongoDB ${error}`)

    }
}

module.exports = {connectDB};