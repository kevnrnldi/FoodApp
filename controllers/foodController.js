const { get } = require('mongoose')
const foodModel = require('../models/foodModel')
const orderModel = require('../models/orderModel')
const {cloudinary} = require('../middlewares/uploadMiddleware')

const createFoodController = async (req,res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating, ratingCount } = req.body
        if(!req.file){
            return res.status(400).send({
                success:false,
                message:'Please Upload Image'
            })
        }
        if(!title || !description || !price || !restaurant){
            return res.status(400).send({
                success:false,
                message:'Masukkan Data Anda dengan benar'
            
            })
        }

        //ubah letak file dari buffer(ram) ke base64(cloudinary)
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const dataURL = "data:" + req.file.mimetype + ";base64," + b64

        const uploadResponse = await cloudinary.uploader.upload(dataURL,{
            folder: "food-app-project/food"
        })

        const newFood = new foodModel({
            title, 
            description, 
            price, 
            imageUrl: uploadResponse.secure_url,
            foodTags, category, code, isAvailable, restaurant, rating, ratingCount
        })

        if(rating > 5 || rating < 0){
            return res.status(400).send({
                success:false,
                message:'Rating harus diantara 0-5'
            })
        }

        await newFood.save()
        res.status(201).send({
            success:true,
            message:'Food Created',
            newFood
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const getAllFoodController = async (req,res) =>{
    try {
        const {keyword} = req.query
        const query = keyword ? { title: { $regex: keyword, $options:'i'} } : {}
        const checkFood = await foodModel.find(query).populate('restaurant','title logoUrl')
        if(!checkFood){
            return res.status(400).send({
                success:false,
                message:'Food Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Food Found',
            total: checkFood.length,
            checkFood
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const getFoodController =  async (req,res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Please Fill All The Fields'
            })
        }
        const checkFood = await foodModel.findById({_id: id})
        if(!checkFood){
            return res.status(400).send({
                success:false,
                message:'Food Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Food Found',
            checkFood
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const getFoodByRestaurantController = async (req,res) => {

    try {
         const idRestaurant = req.params.id
    if(!idRestaurant) {
        return res.status(400).send({
            success:false,
            message:'Please Fill All The Fields'
        })
    }
    const RestaurantFood  = await foodModel.find({restaurant:idRestaurant})
    if(!RestaurantFood){
        return res.status(400).send({
            success:false,
            message:'Food Not Found'
        })
    }
    res.status(200).send({
        success:true,
        message:'Food Found',
        RestaurantFood
    })     
    } catch (e) {
        res.send(500).send({
            success:false,
            message:e.message
        })
    }
}

const updateFoodController = async (req,res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Please Fill All The Fields'
            })
        }
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, rating, restaurant, ratingCount } = req.body
        const updateFood = await foodModel.findByIdAndUpdate({_id:id}, {title, description, price, imageUrl, foodTags, category, restaurant, code, isAvailable, rating, ratingCount}, {new:true, runValidators:true})
        if(!updateFood){
            return res.status(400).send({
                success:false,
                message:'Food Not Found'
            })
        }

        res.status(200).send({
            success:true,
            message:'Food Updated',
            updateFood
        })
    } catch (error) {
        res.send(500).send({
            success:false,
            message:error.message
        })
    }
}

const deleteFoodController = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Please Fill All The Fields'
            })
        }
        const checkFood = await foodModel.findByIdAndDelete(id)
        if(!checkFood){
            return res.status(400).send({
                success:false,
                message:'Food Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Food Deleted',
        })
    } catch (e) {
        res.send(500).send({
            success:false,
            message:e.message
        })
    }
}

const placeOrderController = async (req, res) =>{
    try {
        const {cart } = req.body
        if(!cart){
            return res.status(400).send({
                success:false,
                message:'Please Fill All The Fields'
            })
        }  
        let total = 0
        cart.map((item) => {
            total+= item.price
        }) 
        const newOrder = new orderModel({
            foods:cart,
            payment: total,
            buyer:req.user.id
        })
        await newOrder.save()
        res.status(201).send({
            success:true,
            message:'Order Created',
            totalPrice: total,
            newOrder
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const updateOrderController = async (req, res) => {
    try {
        const id = req.params.id
        const {status} = req.body
        const updateOrder = await orderModel.findByIdAndUpdate({_id:id}, {status}, {new:true, runValidators:true})
        if(!updateOrder){
            return res.status(400).send({
                success:false,
                message:'Order Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Order Updated',
            updateOrder
        }) 
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const userOrderController = async (req, res) => {
    try {
        const id = req.user.id
        const userOrder = await orderModel.find({buyer:id})
        .populate('foods','title price imageUrl').populate('buyer','userName phone address')
        if(!userOrder){
            return res.status(400).send({
                success:false,
                message:'Order Not Found'
            })
        }
        if(userOrder.length === 0){
            return res.status(400).send({
                success:false,
                message:'No Order Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Order Found',
            userOrder
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    } 
}

const getAllOrderController = async (req, res) => {
    try {
        const {keyword} = req.query
        const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {};
        const checkOrder = await orderModel.find(query).populate('foods','title price imageUrl').populate('buyer','userName phone address')
        if(!checkOrder){
            return res.status(400).send({
                success:false,
                message:'Order Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Order Found',
            total: checkOrder.length,
            checkOrder
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}
module.exports = { createFoodController, getAllFoodController, getFoodController, 
    getFoodByRestaurantController, updateFoodController, 
    deleteFoodController, placeOrderController, 
    updateOrderController, userOrderController, getAllOrderController } 