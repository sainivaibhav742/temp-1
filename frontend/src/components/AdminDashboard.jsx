import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  // Users state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'Client',
  });

  // Requests state
  const [requests, setRequests] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        await fetchProjects();
      } else if (activeTab === 'users') {
        await fetchUsers();
      } else if (activeTab === 'requests') {
        await fetchRequests();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/projects`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/requests`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/projects`,
        newProject,
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuccess('Project created successfully!');
        setNewProject({ name: '', description: '' });
        fetchProjects();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create project');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/users`,
        newUser,
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuccess('User created successfully!');
        setNewUser({ username: '', email: '', password: '', userType: 'Client' });
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create user');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/requests/${requestId}/${action}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuccess(`Request ${action}d successfully!`);
        fetchRequests();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${action} request`);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="header-left">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage projects, users, and access requests</p>
        </div>
        <div className="header-right">
          <div className="user-badge">
            <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
            <span className="user-name">{user?.username}</span>
          </div>
          <button onClick={() => navigate('/projects')} className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Projects
          </button>
          <button onClick={handleLogout} className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
          Projects
          <span className="tab-count">{projects.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Users
          <span className="tab-count">{users.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Requests
          <span className="tab-count">{requests.length}</span>
        </button>
      </div>

      {/* Messages */}
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

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'projects' && (
          <div className="tab-content">
            {/* Create Project Form */}
            <div className="form-card">
              <div className="section-header">
                <h2>Create New Project</h2>
                <p>Add a new project to the system</p>
              </div>
              <form onSubmit={handleCreateProject}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="e.g., Website Redesign"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Describe the project goals and requirements..."
                      rows="4"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Project
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="section-header">
              <h2>All Projects</h2>
              <p>{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
            </div>
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <p>No projects yet. Create your first project above.</p>
              </div>
            ) : (
              <div className="projects-grid">
                {projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <span className="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            {/* Create User Form */}
            <div className="form-card">
              <div className="section-header">
                <h2>Create New User</h2>
                <p>Add a new user to the system</p>
              </div>
              <form onSubmit={handleCreateUser}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      placeholder="e.g., john.doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="e.g., john@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>User Type</label>
                    <select
                      value={newUser.userType}
                      onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                      required
                    >
                      <option value="Client">Client</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Create User
                </button>
              </form>
            </div>

            {/* Users List */}
            <div className="section-header">
              <h2>All Users</h2>
              <p>{users.length} user{users.length !== 1 ? 's' : ''} registered</p>
            </div>
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                <p>No users yet. Create your first user above.</p>
              </div>
            ) : (
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-sm">{u.username?.charAt(0).toUpperCase()}</div>
                            <span className="user-name-cell">{u.username}</span>
                          </div>
                        </td>
                        <td className="email-cell">{u.email}</td>
                        <td><span className={`badge badge-${u.userType.toLowerCase()}`}>{u.userType}</span></td>
                        <td><span className="badge badge-active">Active</span></td>
                        <td className="date-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Pending Access Requests</h2>
              <p>{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
            </div>
            {loading ? (
              <div className="loading">Loading requests...</div>
            ) : requests.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <p>No pending requests. All caught up!</p>
              </div>
            ) : (
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Project</th>
                      <th>Requested Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-sm">{request.userName?.charAt(0).toUpperCase()}</div>
                            <span className="user-name-cell">{request.userName}</span>
                          </div>
                        </td>
                        <td className="project-name-cell">{request.projectName}</td>
                        <td className="date-cell">{new Date(request.requestedAt).toLocaleDateString()}</td>
                        <td><span className={`badge badge-${request.status}`}>{request.status}</span></td>
                        <td>
                          {request.status === 'pending' && (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleRequestAction(request.id, 'approve')}
                                className="btn btn-success btn-sm"
                                title="Approve request"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Approve
                              </button>
                              <button
                                onClick={() => handleRequestAction(request.id, 'deny')}
                                className="btn btn-danger btn-sm"
                                title="Deny request"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                Deny
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
