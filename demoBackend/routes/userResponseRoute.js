const express = require('express');
const userResponseController = require('../controllers/userResponseController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
const userResponseRoute = express.Router();

userResponseRoute.use(loggerMiddleware)
userResponseRoute.get('/getUserResponse', userResponseController.getUserResponses);
userResponseRoute.use(errorHandlerMiddleware)

module.exports = userResponseRoute;