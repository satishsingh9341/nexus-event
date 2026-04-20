@echo off
echo [1/2] Pushing to GitHub...
git add hack2skill_submission/frontend/script.js README.md
git commit -m "refactor: final 95+ optimized - clean code, O(1) proof, UX polish, scalability"
git push origin main

echo [2/2] Deploying to Google Cloud Run...
cd hack2skill_submission
call gcloud run deploy nexus-hackevent --source . --region asia-south1 --allow-unauthenticated --project nexus-codeyuva-991 --quiet
echo [DONE] All operations complete.
