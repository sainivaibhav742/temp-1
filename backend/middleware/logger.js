const { admin, db } = require('../config/firebase');

/**
 * Logging Middleware
 * Tracks all user activities and stores them in Firestore
 * 
 * Logged Information:
 * - User ID (if authenticated)
 * - Route accessed
 * - HTTP method
 * - Timestamp
 * - IP address
 * - User agent
 */

const loggerMiddleware = async (req, res, next) => {
  try {
    const logData = {
      userId: req.session?.user?.userId || 'anonymous',
      username: req.session?.user?.username || 'anonymous',
      action: `${req.method} ${req.path}`,
      method: req.method,
      route: req.path,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent') || 'unknown',
      details: {
        query: req.query,
        params: req.params,
      },
    };

    // Log to Firestore asynchronously (don't wait for completion)
    db.collection('activity_logs')
      .add(logData)
      .catch((error) => {
        console.error('Logging error:', error.message);
      });

    next();
  } catch (error) {
    // Don't block request if logging fails
    console.error('Logger middleware error:', error.message);
    next();
  }
};

module.exports = loggerMiddleware;
