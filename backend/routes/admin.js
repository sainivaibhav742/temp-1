const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { isAuthenticated } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const { createUser } = require('../controllers/user');

/**
 * ADMIN ROUTES
 * All routes require Admin authentication
 */

/**
 * GET /api/admin/projects
 * Get all projects (Admin only)
 */
router.get('/projects', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    const projects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return res.status(200).json({
      success: true,
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

/**
 * POST /api/admin/projects
 * Create a new project (Admin only)
 */
router.post('/projects', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Project name and description are required'
      });
    }
    
    // Debug: Log session user object
    console.log('Session user:', JSON.stringify(req.session.user, null, 2));
    
    const projectData = {
      name: name,
      description: description,
      createdAt: new Date().toISOString(),
      createdBy: req.session.user.userId || req.session.user.username,
      accessibleBy: [] // Initially no one has access
    };
    
    const projectRef = await db.collection('projects').add(projectData);
    
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: {
        id: projectRef.id,
        ...projectData
      }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    console.error('Error details:', error.message);
    console.error('Error code:', error.code);
    return res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/admin/users
 * Get all users (Admin only)
 */
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      password: undefined // Don't send password to frontend
    }));
    
    return res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

/**
 * POST /api/admin/users
 * Create a new user (Admin only)
 */
router.post('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    
    // Use the createUser controller function
    const result = await createUser(username, password, email, userType);
    
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

/**
 * GET /api/admin/requests
 * Get all access requests (Admin only)
 */
router.get('/requests', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const requestsSnapshot = await db.collection('accessRequests')
      .orderBy('requestedAt', 'desc')
      .get();
    
    const requests = requestsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return res.status(200).json({
      success: true,
      requests: requests
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch access requests'
    });
  }
});

/**
 * POST /api/admin/requests/:requestId/approve
 * Approve an access request (Admin only)
 */
router.post('/requests/:requestId/approve', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { requestId } = req.params;
    
    // Get the request
    const requestDoc = await db.collection('accessRequests').doc(requestId).get();
    if (!requestDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    const requestData = requestDoc.data();
    
    // Update request status
    await db.collection('accessRequests').doc(requestId).update({
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: req.session.user.id
    });
    
    // Grant access to the project
    const projectRef = db.collection('projects').doc(requestData.projectId);
    const projectDoc = await projectRef.get();
    
    if (projectDoc.exists) {
      const projectData = projectDoc.data();
      const accessibleBy = projectData.accessibleBy || [];
      
      if (!accessibleBy.includes(requestData.userId)) {
        accessibleBy.push(requestData.userId);
        await projectRef.update({ accessibleBy });
      }
    }
    
    return res.status(200).json({
      success: true,
      message: 'Access request approved successfully'
    });
  } catch (error) {
    console.error('Error approving request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to approve request'
    });
  }
});

/**
 * POST /api/admin/requests/:requestId/deny
 * Deny an access request (Admin only)
 */
router.post('/requests/:requestId/deny', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { requestId } = req.params;
    
    // Get the request
    const requestDoc = await db.collection('accessRequests').doc(requestId).get();
    if (!requestDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    // Update request status
    await db.collection('accessRequests').doc(requestId).update({
      status: 'denied',
      deniedAt: new Date().toISOString(),
      deniedBy: req.session.user.id
    });
    
    return res.status(200).json({
      success: true,
      message: 'Access request denied successfully'
    });
  } catch (error) {
    console.error('Error denying request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to deny request'
    });
  }
});

module.exports = router;
