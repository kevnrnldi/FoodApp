const express = require('express')

const router = express.Router()

const {getUserController} = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { updateUserController } = require('../controllers/userController')
const { resetPasswordController } = require('../controllers/userController')
const {updatePasswordController} = require('../controllers/userController')
const { deleteUserController } = require('../controllers/userController')

//Routes
router.get('/getUser', authMiddleware,getUserController)

router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

router.post('/updatePassword', authMiddleware, updatePasswordController)

router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router