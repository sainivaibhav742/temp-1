# Full-Stack Project Management System - Implementation Plan

## Project Overview
**Project Name:** Ubiquitous Pvt. Ltd. - Project Management System  
**Tech Stack:**
- Backend: Node.js + Express.js
- Database: Firebase Firestore
- Frontend: React.js (recommended) or any preferred framework
- Authentication: Session-based with express-session
- Additional: Bcrypt for password hashing
- Styling: CSS Modules / Styled Components / Tailwind CSS

---

## Design System (Based on Figma Designs)

### Color Palette
```css
/* Primary Colors */
--primary-purple: #b794f6;        /* Lavender purple for buttons */
--primary-purple-light: #d4b3ff;  /* Light purple for hover states */
--primary-purple-dark: #9f7aea;   /* Dark purple for active states */

/* Background Colors */
--bg-dark: #2b2b2b;               /* Main dark background */
--bg-darker: #1a1a1a;             /* Darker sections */
--bg-card: #363636;               /* Card/container backgrounds */
--bg-input: #3a3a3a;              /* Input field backgrounds */

/* Text Colors */
--text-primary: #ffffff;          /* Primary white text */
--text-secondary: #b3b3b3;        /* Secondary gray text */
--text-muted: #808080;            /* Muted/placeholder text */

/* Border Colors */
--border-light: #4a4a4a;          /* Subtle borders */
--border-focus: #b794f6;          /* Focused input borders */

/* Status Colors */
--success: #48bb78;               /* Success green */
--error: #f56565;                 /* Error red */
--warning: #ed8936;               /* Warning orange */
--info: #4299e1;                  /* Info blue */
```

### Typography
```css
/* Font Family */
--font-primary: 'Inter', 'Segoe UI', 'Roboto', sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing & Layout
```css
/* Spacing Scale */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Container Widths */
--container-xs: 400px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### Component Styles

