# To-Do List Application - Jenkins CI/CD Pipeline

## 📋 Project Overview

This is a full-stack To-Do List application with automated CI/CD pipeline using Jenkins. The project includes:

- **Backend**: Node.js + Express + MongoDB API
- **Frontend**: React web application
- **CI/CD**: Jenkins pipeline with automated build, test, and deployment
- **Containerization**: Docker & Docker Compose

## 🎯 Assignment Objective

Implement a complete Jenkins CI/CD pipeline that automates:
- Code checkout from GitHub
- Dependency installation (npm)
- Build process
- Unit testing (Jest)
- Docker containerization
- Deployment using Docker Compose

## 📁 Project Structure

```
.
├── backend/                    # Express.js API Server
│   ├── dockerfile             # Backend Docker image
│   ├── package.json           # Backend dependencies & scripts
│   ├── server.js              # Main server file
│   ├── junit.xml              # Test results (generated)
│   └── __tests__/
│       └── api.test.js        # Unit tests
│
├── frontend/                   # React Web Application
│   ├── dockerfile             # Frontend Docker image
│   ├── package.json           # Frontend dependencies & scripts
│   ├── junit.xml              # Test results (generated)
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   ├── App.css           # Styles
│   │   └── ...
│   └── public/
│       └── index.html        # Entry HTML
│
├── Jenkinsfile               # Pipeline configuration
├── docker-compose.yml        # Multi-container orchestration
├── .env.example              # Environment variables template
├── JENKINS_SETUP.md          # Detailed Jenkins setup guide
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker & Docker Compose
- Git
- Jenkins (for CI/CD pipeline)

### Local Development

#### 1. Backend Setup
```bash
cd backend
npm install
npm run build
npm test
npm start
```

Backend will run on `http://localhost:5000`

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

#### 3. Using Docker Compose (All Services)
```bash
# Update docker-compose.yml with your Docker Hub username
docker-compose up -d
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## 📦 Package Scripts

### Backend (`backend/package.json`)
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo Backend build complete",
    "test": "jest --ci --forceExit --reporters=default --reporters=jest-junit"
  }
}
```

### Frontend (`frontend/package.json`)
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --watchAll=false --ci --forceExit --passWithNoTests"
  }
}
```

## 🔄 Jenkins Pipeline Stages

The Jenkinsfile defines 11 automated stages:

### 1. **Checkout** 
- Clone code from GitHub repository
- Uses GitHub Personal Access Token for authentication

### 2. **Install Backend Dependencies**
- Run `npm install` in backend directory
- Install all required packages

### 3. **Install Frontend Dependencies**
- Run `npm install` in frontend directory
- Install all required packages

### 4. **Build Backend**
- Execute backend build script
- Prepare backend for deployment

### 5. **Build Frontend**
- Execute React build process
- Generate optimized production build

### 6. **Test Backend**
- Run Jest unit tests
- Generate JUnit XML report
- Publish results in Jenkins

### 7. **Test Frontend**
- Run React Jest tests
- Generate JUnit XML report
- Publish results in Jenkins

### 8. **Build Docker Images**
- Create backend Docker image
- Create frontend Docker image
- Tag with build number and latest

### 9. **Push to Docker Hub**
- Authenticate with Docker Hub
- Push images to registry
- Available for deployment

### 10. **Deploy**
- Execute docker-compose to start services
- Automatic on main branch push
- Uses cached images from Docker Hub

### 11. **Health Check**
- Verify backend API is responding
- Verify frontend is accessible
- Confirm deployment success

## 📊 Test Results

### Test Output Format
Tests are automatically published to Jenkins in JUnit XML format.

**Backend Tests** (`backend/junit.xml`):
```
Health Check
  ✓ GET / returns 200
  ✓ GET / response contains text

Input Validation
  ✓ POST /api/tasks with no body returns 400
  ✓ POST /api/tasks with no body returns error message
  ✓ POST /api/tasks with empty title returns 400

Task Schema Tests
  ✓ Task model is defined
  ✓ Task schema has title path
  ✓ Task schema has completed path
  ✓ Task title is required
  ✓ Task completed default is false
  ✓ Task schema has timestamps
