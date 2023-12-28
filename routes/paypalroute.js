const router = require("express").Router()

const {createorder}=require('../controllers/paypalcontroller')


router.post("/createorder",createorder)

module.exports=router

