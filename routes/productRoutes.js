
const router = require("express").Router()
const {getproduct,createproduct}=require('../controllers/productController')


// const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

// const { createProductController, 
//     deleteProductController, 
//     getProductControleer, 
//     getSingleProductController,
//     productCategoryController,
//     productCountController,
//     productFiltersController,
//     productListController, 
//     relatedProductController, 
//     searchProductController, 
//     updateProductController 
// } =  require("../controllers/productController.js");

//get all products

router.get("/productdetails",getproduct)
router.post("/createproduct",createproduct)

//routes
//CREATE PRODUCTS
// router.post("/create-product",requireSignIn,isAdmin, createProductController);

//GET ALL PRODUCTS
// router.get("/get-product", getProductControleer);

//GET SINGLE-PRODUCT
// router.get("/get-product/:slug",  getSingleProductController);

//DELETE PRODUCT
// router.delete("/delete-product/:pid", requireSignIn,isAdmin, deleteProductController);

//UPDATE PRODUCT
// router.patch('/update-product/:pid', requireSignIn,isAdmin, updateProductController);

//FILTER PRODUCT
// router.post('/product-filter', productFiltersController)

//PRODUCT COUNT
// router.get('/product-count',productCountController);

//PRODUCT PER PAGE
// router.get("/product-list/:page", productListController);

//SEARCH PRODUCT
// router.get("/search/:keyword", searchProductController);

//SIMILAR PRODUCT
// router.get("/related-product/:pid/:cid", relatedProductController);

//CATEGORY WISE PRODUCT
// router.get("/product-category/:slug", productCategoryController);

// export default router;


module.exports=router