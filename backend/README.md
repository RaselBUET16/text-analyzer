# Backend Server
The backend API server is written using Node/Express and MongoDB.


## Pre-requisites
- Install Node.js (v18 or later recommended)
- MongoDB (local MongoDB instance or a cloud provider)


## Getting Started

### Development
- Make sure you have `Node 18.17.0+` installed along with MongoDB Server.
- Clone repository
    `cd backend && npm install` to install the dependencies
- Create a `.env` file in `backend root` with the following contents
    ```
    # Server
    PORT=5000

    # Database
    MONGODB_URI=mongodb://superUser:1234@localhost:27017/admin

    # Log
    LOG_DIR='/tmp/log_dir'
    LOG_LEVEL='log level' # Ex. 'debug'

    # Google OAuth Creds
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    # Client
    CLIENT_URL=http://localhost:5173

    # Secrets
    JWT_SECRET=

    ```
- For database, provide your MONGODB_URI, or using the /backend/docker-compose.yml, start mongo container. (Update data directory in compose file under `volumes` before starting the container)
- Run `npm run dev` to start development server.
- For running test suits: Run `npm test`
- For getting test coverage report: Run `npm run test:coverage`

### For Production

## Pre-requisites
Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Build Docker image
`cd backend && docker build -t text-analyzer-backend .`

## Directory Structure
```
backend/
├── controllers/
├── models/
├── routes/
├── services/
├── tests/
├── utils/
├── server.js
├── app.js
├── Dockerfile
├── docker-compose.yml
└── .env
```

## Coding Style
- Use `camelCase` and `PascalCase` for variables, classes, and models.
