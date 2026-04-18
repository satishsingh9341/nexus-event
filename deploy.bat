@echo off
cd frontend
call npm run build
call gcloud run deploy nexus-frontend --source . --region asia-south1 --allow-unauthenticated --quiet
cd ../backend
call gcloud run deploy nexus-backend --source . --region asia-south1 --allow-unauthenticated --set-env-vars="DATABASE_URL=postgresql://postgres:Ankit%%409708%%23*@aws-0-ap-south-1.pooler.supabase.com:6543/postgres,FIREBASE_PROJECT_ID=nexus-event-system,JWT_SECRET=nexus_jwt_secret_2026,NODE_ENV=production" --quiet
