const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async( req, res) => {
 try{
    const {userName, email, password, phone, address, role, answer} = req.body

    if(!userName || !email || !password || !phone || !address || !role || !answer){
       return res.status(400).send({
            success:false,
            message:'Masukkan Data Anda dengan benar'
        })
    }

    const filteredEmail = await userModel.findOne({email})
    if(filteredEmail){
        return res.status(400).send({
            success:false,
            message:'Email sudah terdaftar'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt) 
    const user = await userModel.create({
        userName,
        email,
        password: hashedPassword,
        phone,
        address,
        role,
        answer
    })


    res.status(201).send({
        success:true,
        message:'Register Berhasil',
        user,
    })

 }catch(e){
    res.status(500).send({
        success:false,
        message:'Register Gagal',
        error:e.message
    })
}

}


const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).send({
                success:false,
                message:'Masukkan Data Anda dengan benar'
            })
        }
        const user = await userModel.findOne({email : email})
        if(!user){
           return res.status(400).send({
                success:false,
                message:'Email belum terdaftar'
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
           return res.status(400).send({
                success:false,
                message:'Password salah',
            })
        }

        // if(user.password !== password){
        //     res.status(400).send({
        //         success:false,
        //         message:'Password salah'
        //     })
        // }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d',
        })
        user.password = undefined
        res.status(200).send({
            success:true,
            message:'Login Berhasil',
            user:{
                id:user._id,
                userName:user.userName,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
                answer:user.answer
            },
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Login Gagal',
            error:err.message
        })
    }

}


module.exports = {registerController, loginController};