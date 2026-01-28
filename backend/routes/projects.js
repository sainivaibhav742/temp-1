const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { isAuthenticated } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

/**
 * PROJECT ROUTES
 * Handles project listing and access requests
 */

/**
 * GET /api/projects
 * Get projects accessible to the current user
 * - Admin: Gets all projects
 * - Client: Gets only projects they have access to
 */
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const user = req.session.user;
    
    if (user.userType === 'Admin') {
      // Admin sees all projects
      const projectsSnapshot = await db.collection('projects').get();
      const projects = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return res.status(200).json({
        success: true,
        projects: projects
      });
    } else {
      // Client sees only approved projects
      const projectsSnapshot = await db.collection('projects')
        .where('accessibleBy', 'array-contains', user.id)
        .get();
      
      const projects = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return res.status(200).json({
        success: true,
        projects: projects
      });
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

/**
 * GET /api/projects/all
 * Get all projects (for clients to request access)
 * Returns projects the client doesn't have access to yet
 */
router.get('/all', isAuthenticated, async (req, res) => {
  try {
    const user = req.session.user;
    
    if (user.userType !== 'Client') {
      return res.status(403).json({
        success: false,
        message: 'Only clients can view this endpoint'
      });
    }
    
    // Get all projects
    const projectsSnapshot = await db.collection('projects').get();
    const allProjects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Get user's pending requests
    const requestsSnapshot = await db.collection('accessRequests')
      .where('userId', '==', user.id)
      .where('status', '==', 'pending')
      .get();
    
    const pendingProjectIds = requestsSnapshot.docs.map(doc => doc.data().projectId);
    
    // Filter projects user doesn't have access to
    const availableProjects = allProjects.filter(project => {
      const hasAccess = project.accessibleBy && project.accessibleBy.includes(user.id);
      const hasPendingRequest = pendingProjectIds.includes(project.id);
      
      return !hasAccess;
    }).map(project => ({
      ...project,
      requestPending: pendingProjectIds.includes(project.id)
    }));
    
    return res.status(200).json({
      success: true,
      projects: availableProjects
    });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

/**
 * POST /api/projects/request-access
 * Request access to a project (Client only)
 */
router.post('/request-access', isAuthenticated, async (req, res) => {
  try {
    const user = req.session.user;
    const { projectId } = req.body;
    
    if (user.userType !== 'Client') {
      return res.status(403).json({
        success: false,
        message: 'Only clients can request project access'
      });
    }
    
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required'
      });
    }
    
    // Check if project exists
    const projectDoc = await db.collection('projects').doc(projectId).get();
    if (!projectDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if user already has access
    const projectData = projectDoc.data();
    if (projectData.accessibleBy && projectData.accessibleBy.includes(user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You already have access to this project'
      });
    }
    
    // Check if there's already a pending request
    const existingRequest = await db.collection('accessRequests')
      .where('userId', '==', user.id)
      .where('projectId', '==', projectId)
      .where('status', '==', 'pending')
      .get();
    
    if (!existingRequest.empty) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending request for this project'
      });
    }
    
    // Create access request
    const requestData = {
      userId: user.id,
      userName: user.username,
      userEmail: user.email,
      projectId: projectId,
      projectName: projectData.name,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };
    
    await db.collection('accessRequests').add(requestData);
    
    return res.status(201).json({
      success: true,
      message: 'Access request submitted successfully'
    });
  } catch (error) {
    console.error('Error requesting access:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit access request'
    });
  }
});

module.exports = router;
