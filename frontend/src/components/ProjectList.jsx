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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProjects();
    if (user?.userType === 'Client') {
      fetchAllProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch projects');
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
    }
  };

  const handleRequestAccess = async (projectId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/projects/request-access`,
        { projectId },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert('Access request submitted successfully!');
        fetchAllProjects();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to request access');
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

      {error && <div className="error-message">{error}</div>}

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
