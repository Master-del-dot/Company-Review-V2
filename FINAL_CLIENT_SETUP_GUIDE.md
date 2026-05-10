# Final Client Setup Guide

Use this guide when you copy this project for a new customer/company.

Goal:

```text
One copied project -> one new customer -> public website + admin panel + chatbot + database
```

Follow the steps slowly. Do not skip.

## 0. What You Need

Before starting, keep these ready:

- New customer business name
- New customer logo/images
- Customer phone/WhatsApp/email/address
- Your GitHub account
- Your Supabase account
- Your Render account for AI server
- Gemini API key for AI chatbot

Important:

```text
Never paste API keys into public-site/.env or admin-panel/.env unless the key is meant to be public.
Gemini API key must stay only in ai-server/.env locally or Render environment variables online.
```

## 1. Copy Project For New Customer

Make a new folder copy of this project.

Example:

```text
Company Review - Customer ABC
```

Open that new copied folder in VS Code.

## 2. Install Packages

Open terminal in the copied project root and run:

```powershell
npm install
```

If normal `npm` is blocked on Windows, use:

```powershell
npm.cmd install
```

## 3. Create New Supabase Project

1. Go to:

```text
https://supabase.com
```

2. Click **New project**.
3. Give name like:

```text
customer-abc-company-review
```

4. Set a database password.
5. Wait until project is ready.

## 4. Run Supabase SQL Migrations

In Supabase:

```text
SQL Editor -> New query
```

Run these files one by one, in this exact order:

```text
supabase/migrations/001_core_schema.sql
supabase/migrations/002_ai_leads_and_engagement.sql
supabase/migrations/003_growth_forms_and_admin_locks.sql
supabase/migrations/004_feature_schema_and_permissions.sql
supabase/migrations/005_feature_defaults_and_constraints.sql
```

Baby steps for each file:

1. Open the SQL file in VS Code.
2. Copy all text.
3. Paste into Supabase SQL Editor.
4. Click **Run**.
5. Wait for success.
6. Then run the next file.

## 5. Set Admin Login

After migrations, set the admin email/password.

In Supabase SQL Editor, run:

```sql
select public.set_admin_credentials('customer@example.com', 'change-this-password');
```

Change:

```text
customer@example.com
change-this-password
```

to the real admin email/password for that customer.

Example:

```sql
select public.set_admin_credentials('owner@abc.com', 'Abc@12345');
```

## 6. Get Supabase URL And Anon Key

In Supabase:

```text
Project Settings -> API
```

Copy:

```text
Project URL
anon public key
```

## 7. Create Env Files

In `public-site`, create or edit:

```text
public-site/.env
```

Put:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

In `admin-panel`, create or edit:

```text
admin-panel/.env
```

Put the same:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Do not add Gemini API key here.

## 8. Run Locally

Open 3 terminals.

Terminal 1, public site:

```powershell
npm run dev:public
```

Open:

```text
http://localhost:5173
```

Terminal 2, admin panel:

```powershell
npm run dev:admin
```

Open:

```text
http://localhost:5174
```

Terminal 3, AI server:

```powershell
cd ai-server
npm start
```

AI server local URL:

```text
http://localhost:10000
```

Test:

```text
http://localhost:10000/health
```

## 9. Setup Gemini AI Locally

Create or edit:

```text
ai-server/.env
```

Put:

```env
PORT=10000
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash-lite
OLLAMA_BASE_URL=
OLLAMA_MODEL=llama3.2:1b
```

Important:

```text
ai-server/.env is ignored by git.
Do not push this key.
```

## 10. Configure Admin For This Customer

Open admin:

```text
http://localhost:5174
```

Login with the admin email/password you set.

Go section by section and change:

- Business name
- Tagline
- Logo
- Logo shape
- Brand colors
- Owner visiting card
- Phone
- WhatsApp
- Email
- Address
- Google Maps
- Google review link
- Social links
- Offers and announcements
- Referral offer
- Company video
- Custom text/image blocks
- Customer form colors and fields
- Developer contact
- AI chatbot settings

For local chatbot testing, set:

```text
AI Reply Enabled = ON
AI API URL = http://localhost:10000
```

Save.

Warning:

```text
Use http://localhost:10000 only for local testing.
Do not use localhost on live public website.
```

## 11. Build Check

Before giving to customer, run:

```powershell
npm run build:all
```

If both builds pass, project is okay.

