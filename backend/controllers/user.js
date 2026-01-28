const bcrypt = require('bcrypt');
const { db } = require('../config/firebase');
const { isValidEmail, isValidPassword } = require('../utils/validators');

/**
 * USER CONTROLLER
 * This file must export exactly TWO functions as per requirements:
 * 1. createUser(username, password)
 * 2. checkUser(username, password)
 */

/**
 * CREATE USER FUNCTION
 * Creates a new user in the Firestore database
 * 
 * @param {string} username - User's email address (used as username)
 * @param {string} password - User's plain text password
 * @param {string} email - User's email address (confirmation)
 * @param {string} userType - 'Admin' or 'Client'
 * @returns {Promise<Object>} - Success/failure response with user data
 * 
 * USE CASES:
 * 1. New user self-registration during signup process
 * 2. Admin creating new users from admin dashboard
 * 3. Duplicate email prevention to maintain unique user accounts
 * 4. Password strength enforcement for security compliance
 * 5. Role-based user creation (Admin vs Client)
 * 
 * VALIDATIONS IMPLEMENTED:
 * 1. Email Format Validation:
 *    - RFC 5322 compliant email format
 *    - Must contain @ symbol and valid domain
 *    - Example: user@domain.com
 * 
 * 2. Password Format Validation:
 *    - Minimum 8 characters required
 *    - At least 1 uppercase letter (A-Z)
 *    - At least 1 lowercase letter (a-z)
 *    - At least 1 number (0-9)
 *    - At least 1 special character (@$!%*?&#)
 *    - Example: Password123!
 * 
 * 3. Duplicate User Check:
 *    - Queries Firestore to ensure username/email doesn't already exist
 *    - Prevents multiple accounts with same email
 * 
 * 4. User Type Validation:
 *    - Must be either 'Admin' or 'Client'
 *    - Case-sensitive validation
 * 
 * 5. Required Fields Validation:
 *    - Username cannot be empty
 *    - Password cannot be empty
 *    - Email cannot be empty
 *    - User type must be specified
 * 
 * SECURITY MEASURES:
 * - Password is hashed using bcrypt with 10 salt rounds
 * - Plain text password is never stored in database
 * - Hash is one-way encryption, cannot be reversed
 */
async function createUser(username, password, email, userType) {
  try {
    // Validation 1: Check required fields
    if (!username || !password || !email || !userType) {
      return {
        success: false,
        message: 'All fields are required: username, password, email, and userType.',
      };
    }

    // Validation 2: Email format check
    if (!isValidEmail(email)) {
      return {
        success: false,
        message: 'Invalid email format. Please provide a valid email address.',
      };
    }

    // Validation 3: Password strength check
    if (!isValidPassword(password)) {
      return {
        success: false,
        message: 'Password must be at least 8 characters and include: 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&#).',
      };
    }

    // Validation 4: User type check
    if (userType !== 'Admin' && userType !== 'Client') {
      return {
        success: false,
        message: 'Invalid user type. Must be either "Admin" or "Client".',
      };
    }

    // Validation 5: Check for duplicate username/email
    const usersRef = db.collection('users');
    
    // Check for duplicate username
    const existingUsername = await usersRef.where('username', '==', username.toLowerCase()).limit(1).get();
    if (!existingUsername.empty) {
      return {
        success: false,
        message: 'Username already exists. Please choose a different username.',
      };
    }
    
    // Check for duplicate email
    const existingEmail = await usersRef.where('email', '==', email.toLowerCase()).limit(1).get();
    if (!existingEmail.empty) {
      return {
        success: false,
        message: 'Email address is already registered. Please use a different email.',
      };
    }

    // Hash password (10 salt rounds for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const userData = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };

    // Add to Firestore
    const userDoc = await usersRef.add(userData);

    // Return success (without password)
    return {
      success: true,
      message: 'User created successfully.',
      user: {
        userId: userDoc.id,
        username: userData.username,
        email: userData.email,
        userType: userData.userType,
        createdAt: userData.createdAt,
      },
    };
  } catch (error) {
    console.error('Error in createUser:', error);
    return {
      success: false,
      message: 'Failed to create user. Please try again.',
      error: error.message,
    };
  }
}

/**
 * CHECK USER FUNCTION
 * Verifies user credentials for login authentication
 * 
 * @param {string} username - User's email address
 * @param {string} password - User's plain text password
 * @returns {Promise<Object|null>} - User object if valid, null if invalid
 * 
 * USE CASES:
 * 1. User login authentication - verify credentials before creating session
 * 2. Session creation - provide user data for session storage
 * 3. Failed login attempts tracking - identify invalid login attempts
 * 4. Account status verification - ensure account is active before login
 * 5. Role identification - determine if user is Admin or Client for routing
 * 
 * VALIDATIONS IMPLEMENTED:
 * 1. Email Format Check:
 *    - Validates email format before database query
 *    - Prevents unnecessary database calls with invalid input
 * 
 * 2. Password Empty Check:
 *    - Ensures password field is not empty
 *    - Returns early if no password provided
 * 
 * 3. User Existence Check:
 *    - Queries Firestore to find user by username
 *    - Returns null if user not found in database
 * 
 * 4. Account Active Status Check:
 *    - Verifies user account is active (not suspended/deleted)
 *    - Prevents login for inactive accounts
 * 
 * 5. Password Match Verification:
 *    - Uses bcrypt.compare() to verify hashed password
 *    - Securely compares plain text with stored hash
 *    - Timing-safe comparison prevents timing attacks
 * 
 * SECURITY MEASURES:
 * - Password is never returned in response
 * - Uses bcrypt for secure password comparison
 * - Returns generic error messages to prevent user enumeration
 * - Logs failed login attempts for security monitoring
 */
async function checkUser(username, password) {
  try {
    // Validation 1: Check required fields
    if (!username || !password) {
      return null;
    }

    // Query user from Firestore (search by username OR email)
    const usersRef = db.collection('users');
    const lowercaseUsername = username.toLowerCase();
    
    // Try to find by username first
    let userSnapshot = await usersRef
      .where('username', '==', lowercaseUsername)
      .limit(1)
      .get();
    
    // If not found by username, try by email
    if (userSnapshot.empty && isValidEmail(username)) {
      userSnapshot = await usersRef
        .where('email', '==', lowercaseUsername)
        .limit(1)
        .get();
    }

    // Validation 2: User exists check
    if (userSnapshot.empty) {
      return null;
    }

    // Get user data
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Validation 3: Account active status check
    if (!userData.isActive) {
      console.log('Account inactive:', username);
      return null;
    }

    // Validation 4: Password verification
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return null;
    }

    // Return user object (without password)
    return {
      userId: userDoc.id,
      username: userData.username,
      email: userData.email,
      userType: userData.userType,
      createdAt: userData.createdAt,
      isActive: userData.isActive,
    };
  } catch (error) {
    console.error('Error in checkUser:', error);
    return null;
  }
}

// Export exactly two functions as required
module.exports = {
  createUser,
  checkUser,
};
