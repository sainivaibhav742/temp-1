const { createUser } = require('./controllers/user');

async function testDuplicateChecks() {
  console.log('═══════════════════════════════════════════════');
  console.log('  TESTING DUPLICATE USERNAME/EMAIL CHECKS');
  console.log('═══════════════════════════════════════════════\n');
  
  // Test 1: Try to create with existing username
  console.log('TEST 1: Attempting to create user with existing username "testuser"...');
  const result1 = await createUser('testuser', 'NewPass123!', 'newemail@test.com', 'Client');
  console.log('Result:', result1.success ? '❌ FAILED - Should reject duplicate username' : '✅ PASSED');
  console.log('Message:', result1.message);
  console.log('');
  
  // Test 2: Try to create with existing email
  console.log('TEST 2: Attempting to create user with existing email "testuser@example.com"...');
  const result2 = await createUser('newusername', 'NewPass123!', 'testuser@example.com', 'Client');
  console.log('Result:', result2.success ? '❌ FAILED - Should reject duplicate email' : '✅ PASSED');
  console.log('Message:', result2.message);
  console.log('');
  
  // Test 3: Create with completely new credentials
  console.log('TEST 3: Creating user with new credentials...');
  const result3 = await createUser('uniqueuser', 'UniquePass123!', 'unique@test.com', 'Client');
  console.log('Result:', result3.success ? '✅ PASSED - User created' : '❌ FAILED');
  console.log('Message:', result3.message);
  console.log('');
  
  console.log('═══════════════════════════════════════════════');
  console.log('All tests completed!');
  console.log('═══════════════════════════════════════════════\n');
  
  process.exit(0);
}

testDuplicateChecks();
