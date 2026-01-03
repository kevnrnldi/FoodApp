const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
  foods:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'food',
    required:true
  }],
  payment:{},
  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  status:{
    type:String,
    enum:['preparing','prepare','on the way', 'deliverd', 'cancelled'],
    default:'preparing',
  }
}, {timestamps:true})

module.exports = mongoose.model('Order', orderModel)