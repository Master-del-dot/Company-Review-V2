# Digital Business Card Website + Admin Panel

This project has three parts:

- `public-site` - the restaurant/bar digital business card visitors see.
- `admin-panel` - the private dashboard where admins edit all public content.
- `supabase` - the database, storage, auth, and visitor-counter setup.

Brand color: `#03736e`

## Run Locally

Use `npm.cmd` on Windows PowerShell if `npm` is blocked by execution policy.

```powershell
npm.cmd install
npm.cmd run dev:public
```

In another terminal:

```powershell
npm.cmd run dev:admin
```

Local URLs:

- Public site: `http://localhost:5173`
- Admin panel: `http://localhost:5174`

## Supabase Setup, Tiny Tiny Steps

1. Go to `https://supabase.com`.
2. Make a free account or sign in.
3. Click `New project`.
4. Give it any name, like `Restro Elaichi Card`.
5. Make a database password. Keep it somewhere safe.
6. Click `Create new project`.
7. Wait until Supabase finishes. It can take a minute.

## Add the Database

1. In Supabase, look at the left menu.
2. Click `SQL Editor`.
3. Click `New query`.
4. Open this file in this project:

   `supabase/migrations/001_initial_schema.sql`

5. Copy all the SQL from that file.
6. Paste it into the Supabase SQL editor.
7. Click `Run`.

Done. Your tables, security rules, visitor counter, and storage bucket now exist.

## If You Already Ran the First SQL

If your project was already set up before the share button, extra links, custom blocks, and color controls were added, do this one extra tiny step:

1. In Supabase, click `SQL Editor`.
2. Click `New query`.
3. Open this file:

   `supabase/migrations/002_god_level_controls.sql`

4. Copy everything inside it.
5. Paste it into Supabase.
6. Click `Run`.

That adds:

- many separate color controls
- unlimited extra social/action links
- unlimited custom text/image blocks
- security rules for those new tables

## If You Need Offer Buttons

If your Supabase project already existed before offer CTA buttons were added, run this small SQL file too:

`supabase/migrations/003_offer_cta.sql`

It adds two optional fields to offers:

- `button_label` - text like `Buy Now`, `Follow Us`, or `Order Here`
- `button_url` - the link opened when visitors click that button

## Add the AI Customer Conversion Engine

To enable the floating AI chatbot and the separate admin controls, run this SQL file in Supabase:

`supabase/migrations/006_ai_conversion_engine.sql`

Tiny steps:

1. In Supabase, click `SQL Editor`.
2. Click `New query`.
3. Open `supabase/migrations/006_ai_conversion_engine.sql` from this project.
4. Copy everything inside it.
5. Paste it into Supabase.
6. Click `Run`.

This adds:

- chatbot on/off settings
- editable welcome, lead capture, WhatsApp, and offline messages
- chatbot questions and answers
- chatbot products/services
- chatbot offers
- AI lead capture table
- chat event tracking table
- secure public/admin Supabase policies

If you already ran this migration before AI API controls were added, run this tiny SQL too:

```sql
alter table public.chatbot_settings
add column if not exists ai_enabled boolean not null default false,
add column if not exists ai_api_url text,
add column if not exists ai_system_prompt text not null default 'You are a helpful sales assistant. Answer naturally using only the business knowledge provided. If the answer is uncertain, ask one short follow-up question and offer WhatsApp.';
```

## Free AI Setup Like Tiny Steps

Important truth: no hosted AI company can promise free forever. For 100% free lifetime, use open-source AI on your own computer/server. This project supports that through `ai-server`.

### Step 1: Deploy AI Bridge on Render

1. Push this project to GitHub.
2. Go to `https://render.com`.
3. Sign in.
4. Click `New`.
5. Click `Web Service`.
6. Connect your GitHub repo.
7. Set `Root Directory` to:

   `ai-server`

8. Set `Build Command`:

   `npm install`

9. Set `Start Command`:

   `npm start`

10. Choose the `Free` instance.
11. Click `Create Web Service`.
12. Wait until deploy finishes.
13. Copy your Render URL. It will look like:

   `https://company-review-ai-server.onrender.com`

14. Test this URL in browser:

   `https://company-review-ai-server.onrender.com/health`

You should see JSON with `"ok": true`.

### Step 2: Connect It in Admin Panel

1. Open admin panel.
2. Click AI navigation: `Chatbot`.
3. Paste your Render URL into `AI API URL`.
4. Turn on `AI Reply Enabled`.
5. Click `Save Chatbot`.
6. Open public site and ask a question.

### Step 3: Make It Real AI With Ollama

The Render bridge works alone, but for real open-source AI answers you need Ollama.

1. Install Ollama on your computer from `https://ollama.com`.
2. Open terminal.
3. Run:

   `ollama pull llama3.2:1b`

