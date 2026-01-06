const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { adminMiddleware } = require('../middlewares/adminMiddleware')
const { updateOrderController } = require('../controllers/foodController')
const {upload} = require('../middlewares/uploadMiddleware')
const router = express.Router()

const { createFoodController} =  require('../controllers/foodController')
const { getAllFoodController} =  require('../controllers/foodController')
const {getFoodController} = require('../controllers/foodController')
const {getFoodByRestaurantController} = require('../controllers/foodController')
const { updateFoodController } = require('../controllers/foodController')
const { deleteFoodController } = require('../controllers/foodController')

const {placeOrderController} = require('../controllers/foodController')
const {userOrderController} = require('../controllers/foodController')
const {getAllOrderController} = require('../controllers/foodController')
//Routes

//Food
router.post('/createFood', authMiddleware, upload.single('image'), createFoodController)

router.get('/getAllFood', authMiddleware, getAllFoodController)

router.get('/getFood/:id', authMiddleware, getFoodController)
router.get('/getFoodByRestaurant/:id', authMiddleware, getFoodByRestaurantController)

router.put('/updateFood/:id', authMiddleware, updateFoodController)
router.delete('/deleteFood/:id', authMiddleware, deleteFoodController)

//Order
router.post('/placeOrder', authMiddleware, placeOrderController)
router.put('/updateOrder/:id', authMiddleware, adminMiddleware, updateOrderController)
router.get('/userOrder', authMiddleware, userOrderController)
router.get('/getAllOrder', authMiddleware, adminMiddleware, getAllOrderController)
module.exports = router