const express = require('express');
const allVideoDetailsController = require('../controllers/allVideoDetailsController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
const allVideoDetailsRoute = express.Router();



allVideoDetailsRoute.use(loggerMiddleware);
allVideoDetailsRoute.get('/allVideoDetails', allVideoDetailsController.getAllVideoDetails);
allVideoDetailsRoute.use(errorHandlerMiddleware);



module.exports = allVideoDetailsRoute;