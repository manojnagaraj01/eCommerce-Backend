const router = require("express").Router()
const {registerController,loginController,testController, forgotPasswordController, updateProfileController} = require('../controllers/authController.js');
const {requireSignIn , isAdmin} = require('../middlewares/authMiddleware.js');


//routing
//REGISTER || POST METHOD
router.post("/register", registerController);

//LOGIN || POST METHOD
router.post("/login", loginController);

//FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//PROTECTED USER ROUTE AUTH
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//PROTECTED ADMIN ROUTE AUTH
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

//UPDATE PROFILE
router.put('/update-profile', requireSignIn, updateProfileController)



module.exports = router;