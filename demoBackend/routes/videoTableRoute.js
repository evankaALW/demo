const express = require('express');
const videoTableController = require('../controllers/videoTableController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
const videoTableRouter = express.Router();

videoTableRouter.use(loggerMiddleware);
videoTableRouter.get('/allVideos', videoTableController.getVideoTable);
videoTableRouter.use(errorHandlerMiddleware);

module.exports = videoTableRouter;