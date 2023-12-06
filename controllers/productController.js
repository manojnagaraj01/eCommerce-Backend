// import slugify from "slugify";
const productModel = require("../models/productModel.js");
// import categoryModel from "../models/categoryModel.js";
//import fs from 'fs';      //file system


const createproduct=async(req,resp)=>{
    const {productTitle,category,price,product,description,quantity,brand,imageOne,imageTwo, imageThree,rating}=req.body
    const find= await productModel.find()
    if(find){
       const  productdata=new productModel({
            productTitle:productTitle,
            category:category,
            price:price,
            product:product,
            description:description,
            quantity:quantity,
            brand:brand,
            imageOne:imageOne,
            imageTwo:imageTwo,
            imageThree:imageThree,
            rating:rating
       })

       await productdata.save()
       resp.json({sucess:true,message:'data created'})
    }
    else{
        resp.json({sucess:false,message:'server error'})
    }


}
const getproduct=async(req,resp)=>{
    const productData=await productModel.find()
    console.log(productData)
    resp.json({sucess:true,message:'details fetced',productData})
}

// const createProductController = async(req,res)=>{
//     try {
//         const {name,description,price,category,quantity} = req.fields         
//         switch(true){
//             case !name:
//                 return res.status(500).send({error:'Name is required'})
//             case !description:
//                 return res.status(500).send({error:'Descriptioon is required'})
//             case !price:
//                 return res.status(500).send({error:'Price is required'})
//             case !category:
//                 return res.status(500).send({error:'Category is required'})
//             case !quantity:
//                 return res.status(500).send({error:'Quantity is required'}) 
          
//         }
 
//         const products = new productModel({...req.fields})

//         await products.save()
//         res.status(201).send({
//             success:true,
//             message:"Product Created Successfully",
//             products
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             error,
//             message:'Error in creating product'
//         })
        
//     }
// }

//get all products
// const getProductControleer = async(req,res) =>{
//     try {
//         const products = await productModel.find({}).populate('category').limit(12).sort({createdAt:-1})
//         res.status(200).send({
//             success:true,
//             countTotal:products.length,
//             message:'All Products', 
//             products
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in getting products',
//             error: error.message
//         })
//     }

// }

//GET SINGLE PRODUCT
// const getSingleProductController = async(req,res)=>{
//     try {
//         const product = await productModel.findOne({slug:req.params.slug}).populate('category')
//         res.status(200).send({
//             success:true,
//             message:"Single product successfully fetched",
//             product
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error while getting single product"
//         })
//     }

// }

//DELETE PRODUCT
// const deleteProductController = async (req,res)=>{
//     try {
//        // const {id} = req.params
//         await productModel.findByIdAndDelete(req.params.pid)
//         res.status(200).send({
//             success:true,
//             message:"Product deleted successfully"
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error while deleting product"
//         })
//     }

// }

//UPDATE PRODUCT 
// const updateProductController =  async(req,res)=>{
//     try {
//         const {name,slug,description,price,category,quantity,shipping} = req.fields    
//         switch(true){
//             case !name:
//                 return res.status(500).send({error:'Name is required'})
//             case !description:
//                 return res.status(500).send({error:'Descriptioon is required'})
//             case !price:
//                 return res.status(500).send({error:'Price is required'})
//             case !category:
//                 return res.status(500).send({error:'Category is required'})
//             case !quantity:
//                 return res.status(500).send({error:'Quantity is required'}) 
//          //   case !photo && photo.size >1000000:
//          //       return res.status(500).send({error:'Photo is required and should be less then 1mb'})          
//         }
        

//         const products = await productModel.findByIdAndUpdate(req.params.pid,
//             {...req.fields,slug:slugify(name)},
//             {new:true}
//             );
//             await products.save();
//             res.status(201).send({
//                 success:true,
//                 message:"Product updated successfully",
//                 products
//             })
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error while updating product"
//         })
//     }

// }

//FILTER PRODUCT
// const productFiltersController = async (req,res)=>{
//     try {
//         const {} = productModel
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error while filtering products',
//             error
//         })
//     }

// }

//PRODUCT COUNT
// const productCountController = async (req,res)=>{
//     try {
//         const total = await productModel.find({}).estimatedDocumentCount()
//         res.status(200).send({
//             success:true,
//             total
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:true,
//             message:"Error while Counting Products",
//             error
//         })
//     }

// }

//PRODUCT LIST BASED ON PAGE
// const productListController =  async (req,res)=>{
//     try {
//         const perPage = 6;
//         const page = req.params.page ? req.params.page : 1
//         const products = await productModel
//         .find({})
//         .skip((page-1)*perPage)
//         .limit(perPage)
//         .sort({createdAt:-1})
//         res.status(200).send({
//             success:true,
//             products
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in per page controller',
//             error
            
//         })
//     }
// }

//SEARCH PRODUCT
// const searchProductController = async(req,res)=>{
//     try {
//         const {keyword} = req.params

//         const result = await productModel.find({
//             $or: [
//                 {name:{$regex :keyword, $options:"i"}}, //here "i" : case insesitive
//                 {description:{$regex :keyword, $options:"i"}}
//             ]
//         })
//         res.json(results)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error while searching products",
//             error
//         })
//     }

// }

//SIMILAR PRODUCT
// const relatedProductController = async (req,res)=>{
//     try {
//         const {pid,cid} =  req.params
//         const products = await productModel.find({
//             category:cid,
//             _id:{$ne:pid}                //$ne - not-include
//         }).limit(5).populate('category')
//         res.status(200).send({
//             success:true,
//             products
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:true,
//             message:"Error while fetching simllar products",
//             error
//         })
//     }

// }

//GET PRODUCTS BY CATEGORY
// const productCategoryController = async (req,res)=>{
//     try {
//         const category = await categoryModel.findOne({slug:req.params.slug})
//         const products  = await productModel.find ({category}).populate('category')
//         res.status(200).send({
//             success:true,
//             category,
//             products
//         })
        
//     } catch (error) {
//        console.log(error)
//        res.status(500).send({
//         success:false,
//         message:"Failed to get products by category",
//         error
//        }) 
//     }

// }


// const addtoCart = async(req,res)=>{
//     const data = req.body;
//     const res= await productModel.create(data)
// }
 
// module.exports ={ createProductController, 
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
// }

module.exports={getproduct,createproduct}