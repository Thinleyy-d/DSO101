# DSO101 Assignment 3 – GitHub Actions, Docker Hub & Render

**Student:** _Your name / student ID_  
**Course:** DSO101  
**GitHub repository:** _paste your public repo link here_

---

## Project overview

This folder continues the **To-Do List API** from Assignment 1 and Assignment 2. It adds:

- **Docker** – container image for the Node.js API  
- **GitHub Actions** – build, test, push to Docker Hub, trigger Render  
- **Render.com** – deploy from the Docker Hub image  

### Tech stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | API server |
| MongoDB Atlas | Database |
| Jest + Supertest | Unit tests |
| Docker / Docker Hub | Container & registry |
| GitHub Actions | CI/CD |
| Render.com | Cloud hosting |

### Project structure

```
Assignment_3/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── __tests__/api.test.js          # Jest tests
├── Dockerfile
├── server.js
├── package.json
├── .env.example
├── STEP_BY_STEP_GUIDE.md          # Detailed setup instructions
└── Assets/                        # Screenshots for submission
```

---

## Steps taken

1. Copied and simplified the backend from Assignment 2 (Express + MongoDB + Jest tests).
2. Updated the app to listen on port **3000** (as required by the assignment Dockerfile).
3. Created a `Dockerfile` using `node:20-alpine` with `npm test` during the image build.
4. Created `.github/workflows/deploy.yml` to:
   - log in to Docker Hub  
   - build and push `YOUR_USERNAME/todo-app:latest`  
   - call the Render **deploy hook** so Render pulls the new image  
5. Documented required GitHub Secrets (no credentials in code).
6. Tested locally with `npm test` and `docker build`.

---

## Challenges faced

_Describe your own experience. Examples you might relate to:_

- **Render not redeploying after Docker push** – Render does not watch Docker Hub; solved by adding the deploy hook `curl` step in the workflow.  
- **MongoDB on Render** – the container needs `MONGODB_URI` set in the Render dashboard.  
- **Workflow location** – GitHub only runs workflows from `.github/workflows` at the **repository root**; if the whole `DSO101` repo is one GitHub repo, move or duplicate the workflow to the root and set `working-directory: Assignment_3`.  

---

## Learning outcomes

- How to automate build, test, and deploy with GitHub Actions.  
- How to publish Docker images to Docker Hub using secrets.  
- How deploy hooks connect CI/CD to Render for image-based services.  
- Why secrets must never be committed to source control.  

---

## Live deployment

**Render URL:** _https://your-service-name.onrender.com_

Replace the link above after you deploy on Render.

---

## Screenshots

Add your screenshots under `Assets/` and uncomment the lines below.

### 1. Successful GitHub Actions workflow

<!-- ![GitHub Actions](Assets/github-actions-success.png) -->

### 2. Docker Hub – image pushed

<!-- ![Docker Hub](Assets/dockerhub-image.png) -->

### 3. Render.com deployment

<!-- ![Render](Assets/render-deployment.png) -->

---

## Quick commands

```bash
cd Assignment_3
cp .env.example .env    # then edit .env with your MongoDB URI
npm install
npm test
npm start               # http://localhost:3000

docker build -t YOUR_DOCKERHUB_USERNAME/todo-app:latest .
docker run -p 3000:3000 --env-file .env YOUR_DOCKERHUB_USERNAME/todo-app:latest
```

---

## GitHub Secrets (required)

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `RENDER_DEPLOY_HOOK_URL` | Deploy hook from Render service settings |

See [STEP_BY_STEP_GUIDE.md](./STEP_BY_STEP_GUIDE.md) for full setup.

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task (`{ "title": "..." }`) |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## Reference

- [Render deploy hooks](https://render.com/docs/deploy-hooks)  
- [Docker login GitHub Action](https://github.com/docker/login-action)  
