const admin = require('firebase-admin');
require('dotenv').config();

/**
 * Firebase Admin SDK Configuration
 * Initializes connection to Firestore database
 */

try {
  // Check if Firebase credentials are provided
  if (!process.env.FIREBASE_PROJECT_ID || 
      !process.env.FIREBASE_CLIENT_EMAIL || 
      !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('⚠️  Firebase credentials not configured properly!');
    console.warn('⚠️  Please update the .env file with your Firebase credentials.');
    console.warn('⚠️  See backend/README.md for setup instructions.');
    console.warn('⚠️  Server will start but database operations will fail.\n');
  }

  // Initialize Firebase Admin with service account
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  console.log('✓ Firebase Admin initialized successfully');
} catch (error) {
  console.error('✗ Firebase initialization error:', error.message);
  console.error('\n📋 Setup Instructions:');
  console.error('1. Go to https://console.firebase.google.com/');
  console.error('2. Create/select your project');
  console.error('3. Enable Firestore Database');
  console.error('4. Go to Project Settings → Service Accounts');
  console.error('5. Click "Generate New Private Key"');
  console.error('6. Update backend/.env with the credentials from the JSON file\n');
  
  // Don't exit, allow server to start for development
  console.warn('⚠️  Server starting without valid Firebase connection...\n');
}

// Export Firestore database instance
const db = admin.firestore();

module.exports = { admin, db };
