# Todo Application - Ziptrrip

A complete, production-ready Todo application built with React, Node.js, and Express.

## Features
- Create, Read, Update, Delete todos
- Mark todos complete/incomplete
- Search, filter, and sort todos
- Priority levels (low, medium, high)
- Categories (work, personal, shopping, health, other)
- Toast notifications, confirm dialogs, error handling
- Fully responsive design

## Getting Started

### Prerequisites
- Node.js v14+
- npm

### Installation

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Running

```bash
# Run both (from root)
npm run dev

# Or separately:
cd backend && npm run dev   # http://localhost:5000
cd frontend && npm run dev  # http://localhost:3000
```

## API Endpoints
- `GET    /api/todos`           - Get all todos
- `GET    /api/todos/:id`       - Get todo by ID
- `POST   /api/todos`           - Create todo
- `PUT    /api/todos/:id`       - Update todo
- `DELETE /api/todos/:id`       - Delete todo
- `PATCH  /api/todos/:id/complete`   - Mark complete
- `PATCH  /api/todos/:id/incomplete` - Mark incomplete

## Tech Stack
- **Frontend**: React 18, React Router 6, Axios, Vite
- **Backend**: Node.js, Express, Helmet, Morgan, CORS
- **Storage**: JSON file

## Author
Built by Ashwin B for Ziptrrip
