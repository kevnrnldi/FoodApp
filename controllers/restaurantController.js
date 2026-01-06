const restaurantModel = require('../models/restaurantModel')
const {cloudinary} = require('../middlewares/uploadMiddleware')

const createRestaurantController = async (req,res) => {
try{
    const {title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coordinate} = req.body
    if(!req.file){
        return res.status(400).send({
            success:false,
            message:'Please Upload Image'
        })
    }
    if(!title ){
        return res.status(400).send({
            success:false,
            message:'Masukkan Data Anda dengan benar'
        })
    }

    //ubah letak file dari buffer(ram) ke base64(cloudinary)
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const dataURL = "data:" + req.file.mimetype + ";base64," + b64

    const uploadResponse = await cloudinary.uploader.upload(dataURL, {
        folder: "food-app-project/restaurant"
    })


    const newRestaurant = new restaurantModel({
            title,
            imageUrl: uploadResponse.secure_url,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coordinate
    })

    await newRestaurant.save()
    res.status(201).send({
        success:true,
        message:'Restaurant Created',
        newRestaurant
    })
} catch (e){
    res.status(500).send({
        success:false,
        message:e.message
    })
}
}

const getAllRestaurantController = async (req,res) => {
    try{
        const {keyword} = req.query
        const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {};
        const checkRestaurant = await restaurantModel.find(query)
        if(!checkRestaurant){
            return res.status(400).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Restaurant Found',
            total: checkRestaurant.length,
            checkRestaurant
        })
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const getRestaurantController = async (req,res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        const restaurant = await restaurantModel.findById(id)
        if(!restaurant){
            return res.status(400).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Restaurant Found',
            restaurant
        })
    } catch (e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

const deleteRestaurantController = async (req,res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        const checkRestaurant = await restaurantModel.findByIdAndDelete(id)
        if(!checkRestaurant){
            return res.status(400).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Restaurant Deleted',
        })
    } catch (e){
        res.send({
            success:false,
            message:e.message
        })
    }
}

module.exports = {createRestaurantController, getAllRestaurantController, getRestaurantController, deleteRestaurantController}