const mongoose = require("mongoose"); 

var cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Productdatas",
        },
        count: Number,
        price: Number,
        images:String,
        title:String,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);