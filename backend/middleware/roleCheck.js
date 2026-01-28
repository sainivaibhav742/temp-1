/**
 * Role-Based Access Control Middleware
 * Ensures only Admin users can access admin-only routes
 */

const isAdmin = (req, res, next) => {
  // Check if user is authenticated (should be called after isAuthenticated)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please login to continue.',
    });
  }

  // Check if user has Admin role
  if (req.user.userType !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Admin access required.',
    });
  }

  // User is admin, proceed
  next();
};

module.exports = { isAdmin };
