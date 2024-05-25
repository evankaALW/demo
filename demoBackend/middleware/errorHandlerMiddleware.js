// errorHandlerMiddleware.js

// Example middleware function for error handling
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error("Error handler middleware:",err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandlerMiddleware;
