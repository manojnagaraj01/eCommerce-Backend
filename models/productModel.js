const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type:String,
      required :true
    },
    brand: {
      type: String,
      required :true
      
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
      select:false
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
    //   required :true
    },
    rating: {
        type:Number,
        require:true
    }
  },
  { timestamps: true }
);

const productModel = mongoose.model("Productdatas", productSchema);
module.exports = productModel;
