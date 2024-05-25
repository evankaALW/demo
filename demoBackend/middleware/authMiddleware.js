// authMiddleware.js

// Example middleware function to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if user is logged in or has a valid session
    if (req.isAuthenticated()) {
        // If authenticated, proceed to the next middleware or route handler
        return next();
    } else {
        // If not authenticated, return an error response
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = isAuthenticated;
