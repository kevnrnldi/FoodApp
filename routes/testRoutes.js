const express = require('express');
const { testUserController } = require('../controllers/testController');
const app = express();

const router = express.Router();


router.get('/testing', testUserController)

module.exports = router;