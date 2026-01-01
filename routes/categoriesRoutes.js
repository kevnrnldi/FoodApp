const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()
const { createCategoriesController } = require('../controllers/categoriesController')
const{ getAllCategoriesController } = require('../controllers/categoriesController')
const { updateCategoriesController } = require('../controllers/categoriesController')
const {deleteCategoriesController} = require('../controllers/categoriesController')

//Routes
router.post('/createCategories', authMiddleware, createCategoriesController)
router.get('/getAllCategories', authMiddleware, getAllCategoriesController)
router.put('/updateCategories/:id', authMiddleware, updateCategoriesController)
router.delete('/deleteCategories/:id', authMiddleware, deleteCategoriesController)
module.exports = router