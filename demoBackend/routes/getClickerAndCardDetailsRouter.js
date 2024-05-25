const express = require('express');
const getClickerAndCardDetailsController = require('../controllers/getClickerAndCardDetailsController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
const getClickerAndCardDetailsRouter = express.Router();


getClickerAndCardDetailsRouter.use(loggerMiddleware);
getClickerAndCardDetailsRouter.get('/clickerCardDetails',  getClickerAndCardDetailsController.getClickerAndCardDetails);
getClickerAndCardDetailsRouter.use(errorHandlerMiddleware);

module.exports = getClickerAndCardDetailsRouter;