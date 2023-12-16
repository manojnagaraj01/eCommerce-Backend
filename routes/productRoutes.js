
const router = require("express").Router()
const {createProduct,updateProduct,deleteProduct,getaProduct,getAllProduct}=require('../controllers/productController')


const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");


//get all products

router.post("/",requireSignIn,isAdmin,createProduct)
// router.post("/createproduct",createproduct)

//GET Single PRODUCTS
router.get("/",getAllProduct);

//GET SINGLE-PRODUCT
router.get("/:id",getaProduct);

//update a product
router.put("/:id",requireSignIn,isAdmin,updateProduct);

//DELETE PRODUCT
router.delete("/:id", requireSignIn,isAdmin,deleteProduct);


module.exports=router