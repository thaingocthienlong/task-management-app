# Task Management Application

A containerized web application for managing tasks, built with React, Node.js, Express, and MongoDB using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
  - Docker Desktop for Windows/Mac or Docker Engine + Docker Compose for Linux
  - Minimum Docker version: 19.03.0+
  - Minimum Docker Compose version: 1.27.0+
- Ports 80, 5000, and 27017 must be available on your machine

## Project Structure

```
task-management-app/
├── backend/               # Node.js/Express backend
│   ├── models/            # MongoDB data models
│   ├── routes/            # API route definitions
│   ├── Dockerfile         # Docker configuration for backend
│   ├── package.json       # Node.js dependencies
│   └── server.js          # Main server file
├── frontend/              # React.js frontend
│   ├── public/            # Static assets
│   ├── src/               # React components and logic
│   ├── Dockerfile         # Docker configuration for frontend
│   ├── nginx.conf         # Nginx configuration
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Docker Compose configuration
└── README.txt             # This file
```

## Quick Start

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```
   cd task-management-app
   ```
3. Start the application using Docker Compose:
   ```
   docker-compose up -d
   ```
4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api/tasks

## Building and Running

### Build and Start All Services

```bash
docker-compose up --build -d
```

The `--build` flag ensures all images are rebuilt with the latest code.

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove All Data (including volumes)

```bash
docker-compose down -v
```

### View Container Logs

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo

# Follow logs in real-time
docker-compose logs -f
```

### Rebuild a Specific Service

```bash
docker-compose build frontend
```

## Environment Variables

### Backend Environment Variables

These can be set in the `docker-compose.yml` file:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the backend server | 5000 |
| MONGODB_URI | MongoDB connection URI | mongodb://mongo:27017/taskmanager |
| NODE_ENV | Node.js environment | production |

### Frontend Environment Variables

No environment variables are required for the frontend.

## API Endpoints

The backend provides the following RESTful API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a specific task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a specific task |
| DELETE | /api/tasks/:id | Delete a specific task |

## Task Data Model

```javascript
{
  title: String,        // Task title (required)
  description: String,  // Task description (required)
  status: String,       // Task status: "pending" or "completed" (default: "pending")
  createdAt: Date       // Creation timestamp (default: current date)
}
```

## Troubleshooting

### Common Issues

#### Connection Refused to Backend API

**Symptom**: Frontend can't connect to the backend API.

**Solution**:
1. Verify all containers are running:
   ```
   docker-compose ps
   ```
2. Check backend logs for errors:
   ```
   docker-compose logs backend
   ```
3. Verify the Nginx configuration in frontend:
   ```
   docker exec -it task-app-frontend cat /etc/nginx/conf.d/default.conf
   ```

#### MongoDB Connection Issues

**Symptom**: Backend can't connect to MongoDB.

**Solution**:
1. Check if MongoDB container is running:
   ```
   docker-compose ps mongo
   ```
2. Verify environment variables in backend:
   ```
   docker exec -it task-app-backend env | grep MONGODB
   ```
3. Check MongoDB logs:
   ```
   docker-compose logs mongo
   ```

#### Port Conflicts

**Symptom**: Services fail to start due to port conflicts.

**Solution**:
1. Check if ports are already in use:
   ```
   netstat -an | findstr 80    # Windows
   netstat -an | grep 80       # Linux/Mac
   ```
2. Stop services using those ports or modify `docker-compose.yml` to use different ports.

#### Docker Build Issues

**Symptom**: Docker build fails with errors.

**Solution**:
1. Check Docker logs for specific error messages
2. Verify Dockerfile syntax
3. Ensure all required files are present in the build context
4. Try building with verbose output:
   ```
   docker-compose build --no-cache --progress=plain
   ```

### Advanced Troubleshooting

#### Inspecting Docker Networks

```bash
docker network inspect task-management-app_task-app-network
```

#### Accessing MongoDB Shell

```bash
docker exec -it task-app-mongodb mongosh
```

#### Testing Backend Directly

```bash
curl http://localhost:5000/api/tasks
```

## Building From Source

If you need to modify the source code:

1. Make changes to the frontend or backend code
2. Rebuild the Docker images:
   ```
   docker-compose build
   ```
3. Restart the services:
   ```
   docker-compose up -d
   ```

## Additional Notes

- Data is persisted in Docker volumes, so it will survive container restarts
- The MongoDB database can be accessed directly at `mongodb://localhost:27017/taskmanager`
- The frontend uses Nginx to serve static files and proxy API requests
- For development purposes, you may want to expose additional ports in docker-compose.yml

## License

This project is provided as-is for educational purposes.
