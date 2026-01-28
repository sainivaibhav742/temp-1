# Ubiquitous Project Management System - Backend

Backend server for the Ubiquitous Project Management System built with Node.js, Express, and Firebase Firestore.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Firestore Database
4. Go to Project Settings → Service Accounts
5. Click "Generate New Private Key" and download the JSON file
6. Save the downloaded file as `firebase-service-account.json` in the `backend` folder (this file is gitignored)

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development

   # From your Firebase service account JSON file:
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com

   # Generate a random secret for session:
   SESSION_SECRET=your-super-secret-key-change-this-in-production
   SESSION_MAX_AGE=86400000

   # Frontend URL:
   FRONTEND_URL=http://localhost:3000
   ```

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user session

### Health Check

- `GET /health` - Server health status

## Project Structure

```
backend/
├── config/
│   └── firebase.js          # Firebase configuration
├── controllers/
│   └── user.js              # User controller (createUser, checkUser)
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── logger.js            # Activity logging middleware
│   └── roleCheck.js         # Role-based access control
├── routes/
│   └── auth.js              # Authentication routes
├── utils/
│   └── validators.js        # Input validation utilities
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
└── server.js               # Main server file
```

## Features Implemented

✅ User authentication (signup, login, logout)  
✅ Session management with express-session  
✅ Password hashing with bcrypt  
✅ Email and password validation  
✅ Activity logging middleware  
✅ Firebase Firestore integration  
✅ Role-based user types (Admin/Client)  
✅ Secure session cookies  
✅ CORS configuration  
✅ Security headers with Helmet  

## Next Steps

- [ ] Implement project routes and controllers
- [ ] Add access request management
- [ ] Create user management endpoints
- [ ] Implement reports with streaming
- [ ] Add search functionality
- [ ] Set up proper error handling

## Testing

Test the API using Postman, Thunder Client, or curl:

```bash
# Health check
curl http://localhost:5000/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@ubiquitous.co",
    "email": "admin@ubiquitous.co",
    "password": "Admin123!",
    "userType": "Admin"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@ubiquitous.co",
    "password": "Admin123!"
  }'
```

## Security Notes

- Never commit `.env` file or `firebase-service-account.json` to version control
- Change `SESSION_SECRET` in production to a strong random string
- Use HTTPS in production (set `NODE_ENV=production`)
- Regularly update dependencies for security patches
