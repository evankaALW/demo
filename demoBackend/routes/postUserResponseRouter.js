const express = require('express');
const postUserResponseController = require('../controllers/postUserResponseController');

const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');

const postUserResponseRoute = express.Router();


postUserResponseRoute.use(loggerMiddleware);
postUserResponseRoute.post('/userResponseData', postUserResponseController.postUserResponse);
postUserResponseRoute.use(errorHandlerMiddleware);

module.exports = postUserResponseRoute;