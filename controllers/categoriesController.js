const categoriesModel = require('../models/categoriesModel')

const createCategoriesController = async (req,res) => {
    try{
        const {title, imageUrl} = req.body
        if(!title){
            return res.status(400).send({
                success:false,
                message:'Masukkan Data Anda dengan benar'
            })
        }
        const newCategories = new categoriesModel({
            title,
            imageUrl
        })
        await newCategories.save()
        res.status(201).send({
            success:true,
            message:'Categories Created',
            newCategories
        })

    }catch(e){
         res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const getAllCategoriesController = async (req, res) => {
    try {
        const checkCategories = await categoriesModel.find()
        if(!checkCategories){
            return res.status(400).send({
                success:false,
                message:'Categories Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Categories Found',
            total: checkCategories.length,
            checkCategories
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
    })
    }
}


const updateCategoriesController = async (req, res) => {
    try {
        const id = req.params.id
        const {title, imageUrl} = req.body
        const updateCategory = await categoriesModel.findByIdAndUpdate({_id:id}, {title, imageUrl}, {new:true, runValidators: true})
        if(!updateCategory){
            return res.status(400).send({
                success:false,
                message:'Categories Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Categories Updated',
            updateCategory
        })

    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const deleteCategoriesController = async (req, res) => {
    try {
        const {id} = req.params
        const category = await categoriesModel.findByIdAndDelete(id)
        if(!category){
            return res.status(400).send({
                success:false,
                message:'Categories Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Categories Deleted',
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

module.exports = {createCategoriesController, getAllCategoriesController, updateCategoriesController, deleteCategoriesController}