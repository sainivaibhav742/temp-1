const { checkUser } = require('./controllers/user');

async function testLoginWithPassword() {
  console.log('=== Testing Login with Password ===\n');
  
  // Test with different usernames
  const testCases = [
    { username: 'user1', password: 'Test123!' },
    { username: 'user', password: 'Test123!' },
    { username: 'vaibhav', password: 'Test123!' },
    { username: 'vaibhav', password: 'Vaibhav@123' },
    { username: 'temp1@gmail.com', password: 'Test123!' },
  ];
  
  for (const test of testCases) {
    console.log(`Testing: ${test.username} with password: ${test.password}`);
    try {
      const result = await checkUser(test.username, test.password);
      if (result) {
        console.log('✓ Login successful!');
        console.log('  User ID:', result.id);
        console.log('  Username:', result.username);
        console.log('  Email:', result.email);
        console.log('  User Type:', result.userType);
      } else {
        console.log('❌ Login failed - Invalid credentials');
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
    }
    console.log('');
  }
  
  console.log('\n💡 Tip: If all tests failed, you might need to:');
  console.log('   1. Check what password you used during signup');
  console.log('   2. Try the exact password you entered when creating the account\n');
  
  process.exit(0);
}

testLoginWithPassword();
