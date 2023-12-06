const router = require("express").Router()
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");
const { categortController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } = require("../controllers/categoryController.js");


//create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.patch("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

//GET ALL CATEGORIES
router.get("/get-category", categortController);

//Single category
router.get("/single-category/:slug", singleCategoryController);

//Delete category
router.delete("/delete-categort/:pid",requireSignIn,isAdmin, deleteCategoryController);

module.exports =  router;