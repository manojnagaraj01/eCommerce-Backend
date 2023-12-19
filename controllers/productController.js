const { ObjectId } = require("mongodb");
const productModel = require("../models/productModel.js");
// const userCollection = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
// const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await productModel.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  // validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await productModel.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    // validateMongoDbId(id);
    try {
      const deleteProduct = await productModel.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

//get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
        // console.log(queryObj);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = productModel.find(JSON.parse(queryStr));
  
      // Sorting   ?sort=category.brand
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");  //display created date
      }
  
      // limiting the fields   ?fields=title,price,category gives only provided,    ?fields=-title,-price,-category  gives all leaving mentioned
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination ?page=1&limit=3   gives page and products
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await productModel.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });
  
//get a single product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // console.log(id)
  try {
    const findProduct = await productModel.findById(id);
    console.log(findProduct)
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct, updateProduct,deleteProduct,getAllProduct,getaProduct };
