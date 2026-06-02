# CI/CD Pipeline Project

A Flask web app with automated testing and deployment.

## Live App
URL: (https://dso101-k31b.onrender.com)

## How to run tests locally
pip install -r requirements.txt
pytest --tb=short -v

## CI/CD Flow
Every git push to main will:
1. Install dependencies
2. Run all tests
3. Deploy to Render automatically

## Screenshots
1. Successful GitHub Actions Workflow
![alt text](<../.github/assets/Screenshot 2026-06-03 003033.png>)