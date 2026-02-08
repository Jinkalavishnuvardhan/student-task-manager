# Student Task Manager

A simple, full-stack Task Management application built with Next.js (App Router) and MongoDB.

## Features
- Create, Read, Update, Delete (CRUD) tasks.
- Clean and simple user interface.
- RESTful API backend.

## Tech Stack
- **Frontend**: Next.js 14+ (React), CSS Modules/Global CSS.
- **Backend**: Next.js API Routes (Node.js).
- **Database**: MongoDB (via Mongoose).

## Getting Started

### 1. Prerequisites
- Node.js installed (v18 or higher recommended).
- A MongoDB account (MongoDB Atlas) or local MongoDB installed.

### 2. Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Open the `.env.local` file and replace the placeholder with your actual MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student-tasks?retryWrites=true&w=majority
    ```
    *Note: If you don't have a `.env.local` file, create one in the root directory.*

3.  **Run the application**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and sign up/login.
3.  Click **"Add New Project"** and import your repository.
4.  In the **"Environment Variables"** section, add:
    - Key: `MONGODB_URI`
    - Value: `your_mongodb_connection_string`
5.  Click **"Deploy"**.

## API Endpoints

- `GET /api/tasks`: Fetch all tasks.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks/[id]`: Fetch a specific task.
- `PUT /api/tasks/[id]`: Update a task.
- `DELETE /api/tasks/[id]`: Delete a task.
