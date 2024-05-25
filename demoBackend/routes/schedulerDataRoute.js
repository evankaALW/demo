const express = require('express');
const schedulerDataController = require('../controllers/schedulerDataController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
const schedulerDataRoute = express.Router();


schedulerDataRoute.use(loggerMiddleware);
schedulerDataRoute.get('/allSchedulerData', schedulerDataController.getAllSchedulerData);
schedulerDataRoute.use(errorHandlerMiddleware);

module.exports = schedulerDataRoute;