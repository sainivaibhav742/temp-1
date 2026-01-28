# Ubiquitous Project Management System

A full-stack project management application with role-based access control, built with React, Node.js/Express, and Firebase Firestore.

## 🚀 Features

- **User Authentication**: Secure session-based authentication with bcrypt password hashing
- **Role-Based Access Control**: Admin and Client user types with different permissions
- **Project Management**: Create, manage, and assign projects to clients
- **Access Requests**: Clients can request access to projects, admins can approve/reject
- **Admin Dashboard**: Comprehensive admin panel for user and project management
- **Responsive Design**: Modern dark-themed UI with purple accents
- **Security**: Helmet.js for security headers, CORS protection, session management

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: express-session with bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: CSS Modules

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase Account** with Firestore enabled

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "New folder (3)"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-this
SESSION_MAX_AGE=86400000

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

#### Setting up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Navigate to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Copy the values from the downloaded JSON file to your `.env` file
6. Enable **Firestore Database** in your Firebase project

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional, if needed):

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend

```bash
cd backend
npm start
```

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── firebase.js          # Firebase Admin initialization
│   ├── controllers/
│   │   └── user.js               # User controller logic
│   ├── middleware/
│   │   ├── auth.js               # Authentication middleware
│   │   ├── logger.js             # Request logging
│   │   └── roleCheck.js          # Role-based authorization
│   ├── routes/
│   │   ├── admin.js              # Admin routes
│   │   ├── auth.js               # Authentication routes
│   │   └── projects.js           # Project routes
│   ├── utils/
│   │   └── validators.js         # Input validation
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx    # Admin panel
│   │   │   ├── Layout.jsx            # Main layout wrapper
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Signup.jsx            # Registration page
│   │   │   ├── ProjectList.jsx       # Project listing
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   └── Sidebar.jsx           # Sidebar navigation
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Authentication context
│   │   ├── styles/                   # Component styles
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user session

### Projects
- `GET /api/projects` - Get projects (filtered by user role)
- `POST /api/projects/request-access` - Request project access (Client)
- `GET /api/projects/:projectId` - Get project details

### Admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/projects` - Create new project
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/access-requests` - Get pending access requests
- `PUT /api/admin/access-requests/:requestId` - Approve/reject access request
- `POST /api/admin/assign-project` - Assign project to client
- `DELETE /api/admin/remove-access` - Remove client access

## 👤 User Roles

### Admin
- Create and manage projects
- View all users and projects
- Approve/reject access requests
- Assign projects to clients
- Remove client access

### Client
- View assigned projects
- Request access to projects
- View project details

## 🎨 Design System

The application uses a modern dark theme with purple accents:

- **Primary Color**: `#b794f6` (Lavender Purple)
- **Background**: `#2b2b2b` (Dark Gray)
- **Cards**: `#363636` (Medium Gray)
- **Text**: `#ffffff` (White) / `#b3b3b3` (Gray)

## 🧪 Testing

Test files are included in the backend directory:

```bash
cd backend
node test-login.js          # Test login functionality
node test-login-password.js # Test password validation
node test-duplicates.js     # Test duplicate prevention
node test-complete-flow.js  # Test complete workflow
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **Session Management**: Secure HTTP-only cookies
- **CORS Protection**: Configured CORS policies
- **Helmet.js**: Security headers
- **Input Validation**: express-validator for request validation
- **Role-Based Access**: Middleware for authorization

## 🐛 Troubleshooting

### Backend won't start
- Ensure Firebase credentials are correctly set in `.env`
- Check if port 5000 is available
- Verify Node.js version (v16+)

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in `backend/server.js`
- Verify API URL in frontend requests

### Database errors
- Verify Firebase project is set up with Firestore
- Check Firebase service account credentials
- Ensure Firestore has proper security rules

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
SESSION_SECRET=<your-secret-key>
SESSION_MAX_AGE=86400000
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_CLIENT_EMAIL=<your-client-email>
FIREBASE_PRIVATE_KEY=<your-private-key>
FIREBASE_DATABASE_URL=<your-database-url>
```

### Frontend (.env) - Optional
```env
VITE_API_URL=http://localhost:5000
```

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and Firebase**
