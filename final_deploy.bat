@echo off
echo [1/4] Building Frontend...
cd frontend
call npm run build
echo [2/4] Deploying Frontend...
call gcloud run deploy nexus-frontend --source . --region asia-south1 --allow-unauthenticated --quiet

echo [3/4] Installing Backend Deps...
cd ../backend
call npm install
echo [4/4] Deploying Backend...
call gcloud run deploy nexus-backend --source . --region asia-south1 --allow-unauthenticated --set-env-vars="GCS_BUCKET=nexus-event-storage,GOOGLE_CLOUD_PROJECT=nexus-event-123,FIREBASE_PROJECT_ID=nexus-event-123" --quiet

echo [DONE] Implementation Complete.
