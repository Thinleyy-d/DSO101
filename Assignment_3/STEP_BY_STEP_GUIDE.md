# Assignment 3 – Step-by-Step Guide

Follow these steps in order. Do **not** put passwords or tokens in your code—use GitHub Secrets only.

---

## Part 1: GitHub repository

1. Make sure your repo is **public** (Settings → General → Danger Zone is not needed; use Visibility).
2. Push the `Assignment_3` folder. If your whole course repo is one GitHub repo, either:
   - Use **only** `Assignment_3` as the repository root for this assignment, **or**
   - Move `.github/workflows/deploy.yml` to the **repository root** and add `defaults.run.working-directory: Assignment_3` to the workflow.
3. Confirm `package.json` has `"start"` and `"test"` scripts (already set in this folder).

---

## Part 2: Docker Hub

1. Create a free account at [hub.docker.com](https://hub.docker.com).
2. Create a **public** repository named `todo-app` (or keep the image name `todo-app` in the workflow).
3. Create an **Access Token**: Account Settings → Security → New Access Token.
4. Test locally from `Assignment_3`:

```bash
cd Assignment_3
npm install
npm test
docker build -t YOUR_DOCKERHUB_USERNAME/todo-app:latest .
docker run -p 3000:3000 --env-file .env YOUR_DOCKERHUB_USERNAME/todo-app:latest
```

Visit `http://localhost:3000` — you should see `Todo app is running!`

---

## Part 3: GitHub Secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | What to put |
|-------------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not your login password) |
| `RENDER_DEPLOY_HOOK_URL` | Render deploy hook URL (from Render dashboard) |

---

## Part 4: Render.com

1. Sign up at [render.com](https://render.com).
2. **New +** → **Web Service** → **Deploy an existing image from a registry**.
3. Image URL: `docker.io/YOUR_DOCKERHUB_USERNAME/todo-app:latest`
4. Set **Environment variables**:
   - `MONGODB_URI` = your MongoDB Atlas connection string (same as Assignment 1)
   - `PORT` = `3000` (Render may set `PORT` automatically—our app reads `process.env.PORT`)
5. Open the service **Settings** → **Deploy Hook** → copy the URL → add as `RENDER_DEPLOY_HOOK_URL` in GitHub.
6. After the first manual deploy works, push to `main` on GitHub to run the pipeline.

---

## Part 5: Screenshots for your report

Save screenshots in `Assignment_3/Assets/` and link them in `README.md`:

1. GitHub Actions workflow run (green check).
2. Docker Hub showing `todo-app:latest` pushed.
3. Render dashboard showing a live deployment.
4. Your live Render URL in the README.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Docker build fails on `npm test` | Run `npm test` locally first and fix failing tests |
| Push to Docker Hub fails | Check `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets |
| Render does not update after push | Confirm `RENDER_DEPLOY_HOOK_URL` secret and workflow curl step |
| App crashes on Render | Set `MONGODB_URI` in Render environment variables |
| Workflow not running | Workflow file must be at repo root `.github/workflows/` |
