const express = require('express')
const { createRestaurantController } = require('../controllers/restaurantController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getAllRestaurantController} = require('../controllers/restaurantController')
const { getRestaurantController } = require('../controllers/restaurantController')
const { deleteRestaurantController } = require('../controllers/restaurantController')
const router = express.Router()



//Routes
router.post('/createRestaurant', authMiddleware, createRestaurantController)
router.get('/getAllRestaurant', authMiddleware, getAllRestaurantController)
router.get('/getRestaurant/:id', authMiddleware, getRestaurantController)
router.delete('/deleteRestaurant/:id', authMiddleware, deleteRestaurantController)
module.exports = router