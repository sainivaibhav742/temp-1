import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Projects.css';

const ProjectList = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProjects();
    if (user?.userType === 'Client') {
      fetchAllProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', error);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects/all`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setAllProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch all projects:', error);
      // Don't show error for this since it's secondary data
    }
  };

  const handleRequestAccess = async (projectId) => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        `${API_URL}/api/projects/request-access`,
        { projectId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuccess('Access request submitted successfully!');
        fetchAllProjects();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to request access');
      setTimeout(() => setError(''), 5000);
    }
  };

  if (loading) {
    return <div className="page-loading">Loading projects...</div>;
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>My Projects</h1>
        <p className="page-subtitle">View and manage your assigned projects</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {success}
        </div>
      )}

      <section className="projects-section">
        <h2>My Projects</h2>
        {projects.length === 0 ? (
          <p className="no-data">No projects available</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  {project.email && (
                    <div className="detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>{project.email}</span>
                    </div>
                  )}
                  {project.contactNumber && (
                    <div className="detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{project.contactNumber}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{project.timeline}</span>
                    </div>
                  )}
                </div>
                <div className="project-footer">
                  <span className="project-date">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {user?.userType === 'Client' && (
        <section className="projects-section">
          <h2>Request Access to Projects</h2>
          {allProjects.length === 0 ? (
            <p className="no-data">No other projects available</p>
          ) : (
            <div className="projects-grid">
              {allProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-details">
                    {project.email && (
                      <div className="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>{project.email}</span>
                      </div>
                    )}
                    {project.contactNumber && (
                      <div className="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>{project.contactNumber}</span>
                      </div>
                    )}
                    {project.timeline && (
                      <div className="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{project.timeline}</span>
                      </div>
                    )}
                  </div>
                  <div className="project-footer">
                    <button
                      onClick={() => handleRequestAccess(project.id)}
                      className="btn btn-primary btn-sm"
                      disabled={project.requestPending}
                    >
                      {project.requestPending ? 'Request Pending' : 'Request Access'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ProjectList;
