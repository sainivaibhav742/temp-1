const express = require('express');
const router = express.Router();
const { createUser, checkUser } = require('../controllers/user');

/**
 * AUTHENTICATION ROUTES
 * Handles user signup, login, and logout
 */

/**
 * POST /api/auth/signup
 * Create a new user account
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Call createUser function from user controller
    const result = await createUser(username, password, email, userType);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during signup. Please try again.',
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and create session
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    // Call checkUser function from user controller
    const user = await checkUser(username, password);

    if (user) {
      // Create session
      req.session.user = user;
      
      // Save session explicitly to ensure it persists
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      console.log('Session saved - User:', user.username, 'SessionID:', req.sessionID);
      
      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        user: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
    });
  }
});

/**
 * POST /api/auth/logout
 * Destroy user session and logout
 */
router.post('/logout', (req, res) => {
  try {
    if (req.session) {
      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Failed to logout. Please try again.',
          });
        }
        
        // Clear session cookie
        res.clearCookie('connect.sid');
        
        return res.status(200).json({
          success: true,
          message: 'Logout successful.',
        });
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Already logged out.',
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during logout.',
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user session info
 */
router.get('/me', (req, res) => {
  console.log('GET /me - Session ID:', req.sessionID);
  console.log('GET /me - Session user:', req.session?.user?.username);
  
  if (req.session && req.session.user) {
    return res.status(200).json({
      success: true,
      user: req.session.user,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated.',
    });
  }
});

module.exports = router;
