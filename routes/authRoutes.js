const router = require("express").Router()
const {registerController,loginController, getalluser, deleteUser,
    getSingleUser,blockUser,unblockUser,
    updateUser,userCart,getUserCart,
    handleRefreshToken,emptyCart,
    logout,getcartitems} = require('../controllers/authController.js');
const {requireSignIn , isAdmin} = require('../middlewares/authMiddleware.js');


//routing
//REGISTER || POST METHOD
router.post("/register", registerController);

//LOGIN || POST METHOD
router.post("/login", loginController);

//usercart
router.post("/addcart", requireSignIn, userCart);

//create order
// router.post("/cart/cash-order", requireSignIn, createOrder);

//getcartitems
router.get("/getcartitems",requireSignIn,getcartitems)

//
// router.put("/update-order/:id", requireSignIn, isAdmin,updateOrderStatus);

//getalluser
router.get("/get-allusers", getalluser)

//get order
// router.get("/get-orders", requireSignIn, getOrders);
//refresh
router.get("/refresh",handleRefreshToken);

//logout
router.get("/logout",logout);


// get user cart
router.get("/cart", requireSignIn, getUserCart);

//getSingleuser
router.get("/:id", requireSignIn,isAdmin,getSingleUser)



//emptycart
router.delete("/:id", requireSignIn,emptyCart);

//deleteeuser
router.delete("/:id", deleteUser)



//updateuser
router.put("/edit-user", requireSignIn,isAdmin ,updateUser);

//block
router.put("/block-user/:id", requireSignIn, isAdmin,blockUser);

//unblock
router.put("/unblock-user/:id", requireSignIn, isAdmin,unblockUser);



module.exports = router;