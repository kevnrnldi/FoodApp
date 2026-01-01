const mongoose = require('mongoose');
const colors = require('colors');

//function mongoDB database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected',mongoose.connection.host .bgGreen .white );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectDB};