const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');



const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
      const decoded =  JWT.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id)
      if(!user){
        return res.status(401).send({
            success: false,
            message: "Token tidak valid: Akun yang menggunakan token ini telah dihapus"
        })
      }  
      req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email,
        }
        next();
    }catch (e) {
        res.status(401).send({
            success: false,
            message: ("Akses Ditolak / Token Expired", e.message)
        })
    }
}


module.exports = {authMiddleware}