const restaurantModel = require('../models/restaurantModel')

const createRestaurantController = async (req,res) => {
try{
    const {title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coordinate} = req.body
    if(!title || !coordinate){
        return res.status(400).send({
            success:false,
            message:'Masukkan Data Anda dengan benar'
        })
    }
    const newRestaurant = new restaurantModel({
            title,
            imageUrl,
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