# SkillSwap Lite

A modern, fast, and attractive MERN stack MVP for swapping skills. 

## Tech Stack
- Frontend: React + Vite, Tailwind CSS, React Router DOM
- Backend: Node.js, Express, MongoDB Atlas, bcrypt, jsonwebtoken

## Features
- Fully functional custom-styled UI with Tailwind CSS
- Authentication (Register, Login, JWT protected routes)
- Create and Delete Posts
- Express Interest in Posts
- Complete validations: no duplicate interests, no self-interest, owners-only deletes

## Setup Instructions

### 1. Backend Setup
1. CD into the inner server directory:
   ```bash
   cd server
   ```
2. Install dependencies (already done!):
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and fill in your actual MongoDB Atlas connection string.
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   node index.js
   ```
   *The server runs on http://localhost:5000*

### 2. Frontend Setup
1. Open a new terminal and CD into the client directory:
   ```bash
   cd client
   ```
2. Install dependencies (already done!):
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *The client runs on http://localhost:5173*

## Test Flow (Validation Checklist)
1. Navigate to `http://localhost:5173`
2. Register **User A** -> Login **User A** -> Create Post -> Logout.
3. Register **User B** -> Login **User B** -> See **User A**'s post -> Click **Interested** -> Logout.
4. Login **User A** again -> Dashboard -> See the new interest under **My Interests**.
