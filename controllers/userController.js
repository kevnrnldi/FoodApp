const express = require('express')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const router = express.Router()

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if(!user){
            return  res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
            user.password = undefined
            res.status(200).send({
            success: true,
            message: 'User Data',
            user
        })
       
    } catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
}


const updateUserController = async (req, res) => {
    try {
        const {userName, phone, address} = req.body
        const user = await userModel.findById(req.user.id)
        if(!user) {
            return  res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        if(userName){
            user.userName = userName
        }
        if(phone){
            user.phone = phone
        }
        if(address){
            user.address = address
        }
        await user.save()
        res.status(200).send({
            success: true,
            message: 'User Data Updated',
            user
        })

    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
 }

 const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            })
        }
        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(400).send({
                success: false,
                message: ('User not found', error)
            })
        }
         const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt) 
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Password updated'
        })
        
     } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message
        })
    } 
}

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not found'
            })
        }
        
        const {oldPassword, newPassword}= req.body

        if(!oldPassword || !newPassword){
           return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
           return res.status(400).send({
                success:false,
                message:'Password Lama Salah',
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Password Updated'
        })
    
    } catch (e){
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const targetUser = req.params.id
        const user = await userModel.findOneAndDelete({_id: targetUser})
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'User Deleted'
        })
    
    }catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
    }

//routes
module.exports = {getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController}