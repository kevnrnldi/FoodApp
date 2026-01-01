const mongoose = require('mongoose')

const categoriesModel = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        default: "https://png.pngtree.com/png-vector/20250323/ourlarge/pngtree-food-restaurant-logo-vector-png-image_15833884.png"
    },

})

module.exports = mongoose.model('Categories', categoriesModel)