#### Input Fields
- Background: `--bg-input` (#3a3a3a)
- Border: 1px solid `--border-light`
- Border Radius: `--radius-lg` (12px)
- Padding: 14px 16px
- Font Size: `--text-base`
- Color: `--text-primary`
- Placeholder Color: `--text-muted`
- Focus State: Border color changes to `--border-focus` with subtle glow
- Height: 48px minimum

#### Buttons (Primary - Purple)
- Background: Linear gradient from `#b794f6` to `#9f7aea`
- Color: White
- Border: None
- Border Radius: `--radius-lg` (12px)
- Padding: 14px 32px
- Font Weight: `--font-semibold`
- Font Size: `--text-base`
- Height: 48px
- Hover: Slightly lighter gradient, subtle scale (1.02)
- Active: Darker gradient, scale (0.98)
- Transition: all 0.2s ease

#### Cards/Containers
- Background: `--bg-card` (#363636)
- Border Radius: `--radius-xl` (16px)
- Padding: `--space-xl` (32px)
- Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.3)

#### Logo
- Purple gradient sphere with 3D effect
- Size: ~80px diameter
- Brand text "ubiquitous.co" below in white
- Font size: 16px, regular weight

### Page-Specific Designs

#### Login Page Layout
- Full-screen dark background
- Center-aligned vertical layout
- Components stacked vertically:
  1. Logo (purple sphere) - 80px
  2. Brand text "ubiquitous.co" - 24px margin-bottom
  3. "Login" heading - 30px font, 16px margin-bottom
  4. "Please login to continue" subtitle - 14px, gray, 32px margin-bottom
  5. User Name input with label - 24px margin-bottom
  6. Password input with label and eye icon - 32px margin-bottom
  7. "SIGN IN" button - 24px margin-bottom
  8. "Not Registered Yet? Sign Up Here." link
- Maximum width: 400px
- All centered horizontally
- Password field has eye icon (show/hide) on the right side

---

## Phase 1: Project Setup and Architecture (Day 1)

### 1.1 Backend Setup
- [ ] Initialize Node.js project with `npm init`
- [ ] Install dependencies:
  - `express` - Web framework
  - `firebase-admin` - Firebase SDK
  - `bcrypt` - Password hashing
  - `express-session` - Session management
  - `dotenv` - Environment variables
  - `cors` - Cross-origin requests
  - `morgan` - HTTP request logger
  - `express-validator` - Input validation
- [ ] Create project structure:
  ```
  backend/
  ├── config/
  │   └── firebase.js
  ├── controllers/
  │   ├── user.js
  │   ├── project.js
  │   └── request.js
  ├── middleware/
  │   ├── auth.js
  │   ├── logger.js
  │   └── roleCheck.js
  ├── routes/
  │   ├── auth.js
  │   ├── project.js
  │   └── request.js
  ├── models/
  │   └── schemas.js
  ├── utils/
  │   └── validators.js
  ├── server.js
  └── .env
  ```

### 1.2 Frontend Setup
- [ ] Initialize React app with Vite (recommended for faster builds)
- [ ] Install dependencies:
  - `axios` - HTTP client
  - `react-router-dom` - Routing
  - `react-hook-form` - Form handling (lighter than Formik)
  - `yup` - Validation schema
  - Styling options (choose one):
    - **Option 1:** `styled-components` or `emotion` - CSS-in-JS
    - **Option 2:** CSS Modules (built-in with Vite)
    - **Option 3:** `tailwindcss` - Utility-first CSS
  - `react-icons` - Icon library (for eye icon, etc.)
  - `framer-motion` - Animations (optional)
- [ ] Create folder structure:
  ```
  frontend/
  ├── src/
  │   ├── components/
  │   │   ├── Auth/
  │   │   ├── Projects/
  │   │   └── Admin/
  │   ├── pages/
  │   ├── services/
  │   ├── context/
  │   ├── utils/
  │   └── App.jsx
  ```

### 1.3 Firebase Configuration
- [ ] Create Firebase project in Firebase Console
- [ ] Enable Firestore Database
- [ ] Download service account key (JSON)
- [ ] Configure Firebase Admin SDK in backend
- [ ] Set up Firestore collections structure:
  - `users` collection
  - `projects` collection
  - `access_requests` collection
  - `activity_logs` collection

---

## Phase 2: Database Schema Design (Day 1)

### 2.1 Users Collection Schema
```javascript
{
  userId: "auto-generated",
  username: "string (email)",
  email: "string",
  password: "string (hashed)",
  userType: "Admin | Client",
  createdAt: "timestamp",
  updatedAt: "timestamp",
  isActive: "boolean"
}
```

### 2.2 Projects Collection Schema
```javascript
{
  projectId: "auto-generated",
  projectName: "string",
  location: "string",
  phone: "number (10 digits)",
  email: "string",
  startDate: "timestamp",
  endDate: "timestamp",
  createdBy: "userId (Admin)",
  createdAt: "timestamp",
  assignedClients: ["userId1", "userId2"] // array of client IDs
}
```

### 2.3 Access Requests Collection Schema
```javascript
{
  requestId: "auto-generated",
  projectId: "string",
  clientId: "string (userId)",
  clientEmail: "string",
  projectName: "string",
  status: "pending | approved | denied",
  requestedAt: "timestamp",
  reviewedAt: "timestamp",
  reviewedBy: "userId (Admin)"
}
```

### 2.4 Activity Logs Collection Schema
```javascript
{
  logId: "auto-generated",
  userId: "string",
  username: "string",
  action: "string (login, logout, create_project, etc.)",
  timestamp: "timestamp",
  ipAddress: "string",
  userAgent: "string",
  details: "object"
}
```

---

## Phase 3: Backend Implementation (Days 2-3)

### 3.1 Core Configuration Files

#### config/firebase.js
- [ ] Initialize Firebase Admin SDK
- [ ] Export Firestore database instance
- [ ] Add error handling for connection issues

#### server.js
- [ ] Set up Express app
- [ ] Configure middleware (CORS, JSON parser, session)
- [ ] Import and use routes
- [ ] Add error handling middleware
- [ ] Set up server to listen on port

### 3.2 Middleware Implementation

#### middleware/logger.js
- [ ] Create logging middleware
- [ ] Log every request with:
  - User ID (if authenticated)
  - Route accessed
  - HTTP method
  - Timestamp
  - IP address
  - User agent
- [ ] Store logs in Firestore `activity_logs` collection
- [ ] Export middleware function

#### middleware/auth.js
- [ ] Create `isAuthenticated` middleware
- [ ] Check if user session exists
- [ ] If not authenticated, return 401 error
- [ ] Attach user info to `req.user`

#### middleware/roleCheck.js
- [ ] Create `isAdmin` middleware
- [ ] Check if authenticated user has Admin role
- [ ] Return 403 if not authorized
- [ ] Export middleware function

### 3.3 User Controller (controllers/user.js)

**Must export exactly 2 functions:**

#### createUser(username, password)
- [ ] **Validations:**
  - Email format validation (RFC 5322 compliant)
  - Password format validation:
    - Minimum 8 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 number
    - At least 1 special character
  - Check if username/email already exists
  - Validate user type (Admin or Client)
- [ ] **Use Cases to comment:**
  - New user registration during signup
  - Admin creating new users
  - Duplicate email prevention
  - Password strength enforcement
- [ ] Hash password using bcrypt (salt rounds: 10)
- [ ] Create user document in Firestore
- [ ] Return success/failure response

#### checkUser(username, password)
- [ ] **Validations:**
  - Email format check
  - Password not empty
  - User exists in database
  - Account is active
- [ ] **Use Cases to comment:**
  - User login authentication
  - Session creation
  - Failed login attempts tracking
  - Account status verification
- [ ] Retrieve user from Firestore by username
- [ ] Compare password with bcrypt
- [ ] Return user object (without password) if valid
- [ ] Return null or error if invalid

### 3.4 Authentication Routes (routes/auth.js)

#### POST /signup
- [ ] Validate request body:
  - Username (email)
  - Email
  - Password
  - User type
- [ ] Call `createUser()` function
- [ ] Return success with message or error

#### POST /login
- [ ] Validate credentials
- [ ] Call `checkUser()` function
- [ ] If valid:
  - Create session
  - Store user info in session
  - Return success response
- [ ] If invalid, return error message

#### POST /logout
- [ ] Destroy session
- [ ] Clear cookies
- [ ] Return success response

### 3.5 Project Controller & Routes

#### POST /api/projects (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Validate project data:
  - Project name (required, string)
  - Location (required, string)
  - Phone (required, exactly 10 digits)
  - Email (required, valid format)
  - Start date (required, timestamp)
  - End date (required, must be after start date)
- [ ] Create project in Firestore
- [ ] Log activity
- [ ] Return created project

#### GET /api/projects
- [ ] Apply `isAuthenticated` middleware
- [ ] If Admin: Return all projects
- [ ] If Client: Return only projects where client ID is in `assignedClients` array
- [ ] Include project details

#### GET /api/projects/:id
- [ ] Apply `isAuthenticated` middleware
- [ ] Check user has access to project
- [ ] Return project details

### 3.6 Access Request Routes

#### POST /api/requests/create (Client only)
- [ ] Apply `isAuthenticated` middleware
- [ ] Validate user is Client type
- [ ] Validate project exists
- [ ] Check for duplicate pending requests
- [ ] Create access request document
- [ ] Set status to "pending"
- [ ] Return success message

#### GET /api/requests/pending (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Fetch all pending requests from Firestore
- [ ] Join with project and user data
- [ ] Return list of pending requests

#### POST /api/requests/:requestId/approve (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Update request status to "approved"
- [ ] Add client ID to project's `assignedClients` array
- [ ] Log activity
- [ ] Return success message

#### POST /api/requests/:requestId/deny (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Update request status to "denied"
- [ ] Log activity
- [ ] Return success message

### 3.7 User Management Routes (Admin only)

#### GET /api/users (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Fetch all users from Firestore
- [ ] Remove password field from response
- [ ] Return users list

#### POST /api/users (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Call `createUser()` function
- [ ] Return created user

### 3.8 Reports Route

#### GET /api/reports (Admin only)
- [ ] Apply `isAuthenticated` and `isAdmin` middleware
- [ ] Use Node.js streams to send data
- [ ] Query large dataset from Firestore
- [ ] Stream data in chunks using `res.write()`
- [ ] Include activity logs, projects, users data
- [ ] Close stream with `res.end()`

### 3.9 Search and Notifications (Optional but Recommended)

#### GET /api/search (Authenticated)
- [ ] Apply `isAuthenticated` middleware
- [ ] Query parameter: `q` (search query)
- [ ] Search across:
  - Project names
  - User names/emails
  - Locations
- [ ] Return filtered results based on user role
- [ ] Implement debouncing on frontend
- [ ] Return max 10 results for autocomplete

#### GET /api/notifications (Authenticated)
- [ ] Apply `isAuthenticated` middleware
- [ ] Fetch user-specific notifications
- [ ] Types:
  - Admin: New access requests, user registrations
  - Client: Request approved/denied, new project assignments
- [ ] Return unread count
- [ ] Mark as read endpoint: PUT /api/notifications/:id/read

---

## Phase 3.10: Design Assets Preparation

### 3.9.1 Create Global Styles
- [ ] Create `styles/globals.css` with:
  - CSS variables for color palette
  - Typography definitions
  - Reset/normalize styles
  - Dark theme base styles
  - Utility classes

### 3.9.2 Create Logo Component
- [ ] Design/export purple gradient sphere logo
- [ ] Create reusable Logo component
- [ ] Support different sizes (small, medium, large)
- [ ] Include "ubiquitous.co" branding text

### 3.9.3 Create Reusable UI Components
- [ ] **Input Component** with:
  - Dark theme styling
  - Label support
  - Error state styling
  - Floating label animation (optional)
  - Icon support (for password eye icon)
- [ ] **Button Component** with:
  - Primary purple gradient variant
  - Secondary outline variant (transparent with border)
  - Disabled state
  - Loading state with spinner
  - Different sizes (small, medium, large)
- [ ] **Card Component** with dark theme styling
- [ ] **Eye Icon Toggle** for password visibility
- [ ] **Password Strength Tooltip** with:
  - White/light background card (#f8f8f8 or white)
  - Positioned to the right of password field
  - Arrow pointing to password field
  - Title: "Password Strength: [Weak/Fair/Good/Very Good/Strong]"
  - Strength indicator with color coding:
    - Weak: Red (#f56565)
    - Fair: Orange (#ed8936)
    - Good: Yellow (#ecc94b)
    - Very Good: Light Green (#68d391)
    - Strong: Green (#48bb78)
  - Description text (12px, gray):
    - "Use at least 8 characters. Password is case sensitive. Don't use password from another site, or something too obvious."
  - Box shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
  - Border radius: 8px
  - Padding: 16px
  - Width: ~280px

### 3.9.4 Create Dashboard-Specific Components
- [ ] **Sidebar Navigation Component** with:
  - Logo section
  - Menu items with icons
  - Active state highlighting (purple gradient)
  - Hover effects
  - Collapsible for mobile
  - Log out button at bottom

- [ ] **Header Component** with:
  - Search bar with icon
  - Notification bell icon
  - User profile dropdown
  - Responsive layout

- [ ] **Project Card Component** with:
  - Dark card background
  - Project name (large heading)
  - Details list (Location, Contact, Email, Dates)
  - Hover effect (subtle scale or shadow)
  - Responsive sizing

- [ ] **Pending Request Item Component** with:
  - Request description
  - Grant/Deny action buttons
  - Responsive layout

- [ ] **Data Table Component** with:
  - Dark theme styling
  - Column headers
  - Sortable columns (optional)
  - Action buttons per row
  - Pagination controls
  - Rows per page selector
  - Responsive (cards on mobile)

- [ ] **Empty State Component** with:
  - Icon/illustration
  - Message text
  - Call-to-action button
  - Centered layout

---

## Phase 4: Frontend Implementation (Days 4-5)

### 4.1 Authentication Context
- [ ] Create AuthContext for global auth state
- [ ] Store current user and role
- [ ] Provide login, logout, and signup functions
- [ ] Persist session with localStorage or session storage

### 4.2 API Service Layer
- [ ] Create axios instance with base URL
- [ ] Add request interceptor for auth headers/cookies
- [ ] Add response interceptor for error handling
- [ ] Create service functions:
  - `login(username, password)`
  - `signup(userData)`
  - `logout()`
  - `getProjects()`
  - `createProject(projectData)`
  - `requestAccess(projectId)`
  - `getPendingRequests()`
  - `approveRequest(requestId)`
  - `denyRequest(requestId)`
  - `getAllUsers()`

### 4.3 Page: GET /login

**Design Specifications:**
- [ ] **Layout:**
  - Full-screen dark background (#2b2b2b)
  - Center-aligned container (max-width: 400px)
  - Vertical flex layout with center alignment
  - Proper spacing between elements

- [ ] **Components to create:**
  - **Logo Section:**
    - Purple gradient sphere logo (80px diameter)
    - "ubiquitous.co" text below (16px, white, 24px margin-bottom)
  
  - **Heading Section:**
    - "Login" heading (30px, white, bold, 16px margin-bottom)
    - "Please login to continue" subtitle (14px, gray #b3b3b3, 32px margin-bottom)
  
  - **Form Fields:**
    - **User Name Input:**
      - Label: "User Name" (14px, white, positioned above)
      - Placeholder: "Enter Your User Name"
      - Styling: Dark input (#3a3a3a), white text, rounded (12px)
      - Height: 48px, padding: 14px 16px
      - Border: 1px solid #4a4a4a
      - Focus: Purple border (#b794f6) with subtle glow
      - 24px margin-bottom
    
    - **Password Input:**
      - Label: "Password" (14px, white, positioned above)
      - Placeholder: "Enter Your Password"
      - Same styling as User Name
      - Eye icon on the right side for show/hide toggle
      - 32px margin-bottom
  
  - **Sign In Button:**
    - Text: "SIGN IN" (uppercase, white, semibold)
    - Purple gradient background (#b794f6 to #9f7aea)
    - Width: 100% (full width of container)
    - Height: 48px
    - Border radius: 12px
    - Hover effect: Subtle scale (1.02) and lighter gradient
    - 24px margin-bottom
  
  - **Sign Up Link:**
    - Text: "Not Registered Yet? Sign Up " + Link("Here.")
    - Font size: 14px
    - Default text: #b3b3b3
    - Link color: #b794f6 (purple)
    - Link hover: Underline

- [ ] **Functionality:**
  - Client-side validation:
    - Email format
    - Required fields
    - Show error messages below inputs in red (#f56565)
  - On submit:
    - Show loading spinner on button
    - Call POST /api/login
    - On success: redirect to /projects
    - On failure: show error message at top of form
  - If already authenticated, redirect to /projects
  - Password visibility toggle with eye icon

- [ ] **Responsive Design:**
  - Mobile (<640px): Padding 20px, full width
  - Tablet (640-1024px): Same centered layout
  - Desktop (>1024px): Maintain 400px max-width, centered

### 4.4 Page: GET /signup

**Design Specifications (Exact from Figma):**
- [ ] **Layout:**
  - Full-screen dark background (#2b2b2b)
  - Center-aligned container (max-width: 400px)
  - Vertical flex layout with center alignment
  - **Back arrow** in top-left corner (to navigate back to login)

- [ ] **Components to create:**
  - **Back Button:**
    - White left arrow icon in top-left (position: absolute, top: 40px, left: 40px)
    - Size: 24px
    - Clickable, navigates to /login
  
  - **Logo Section:** (Same as login)
    - Purple gradient sphere logo (80px diameter)
    - "ubiquitous.co" text below (16px, white, 24px margin-bottom)
  
  - **Heading Section:**
    - "Sign Up" heading (30px, white, bold, 16px margin-bottom)
    - "Enter the below deatils to sign up" subtitle (14px, gray #b3b3b3, 32px margin-bottom)
  
  - **Form Fields:** (All 320px wide, consistent dark styling)
    - **Name Field:**
      - Label: "Name" (14px, white, positioned above input)
      - Placeholder: "Enter Your name"
      - Styling: Dark input (#3a3a3a), white text, rounded (12px)
      - Height: 48px, padding: 14px 16px
      - Border: 1px solid #4a4a4a
      - Focus: Purple border (#b794f6)
      - 24px margin-bottom
    
    - **Email Field:**
      - Label: "Email" (14px, white, positioned above input)
      - Placeholder: "Enter Your Email Address"
      - Same styling as Name field
      - 24px margin-bottom
    
    - **Password Field:**
      - Label: "Password" (14px, white, positioned above input)
      - Placeholder: "Enter your Password"
      - Same styling as other fields
      - Eye icon on the right side for show/hide toggle
      - **Password Strength Tooltip** (appears on focus/input):
        - Positioned to the right of password field (desktop)
        - Positioned below field (mobile)
        - Shows real-time strength: "Weak", "Fair", "Good", "Very Good", "Strong"
        - Color-coded strength indicator
        - Displays helper text:
          - "Use at least 8 characters. Password is case sensitive."
          - "Don't use password from another site, or something too obvious."
        - Automatically shows when password field is focused
        - Updates as user types
      - 24px margin-bottom
    
    - **User Type Dropdown:**
      - Label: "User Type" (14px, white, positioned above)
      - Placeholder/Default: "Select your User Type"
      - Custom styled select dropdown with dark theme
      - Background: #3a3a3a
      - Dropdown arrow icon on the right (chevron down)
      - Options: "Admin", "Client"
      - Same height and styling as inputs (48px)
      - Border radius: 12px
      - 32px margin-bottom
    
    - **Submit Button:**
      - Text: "SIGN UP" (uppercase, white, semibold)
      - Purple gradient background (#b794f6 to #9f7aea)
      - Width: 100% (full width of container)
      - Height: 48px
      - Border radius: 12px
      - Hover effect: Subtle scale (1.02) and lighter gradient
      - No margin-bottom (last element before optional link)

- [ ] **Functionality:**
  - Back arrow navigates to /login
  - Client-side validation:
    - Name: Required, min 2 characters
    - Email format (RFC compliant)
    - Password format:
      - Min 8 characters
      - 1 uppercase, 1 lowercase, 1 number, 1 special char
    - User Type: Required selection
    - Show error messages below respective inputs in red (#f56565)
  - Password visibility toggle with eye icon
  - **Real-time Password Strength Calculation:**
    - **Weak** (Red): < 8 characters or no variety
    - **Fair** (Orange): 8+ chars, 2 types (e.g., letters + numbers)
    - **Good** (Yellow): 8+ chars, 3 types (letters + numbers + special)
    - **Very Good** (Light Green): 10+ chars, all 4 types, mixed case
    - **Strong** (Green): 12+ chars, all 4 types, mixed case, no common patterns
    - Tooltip appears on password field focus
    - Updates dynamically as user types
    - Dismisses when field loses focus (optional: keep visible until strong)
  - On submit:
    - Show loading spinner on button
    - Disable all fields during submission
    - Call POST /api/signup with:
      ```json
      {
        "username": "email",
        "email": "email",
        "password": "password",
        "userType": "Admin/Client"
      }
      ```
    - On success: 
      - Show success message/toast
      - Auto-redirect to /login after 2 seconds
      - OR show "Go to Login" button
    - On failure: Show error message at top of form
  - If already authenticated, redirect to /projects

- [ ] **Responsive Design:**
  - Mobile (<640px): 
    - Padding 20px
    - Back arrow position adjusted
    - Full width inputs with 20px side margins
  - Tablet (640-1024px): Same centered layout
  - Desktop (>1024px): Maintain 400px max-width, centered

### 4.5 Page: GET /projects - Admin Dashboard

**Design Specifications (Exact from Figma):**

#### Layout Structure:
- [ ] **Left Sidebar** (fixed, ~220px width):
  - Dark background (#2b2b2b)
  - Full height
  - Purple highlight for active menu item
  
- [ ] **Main Content Area**:
  - Darker background (#1e1e1e or #1a1a1a)
  - Top header bar (dark #2b2b2b)
  - Content padding: 40px
  - Full width minus sidebar

#### Sidebar Navigation:
- [ ] **Logo Section** (top):
  - Purple gradient sphere logo (50px)
  - "ubiquitous.co" text below (14px, white)
  - Padding: 24px
  - Center aligned

- [ ] **Menu Items** (vertical list):
  - **Homescreen** (icon + text)
    - Icon: Home/dashboard icon
    - Text: "Homescreen" (14px)
    - Padding: 12px 20px
    - Hover: Lighter background
  
  - **Usage** (icon + text)
    - Icon: Usage/chart icon
    - Same styling
  
  - **Projects** (icon + text) - **ACTIVE STATE**
    - Purple gradient background (#b794f6)
    - White text
    - Rounded: 8px
    - Icon: Projects/folder icon
    - Highlight bar on left (optional)
  
  - **Taskboard** (icon + text)
    - Icon: Taskboard/kanban icon
    - Same styling as inactive items
  
  - **History** (icon + text)
    - Icon: History/clock icon
    - Same styling

- [ ] **Log Out** (bottom of sidebar):
  - Icon: Power/logout icon
  - Text: "Log out"
  - Position: absolute bottom, 24px from bottom
  - Same styling as menu items
  - Hover: Red tint (#f56565)

#### Top Header Bar:
- [ ] **Search Bar** (center-left):
  - Width: ~400px
  - Background: Darker (#3a3a3a)
  - Border radius: 8px
  - Height: 40px
  - Placeholder: "Search quantity control, regulators..."
  - Search icon on left inside input
  - White text

- [ ] **Right Section**:
  - **Bell Icon** (notifications):
    - Size: 20px
    - White color
    - Clickable
    - Badge for unread notifications (optional)
  
  - **Admin Profile Dropdown**:
    - Text: "Admin" (white, 14px)
    - Profile picture (circular, 32px)
    - Chevron down icon
    - Clickable dropdown
    - Spacing: 16px between elements

#### Main Content:

- [ ] **Welcome Section**:
  - "Hi Yuri! 👋" (24px, white, bold)
  - "Let's monitor the product wise usage" (14px, gray #b3b3b3)
  - Margin bottom: 32px

- [ ] **Create Project Button** (top right):
  - Position: absolute top-right of content area
  - Text: "Create Project"
  - Border: 1px solid #4a4a4a (outline style)
  - Background: Transparent
  - Color: White
  - Border radius: 6px
  - Padding: 10px 24px
  - Hover: Purple border and purple text
  - Navigate to /createProject

- [ ] **Projects Grid Section**:
  - Display: Grid (3 columns on desktop)
  - Gap: 24px
  - Margin bottom: 40px
  
  **Project Card Design:**
  - Background: #2b2b2b (card background)
  - Border radius: 12px
  - Padding: 24px
  - Width: ~300px each
  - Box shadow: subtle
  
  **Card Content:**
  - **Project Name** (top):
    - Font size: 32px
    - Font weight: Bold
    - Color: White
    - Margin bottom: 16px
  
  - **Details List** (stacked vertically):
    - "Location : [Haryana]" (14px, #b3b3b3)
    - "Contact: + 91 [8989898890]" (14px, #b3b3b3)
    - "Email: [Google@google.com]" (14px, #b3b3b3)
    - "Start Date: [04/06/2019]" (14px, #b3b3b3)
    - "End Date : [04/06/2019]" (14px, #b3b3b3)
    - Line spacing: 8px between lines
    - Format: "Label : Value"

- [ ] **Pending Requests Section**:
  - Background: Transparent with border
  - Border: 1px solid #4a4a4a
  - Border radius: 12px
  - Padding: 24px
  - Margin bottom: 40px
  - Max width: ~600px
  
  **Header:**
  - "Pending Requests" (18px, white, semibold)
  - Margin bottom: 16px
  
  **Request Item:**
  - Text: "Client 1 - requesting access to GOOGLE"
  - Font size: 14px
  - Color: White
  - Display: Flex row with space-between
  
  **Action Buttons:**
  - **Grant Access Button**:
    - Text: "[ Grant Access ]"
    - Background: Purple gradient (#b794f6)
    - Color: White
    - Border radius: 6px
    - Padding: 8px 20px
    - Font size: 13px
  
  - **Deny Access Button**:
    - Text: "[ Deny Access ]"
    - Same styling as Grant Access
    - Margin left: 12px
  
  **Multiple Requests:**
  - Stack vertically
  - 16px margin between items

- [ ] **Users Table Section**:
  - Margin top: 40px
  
  **Create User Button** (top right of table):
  - Text: "Create User"
  - Same styling as "Create Project" button
  - Border style, transparent background
  
  **Table Design:**
  - Background: #2b2b2b
  - Border radius: 12px
  - Padding: 24px
  - Width: 100%
  
  **Table Headers:**
  - Columns: Name | Email | Created Date | View
  - Font size: 14px
  - Color: #808080 (gray)
  - Font weight: Semibold
  - Border bottom: 1px solid #4a4a4a
  - Padding bottom: 12px
  
  **Table Rows:**
  - Font size: 14px
  - Color: White
  - Padding: 16px vertical
  - Border bottom: 1px solid #3a3a3a (subtle)
  - Hover: Slightly lighter background (#363636)
  
  **View Button:**
  - Text: "View"
  - Border: 1px solid #4a4a4a
  - Background: Transparent
  - Color: White
  - Border radius: 4px
  - Padding: 6px 16px
  - Font size: 12px
  - Hover: Purple border and text
  
  **Pagination** (bottom of table):
  - Display: Flex row, space-between
  - Margin top: 16px
  - Left side: "Rows per page: 13" with dropdown
  - Right side: "1-5 of 13" with prev/next arrows
  - Font size: 13px
  - Color: #b3b3b3
  - Arrow buttons: Circular, 32px, border

#### Responsive Behavior:
- [ ] **Desktop (>1024px):**
  - 3-column grid for projects
  - Sidebar always visible
  - Full table layout

- [ ] **Tablet (768-1024px):**
  - 2-column grid for projects
  - Collapsible sidebar
  - Full table layout

- [ ] **Mobile (<768px):**
  - 1-column layout for projects
  - Hamburger menu for sidebar
  - Responsive table (cards or horizontal scroll)

---

### 4.5.1 Page: GET /projects - Client Dashboard

**Design Specifications (Exact from Figma):**

- [ ] **Layout**: Same dashboard structure as Admin (sidebar + header + content)

- [ ] **Page Title**: "Client Dashboard / REQUESTING ACCESS" (gray, top of page)

- [ ] **Sidebar Menu** (Client-specific, no Admin items):
  - Homescreen (icon + text)
  - Usage (icon + text)
  - **My Projects** (icon + text) - **ACTIVE STATE** (purple gradient background)
  - Taskboard (icon + text)
  - History (icon + text)
  - Log out (bottom, power icon)

- [ ] **Header**: Same as Admin (search bar, bell icon, profile dropdown showing "Client")

#### Content Area:

- [ ] **Welcome Section**:
  - "HI [Client Name] san! 👋" (24px, white, bold)
    - Note: "san" is a Japanese honorific - can be customized or removed
  - Subtitle: "You don't have access to any projects at the moment. Please request the same by clicking on the button below."
    - Font size: 14px
    - Color: #b3b3b3 (gray)
    - Line height: 1.6
    - Max width: 600px
  - Margin bottom: 32px

- [ ] **Request Access Button**:
  - Text: "Request Access"
  - Background: Purple gradient (#b794f6)
  - Color: White
  - Font size: 14px
  - Font weight: Semibold
  - Padding: 12px 32px
  - Border radius: 8px
  - Height: 48px
  - Click behavior: Toggle dropdown/expand project list below
  - Margin bottom: 24px

#### Projects Dropdown/List (Shown when "Request Access" is clicked):

- [ ] **Container**:
  - Background: #2b2b2b (dark card)
  - Border radius: 12px
  - Padding: 0 (list items have internal padding)
  - Max width: 350px
  - Box shadow: subtle
  - Max height: 400px (scrollable if more projects)

- [ ] **Project List Items**:
  - **Row Layout** (each project):
    - Display: Flex, space-between
    - Padding: 16px 20px
    - Border bottom: 1px solid #3a3a3a (except last item)
    - Hover: Background #363636
    
  - **Left Side - Project Name**:
    - Font size: 14px
    - Color: White
    - Font weight: Normal
    - Examples: "GOOGLE", "Project 2", "Project 3", etc.
  
  - **Right Side - Action Buttons**:
    
    **If NOT requested yet:**
    - Show "Request" button only
    - Button style:
      - Text: "Request"
      - Background: Purple gradient (#b794f6)
      - Color: White
      - Font size: 12px
      - Padding: 6px 16px
      - Border radius: 6px
      - Hover: Lighter gradient
      - Click: Send request to backend
    
    **If ALREADY requested:**
    - Show both "Request" and "Requested" badges
    - "Request" button (same as above)
    - "Requested" badge:
      - Text: "Requested"
      - Background: Purple (#b794f6)
      - Color: White
      - Font size: 11px
      - Padding: 4px 12px
      - Border radius: 4px
      - Margin left: 8px
      - Non-clickable (status indicator)
    
    **If request APPROVED (client has access):**
    - Don't show in this list OR
    - Show "Approved" badge (green #48bb78)
    - No action buttons

- [ ] **Empty State** (when client has no projects and dropdown is closed):
  - Just show the welcome message and "Request Access" button
  - No projects list visible until button is clicked

#### If Client HAS Projects (Alternative View - When Access is Granted):

- [ ] **Page Title**: "Client Dashboard" (gray, top of page)

- [ ] **Welcome Section** (Updated):
  - "HI [Client Name] san! 👋" (24px, white, bold)
  - Subtitle: "Let's monitor the product wise usage"
    - Font size: 14px
    - Color: #b3b3b3 (gray)
  - Margin bottom: 32px

- [ ] **Request Access Button** (top area):
  - Text: "Request Access"
  - Background: Purple gradient (#b794f6)
  - Position: Below welcome message, left-aligned
  - Same styling as request button in empty state
  - Click: Opens dropdown/modal to request access to MORE projects
  - Margin bottom: 32px

- [ ] **My Projects Grid**:
  - Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
  - Gap: 24px between cards
  - Only shows projects where `assignedClients` array includes client's userId
  
  **Project Card Design** (Same as Admin view):
  - Background: #2b2b2b (dark card)
  - Border radius: 12px
  - Padding: 24px
  - Width: ~300px each (responsive)
  - Box shadow: subtle
  
  **Card Content:**
  - **Project Name** (top):
    - Font size: 32px
    - Font weight: Bold
    - Color: White
    - Margin bottom: 16px
    - Example: "Google"
  
  - **Details List** (stacked vertically):
    - "Location : [Haryana]" (14px, #b3b3b3)
    - "Contact: + 91 [8989898890]" (14px, #b3b3b3)
    - "Email: [deepak@google.com]" (14px, #b3b3b3)
    - "Start Date: [04/06/2019]" (14px, #b3b3b3)
    - "End Date : [04/06/2019]" (14px, #b3b3b3)
    - Line spacing: 8px between lines
    - Format: "Label : Value"
  
  - **Hover Effect** (optional):
    - Subtle scale (1.02)
    - Slightly lighter shadow
    - Transition: 0.2s ease

- [ ] **Empty State** (if all requests pending but no approved projects):
  - Show message: "Your access requests are pending approval"
  - Show pending projects list with "Requested" badges
  - Encourage user to wait for admin approval

- [ ] **No Pending Requests Section** (clients don't see this)
- [ ] **No Users Table** (clients don't see this)
- [ ] **No Create Project Button** (clients can't create projects)

#### Functionality:

- [ ] **Request Access Flow**:
  1. Click "Request Access" button
  2. Dropdown/list expands showing all available projects
  3. Each project shows current status:
     - No badge: Not requested yet (show "Request" button)
     - "Requested" badge: Pending approval
     - "Approved" badge: Already has access (shouldn't show in request list)
     - "Denied" badge: Request was denied (can request again)
  4. Click "Request" button on any project:
     - Call POST /api/requests/create with projectId
     - On success: Update UI to show "Requested" badge
     - Show success toast: "Access request sent!"
     - Don't close dropdown (allow multiple requests)
  5. Click outside or "Request Access" button again to collapse

- [ ] **API Calls**:
  - GET /api/projects - Fetch all projects (to show in request list)
  - GET /api/projects?myProjects=true - Fetch client's accessible projects
  - GET /api/requests?clientId=currentUser - Fetch client's request statuses
  - POST /api/requests/create - Submit new access request

- [ ] **Real-time Updates** (optional):
  - Refresh project access status when tab gains focus
  - Show notification when request is approved/denied

#### Responsive Design:
- Desktop (>1024px): Full layout, dropdown positioned properly
- Tablet (768-1024px): Same layout, narrower dropdown
- Mobile (<768px): 
  - Full-width dropdown
  - Stack project cards vertically
  - Hamburger menu for sidebar

### 4.6 Page: GET/POST /createProject (Admin only)

**Design Specifications (Exact from Figma):**

- [ ] **Layout**: Dashboard layout with sidebar and header (same as projects page)

- [ ] **Navigation**:
  - Active menu item: "Projects" (purple highlight in sidebar)
  - Page title at top: "Admin - Create Project" (gray, top of browser/page)

- [ ] **Back Button**:
  - Left arrow icon + "Back" text
  - Position: Top-left of content area
  - Font size: 14px
  - Color: White
  - Clickable, navigates back to /projects
  - Margin bottom: 24px

- [ ] **Form Container**:
  - Background: #2b2b2b (dark card)
  - Border radius: 12px
  - Padding: 40px
  - Max width: 680px
  - Box shadow: subtle

- [ ] **Form Title**:
  - Text: "Create Project"
  - Font size: 24px
  - Font weight: Semibold
  - Color: White
  - Margin bottom: 32px

- [ ] **Form Fields**:
  
  **Row 1 - Project Name (Full Width):**
  - Label: "Project Name" (14px, white, above input)
  - Placeholder: "Enter First Name" (note: should be "Enter Project Name")
  - Input styling:
    - Background: #3a3a3a
    - Border: 1px solid #4a4a4a
    - Border radius: 8px
    - Height: 48px
    - Padding: 14px 16px
    - Color: White
    - Width: 100%
  - Margin bottom: 24px
  
  **Row 2 - Email & Contact (Two Columns, 50% each):**
  - **Email address (Left):**
    - Label: "Email address" (14px, white)
    - Placeholder: "Enter email address"
    - Same input styling as above
    - Width: ~48% (with gap)
  
  - **Contact Number (Right):**
    - Label: "Contact Number" (14px, white)
    - Placeholder: "Enter contact number"
    - Same input styling
    - Width: ~48%
    - Input type: text (with number validation)
    - Max length: 10 digits
  - Gap between: 16px
  - Margin bottom: 24px
  
  **Row 3 - Timeline Section:**
  - Label: "Timeline" (14px, white, above date inputs)
  - Margin bottom: 12px
  
  - **Start Date & End Date (Two Columns, 50% each):**
    - **Start Date (Left):**
      - Placeholder: "Start Date"
      - Same input styling
      - Calendar icon on the right inside input
      - Date picker popup on click
      - Width: ~48%
    
    - **End Date (Right):**
      - Placeholder: "End Date"
      - Same input styling
      - Calendar icon on the right inside input
      - Date picker popup on click
      - Width: ~48%
    - Gap between: 16px
  - Margin bottom: 32px
  
  **Submit Button:**
  - Text: "Create User" (note: should display "Create Project" - fix in implementation)
  - Background: Purple gradient (#b794f6)
  - Color: White
  - Font size: 14px
  - Font weight: Semibold
  - Padding: 12px 32px
  - Border radius: 8px
  - Border: None
  - Height: 48px
  - Min width: 140px
  - Hover: Lighter gradient, scale(1.02)
  - Loading state: Show spinner, disable button

- [ ] **Validation**:
  - **Client-side validation:**
    - Project Name: Required, min 2 characters
    - Email: Required, valid email format
    - Contact Number: Required, exactly 10 digits, numbers only
    - Start Date: Required, valid date
    - End Date: Required, must be after Start Date
    - Show error messages below respective fields in red (#f56565)
  
  - **Real-time validation:**
    - Validate on blur (when user leaves field)
    - Show green checkmark or red X icon inside input (optional)
    - Disable submit until all fields valid

- [ ] **Functionality**:
  - On submit:
    - Show loading spinner on button
    - Disable all form fields
    - Call POST /api/projects with data:
      ```json
      {
        "projectName": "string",
        "location": "string", // Note: not in form, may need to add or use default
        "phone": "1234567890",
        "email": "email@domain.com",
        "startDate": "timestamp",
        "endDate": "timestamp"
      }
      ```
    - On success:
      - Show success toast/message
      - Redirect to /projects after 1 second
    - On error:
      - Show error message at top of form
      - Re-enable form fields
  
  - Back button navigates to /projects
  - Form auto-saves to localStorage (optional, for better UX)

- [ ] **Missing Field - Location**:
  - **Note**: The design doesn't show a Location field, but it's required per the assignment
  - **Implementation decision**: Add Location field after Project Name or use a default value
  - Suggested placement: Between Project Name and Email/Contact row

**Responsive Design:**
- Desktop (>768px): Two-column layout for Email/Contact and Dates
- Tablet/Mobile (<768px): Stack all fields vertically (single column)

### 4.7 Page: GET /reports (Admin only)

**Components to create:**
- [ ] Protected route (Admin only)
- [ ] Display streamed data from backend
- [ ] Use fetch with streaming response or EventSource
- [ ] Show data as it arrives:
  - Activity logs
  - Project statistics
  - User statistics
- [ ] Format data in tables or charts
- [ ] Add loading indicator

### 4.8 Routing Configuration
- [ ] Set up React Router with routes:
  - `/login` → LoginPage
  - `/signup` → SignupPage
  - `/` → DashboardLayout (protected) with nested routes:
    - `/homescreen` → HomescreenPage (protected)
    - `/usage` → UsagePage (protected)
    - `/projects` → ProjectsPage (protected, role-based view)
    - `/taskboard` → TaskboardPage (protected)
    - `/history` → HistoryPage (protected)
    - `/createProject` → CreateProjectPage (Admin only)
    - `/reports` → ReportsPage (Admin only)
  - Default `/` → Redirect to /login (if not authenticated) or /projects (if authenticated)
- [ ] Create ProtectedRoute wrapper component
- [ ] Create AdminRoute wrapper component
- [ ] Create DashboardLayout component (includes Sidebar + Header)
- [ ] Sidebar navigation links update active state based on current route

### 4.9 Common Components
- [ ] **DashboardLayout** (wraps all authenticated pages):
  - Sidebar navigation (fixed left)
  - Top header bar (search, notifications, profile)
  - Main content area (dynamic)
  - Responsive behavior (collapsible sidebar on mobile)

- [ ] **Sidebar Component** with:
  - Logo (links to home)
  - Navigation menu items (icon + text)
  - Active state indicator (purple gradient)
  - Role-based menu items (Admin vs Client)
  - Log out button at bottom
  - Collapse/expand for mobile

- [ ] **Header Component** with:
  - Search bar (center)
  - Bell icon for notifications
  - Profile dropdown (username + avatar + chevron)
  - Dropdown menu (Profile, Settings, Logout)

- [ ] **Profile Dropdown Menu**:
  - Options: View Profile, Settings, Log Out
  - Dark background
  - Border radius: 8px
  - Position: absolute, right-aligned

- [ ] **Notification Panel** (optional):
  - Dropdown from bell icon
  - List of notifications
  - Mark as read functionality

- [ ] Footer (optional for dashboard)
- [ ] Loading spinner
- [ ] Error message component
- [ ] Success message/toast component
- [ ] Confirmation dialog component
- [ ] Modal component (for request access, etc.)

---

## Phase 4.10: Error Pages

### 4.10.1 Page: 401 Unauthorized

**Design Specifications (Exact from Figma):**

- [ ] **Layout**:
  - Full-screen dark background (#2b2b2b)
  - Center-aligned vertical layout
  - No sidebar or header (standalone error page)

- [ ] **Error Display**:
  - **"401" Text** with integrated logo:
    - Display "4" + Purple sphere logo + "1"
    - Font size: ~120px (massive)
    - Font weight: Bold
    - Color: White
    - Purple gradient sphere positioned between "4" and "1"
    - Sphere size: ~80-100px, positioned to align with text baseline
    - Creative integration - logo replaces the "0" in "401"
    - Margin bottom: 24px
  
  - **Error Message**:
    - Text: "UNAUTHORIZED REQUEST"
    - Font size: 20px
    - Font weight: Normal
    - Color: White
    - Letter spacing: 2px
    - Margin bottom: 40px

- [ ] **Action Button**:
  - Text: "Go Back"
  - Background: Purple gradient (#b794f6)
  - Color: White
  - Font size: 14px
  - Font weight: Semibold
  - Padding: 12px 40px
  - Border radius: 8px
  - Height: 48px
  - Min width: 140px
  - Hover: Lighter gradient, scale(1.02)
  - Click: Navigate back using history.back() or to /login

- [ ] **Functionality**:
  - Displayed when:
    - User tries to access protected route without authentication
    - JWT token is expired or invalid
    - Session is not found
    - User tries to access admin-only route as client
  - "Go Back" button navigates to:
    - Previous page if user came from within app
    - /login if no valid session
    - /projects if authenticated but wrong role

### 4.10.2 Page: 404 Not Found (Optional but Recommended)

**Design Specifications:**
- [ ] **Same layout as 401 page**
- [ ] **Error Display**:
  - "404" with purple sphere as "0"
  - Message: "PAGE NOT FOUND"
  - Button: "Go Home" → Navigate to /projects (if authenticated) or /login

### 4.10.3 Page: 403 Forbidden (Optional)

**Design Specifications:**
- [ ] **Same layout as 401 page**
- [ ] **Error Display**:
  - "403" with purple sphere as "0"
  - Message: "ACCESS FORBIDDEN"
  - Subtitle: "You don't have permission to access this resource"
  - Button: "Go Back" → Navigate to appropriate dashboard

### 4.10.4 Page: 500 Server Error (Optional)

**Design Specifications:**
- [ ] **Same layout as 401 page**
- [ ] **Error Display**:
  - "500" with purple sphere as first "0"
  - Message: "SERVER ERROR"
  - Subtitle: "Something went wrong. Please try again later."
  - Button: "Refresh Page" → Reload current page

---

## Phase 5: Testing and Validation (Day 6)

### 5.1 Backend Testing
- [ ] Test all API endpoints with Postman or Thunder Client
- [ ] Verify authentication flow
- [ ] Test role-based access control
- [ ] Validate all input validations
- [ ] Test error scenarios:
  - Invalid credentials
  - Unauthorized access
  - Invalid data formats
  - Duplicate entries

### 5.2 Frontend Testing
- [ ] Test all user flows:
  - **Admin Flow:**
    - Login as admin
    - View all projects and users
    - Create new project
    - Approve/deny client requests
    - View reports
    - Logout
  - **Client Flow:**
    - Login as client
    - View accessible projects
    - Request access to projects
    - Logout
  - **Signup Flow:**
    - Create new user
    - Navigate to login
- [ ] Test form validations
- [ ] Test responsive design
- [ ] Test error handling

### 5.3 Integration Testing
- [ ] Test complete workflows end-to-end
- [ ] Verify data consistency in Firestore
- [ ] Check logging middleware functionality
- [ ] Verify session management

---

## Phase 6: Refinement and Documentation (Day 7)

### 6.1 Code Quality
- [ ] Add comprehensive comments to user.js with:
  - Use cases
  - Validations implemented
  - Error scenarios
- [ ] Add JSDoc comments to all functions
- [ ] Ensure consistent code formatting
- [ ] Remove console.logs and debug code
- [ ] Add proper error messages

### 6.2 Security Enhancements
- [ ] Implement rate limiting on login endpoint
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Set secure session cookies (httpOnly, secure)
- [ ] Add helmet.js for security headers
- [ ] Implement input sanitization

### 6.3 Documentation
- [ ] Create README.md with:
  - Project description
  - Setup instructions
  - Environment variables needed
  - How to run the project
  - API documentation
  - Admin credentials for testing
- [ ] Create API documentation (endpoints, request/response)
- [ ] Add inline code comments
- [ ] Document database schema

### 6.4 Deployment Preparation
- [ ] Create .env.example file
- [ ] Add .gitignore for sensitive files
- [ ] Prepare build scripts
- [ ] Test production build
- [ ] Create sample data for demo

---

## Key Technical Decisions

### Password Format Requirements
Based on "format shared in design", implement:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter  
- At least 1 digit
- At least 1 special character (@$!%*?&#)

### Session Management
- Use express-session with Firestore store or memory store
- Session timeout: 24 hours
- Secure cookies in production

### Logging Strategy
- Log all user activities (login, logout, CRUD operations)
- Include: timestamp, userId, action, IP, user agent
- Store in separate Firestore collection for analytics

### Streaming for Reports
- Use Node.js Readable stream or manual chunking
- Send data in JSON lines format or SSE (Server-Sent Events)
- Frontend consumes stream progressively

---

## Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=your-database-url

# Session
SESSION_SECRET=your-super-secret-key
SESSION_MAX_AGE=86400000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## Deliverables Checklist

- [ ] Backend API with all endpoints working
- [ ] Firebase Firestore integrated and configured
- [ ] user.js with createUser() and checkUser() functions
- [ ] Logging middleware tracking all activities
- [ ] Role-based access control (Admin vs Client)
- [ ] Frontend with all required routes
- [ ] Form validations on both client and server
- [ ] Streaming endpoint for reports
- [ ] Session-based authentication
- [ ] Comprehensive comments in code
- [ ] README with setup instructions
- [ ] Working demo with sample data

---

## Timeline Summary

- **Day 1:** Project setup, architecture, database design
- **Day 2-3:** Backend implementation (controllers, routes, middleware)
- **Day 4-5:** Frontend implementation (all pages and components)
- **Day 6:** Testing and validation
- **Day 7:** Refinement, documentation, deployment prep

---

## Additional Recommendations

1. **Error Handling:** Implement centralized error handling middleware
2. **Validation:** Use express-validator on backend, Yup/Zod on frontend
3. **Logging:** Consider Winston or Pino for structured logging
4. **Testing:** Add unit tests with Jest if time permits
5. **UI/UX:** Use a component library (Material-UI, Ant Design) for consistent design
6. **State Management:** Consider Zustand or Context API for state management
7. **Performance:** Implement pagination for large lists
8. **Accessibility:** Follow WCAG guidelines for forms and navigation

---

## Notes for Implementation

- Ensure all Admin-only routes are protected with both authentication and role checks
- Client should only see projects they have explicit access to
- All passwords must be hashed before storing
- Logging middleware should run on every request
- Session should be validated on every protected route
- Handle edge cases (empty states, loading states, errors)
- Make sure to test both successful and failure scenarios
- Keep the code modular and maintainable
