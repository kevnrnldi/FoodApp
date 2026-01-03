const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please add the food name']
    },
    description : {
        type : String,
        required : [true, 'Please add the food description']
    },
    price : {
        type : Number,
        required : [true, 'Please add the food price']
    },
    imageUrl : {
        type : String,
        default: "https://p1.hiclipart.com/preview/874/800/934/chef-cooking-food-logo-restaurant-kitchen-menu-cuisine-png-clipart.jpg"
    },
    foodTags : {
        type:String
    },
    category : {
        type:String
    },
    code : {
        type:String
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    restaurant:{
         type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' 
    },
    rating : {
        type : Number,
        default : 1,
        min : 1,
        max : 5
    },
    ratingCount : {
        type : String,
    },



}, {timestamps : true})

module.exports = mongoose.model('food', foodSchema)