# Complete Step-by-Step Assignment Guide

## DSO101 Assignment 2: Jenkins CI/CD Pipeline Setup

This guide will walk you through the entire assignment from start to finish. Follow each step carefully.

---

## Table of Contents

1. [Phase 1: Preparation & Setup](#phase-1-preparation--setup)
2. [Phase 2: Local Testing](#phase-2-local-testing)
3. [Phase 3: Jenkins Installation](#phase-3-jenkins-installation)
4. [Phase 4: Jenkins Configuration](#phase-4-jenkins-configuration)
5. [Phase 5: Pipeline Creation](#phase-5-pipeline-creation)
6. [Phase 6: First Pipeline Run](#phase-6-first-pipeline-run)
7. [Phase 7: Verification & Screenshots](#phase-7-verification--screenshots)
8. [Phase 8: Documentation & Submission](#phase-8-documentation--submission)

---

# Phase 1: Preparation & Setup

## Step 1.1: Verify Prerequisites

### Windows Users:
```powershell
# Open PowerShell as Administrator and run:
node --version
npm --version
git --version
docker --version
java -version
```

### Linux/macOS Users:
```bash
node --version
npm --version
git --version
docker --version
java -version
```

**Expected Output:**
- Node.js: v18.x or v20.x ✓
- npm: 9.x or higher ✓
- Git: any recent version ✓
- Docker: 20.x or higher ✓
- Java: 11 or higher ✓

**If any are missing:**
- Node.js: Download from https://nodejs.org/
- Git: Download from https://git-scm.com/
- Docker: Download from https://www.docker.com/
- Java: Download from https://www.oracle.com/java/

---

## Step 1.2: Create GitHub Account & Repository

1. Go to https://github.com
2. Create an account (if you don't have one)
3. Click **"New"** to create a new repository
4. Name it: `assignment1-node-app` (or similar)
5. Set to **Public**
6. Click **"Create repository"**
7. Note the repository URL for later use

**Example URL:** `https://github.com/yourusername/assignment1-node-app.git`

---

## Step 1.3: Upload Project to GitHub

### Option A: Using Git Commands

```bash
# Navigate to your project folder
cd c:\Users\HP\Downloads\DSO101\Assignment_2

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: To-Do List App with Jenkins CI/CD"

# Add remote repository
git remote add origin https://github.com/yourusername/assignment1-node-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Desktop
1. Download GitHub Desktop from https://desktop.github.com/
2. Open the Assignment_2 folder
3. Click "Publish repository"
4. Push to GitHub

**After pushing:**
- Visit your repository on GitHub
- Verify you see all files including Jenkinsfile
- Copy the HTTPS clone URL

---

## Step 1.4: Generate GitHub Personal Access Token (PAT)

1. Go to https://github.com/settings/profile
2. Click **Settings** (left sidebar)
3. Click **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **"Generate new token (classic)"**
6. Fill in:
   - **Note/Name:** `jenkins-ci-cd`
   - **Expiration:** 90 days
   - **Scopes:** Select these checkboxes:
     - ☑ `repo` (Full control of private repositories)
     - ☑ `admin:repo_hook` (Full control of repository hooks)
     - ☑ `workflow` (Update GitHub Action workflows)
7. Click **"Generate token"**
8. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
9. Paste it somewhere safe (Notepad file)

**Example Token:** `ghp_abc123xyz...` (keep this SECRET!)

---

## Step 1.5: Create Docker Hub Account

1. Go to https://hub.docker.com
2. Click **"Sign Up"**
3. Create an account with email
4. Verify your email
5. Note your **Docker Hub username** (different from GitHub!)
6. Go to **Account Settings** → **Security** → **Access Tokens**
7. Click **"Generate new token"**
8. Name it: `jenkins`
9. Click **"Generate"**
10. Copy the token and save it securely

**You now have:**
- Docker Hub username (e.g., `johndoe`)
- Docker Hub access token (e.g., `dckr_pat_abc123...`)

---

## Step 1.6: Run Automated Project Setup

### On Windows:
```powershell
cd c:\Users\HP\Downloads\DSO101\Assignment_2
.\setup.bat
```

### On Linux/macOS:
```bash
cd /path/to/Assignment_2
chmod +x setup.sh
./setup.sh
```

**What this does:**
- ✓ Installs backend dependencies (npm install)
- ✓ Installs frontend dependencies (npm install)
- ✓ Verifies jest-junit is installed
- ✓ Creates .env file for backend
- ✓ Displays next steps

**Expected Output:**
```
[OK] Node.js installed: v18.x.x
[OK] npm installed: 9.x.x
[OK] Backend dependencies installed successfully
[OK] Frontend dependencies installed successfully
Setup Complete!
```

---

# Phase 2: Local Testing

## Step 2.1: Test Backend Locally

```bash
# Navigate to backend
cd c:\Users\HP\Downloads\DSO101\Assignment_2\backend

# Run tests
npm test
```

**Expected Output:**
```
PASS  __tests__/api.test.js
  Health Check
    ✓ GET / returns 200 (5ms)
    ✓ GET / response contains text (3ms)
  
  Input Validation
    ✓ POST /api/tasks with no body returns 400 (2ms)
    ✓ POST /api/tasks with no body returns error message (2ms)
    ✓ POST /api/tasks with empty title returns 400 (3ms)
  
  Task Schema Tests
    ✓ Task model is defined (1ms)
    ✓ Task schema has title path (1ms)
    ✓ Task schema has completed path (1ms)
    ✓ Task title is required (1ms)
    ✓ Task completed default is false (1ms)
    ✓ Task schema has timestamps (1ms)

Test Suites: 1 passed, 1 total
Tests: 12 passed, 12 total
```

**Also verify:**
- File created: `backend/junit.xml` ✓

---

## Step 2.2: Test Frontend Locally

```bash
# Navigate to frontend
cd c:\Users\HP\Downloads\DSO101\Assignment_2\frontend

# Run tests
npm test
```

**Expected Output:**
```
PASS  src/App.test.js
  ✓ renders without crashing (23ms)
  ✓ renders welcome message (15ms)
  ... more tests ...

Test Suites: 1 passed, 1 total
Tests: 8 passed, 8 total (approximately)
```

**Also verify:**
- File created: `frontend/junit.xml` ✓

---

## Step 2.3: Verify Build Scripts Work Locally

### Backend:
```bash
cd backend
npm run build
# Expected: "Backend build complete"
```

### Frontend:
```bash
cd frontend
npm run build
# Expected: Creates build/ folder
ls -la build/  # or dir build\ on Windows
```

---

## Step 2.4: Test Docker Locally (Optional)

```bash
# Build backend image
docker build -t yourusername/todo-backend:test ./backend

# Build frontend image
docker build -t yourusername/todo-frontend:test ./frontend

# Verify images exist
docker images | grep todo
```

**Expected Output:**
```
REPOSITORY                    TAG    IMAGE ID      SIZE
yourusername/todo-backend     test   abc123...     500MB
yourusername/todo-frontend    test   def456...     100MB
```

---

# Phase 3: Jenkins Installation

## Step 3.1: Download Jenkins

### On Windows:
1. Go to https://jenkins.io/download
2. Download **Windows** installer (latest LTS version)
3. Run the `.msi` installer
4. Follow installation wizard
5. When asked for port, keep default: **8080**
6. When asked for service account, use default Windows user

### On Linux (Ubuntu/Debian):
```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.03.08.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install dependencies
sudo apt-get update
sudo apt-get install java-11-openjdk java-11-openjdk-dev
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### On macOS:
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

---

## Step 3.2: Initial Jenkins Setup

1. Open browser: **http://localhost:8080**
2. You should see Jenkins setup wizard
3. Get initial admin password:
   - **Windows**: `C:\Program Files\Jenkins\secrets\initialAdminPassword`
   - **Linux**: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
   - **macOS**: Check terminal output

4. Copy the password
5. Paste it in the browser
6. Click **"Continue"**
7. Click **"Install suggested plugins"** (wait 5-10 minutes)
8. Create first admin user:
   - Username: `admin`
   - Password: Choose a strong password (save it!)
   - Full name: Your name
   - Email: Your email
9. Click **"Save and Continue"**
10. Click **"Save and Finish"**
11. Click **"Start using Jenkins"**

**You should now see the Jenkins Dashboard!**

---

# Phase 4: Jenkins Configuration

## Step 4.1: Install Required Plugins

1. Click **"Manage Jenkins"** (left sidebar)
2. Click **"Manage Plugins"**
3. Click **"Available"** tab
4. Search for each plugin and install:

### Plugin 1: Pipeline
- Search: `Pipeline`
- Find: **Pipeline**
- ☑ Check the checkbox
- Click **"Install without restart"**

### Plugin 2: NodeJS Plugin
- Search: `NodeJS`
- Find: **NodeJS Plugin**
- ☑ Check the checkbox
- Click **"Install without restart"**

### Plugin 3: GitHub Integration
- Search: `GitHub Integration`
- Find: **GitHub Integration**
- ☑ Check the checkbox
- Click **"Install without restart"**

### Plugin 4: Docker Pipeline
- Search: `Docker Pipeline`
- Find: **Docker Pipeline**
- ☑ Check the checkbox
- Click **"Install without restart"**

After all are selected:
- Click **"Install without restart"** OR
- Check **"Restart Jenkins when installation is complete"**
- Wait for installation to finish (2-5 minutes)

**Verify Installation:**
1. Go back to **"Installed"** tab
2. Search for each plugin name
3. All should appear in the list ✓

---

## Step 4.2: Configure Node.js Tool

1. Go to **"Manage Jenkins"**
2. Click **"Tools"** (or **"Global Tool Configuration"**)
3. Scroll down to **"NodeJS"** section
4. Click **"Add NodeJS"**
5. Fill in:
   - **Name:** `NodeJS`
   - **Install automatically:** ☑ (checked)
   - **Version:** Select `18.x` or `20.x` (LTS)
6. Click **"Save"**

**Verify it works:**
1. Create a test job: **New Item**
2. Enter name: `test-nodejs`
3. Select: **Pipeline**
4. In Pipeline section, paste:
```groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version && npm --version'
            }
        }
    }
}
```
5. Click **"Save"**
6. Click **"Build Now"**
7. Click the build #1
8. Check **Console Output** should show Node version ✓

---

## Step 4.3: Add GitHub Credentials

1. Go to **"Manage Jenkins"**
2. Click **"Credentials"**
3. Click **"System"** (left sidebar)
4. Click **"Global Credentials"**
5. Click **"Add Credentials"**
6. Fill in:
   - **Kind:** `Username with password`
   - **Scope:** `Global`
   - **Username:** Your GitHub username
   - **Password:** Your GitHub PAT (from Step 1.4)
   - **ID:** `github-pat`
   - **Description:** `GitHub Personal Access Token`
7. Click **"Create"**

**Verify:**
- You should see `github-pat` in the credentials list ✓

---

## Step 4.4: Add Docker Credentials

### Add Docker Hub Username/Password Credential

1. Go to **"Manage Jenkins"** → **"Credentials"** → **"System"** → **"Global Credentials"**
2. Click **"Add Credentials"**
3. Fill in:
   - **Kind:** `Username with password`
   - **Scope:** `Global`
   - **Username:** Your Docker Hub username
   - **Password:** Your Docker Hub access token
   - **ID:** `docker-hub-creds`
   - **Description:** `Docker Hub Credentials`
4. Click **"Create"**

### Add Docker Username as Secret Text

1. Click **"Add Credentials"** again
2. Fill in:
   - **Kind:** `Secret text`
   - **Secret:** Your Docker Hub username
   - **ID:** `docker-username`
   - **Description:** `Docker Hub Username`
3. Click **"Create"**

### Add Docker Password as Secret Text

1. Click **"Add Credentials"** again
2. Fill in:
   - **Kind:** `Secret text`
   - **Secret:** Your Docker Hub access token
   - **ID:** `docker-password`
   - **Description:** `Docker Hub Password`
3. Click **"Create"**

**Verify:**
- All 3 credentials appear in the list ✓

---

## Step 4.5: Configure Docker (Linux Only)

If you're on Linux, run:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

Wait 30 seconds for Jenkins to restart.

---

# Phase 5: Pipeline Creation

## Step 5.1: Update Jenkinsfile with Your Information

1. Open the Jenkinsfile in your text editor:
   `c:\Users\HP\Downloads\DSO101\Assignment_2\Jenkinsfile`

2. Find line with `GITHUB_REPO` and change it:
   ```groovy
   GITHUB_REPO = 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
   ```
   **Example:**
   ```groovy
   GITHUB_REPO = 'https://github.com/johndoe/assignment1-node-app.git'
   ```

3. Find Docker image names (search for `docker build`) and change:
   ```groovy
   docker build -t YOUR_DOCKER_USERNAME/todo-backend:${BUILD_NUMBER} ./backend
   ```
   **Example:**
   ```groovy
   docker build -t johndoe/todo-backend:${BUILD_NUMBER} ./backend
   ```

4. Do the same for frontend image

5. **Save the file**

6. **Commit and push to GitHub:**
   ```bash
   git add Jenkinsfile
   git commit -m "Update Jenkinsfile with repository and Docker Hub details"
   git push origin main
   ```

---

## Step 5.2: Create Pipeline Job in Jenkins

1. Go to Jenkins Dashboard: **http://localhost:8080**
2. Click **"New Item"** (left side)
3. Enter job name: `todo-app-pipeline`
4. Select: **Pipeline**
5. Click **"OK"**

---

## Step 5.3: Configure Pipeline Source

You should now be on the job configuration page.

**Scroll down to "Pipeline" section:**

1. **Definition:** Select `Pipeline script from SCM`
2. **SCM:** Select `Git`
3. Fill in Git configuration:
   - **Repository URL:** Your GitHub repo URL
     ```
     https://github.com/yourusername/assignment1-node-app.git
     ```
   - **Credentials:** Click dropdown, select `github-pat`
   - **Branch:** Change from `*/master` to `*/main`
   - **Script Path:** `Jenkinsfile` (should be default)

4. Scroll down and click **"Save"**

**You're now on the job page!**

---

# Phase 6: First Pipeline Run

## Step 6.1: Run the Pipeline

1. You should be on the job page: `todo-app-pipeline`
2. Click **"Build Now"** button (left sidebar)
3. A build #1 should appear in Build History

---

## Step 6.2: Monitor the Build

1. Click on **"#1"** in the Build History
2. Click **"Console Output"** to view logs in real-time
3. Watch as each stage completes:

**Expected Stages:**
```
========== Checking out code from GitHub ==========
Code checked out successfully

========== Installing backend dependencies ==========
Backend dependencies installed successfully

========== Installing frontend dependencies ==========
Frontend dependencies installed successfully

========== Building backend ==========
Backend build completed

========== Building frontend ==========
Frontend build completed

========== Running backend unit tests ==========
Backend tests completed

========== Running frontend unit tests ==========
Frontend tests completed

========== Building Docker images ==========
Docker images built successfully

========== Pushing Docker images to Docker Hub ==========
Docker images pushed successfully

========== Deploying application ==========
Deployment completed successfully

========== Performing health checks ==========
Health checks passed!

✓ Pipeline succeeded! Application deployed successfully.
```

**Total Time:** 8-15 minutes (first run)

---

## Step 6.3: Check Test Results

1. Go back to build #1 page
2. Scroll down to find **"Test Result"** section
3. You should see:
   ```
   Backend Tests: 12 passed
   Frontend Tests: 8 passed
   Total: 20 passed, 0 failed ✓
   ```

4. Click on test names to see details

---

## Step 6.4: Verify Docker Images

1. Go to https://hub.docker.com
2. Log in with your Docker Hub account
3. Go to **"Repositories"**
4. You should see:
   - `yourusername/todo-backend` (with tags: latest, build number)
   - `yourusername/todo-frontend` (with tags: latest, build number)
5. Click on each to verify images are there

---

# Phase 7: Verification & Screenshots

## Step 7.1: Take Screenshots for Submission

You need to capture 3 types of screenshots:

### Screenshot 1: Successful Pipeline Execution

1. Go to Jenkins: `http://localhost:8080/job/todo-app-pipeline/1/`
2. Scroll to **"Stage View"** section
3. Take screenshot showing all 11 stages in green ✓
4. **Save as:** `pipeline_success.png`

### Screenshot 2: Console Output

1. Click **"Console Output"**
2. Scroll to the end showing the success message
3. Take screenshot
4. **Save as:** `console_output.png`

### Screenshot 3: Test Results

1. Back on build page
2. Scroll to **"Test Result"** section
3. Take screenshot showing:
   - Backend: 12 tests
   - Frontend: 8 tests
4. **Save as:** `test_results.png`

### Screenshot 4: Docker Hub Images

1. Go to https://hub.docker.com
2. Log in and navigate to your repositories
3. Take screenshot showing both images
4. **Save as:** `docker_hub_images.png`

---

## Step 7.2: Document Docker Hub Links

Write down these URLs:

```
Backend Image: https://hub.docker.com/r/yourusername/todo-backend
Frontend Image: https://hub.docker.com/r/yourusername/todo-frontend
```

Example:
```
Backend Image: https://hub.docker.com/r/johndoe/todo-backend
Frontend Image: https://hub.docker.com/r/johndoe/todo-frontend
```

---

# Phase 8: Documentation & Submission

## Step 8.1: Update README.md

The README.md already has most information, but verify it includes:

1. **Project Overview** ✓
2. **Quick Start** ✓
3. **Jenkins Configuration Steps** ✓
4. **How You Configured the Pipeline** ✓
5. **Challenges Faced** ✓
6. **API Endpoints** ✓

---

## Step 8.2: Create Assignment Submission Document

Create a file called `SUBMISSION.md` with:

```markdown
# Assignment 2 Submission

## Student Information
- Name: [Your Name]
- Date: [Submission Date]
- Course: DSO101

## GitHub Repository
- Link: https://github.com/yourusername/assignment1-node-app

## Jenkins Server Details
- URL: http://localhost:8080
- Job Name: todo-app-pipeline
- Build Status: ✓ Successful

## Screenshots Attached
1. pipeline_success.png - All 11 stages passed
2. console_output.png - Build console output
3. test_results.png - Test results (20 tests passed)
4. docker_hub_images.png - Docker Hub repositories

## Docker Hub Images
- Backend: https://hub.docker.com/r/yourusername/todo-backend
- Frontend: https://hub.docker.com/r/yourusername/todo-frontend

## Completed Deliverables
- [x] Jenkinsfile created (11 stages)
- [x] Docker Compose configuration
- [x] Package.json scripts updated
- [x] Jest and jest-junit installed
- [x] All tests passing (20/20)
- [x] Docker images built and pushed
- [x] Pipeline deployed successfully
- [x] Health checks passing

## Configuration Summary

### Stage 1: Checkout
- Clones code from GitHub using PAT credentials
- Branch: main

### Stage 2-3: Install Dependencies
- Backend: npm install
- Frontend: npm install

### Stage 4-5: Build
- Backend: npm run build
- Frontend: npm run build

### Stage 6-7: Test
- Backend: npm test → junit.xml (12 tests)
- Frontend: npm test → junit.xml (8 tests)

### Stage 8: Docker Build
- Creates backend image: yourusername/todo-backend
- Creates frontend image: yourusername/todo-frontend

### Stage 9: Docker Push
- Pushes images to Docker Hub registry

### Stage 10: Deploy
- Uses docker-compose.yml to start services
- Starts MongoDB, backend, and frontend

### Stage 11: Health Check
- Verifies backend is responding
- Verifies frontend is accessible

## Challenges Faced & Solutions

### Challenge 1: Multi-service Coordination
- **Problem**: Frontend and backend need different build processes
- **Solution**: Created separate stages for each service with proper directory navigation

### Challenge 2: Test Report Generation
- **Problem**: Jest doesn't generate JUnit reports by default
- **Solution**: Installed jest-junit and configured in package.json

### Challenge 3: Docker Image Management
- **Problem**: Need versioning for multiple builds
- **Solution**: Used build number as tag (latest + specific version)

### Challenge 4: Service Dependencies
- **Problem**: Frontend needs backend to be running
- **Solution**: Used depends_on in docker-compose and health checks

## Total Build Duration
- First run: ~10-15 minutes (includes downloads)
- Subsequent runs: ~8-10 minutes

## Pipeline Success Metrics
- ✓ All stages completed
- ✓ Backend tests: 12/12 passed
- ✓ Frontend tests: 8/8 passed
- ✓ Docker images built and pushed
- ✓ Services deployed and healthy
- ✓ Health checks passed

## Notes
- Jenkins configured on localhost:8080
- GitHub PAT used for repository access
- Docker Hub credentials used for image push
- MongoDB runs in Docker for data persistence
- Frontend served via Nginx in production build
- All services have health checks configured
```

---

## Step 8.3: Gather All Files for Submission

Create a folder with:
```
submission/
├── SUBMISSION.md              (completed form above)
├── pipeline_success.png       (screenshot 1)
├── console_output.png         (screenshot 2)
├── test_results.png          (screenshot 3)
├── docker_hub_images.png     (screenshot 4)
├── Jenkinsfile               (copy from your repo)
├── docker-compose.yml        (copy from your repo)
├── package.json              (from both frontend and backend)
└── README.md                 (from your repo)
```

---

## Step 8.4: Verify Everything Works (Final Check)

### Checklist:

- [ ] Jenkins running on http://localhost:8080 ✓
- [ ] All plugins installed ✓
- [ ] Node.js tool configured ✓
- [ ] GitHub credentials added (ID: github-pat) ✓
- [ ] Docker credentials added (3 credentials) ✓
- [ ] Pipeline job created: todo-app-pipeline ✓
- [ ] First build successful ✓
- [ ] All 11 stages completed ✓
- [ ] Test results: 20/20 passed ✓
- [ ] Docker images pushed to Docker Hub ✓
- [ ] Screenshots captured ✓
- [ ] README.md updated ✓
- [ ] GitHub repository has Jenkinsfile ✓
- [ ] Submission document created ✓

---

# Additional Helpful Commands

## If You Need to Restart Services

### Restart Jenkins
**Windows:**
```powershell
Restart-Service Jenkins
```

**Linux:**
```bash
sudo systemctl restart jenkins
```

**macOS:**
```bash
brew services restart jenkins-lts
```

### Stop and Remove Docker Containers
```bash
docker-compose down
```

### View Jenkins Logs
```bash
# Linux
sudo journalctl -u jenkins -f

# Windows (check this path)
C:\Program Files\Jenkins\logs\jenkins.log

# macOS
tail -f ~/.jenkins/logs/jenkins.log
```

---

# Troubleshooting Guide

## Problem: Build Fails at Checkout

**Error:** `credentials not found`

**Solution:**
1. Verify GitHub PAT credential exists with ID: `github-pat`
2. Check PAT has correct scopes (repo, admin:repo_hook)
3. Verify repository URL is correct in pipeline job config

---

## Problem: Tests Fail in Pipeline

**Error:** `npm test` fails

**Solution:**
1. Run tests locally first: `npm test`
2. Ensure jest-junit is installed
3. Check that junit.xml is being generated locally

---

## Problem: Docker Push Fails

**Error:** `docker: access denied`

**Solution:**
1. Verify Docker credentials are correct
2. Check docker-username and docker-password IDs match Jenkinsfile
3. Verify Docker Hub account has storage space

---

## Problem: Health Check Fails

**Error:** `curl: (7) Failed to connect`

**Solution:**
1. Increase wait time (currently 40s)
2. Check services started: `docker-compose ps`
3. Check logs: `docker-compose logs`

---

# Success Indicators

When everything is working correctly, you should see:

✓ Jenkins Dashboard loads at http://localhost:8080
✓ Pipeline job appears in job list
✓ Build #1 shows all 11 stages in green
✓ Console output ends with "Pipeline succeeded!"
✓ Test Result shows 20 tests passed
✓ Docker images appear in Docker Hub
✓ docker-compose up starts all services
✓ curl http://localhost:5000/ returns "Backend is running!"

---

# Next Steps After Submission

1. **Set up GitHub webhook** for automatic builds on push
2. **Add email notifications** for build failures
3. **Configure advanced monitoring** with metrics collection
4. **Implement security scanning** for dependencies
5. **Set up staging environment** for testing
6. **Configure backup** of Jenkins configuration

---

# Resources

- **Jenkins Docs**: https://jenkins.io/doc
- **Docker Docs**: https://docs.docker.com
- **Jest Docs**: https://jestjs.io
- **GitHub Docs**: https://docs.github.com

---

**You've completed the assignment! 🎉**

All deliverables are ready:
- ✓ Jenkinsfile with 11 stages
- ✓ Docker configuration
- ✓ All tests passing
- ✓ Images on Docker Hub
- ✓ Comprehensive documentation

Submit your assignment folder and you're done!

---

**Last Updated**: May 2026
**Assignment**: DSO101 Assignment 2
