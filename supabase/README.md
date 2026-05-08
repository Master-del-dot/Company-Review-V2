# Supabase Setup

This folder contains the database and storage setup for the digital business card.

Run the migration files in order in the Supabase SQL Editor. Start with `migrations/001_initial_schema.sql`. It creates:

- `site_settings`
- `offers`
- `analytics`
- `admin_users`
- `site-assets` public Storage bucket
- secure policies
- `increment_visitor_count()` RPC

After creating your admin Auth user, add that user's UUID to `admin_users`.

For the AI Customer Conversion Engine, also run:

`migrations/006_ai_conversion_engine.sql`

It creates:

- `chatbot_settings`
- `chatbot_faqs`
- `chatbot_products`
- `chatbot_offers`
- `chatbot_leads`
- `chatbot_events`
- public read/insert policies for the website chatbot
- admin-only management policies for the admin panel
