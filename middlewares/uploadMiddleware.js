const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
 
const app = express();
 
// config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// area penyimpanan
const storage =  multer.memoryStorage()


// filtering gambar
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('File ini bukan gambar'), false)
    } 
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize:  5 * 1024 * 1024 
    
    }
})

module.exports = {upload, cloudinary}