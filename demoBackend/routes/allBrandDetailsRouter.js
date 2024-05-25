const express = require('express');
const allBrandDetailsController = require('../controllers/allBrandDetailsController');

//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');

const allBrandDetailsRoute = express.Router();

allBrandDetailsRoute.use(loggerMiddleware);

allBrandDetailsRoute.get('/allBrandDetails',  allBrandDetailsController.getAllBrandDetails);

allBrandDetailsRoute.use(errorHandlerMiddleware);

module.exports = allBrandDetailsRoute;