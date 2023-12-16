const mongoose = require("mongoose");
const validateMongooseId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) {
        throw new Error("this id is not valid or not found")
    }
};
module.exports = validateMongooseId;