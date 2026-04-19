@echo off
echo [1/2] Deploying Frontend...
cd frontend
call npm run build
call gcloud run deploy nexus-frontend --source . --region asia-south1 --allow-unauthenticated --quiet

echo [2/2] Deploying Backend...
cd ../backend
call gcloud run deploy nexus-backend --source . --region asia-south1 --allow-unauthenticated --set-env-vars="DATABASE_URL=postgresql://postgres:Ankit%%409708%%23*@aws-0-ap-south-1.pooler.supabase.com:6543/postgres,JWT_SECRET=nexus_jwt_secret_2026,GCS_BUCKET=nexus-event-storage,GOOGLE_CLOUD_PROJECT=nexus-event-123,FIREBASE_PROJECT_ID=nexus-event-123,NODE_ENV=production" --quiet

echo [DONE] Redeployment Complete.
