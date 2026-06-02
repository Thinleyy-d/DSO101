# CI/CD Pipeline Project

A Flask web app with automated testing and deployment.

## Live App
URL: (paste your Render URL here)

## How to run tests locally
pip install -r requirements.txt
pytest --tb=short -v

## CI/CD Flow
Every git push to main will:
1. Install dependencies
2. Run all tests
3. Deploy to Render automatically