const express = require("express");
const changeDisplayToggleRoute = express.Router();
const changeDisplayToggleController = require('../controllers/changeDisplayToggleController');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');

changeDisplayToggleRoute.use(loggerMiddleware);
changeDisplayToggleRoute.put('/changeDisplayToggle', changeDisplayToggleController.changeDisplayToggle);
changeDisplayToggleRoute.use(errorHandlerMiddleware);

module.exports=changeDisplayToggleRoute;

