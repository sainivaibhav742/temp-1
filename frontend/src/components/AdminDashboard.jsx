import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);

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
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/projects`,
        newProject,
        { withCredentials: true }
      );
      if (response.data.success) {
        alert('Project created successfully!');
        setNewProject({ name: '', description: '' });
        fetchProjects();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/users`,
        newUser,
        { withCredentials: true }
      );
      if (response.data.success) {
        alert('User created successfully!');
        setNewUser({ username: '', email: '', password: '', userType: 'Client' });
        fetchUsers();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create user');
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/requests/${requestId}/${action}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(`Request ${action}d successfully!`);
        fetchRequests();
      }
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${action} request`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span className="username">{user?.username}</span>
            <button onClick={() => navigate('/projects')} className="btn btn-secondary">
              View Projects
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Access Requests
        </button>
      </div>

      <main className="admin-main">
        {activeTab === 'projects' && (
          <div className="admin-section">
            <div className="create-form">
              <h2>Create New Project</h2>
              <form onSubmit={handleCreateProject}>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Enter project description"
                    rows="3"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </form>
            </div>

            <div className="data-list">
              <h2>All Projects</h2>
              {loading ? (
                <p>Loading...</p>
              ) : projects.length === 0 ? (
                <p className="no-data">No projects found</p>
              ) : (
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <small>Created: {new Date(project.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-section">
            <div className="create-form">
              <h2>Create New User</h2>
              <form onSubmit={handleCreateUser}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Enter password"
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
                <button type="submit" className="btn btn-primary">Create User</button>
              </form>
            </div>

            <div className="data-list">
              <h2>All Users</h2>
              {loading ? (
                <p>Loading...</p>
              ) : users.length === 0 ? (
                <p className="no-data">No users found</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td><span className={`badge badge-${u.userType.toLowerCase()}`}>{u.userType}</span></td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="admin-section">
            <h2>Pending Access Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : requests.length === 0 ? (
              <p className="no-data">No pending requests</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Project</th>
                    <th>Requested On</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.userName}</td>
                      <td>{request.projectName}</td>
                      <td>{new Date(request.requestedAt).toLocaleDateString()}</td>
                      <td><span className={`badge badge-${request.status}`}>{request.status}</span></td>
                      <td>
                        {request.status === 'pending' && (
                          <div className="action-buttons">
                            <button
                              onClick={() => handleRequestAction(request.id, 'approve')}
                              className="btn btn-success btn-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'deny')}
                              className="btn btn-danger btn-sm"
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
