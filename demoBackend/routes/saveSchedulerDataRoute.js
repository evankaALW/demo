const express = require('express');
const saveSchedulerDataRoute = express.Router();
const saveSchedulerDataController = require('../controllers/saveSchedulerDataController');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');

saveSchedulerDataRoute.use(loggerMiddleware);
saveSchedulerDataRoute.post('/saveSchedulerData', saveSchedulerDataController.saveSchedulerData);
saveSchedulerDataRoute.use(errorHandlerMiddleware);

module.exports = saveSchedulerDataRoute;

