const JWT = require("jsonwebtoken");
const userCollection = require("../models/userModel.js");
const asyncHandler = require("express-async-handler")

//PROTECTED ROUTES TOKEN BASE
const requireSignIn = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
        if (token) {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        const user = await userCollection.findById(decode?.id);
        req.user = user;
        next();
        }
  } catch (error) {
    throw new Error(error, "Not Authorised token expried. please explain");
  }}
  else{
    throw new Error("There is no token attached to header")

  }
})

//ADMIN ACCESS
const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = await userCollection.findById(req.user._id);
    if (user.isAdmin !== true) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
});

module.exports = { requireSignIn, isAdmin };
