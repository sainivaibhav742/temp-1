
Full-Stack Developer Skill Assessment — Project Management System 
Hello!  As part of our evaluation process, we’d like to assess your full-stack development ability, 
problem-solving skills, and architectural thinking. 
You are required to build a simplified Project Management System for an imaginary 
organization named Ubiquitous Pvt. Ltd. The system should support user and project 
management, role-based access, and basic request workflows. 
You may use Node.js (Express) for backend and any frontend you prefer. Database preference: Firebase (Firestore), but any other is acceptable. 
Functional Requirements 
1. Authentication and Middleware 
●  Designs 
●  Implement sign-up and login. 
●  Store usernames and passwords. 
●  Implement a logging middleware to track user activity. 
●  Only Admin users can: 
○  create users 
○  create projects 
○  view all users 
○  view all projects 
○  approve/deny client project requests 
 
2. User Types and Permissions 
Admin 
●  Create new users. 
●  Create new projects. 
●  View: 
○  all projects 
○  all users 
○  all pending project-access requests 
●  Grant or deny project-access requests.  
Client 
●  Request access to any project (multiple requests allowed). 
●  View only the projects they have been granted access to. 
 
Frontend Requirements (Route Details) 
GET /login/ 
●  Shows a form with username and password. 
●  On successful login → redirect to /projects/. 
●  Includes a Sign Up button → redirects to /signup/. 
POST /login/ 
●  Calls checkUser(). 
●  If successful → redirect to /projects/. 
●  If failed → show an appropriate error message. 
GET /signup/ 
●  If already authenticated, redirect to /projects/. 
●  Form fields: 
○  Username (email) 
○  User email 
○  Password (must meet format shared in design) 
○  User type (Admin / Client) 
●  Client-side validations for: 
○  Email format 
○  Password format 
POST /signup/ 
●  Calls createUser() function. 
●  Show success or failure based on server response. 
●  After successful signup → show button to go to login. 
GET /projects/ 
For Admin: 
●  List all existing projects. 
●  Show table of all users. 
●  Display all pending client requests. 
For Client: 
●  Display only the projects they have access to. 
●  Provide a button to request access to a project. 
GET/POST /createProject/ 
Form fields: 
●  Project name (string) 
●  Location (string) 
●  Phone number (integer, max 10 digits) 
●  Email (valid format) 
●  Start date (timestamp) 
●  End date (timestamp) 
GET /reports/ 
●  Use streams to send data to the frontend 
POST /logout/ 
●  Destroy session, logout user. 
●  Redirect to /login/ 
User Controller Requirements 
The file user.js must export only two functions: 
●  createUser(username, password) 
●  checkUser(username, password) 
Inside the code, include comments listing the use cases and validations you implemented. 