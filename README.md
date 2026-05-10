# Company Review V2

Digital company review website, admin panel, Supabase backend, and AI chatbot bridge.

This project is made to be copied and reused for many customer companies. Each customer gets their own Supabase project, public website, admin panel, and AI configuration.

## Project Parts

- `public-site` - the public business/review/contact page visitors open.
- `admin-panel` - the private dashboard used to edit the public site.
- `ai-server` - a small backend bridge for Gemini/Ollama chatbot replies.
- `supabase/migrations` - database, storage, security, chatbot, lead, and feature setup.
- `FINAL_CLIENT_SETUP_GUIDE.md` - full baby-step guide for setting up a copied project for a new customer.

## Main Features

- Public digital business card/review page
- Admin-controlled branding, colors, logo shape, images, videos, and sections
- Google review, contact, WhatsApp, phone, email, map, and VCF contact download
- Owner visiting card
- Active/inactive social links
- Custom text/image blocks with image replace/remove and color controls
- Offers and announcements popup with countdown colors
- Referral offer and native share flow
- Company video from upload or URL
- Customer detail form with admin-controlled fields and colors
- Visitor analytics and lead tracking
- Locked admin modules
- Developer contact footer
- AI chatbot with Gemini bridge, FAQ fallback, products/services, offers, and lead capture

## Requirements

- Node.js
- npm
- Supabase account
- Render account, or another Node hosting provider, for live AI server
- Gemini API key if you want real AI replies

## Install

From the project root:

```powershell
npm install
```

If Windows PowerShell blocks `npm`, use:

```powershell
npm.cmd install
```

## Local Development

Run public site:

```powershell
npm run dev:public
```

Public URL:

```text
http://localhost:5173
```

Run admin panel:

```powershell
npm run dev:admin
```

Admin URL:

```text
http://localhost:5174
```

Run AI server:

```powershell
cd ai-server
npm start
```

AI server URL:

```text
http://localhost:10000
```

Health check:

```text
http://localhost:10000/health
```

## Environment Files

Create this file:

```text
public-site/.env
```

Use:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create this file:

```text
admin-panel/.env
```

Use the same values:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For local AI server, create:

```text
ai-server/.env
```

Use:

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
Do not put Gemini API key in public-site/.env or admin-panel/.env.
ai-server/.env is ignored by git.
```

## Supabase Setup

Create a new Supabase project for each customer.

Run these migrations in Supabase SQL Editor in this exact order:

```text
supabase/migrations/001_core_schema.sql
supabase/migrations/002_ai_leads_and_engagement.sql
supabase/migrations/003_growth_forms_and_admin_locks.sql
supabase/migrations/004_feature_schema_and_permissions.sql
supabase/migrations/005_feature_defaults_and_constraints.sql
```

After migrations, set the admin login:

```sql
select public.set_admin_credentials('owner@example.com', 'change-this-password');
```

Change the email/password for the real customer.

## Build

Build both apps:

```powershell
npm run build:all
```

Build only public site:

```powershell
npm --workspace public-site run build
```

Build only admin panel:

```powershell
npm --workspace admin-panel run build
```

## AI Chatbot Setup

Local testing:

1. Start `ai-server`.
2. Open admin panel.
3. Go to `AI Chatbot`.
4. Set:

```text
AI Reply Enabled = ON
AI API URL = http://localhost:10000
```

5. Save chatbot.

Live website:

Use the deployed AI server URL, not localhost.

Example:

```text
AI API URL = https://your-ai-server.onrender.com
```

Important:

```text
Never use http://localhost:10000 on a live public website.
Browsers may show a scary local-network warning.
```

## Deploy AI Server On Render

Create a Render Web Service with:

```text
Root Directory: ai-server
Build Command: npm install
Start Command: npm start
Plan: Free
```

Environment variables:

```text
AI_PROVIDER = gemini
GEMINI_API_KEY = your-gemini-api-key
GEMINI_MODEL = gemini-2.5-flash-lite
```

Test after deploy:

```text
https://your-ai-server.onrender.com/health
```

It should show:

```text
ok: true
provider: gemini
gemini: true
```

Render free services can sleep after inactivity, so the first chatbot reply after sleep can be slower.

## Deploy Public Site

Static host settings:

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

## Deploy Admin Panel

Static host settings:

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

Give the admin panel URL only to the customer/owner.

## Reusing For A New Customer

For every new customer, change:

- Supabase project
- `public-site/.env`
- `admin-panel/.env`
- Admin email/password
- Business name, logo, phone, WhatsApp, email, address
- Google review link
- Social links
- Offers, referral, video, and custom blocks
- Live AI API URL in admin

Usually keep the same:

- Codebase
- Migration files
- AI server code
- Gemini model name
- Admin panel structure

For the full step-by-step customer setup, read:

[FINAL_CLIENT_SETUP_GUIDE.md](./FINAL_CLIENT_SETUP_GUIDE.md)

## Common Fixes

Render says:

```text
Missing script: build
```

Fix Render settings:

```text
Root Directory: ai-server
Build Command: npm install
Start Command: npm start
```

Browser says the site wants to access other apps/services:

```text
Live AI API URL is probably http://localhost:10000.
Change it to your Render AI URL in admin.
```

Chatbot gives fallback, not AI:

```text
AI Reply Enabled must be ON.
AI API URL must be correct.
Open /health and confirm gemini: true.
Check GEMINI_API_KEY exists in Render env vars.
```

Admin does not load:

```text
Check admin-panel/.env.
Run all Supabase migrations 001 to 005.
Check admin credentials were created.
```

## Security Notes

- Supabase anon key is okay for frontend.
- Never expose Supabase service role key in frontend.
- Never expose Gemini API key in frontend.
- Keep `ai-server/.env` private.
- Regenerate API keys if they were pasted in chat or shared publicly.

