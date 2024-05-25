const express = require('express');
const uploadVideoRoute = express.Router()
const uploadVideoController = require('../controllers/uploadVideoController');
//const isAuthenticated = require('../middleware/authMiddleware');
const loggerMiddleware = require('../middleware/loggerMiddleware');
const errorHandlerMiddleware = require('../middleware/errorHAndlerMiddleware');
// Define the route for uploading a video

uploadVideoRoute.use(loggerMiddleware)
uploadVideoRoute.post('/uploadVideo',  uploadVideoController.uploadVideo);
uploadVideoRoute.use(errorHandlerMiddleware);

module.exports = uploadVideoRoute;
