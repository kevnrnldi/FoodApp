const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()

const { createFoodController} =  require('../controllers/foodController')
const { getAllFoodController} =  require('../controllers/foodController')
const {getFoodController} = require('../controllers/foodController')
const {getFoodByRestaurantController} = require('../controllers/foodController')
const { updateFoodController } = require('../controllers/foodController')
const { deleteFoodController } = require('../controllers/foodController')
//Routes
router.post('/createFood', authMiddleware, createFoodController)

router.get('/getAllFood', authMiddleware, getAllFoodController)

router.get('/getFood/:id', authMiddleware, getFoodController)
router.get('/getFoodByRestaurant/:id', authMiddleware, getFoodByRestaurantController)

router.put('/updateFood/:id', authMiddleware, updateFoodController)
router.delete('/deleteFood/:id', authMiddleware, deleteFoodController)

module.exports = router