4. Run:

   `ollama serve`

5. Your Ollama runs locally at:

   `http://localhost:11434`

Render cannot directly access your `localhost`. To connect local Ollama to Render, expose it with a tunnel such as Cloudflare Tunnel or another HTTPS tunnel, then set Render env var:

`OLLAMA_BASE_URL=https://your-tunnel-url`

If `OLLAMA_BASE_URL` is empty, the AI server still gives knowledge-based smart replies, but it is not a full LLM.

Render free web services can spin down after idle time and have monthly limits. That is okay for testing, but for always-instant production, use a paid server or run the AI bridge on your own always-on machine.

## Create the Admin Login

1. In Supabase, click `Authentication`.
2. Click `Users`.
3. Click `Add user`.
4. Add your admin email and password.
5. After the user is created, click the user.
6. Copy the user's `User UID`.
7. Go back to `SQL Editor`.
8. Run this, but replace `PASTE-USER-UID-HERE` with the UID you copied:

```sql
insert into public.admin_users (user_id)
values ('PASTE-USER-UID-HERE');
```

That tells the app, "this person is allowed to use the admin panel."

## Add Supabase Keys to Both Apps

1. In Supabase, click `Project Settings`.
2. Click `API`.
3. Copy `Project URL`.
4. Copy the `anon public` key.
5. In `public-site`, copy `.env.example` and name the copy `.env`.
6. In `admin-panel`, copy `.env.example` and name the copy `.env`.
7. Put the same values into both `.env` files:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Use the Admin Panel

1. Start the admin panel with:

```powershell
npm.cmd run dev:admin
```

2. Open `http://localhost:5174`.
3. Sign in with the email and password you created.
4. Edit logo, name, tagline, color, contacts, socials, map, VCF, and offers.
5. Click `Save Settings`.

The admin panel has two navigation rows:

- Main business card navigation: `Overview`, `Brand`, `Contact`, `Social`, `Content`
- AI automation navigation: `Chatbot`, `Q&A`, `Products`, `Leads`

Use the AI automation navigation to control the public chatbot without editing code.

## God Level Controls

The admin panel now has:

- `God Level Colors` - change page background, card background, headings, body text, buttons, icons, and accent/link colors separately.
- `Extra Links` - add more links beyond Facebook, WhatsApp, Instagram, TikTok, and Website. Use icon names like `globe`, `whatsapp`, `facebook`, `instagram`, `tiktok`, `phone`, `mail`, or `external`.
- `Custom Text / Image Blocks` - add extra editable blocks with title, text, image, button, layout, active toggle, and sort order.
- Share button - public users can share using their phone/browser share menu, or open a QR/link popup when native sharing is unavailable.

## Add a Google Map

1. Open Google Maps.
2. Search your restaurant.
3. Click `Share`.
4. Click `Embed a map`.
5. Copy the iframe code.
6. Paste it into `Map Embed Iframe Code` in the admin panel.
7. Also paste the normal Google Maps share link into `Google Maps URL`.

## VCF Contact File

Create a `.vcf` file like this:

```vcf
BEGIN:VCARD
VERSION:3.0
FN:restroelaichi
ORG:restroelaichi
TEL:+977XXXXXXXXXX
EMAIL:hello@example.com
ADR:;;Shivachowk;Lalitpur;;44700;Nepal
URL:https://example.com
END:VCARD
```

Upload it in the admin panel under `Upload VCF Contact File`.

## Automatic Storage Cleanup

Admin uploads automatically keep only the latest 5 files in each Storage folder, such as:

- `logos`
- `offers`
- `sections`
- `vcf`
- `social-icons/whatsapp`
- `social-icons/facebook`
- `social-icons/instagram`
- `social-icons/tiktok`
- `social-icons/website`
- `custom-link-icons`

When a 6th file is uploaded to the same folder, the oldest file in that folder is removed from Supabase Storage.

## If You Need Uploaded Social Logos

Run this SQL file in Supabase if your project already existed before manual social logo uploads were added:

`supabase/migrations/004_social_icon_uploads.sql`

It adds logo URL columns for WhatsApp, Facebook, Instagram, TikTok, Website, and extra custom links.

## Safe Admin Credential Table

If you want a separate admin credential table, run:

`supabase/migrations/005_safe_admin_credentials.sql`

It stores:

- admin email
- hashed password

It does not store readable/plain passwords. To set the value, run:

```sql
select public.set_admin_credentials('your-email@example.com', 'your-new-password');
```

The current admin panel still uses Supabase Auth for secure database and Storage permissions.

## Deploy Later

You can deploy `public-site` and `admin-panel` separately on Vercel, Netlify, or any static host. Each app needs the same two environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
