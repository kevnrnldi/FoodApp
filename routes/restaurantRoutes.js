const express = require('express')
const { createRestaurantController } = require('../controllers/restaurantController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getAllRestaurantController} = require('../controllers/restaurantController')
const { getRestaurantController } = require('../controllers/restaurantController')
const { deleteRestaurantController } = require('../controllers/restaurantController')
const { adminMiddleware} = require('../middlewares/adminMiddleware')
const { upload } = require('../middlewares/uploadMiddleware')
const router = express.Router()



//Routes
router.post('/createRestaurant', authMiddleware, adminMiddleware,upload.single('image'), createRestaurantController)
router.get('/getAllRestaurant', authMiddleware, getAllRestaurantController)
router.get('/getRestaurant/:id', authMiddleware, getRestaurantController)
router.delete('/deleteRestaurant/:id', authMiddleware, adminMiddleware, deleteRestaurantController)
module.exports = router