//import
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan');
const { connect } = require('mongoose');
const {connectDB} = require('./config/db');

//rest object
const app = express();

//dotenv
dotenv.config();

//database connection
connectDB();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/test', require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'))
app.use('/api/v1/categories', require('./routes/categoriesRoutes'))
app.use('/api/v1/food', require('./routes/foodRoutes'))

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Hello World</h1>');
})

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log('Server is running on port http://localhost:8080'.bgCyan.white);
})