Admin may show a Vite chunk-size warning. That is only a warning.

## 12. Push New Customer Project To GitHub

Create a new GitHub repo for the customer.

Example:

```text
Company-Review-Customer-ABC
```

Then in terminal:

```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/Company-Review-Customer-ABC.git
git add -A
git commit -m "setup customer company review project"
git push origin main
```

Before pushing, confirm this file is not tracked:

```text
ai-server/.env
```

## 13. Deploy AI Server On Render

1. Go to:

```text
https://render.com
```

2. Click **New +**.
3. Click **Web Service**.
4. Connect the customer GitHub repo.
5. Use these settings:

```text
Root Directory: ai-server
Build Command: npm install
Start Command: npm start
Plan: Free
```

6. Add Environment Variables:

```text
AI_PROVIDER = gemini
GEMINI_API_KEY = your-gemini-api-key
GEMINI_MODEL = gemini-2.5-flash-lite
```

7. Deploy.

Render will give URL like:

```text
https://company-review-ai-server.onrender.com
```

Test:

```text
https://company-review-ai-server.onrender.com/health
```

It should show:

```text
ok: true
provider: gemini
gemini: true
```

## 14. Put Live AI URL In Admin

Open live or local admin panel.

Go to:

```text
AI Chatbot
```

Set:

```text
AI Reply Enabled = ON
AI API URL = https://your-render-ai-server.onrender.com
```

Click:

```text
Save Chatbot
```

Important:

```text
Never put http://localhost:10000 on a live customer website.
Use the Render URL live.
```

## 15. Deploy Public Site

You can deploy `public-site` wherever you want.

Common settings:

```text
Root Directory: public-site
Build Command: npm install && npm run build
Publish Directory: dist
```

Environment variables:

```text
VITE_SUPABASE_URL = customer Supabase URL
VITE_SUPABASE_ANON_KEY = customer Supabase anon key
```

## 16. Deploy Admin Panel

You can deploy `admin-panel` separately.

Common settings:

```text
Root Directory: admin-panel
Build Command: npm install && npm run build
Publish Directory: dist
```

Environment variables:

```text
VITE_SUPABASE_URL = customer Supabase URL
VITE_SUPABASE_ANON_KEY = customer Supabase anon key
```

Give admin link only to the customer/owner.

## 17. Final Testing Checklist

Open public website and check:

- Logo shows correctly
- Business name correct
- Phone button works
- WhatsApp button works
- Google review button works
- Social links show only active ones
- Owner card looks good
- Offers popup looks good on mobile
- Custom blocks show image and colors
- Company video plays
- Referral share button opens mobile share sheet
- Contact Developer button works
- Chatbot opens
- Chatbot gives AI reply
- Chatbot WhatsApp quick reply works
- Customer form submits

Open admin panel and check:

- Login works
- Save Settings works
- Upload logo/image/video works
- Custom block image replace/remove works
- Social active/inactive toggles work
- AI Chatbot settings save
- Leads show in dashboard

## 18. What To Change For Every New Customer

Must change:

```text
Supabase project
public-site/.env
admin-panel/.env
Admin email/password
Business name/details
Logo/images
Phone/WhatsApp/email/address
Google review link
Social links
Offers/referral/video/custom blocks
Render AI URL in admin
```

Usually same for all customers:

```text
Codebase
AI server code
Gemini model name
Developer contact system
Admin panel structure
Migration files
```

## 19. Common Problems

Problem:

```text
Render says Missing script build
```

Fix:

```text
Build Command must be npm install
Start Command must be npm start
Root Directory must be ai-server
```

Problem:

```text
Browser says website wants to access other apps/services
```

Fix:

```text
Live AI API URL is probably http://localhost:10000.
Change it to Render URL in admin.
```

Problem:

```text
Chatbot gives normal fallback, not AI answer
```

Fix:

```text
Check AI Reply Enabled = ON
Check AI API URL is correct
Open /health URL
Check Render env GEMINI_API_KEY exists
```

Problem:

```text
Admin blank or not loading
```

Fix:

```text
Check Supabase URL and anon key in admin-panel/.env
Make sure all migrations 001 to 005 ran successfully
```

## 20. Final Handover To Customer

Give customer:

- Public website URL
- Admin panel URL
- Admin email
- Admin password

Do not give customer:

- Gemini API key
- Supabase service role key
- Your developer control secrets

Done.

