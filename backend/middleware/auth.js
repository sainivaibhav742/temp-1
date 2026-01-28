/**
 * Authentication Middleware
 * Verifies user session and attaches user info to request
 */

const isAuthenticated = (req, res, next) => {
  // Debug logging
  console.log('Auth check - Session ID:', req.sessionID);
  console.log('Auth check - Session user:', req.session?.user?.username);
  
  // Check if session exists and has user data
  if (req.session && req.session.user) {
    // Attach user info to request for downstream use
    req.user = req.session.user;
    return next();
  }

  // User not authenticated
  console.log('Auth failed - No valid session');
  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Please login to continue.',
  });
};

module.exports = { isAuthenticated };
