# TalentMeet 🚀

**TalentMeet** is a real-time collaborative coding interview platform that enables seamless technical interviews with integrated video calling, live code execution, and chat functionality.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://talentmeet-5852.onrender.com/)
[![Backend API](https://img.shields.io/badge/API-Live-blue)](https://talentmeet-3.onrender.com/)

## 🌟 Features

### 💻 Core Functionality
- **Real-time Code Collaboration**: Monaco Editor integration for professional code editing experience
- **Multi-language Support**: Execute code in JavaScript, Python, Java, C++, and more
- **Live Code Execution**: Powered by Piston API for secure server-side code execution
- **Video Conferencing**: Built-in HD video calls using Stream Video SDK
- **Real-time Chat**: Integrated messaging system during interview sessions
- **Problem Library**: Curated collection of coding problems with varying difficulty levels

### 🎯 User Experience
- **Authentication**: Secure authentication via Clerk
- **Session Management**: Create, join, and manage interview sessions
- **Split-panel Interface**: Resizable panels for problem description, code editor, output, and video
- **Responsive Design**: Modern UI with TailwindCSS and DaisyUI
- **Real-time Updates**: Live session status and participant tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router v7
- **UI Components**: DaisyUI + TailwindCSS v4
- **State Management**: TanStack Query (React Query)
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Video SDK**: Stream Video React SDK
- **Chat SDK**: Stream Chat React
- **Icons**: Lucide React
- **Authentication**: Clerk React

### Backend
- **Runtime**: Bun
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk Express
- **Video/Chat**: Stream.io Node SDK
- **Background Jobs**: Inngest
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh/) (latest version)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- Node.js 16+ (for compatibility)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/utpal-kumar-08/TalentMeet.git
cd TalentMeet
```

### 2. Environment Variables

Create `.env` files in both `frontend` and `backend` directories.

#### Backend `.env`
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DB_URL=mongodb://localhost:27017/talentmeet

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream.io
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

#### Frontend `.env`
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000
VITE_STREAM_API_KEY=your_stream_api_key
```

### 3. Install Dependencies

From the root directory:

```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

Or install separately:

```bash
# Backend
cd backend
bun install

# Frontend
cd ../frontend
bun install --ignore-scripts
```

### 4. Run the Application

#### Development Mode

**Option 1: Run from root directory**
```bash
# Start backend server
npm run dev

# In another terminal, start frontend
cd frontend
bun run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
cd backend
bun run dev

# Terminal 2 - Frontend
cd frontend
bun run dev
```

#### Production Mode

```bash
# Build frontend
npm run build

# Start backend (serves frontend in production)
npm run start
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
TalentMeet/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas (User, Session)
│   │   ├── routes/           # API routes
│   │   │   ├── chatRoutes.js
│   │   │   ├── sessionRoutes.js
│   │   │   └── codeRoutes.js
│   │   ├── middleware/       # Auth & validation
│   │   ├── lib/              # Utilities (db, inngest, env)
│   │   └── server.js         # Express app entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Route pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProblemsPage.jsx
│   │   │   ├── ProblemPage.jsx
│   │   │   └── SessionPage.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── api/              # API client
│   │   ├── lib/              # Utilities (piston, stream)
│   │   ├── data/             # Static data (problems)
│   │   └── App.jsx           # Root component
│   └── package.json
│
└── package.json              # Root package with scripts
```

## 🔧 Available Scripts

### Root Level
```bash
npm run install:all   # Install all dependencies
npm run build        # Build frontend for production
npm run start        # Start backend server
npm run dev          # Start backend in development mode
```

### Backend
```bash
bun run dev          # Start with hot reload
bun run start        # Start in production mode
```

### Frontend
```bash
bun run dev          # Start Vite dev server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint
```

## 🌐 API Endpoints

### Health Check
```
GET /health            # Server health status
```

### Session Routes
```
POST   /api/sessions        # Create new session
GET    /api/sessions        # Get all sessions
GET    /api/sessions/:id    # Get session by ID
POST   /api/sessions/:id/join   # Join session
PUT    /api/sessions/:id/end    # End session
```

### Chat Routes
```
POST   /api/chat/token      # Get Stream chat token
```

### Code Execution
```
POST   /api/code/execute    # Execute code
```

### Inngest
```
POST   /api/inngest         # Inngest webhook endpoint
```

## 🔐 Authentication Flow

1. Users authenticate via Clerk
2. Backend middleware validates Clerk JWT tokens
3. User data is synced to MongoDB
4. Stream tokens are generated for video/chat access

## 🎨 Key Features Breakdown

### Session Management
- **Create Session**: Host selects a problem and difficulty level
- **Join Session**: Participants join via session ID or link
- **Live Status**: Real-time updates when participants join/leave
- **End Session**: Host can terminate the session

### Code Editor
- Syntax highlighting for multiple languages
- Auto-completion and IntelliSense
- Theme support (VS Code themes)
- Resizable panels for optimal workspace

### Video Calling
- HD video quality with Stream Video SDK
- Screen sharing capabilities
- Audio/video controls
- Picture-in-picture mode

### Chat System
- Real-time messaging during sessions
- Message history
- Participant presence indicators

## 🚢 Deployment

### Deployed Links
- **Frontend**: https://talentmeet-5852.onrender.com/
- **Backend**: https://talentmeet-3.onrender.com/

### Deploy to Render

#### Backend
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `bun install`
   - **Start Command**: `bun src/server.js`
   - **Environment**: Add all backend `.env` variables
4. Deploy

#### Frontend
1. Create new Static Site on Render
2. Configure:
   - **Build Command**: `cd frontend && bun install --ignore-scripts && bun run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment**: Add all frontend `.env` variables
3. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgements

- [Clerk](https://clerk.dev/) - Authentication
- [Stream](https://getstream.io/) - Video & Chat
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor
- [Piston](https://github.com/engineer-man/piston) - Code Execution
- [Inngest](https://www.inngest.com/) - Background Jobs
- [DaisyUI](https://daisyui.com/) - UI Components

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ by [utpal-kumar-08](https://github.com/utpal-kumar-08)**