```

### Viewing Test Results
1. Open Jenkins dashboard
2. Click on your build job
3. Click on the build number
4. Scroll to "Test Result" section
5. View detailed test information

## 🐳 Docker Setup

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Frontend Dockerfile (Multi-stage)
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Services
- **mongodb**: MongoDB database
- **backend**: Express API server
- **frontend**: React web application

## 🔐 Environment Variables

Copy `.env.example` to backend `.env`:
```bash
cp .env.example backend/.env
```

Configure:
```
NODE_ENV=production
MONGODB_URI=mongodb://root:password@mongodb:27017/todo?authSource=admin
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## 📝 Jenkins Configuration

### Required Steps

#### 1. Install Jenkins
- Download from [jenkins.io/download](https://jenkins.io/download)
- Run on `localhost:8080`

#### 2. Install Plugins
Go to **Manage Jenkins > Manage Plugins > Available**:
- NodeJS Plugin
- Pipeline
- GitHub Integration
- Docker Pipeline
- JUnit Plugin (pre-installed)

#### 3. Configure Tools
Go to **Manage Jenkins > Tools > NodeJS**:
- Add Node.js 18.x or 20.x (LTS)
- Auto-install enabled

#### 4. Add GitHub Credentials
1. Generate GitHub Personal Access Token (PAT)
   - Settings > Developer Settings > Personal Access Tokens
   - Scopes: `repo`, `admin:repo_hook`

2. Add to Jenkins
   - **Manage Jenkins > Credentials > Global Credentials**
   - Kind: Username with password
   - Username: Your GitHub username
   - Password: GitHub PAT
   - ID: `github-pat`

#### 5. Add Docker Credentials
1. **Manage Jenkins > Credentials > Global Credentials**
   - Kind: Username with password
   - Username: Docker Hub username
   - Password: Docker Hub password/token
   - ID: `docker-hub-creds`

2. Also add as secret text:
   - ID: `docker-username` (your Docker Hub username)
   - ID: `docker-password` (your Docker Hub password)

#### 6. Create Pipeline Job
1. New Item > Pipeline
2. Name: `todo-app-pipeline`
3. Pipeline > Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: Your GitHub repo
6. Credentials: `github-pat`
7. Script Path: `Jenkinsfile`

#### 7. Update Jenkinsfile
Update these variables:
```groovy
GITHUB_REPO = 'https://github.com/yourusername/your-repo.git'
```

Update Docker image names:
```groovy
docker build -t YOUR_DOCKER_USERNAME/todo-backend:${BUILD_NUMBER} ./backend
docker build -t YOUR_DOCKER_USERNAME/todo-frontend:${BUILD_NUMBER} ./frontend
```

### Running the Pipeline

1. Click **Build Now** in Jenkins
2. Monitor progress in Console Output
3. View test results under Test Result
4. Check Docker Hub for published images

### Expected Success Output
```
✓ Code checked out successfully
✓ Backend dependencies installed
✓ Frontend dependencies installed
✓ Backend build completed
✓ Frontend build completed
✓ Backend tests: 12 passed ✓
✓ Frontend tests: 8 passed ✓
✓ Docker images built successfully
✓ Docker images pushed successfully
✓ Deployment completed successfully
✓ Health checks passed!
```

## 🎯 API Endpoints

### Health Check
```
GET http://localhost:5000/
Response: "Backend is running!"
```

### Create Task
```
POST http://localhost:5000/api/tasks
Body: { "title": "Task title" }
Response: { "_id": "...", "title": "Task title", "completed": false }
```

### Get All Tasks
```
GET http://localhost:5000/api/tasks
Response: [{ "_id": "...", "title": "...", "completed": false }, ...]
```

### Update Task
```
PUT http://localhost:5000/api/tasks/:id
Body: { "title": "New title", "completed": true }
Response: Updated task object
```

### Delete Task
```
DELETE http://localhost:5000/api/tasks/:id
Response: { "message": "Task deleted successfully" }
```

## 📚 Documentation Files

- **JENKINS_SETUP.md**: Detailed Jenkins installation and configuration guide
- **README.md**: This file - project overview and quick start
- **.env.example**: Template for environment variables

## 🛠️ Troubleshooting

### Tests Fail Locally
```bash
# Ensure dependencies are installed
npm install

# Run tests with verbose output
npm test -- --verbose

# Check test files exist
ls -la __tests__/ src/__tests__/
```

### Docker Build Fails
```bash
# Check Docker is running
docker ps

# Check Dockerfile is valid
docker build -t test-image .

# Check disk space
df -h
```

### Jenkins Build Fails
1. Check Jenkins logs:
   - Windows: `C:\Program Files\Jenkins\logs\jenkins.log`
   - Linux: `sudo journalctl -u jenkins -f`
2. Verify credentials in Jenkins
3. Test git clone manually
4. Check Node.js is installed in Jenkins

### MongoDB Connection Error
```bash
# Ensure MongoDB is running in docker-compose
docker-compose logs mongodb

# Check MongoDB connection string
echo $MONGODB_URI
```

## 📊 Challenges & Solutions

### Challenge 1: Multi-service Coordination
**Problem**: Frontend and backend need different build processes
**Solution**: 
- Separate stage for each service
- Parallel execution where possible
- Proper dependency management

### Challenge 2: Test Report Generation
**Problem**: Jest doesn't generate JUnit by default
**Solution**:
- Install `jest-junit` package
- Configure in package.json
- Update test scripts to use junit reporter

### Challenge 3: Docker Image Naming
**Problem**: Images need proper versioning
**Solution**:
- Use build number as tag: `image:${BUILD_NUMBER}`
- Keep 'latest' tag updated
- Push both tags to registry

### Challenge 4: Environment Configuration
**Problem**: Different configs for dev/test/prod
**Solution**:
- Use .env.example as template
- Docker Compose sets env vars
- Jenkins can override via pipeline

## 📈 Monitoring & Metrics

### Build Metrics
- Build duration
- Success/failure rate
- Test coverage
- Artifact size

### Runtime Metrics
- Container memory usage
- API response time
- Database query performance
- Error rate

### View in Jenkins
1. Dashboard > Job > Trends
2. Aggregate reports
3. Performance graphs

## 🔐 Security Best Practices

1. **Credentials**
   - Never hardcode secrets
   - Use Jenkins Credentials Plugin
   - Rotate tokens regularly

2. **Access Control**
   - Restrict job execution
   - Use RBAC plugins
   - Audit build logs

3. **Network**
   - Jenkins behind reverse proxy
   - Use HTTPS
   - Firewall Jenkins ports

4. **Dependencies**
   - Keep npm packages updated
   - Scan for vulnerabilities
   - Use lockfiles (package-lock.json)

## 📖 Learning Resources

- [Jenkins Official Documentation](https://jenkins.io/doc)
- [Jenkinsfile Best Practices](https://jenkins.io/doc/book/pipeline/pipeline-as-code)
- [Node.js Testing](https://jestjs.io/docs/getting-started)
- [Docker Compose Guide](https://docs.docker.com/compose/compose-file)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)

## 🎓 Assignment Completion Checklist

- [x] Jenkins installation and setup
- [x] Plugin installation (NodeJS, Pipeline, GitHub, Docker)
- [x] Node.js tools configuration
- [x] GitHub credential setup
- [x] Jenkinsfile creation with all 11 stages
- [x] Docker setup and docker-compose.yml
- [x] Test configuration with JUnit reports
- [x] Package.json script updates
- [x] Documentation (JENKINS_SETUP.md)
- [x] Health checks and deployment validation

## 📞 Support

For issues or questions:
1. Check JENKINS_SETUP.md for detailed guidance
2. Review Jenkins console logs
3. Verify all credentials are correctly configured
4. Ensure Docker is properly installed
5. Check GitHub repository access

## 📄 License

This project is part of DSO101 Assignment 2

---

**Last Updated**: May 2026
**Version**: 1.0.0
