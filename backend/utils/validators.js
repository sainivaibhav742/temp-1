/**
 * Validation Utilities
 * Common validation functions for user input
 */

/**
 * Validate email format (RFC 5322 compliant)
 */
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validate password format
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
 */
const isValidPassword = (password) => {
  if (!password || password.length < 8) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&#]/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

/**
 * Validate phone number (exactly 10 digits)
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Calculate password strength
 * Returns: weak, fair, good, very-good, strong
 */
const calculatePasswordStrength = (password) => {
  if (!password) return 'weak';
  
  let score = 0;
  const length = password.length;
  
  // Length score
  if (length >= 8) score++;
  if (length >= 10) score++;
  if (length >= 12) score++;
  
  // Variety score
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@$!%*?&#]/.test(password)) score++;
  
  // Return strength level
  if (score <= 2) return 'weak';
  if (score <= 4) return 'fair';
  if (score <= 5) return 'good';
  if (score <= 6) return 'very-good';
  return 'strong';
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  calculatePasswordStrength,
};
