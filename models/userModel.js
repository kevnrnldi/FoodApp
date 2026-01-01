const mongoose = require('mongoose');
const { trim } = require('validator');


//schema 
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Please add the user name'],
        trim:true,
    },
    email: {
        type: String,
        required: [true, 'Please add the email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add the password'],
        minlength: [6, 'Password muyst be at least 6 characters'],
    },
    address:{
        type: Array,
    },
    phone:{
        type: String,
        required:[true, 'Please add the phone number']
    },
    role: {
        type: String,
        required: [true, 'Please add the user role'],
        enum: ['kauNigga', 'akuAdmin', 'akuVendor', 'kauKurir'],
        default: 'kauNigga',
    },
    profile: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/vector-flat-illustration-gray-color-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1092.jpg'
    },
    answer:{
        type:String,
        required:[true, 'Please add your username from your game'],
    }
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);