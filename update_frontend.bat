@echo off
git add frontend/index.html frontend/src/App.jsx
git commit -m "feat: add Google Fonts, Analytics, Maps embed - no credentials needed"
git push origin main --force
cd frontend
call npm run build
call gcloud run deploy nexus-frontend --source . --region asia-south1 --allow-unauthenticated --quiet
