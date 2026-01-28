const { checkUser } = require('./controllers/user');
const { db } = require('./config/firebase');

async function testLogin() {
  console.log('=== Testing Login ===\n');
  
  // First, let's see what users exist
  console.log('Checking users in database...');
  try {
    const usersSnapshot = await db.collection('users').get();
    
    if (usersSnapshot.empty) {
      console.log('❌ No users found in database!');
      console.log('You need to create an account first via the signup page.\n');
      return;
    }
    
    console.log(`✓ Found ${usersSnapshot.size} user(s) in database:\n`);
    
    usersSnapshot.forEach(doc => {
      const user = doc.data();
      console.log(`  - Username: ${user.username}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    User Type: ${user.userType}`);
      console.log(`    Created: ${user.createdAt}\n`);
    });
    
    // Test login with first user
    if (usersSnapshot.size > 0) {
      const firstUser = usersSnapshot.docs[0].data();
      console.log('--- Testing Login ---');
      console.log(`Attempting to login with username: ${firstUser.username}`);
      console.log('(You need to provide the correct password)\n');
      
      // You can uncomment this and add the password to test
      // const result = await checkUser(firstUser.username, 'YourPassword123!');
      // if (result) {
      //   console.log('✓ Login successful!');
      //   console.log('User:', result);
      // } else {
      //   console.log('❌ Login failed - incorrect password');
      // }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  process.exit(0);
}

testLogin();
