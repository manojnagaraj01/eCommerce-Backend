const userCollection = require("../models/userModel.js");
const asynchandler = require("express-async-handler");
const {generateToken} = require("../config/jwtToken.js")
const Cart = require("../models/cartmodel.js");
const Order = require("../models/orderModel.js")
// const {comparePassword,hashPassword}= require("../helpers/authHelper.js")
const validateMongooseId = require("../utils/validateMongodb.js")
const {generateRefreshToken} = require("../config/refreshToken.js")
const JWT = require("jsonwebtoken");
const uniqid = require("uniqid");
const productModel = require("../models/productModel.js");
//Profile

const profile = async (req, res) => {
  try {
    const userDetail = req.user;
    console.log(userDetail);
    res.send(userDetail);
  } catch (err) {
    console.log(err);
  }
};

//POST REGISTER
const registerController = asynchandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await userCollection.findOne({ email: email });
  if (!findUser) {
    const newUser = await userCollection.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//POST LOGIN
const loginController = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await userCollection.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const accessToken = generateToken(findUser._id);
    const refreshToken = await generateRefreshToken(findUser?._id);
    const upadteUser = await userCollection.findByIdAndUpdate(findUser.id, 
      {refreshToken:refreshToken},
      {new:true}
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
    res.json({
      message: "Login successful",
      user: {
        _id: findUser?._id,
        name: findUser?.name,
        email: findUser?.email,
        mobile: findUser?.mobile,
      },
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials. Login failed.",
    });
  }
});

//handle refreshtoken
const handleRefreshToken = asynchandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie)
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await userCollection.findOne({ refreshToken });
  // res.json(user)
  //if we dont find user
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  JWT.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
}
);


//logout user

const logout = asynchandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await userCollection.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await userCollection.findOneAndUpdate({refreshToken}, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

//get all users

const getalluser = asynchandler(async (req, res) => {
  try {
    const getUsers = await userCollection.find();
    res.json(getUsers);
  } catch (err) {
    throw new ErrorEvent(err);
  }
});

//get a user
const getSingleUser = asynchandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id)
  try {
    const getaUser = await userCollection.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//delete user
const deleteUser = asynchandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id)
  try {
    const deleteUser = await userCollection.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (err) {
    throw new Error(err);
  }
});

//update user
const updateUser = asynchandler(async (req, res) => {
  const { _id } = req.user;
  validateMongooseId(_id)
  try {
    const updateUser = await userCollection.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
    console.log(updateUser);
  } catch (err) {
    throw new Error(err);
  }
});

//block use 

const blockUser = asynchandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id)
  try {
    const blockusr = await userCollection.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user
const unblockUser = asynchandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id)
  try {
    const unblock = await userCollection.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});


//add to cart
const userCart = asynchandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  // validateMongooseId(_id);
  try {
    let products = [];
    const user = await userCollection.findById(_id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart
      console.log('deleted')
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      let getPrice = await productModel.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      let getImage = await productModel.findById(cart[i]._id).select("images").exec();
      object.images = getImage.images[0].imageOne;
      let getTitle = await productModel.findById(cart[i]._id).select("title").exec();
      object.title = getTitle.title;
      products.push(object);

      // console.log(getImage.images[0].imageOne)
      // console.log(getTitle.title);
    }
    // console.log(products)
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    })
    await newCart.save();
    res.json(newCart);
    // console.log(newCart)
  } catch (error) {
    throw new Error(error);
  }
});

//getusercart
const getUserCart = asynchandler(async (req, res) => {
  const { _id } = req.user;
  validateMongooseId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//empty cart
const emptyCart = asynchandler(async (req, res) => {
  const { _id } = req.user;
  const {id}=req.params
  // console.log(req.params)
  validateMongooseId(_id);
  console.log('empty working')
  try {
    const user = await userCollection.findOne({ _id });
    const cart = await Cart.findByIdAndDelete(id);
    console.log('empty cart',cart);
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});


// const createOrder = asynchandler(async (req, res) => {
//   const { COD} = req.body;
//   const { _id } = req.user;
//   validateMongooseId(_id);
//   try {
//     if (!COD) throw new Error("Create cash order failed");
//     const user = await userCollection.findById(_id);
//     let userCart = await Cart.findOne({ orderby: user._id });
//     let finalAmout = 0;
//     if (userCart.cartTotal) {
//       finalAmout = userCart.cartTotal;
//     }
//     let newOrder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmout,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();
//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await productModel.bulkWrite(update, {});
//     res.json({ message: "success" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//get orders
// const getOrders = asynchandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongooseId(_id);
//   try {
//     const userorders = await Order.findOne({ orderby: _id })
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//Update order status
// const updateOrderStatus = asynchandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongooseId(id);
//   try {
//     const updateOrderStatus = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       { new: true }
//     );
//     res.json(updateOrderStatus);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//get cartitems 

const getcartitems=async(req,resp)=>{
  const {_id}=req.user
  const findcart= await Cart.find({orderby:_id})
  // console.log('findcart',findcart)
  if(findcart){
    resp.json(findcart)
  }
  else{
    resp.json({message:'Unable to find the cart'})
  }
}

module.exports = {
  profile,
  registerController,
  loginController,
  getalluser,
  deleteUser,
  getSingleUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,logout,userCart,getUserCart,emptyCart,createOrder,
  getOrders,updateOrderStatus,
  getcartitems
};
