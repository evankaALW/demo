// loggerMiddleware.js

// Example middleware function for logging requests
const loggerMiddleware = (req, res, next) => {
    console.log(`Logger Middleware : ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;
