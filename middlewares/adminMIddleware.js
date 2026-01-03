const userModel = require('../models/userModel');



const adminMiddleware = async (req, res, next)=>{
    try {
        const user = await userModel.findById(req.user.id)
        if(user.role !== 'akuAdmin'){
            return res.status(401).send({
                success: false,
                message: "Only Admin Can Access"
            })
        } else {
        next();
        }
    }catch (e) {
        res.status(401).send({
            success: false,
            message: ("Akses Ditolak / Token Expired", e.message)
        })
    }
}


module.exports = {adminMiddleware}