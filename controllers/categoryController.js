const categoryModel = require("../models/categoryModel.js");



//CREATE CATEGORY
const createCategoryController = async (req,res) =>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                message:'Name is required',
            })
        }
            const existingCategory =await categoryModel.findOne({name})
            if(existingCategory){
                return res.status(200).send({
                    success:true,
                    message:"Category already exists"
                })
            }
            const category = await new categoryModel({name}).save()
            res.status(201).send({
                success:true,
                message:'New category created',
                category
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in category',
            error
        })
        
    }
  
}


//UPDATE CATEGORY
const updateCategoryController = async (req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate({id}, { name}, { new:true}
            )

        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while updating category",
            error
        })
        
    }
}

// GET ALL CATEGORIES
  
const categortController = async (req,res) =>{
    try {
        const category = await categoryModel.find({ })
        res.status(200).send({
            success:true,
            message:'All categories list',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all the categories"
        })
        
    }

}

//GET SINGLE CATEGORY
const singleCategoryController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Single Category successfully fetched",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category",
        })
        
    }

}

//DELETE CATEGORY

const deleteCategoryController = async (req,res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:" Category Successfully Deleted",
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting"
        })
        
    }
}

module.exports = { categortController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController }