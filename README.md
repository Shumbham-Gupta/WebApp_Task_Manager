
# 🚀 Task Management App - Full Stack MERN Application

A modern, production-ready task management application built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB Atlas**. Features JWT authentication, protected routes, and full CRUD operations on tasks.


## ✨ Features

### Frontend
- ✅ Modern React UI with Vite for fast development
- ✅ Responsive design with TailwindCSS
- ✅ Protected routes with authentication guards
- ✅ User registration and login with JWT
- ✅ Dashboard with task statistics
- ✅ Full CRUD operations on tasks
- ✅ Real-time search and filtering
- ✅ Toast notifications for user feedback
- ✅ Beautiful icons with Lucide React

### Backend
- ✅ RESTful API built with Express.js
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Security headers with Helmet
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Request logging with Morgan

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- Vite 5.0
- React Router DOM 6.20
- Axios 1.6
- TailwindCSS 3.3
- Lucide React (Icons)
- React Toastify

**Backend:**
- Node.js
- Express.js 4.18
- MongoDB with Mongoose 8.0
- JWT (jsonwebtoken 9.0)
- bcryptjs 2.4
- express-validator 7.0
- Helmet 7.1
- Morgan 1.10

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── userController.js    # User logic
│   │   │   └── taskController.js    # Task CRUD logic
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── errorHandler.js      # Global error handler
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   └── Task.js              # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── userRoutes.js        # User endpoints
│   │   │   └── taskRoutes.js        # Task endpoints
│   │   └── server.js                # Express app entry
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── ProtectedRoute.jsx   # Auth guard
│   │   │   ├── TaskCard.jsx         # Task display card
│   │   │   └── TaskForm.jsx         # Task create/edit form
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   └── Dashboard.jsx        # Main dashboard
│   │   ├── services/
│   │   │   ├── api.js               # Axios config
│   │   │   └── taskService.js       # Task API calls
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd task-management-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

2. Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create a database user with username and password
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and replace in `.env`:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanagement
   ```

### Frontend Configuration (Optional)

If you need to change the API URL, edit `frontend/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if needed
});
```

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Run Both Concurrently (Recommended)

Install concurrently in the root directory:
```bash
npm install -g concurrently
```

Add to root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
  }
}
```

Then run:
```bash
npm run dev
```

## 🌐 Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

### Test Credentials

Create a new account or use these test steps:
1. Click "Register" on the homepage
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. After registration, you'll be automatically logged in

### Backend Deployment (Railway/Render)
 **Render:**
   - Push code to GitHub
   - Connect repository to Render
   - Add environment variables in Render dashboard
   - Deploy

### Frontend Deployment (Vercel/Netlify/Render)
### Environment Variables for Production

Remember to set these in your deployment platform:
- `NODE_ENV=production`
- `MONGODB_URI=<your_atlas_uri>`
- `JWT_SECRET=<strong_secret>`
- `FRONTEND_URL=<your_frontend_url>`


### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

**Built with ❤️ using MERN Stack**
