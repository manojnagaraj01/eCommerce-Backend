const JWT = require('jsonwebtoken');
const userCollection = require('../models/userModel.js');

//PROTECTED ROUTES TOKEN BASE
const requireSignIn = async (req,res,next)=>{
   try {
      const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
      req.user = decode;
      next();
  } catch(error){
    console.log(error)
   }

}

//ADMIN ACCESS
const isAdmin = async (req,res,next)=>{
    try{
        const user = await userCollection.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            }) 
        } else{
            next();
        }
    }catch(error){
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware',    
        })

    }
}

module.exports = {requireSignIn, isAdmin}
