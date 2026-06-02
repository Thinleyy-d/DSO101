## Overview
This project demonstrates a complete CI/CD pipeline that automatically builds, pushes, and deploys a Node.js To-Do application using GitHub Actions, Docker, DockerHub, and Render.com.

## Steps Taken

Set up GitHub repository — made the repository public and verified package.json scripts (start, test).

Created Dockerfile — containerized the Node.js app using node:20-alpine, exposing port 3000.

Tested locally — built and ran the Docker container locally to confirm it worked before pushing.

Created GitHub Actions workflow — added .github/workflows/deploy.yml to automate build, push, and deploy on every push to main.

Configured GitHub Secrets — added DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, and RENDER_DEPLOY_WEBHOOK as repository secrets.

Created Render.com service — deployed from the existing DockerHub image and retrieved the deploy webhook URL.

Triggered the pipeline — pushed changes to main and verified each stage completed successfully.

## Screenshots
1. Successful GitHub Actions Workflow
![alt text](<assets/Screenshot 2026-06-02 222554.png>)
![alt text](<assets/Screenshot 2026-06-02 222605.png>)