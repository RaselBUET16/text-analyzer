# Text Analyzer
A text analyzer web application with a
- Backend Sever
- Frontend Server
- Database (Mongo)
## Pre-requisites
- For development & production, follow corresponding backend    and frontend doc.

## Getting Started
### Development
- Follow README.md from backend and frontend
- [Backend README.md](https://github.com/RaselBUET16/text-analyzer/blob/main/backend/README.md)
- [Frontend README.md](https://github.com/RaselBUET16/text-analyzer/blob/main/README.md)

### Production
- Create docker images of backend and frontend server following corresponding README.md
- Create `.env` file in your working directory having this content.
```
# Server
PORT=5000

# Database
MONGODB_USERNAME=superUser
MONGODB_PASSWORD=1234
MONGODB_URI=MONGODB_URI=mongodb://superUser:1234@mongo:27017/admin

# Log
LOG_DIR='/home/user/logs/'
LOG_LEVEL='debug'
# Google OAuth Creds
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Client
CLIENT_URL=http://localhost:3000

# Secrets
JWT_SECRET=

```
- Start frontend, backend, db containers using master docker-compose.yml
    `docker compose -f docker-compose.yml up -d`
- Frontend url: http://localhost:3000 

## Directory Structure
```
project-root/
│
├── .env                            # Root-level environment file for docker-compose
├── docker-compose.yml             # Compose file to spin up backend, frontend, and MongoDB
│
├── backend/                        # Express.js backend
│   ├── controllers/                # Controller logic
│   ├── models/                     # Mongoose models
│   ├── routes/                     # API routes
│   ├── services/                   # Service layer
│   ├── tests/                      # Unit & integration tests
│   ├── utils/                      # Utility functions
│   ├── app.js                      # Express app instance
│   ├── server.js                   # Entry point
│   ├── Dockerfile                  # Backend Dockerfile
│   └── .env                        # Backend-specific environment variables
│
├── frontend/                       # Vite + React frontend
│   ├── public/                     # Static public files
│   ├── src/                        # Source code
│   │   ├── components/             # Reusable React components
│   │   ├── lib/                    # HTTP clients, API utils
│   │   └── main.jsx                # React entry point
│   ├── .env                        # Vite env
│   └── Dockerfile                  # Frontend Dockerfile
│
└── logs/                           # Mapped log directory (via Docker volume)

```

## Coding Style
- Use `camelCase` and `PascalCase` for variables, classes, and models.
