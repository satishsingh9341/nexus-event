@echo off
git add -A
git commit -m "feat: Google Maps API, Cloud Storage for QR codes, badges in README"
git push origin main --force

cd frontend
call npm install
call npm run build
call gcloud run deploy nexus-frontend --source . --region asia-south1 --allow-unauthenticated --quiet

cd ../backend
call npm install
call gcloud run deploy nexus-backend --source . --region asia-south1 --allow-unauthenticated --update-env-vars GCS_BUCKET=nexus-event-storage,GOOGLE_CLOUD_PROJECT=nexus-event-system --quiet
