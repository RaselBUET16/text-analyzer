# Frontend App
The frontend app is created using React Vite App with Bootstrap.


## Getting Started
### Develplemnt
- Make sure you have `Node 18.17.0+` installed
- Clone the repository
- `cd frontend && npm install` to install the dependencies.
- Create a `.env` inside `frontend` directory with the contents-
    ```
    VITE_API_URL=http://localhost:5000 #Put your backend api url here.

    ```
- Run `npm run dev` to start the frontend app

### For Production

## Pre-requisites
Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Build Docker image
`cd frontend && docker build -t text-analyzer-frontend --build-arg VITE_API_URL=http://localhost:5000 .`

Update VITE_API_URL=http://localhost:5000 according to your backend setup.
Frontend will run on port 3000 by default. Update it in Dockerfile if necessary.

- Start frontend, backend, db containers using master docker-compose.yml located at root directory
    `docker compose -f docker-compose.yml up -d`

## Directory Structure
```
frontend/                 # React (Vite) frontend
├── public/               # Static public files
├── src/                  # React source code
│   ├── components/       # Reusable components
│   ├── lib/              # HTTP utilities and configs
│   └── main.jsx          # React entry point
├── .env                  # Vite environment variables (VITE_API_URL)
├── Dockerfile            # Dockerfile for frontend
```

## Coding Style
- Use JSX file extension instead of JS for React Elements/Components
- Use `camelCase` and `PascalCase` for variables, classes, and models
