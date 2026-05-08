
alter table public.site_settings
  add column if not exists show_analytics_feature boolean not null default true,
  add column if not exists show_lead_source_tracking boolean not null default true,
  add column if not exists auto_followup_enabled boolean not null default false,
  add column if not exists auto_followup_message text not null default 'Hi, thanks for sharing your details. Our team will follow up shortly.',
  add column if not exists crm_integration_enabled boolean not null default false,
  add column if not exists crm_webhook_url text,
  add column if not exists offers_countdown_enabled boolean not null default true,
  add column if not exists text_offer_countdown_label text not null default 'Offer ends in',
  add column if not exists text_detail_form_success text not null default 'Thanks. Your details are saved.',
  add column if not exists text_detail_form_required text not null default 'Please add your name and phone.';

alter table public.offers
  add column if not exists starts_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists show_countdown boolean not null default true;

alter table public.review_detail_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists page_url text;

alter table public.chatbot_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists page_url text;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  event_name text not null,
  event_type text not null default 'interaction',
  source text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

drop policy if exists "Public can submit analytics events" on public.analytics_events;
create policy "Public can submit analytics events"
on public.analytics_events for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read analytics events" on public.analytics_events;
create policy "Admins can read analytics events"
on public.analytics_events for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete analytics events" on public.analytics_events;
create policy "Admins can delete analytics events"
on public.analytics_events for delete
to authenticated
using (public.is_admin(auth.uid()));


-- -----------------------------------------------------------------------------
-- Source: 013_schema_cache_repair_and_exports.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists text_lead_message_placeholder text not null default 'Message',
  add column if not exists show_analytics_feature boolean not null default true,
  add column if not exists show_lead_source_tracking boolean not null default true,
  add column if not exists auto_followup_enabled boolean not null default false,
  add column if not exists auto_followup_message text not null default 'Hi, thanks for sharing your details. Our team will follow up shortly.',
  add column if not exists crm_integration_enabled boolean not null default false,
  add column if not exists crm_webhook_url text,
  add column if not exists offers_countdown_enabled boolean not null default true,
  add column if not exists text_offer_countdown_label text not null default 'Offer ends in',
  add column if not exists text_detail_form_success text not null default 'Thanks. Your details are saved.',
  add column if not exists text_detail_form_required text not null default 'Please add your name and phone.';

alter table public.offers
  add column if not exists starts_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists show_countdown boolean not null default true;

alter table public.review_detail_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists page_url text;

alter table public.chatbot_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists page_url text;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  event_name text not null,
  event_type text not null default 'interaction',
  source text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

drop policy if exists "Public can submit analytics events" on public.analytics_events;
create policy "Public can submit analytics events"
on public.analytics_events for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read analytics events" on public.analytics_events;
create policy "Admins can read analytics events"
on public.analytics_events for select
to authenticated
using (public.is_admin(auth.uid()));


-- -----------------------------------------------------------------------------
-- Source: 014_detail_form_visibility_order.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists show_detail_form_section boolean not null default true;

update public.site_settings
set section_order = case
  when section_order ? 'detail_form' then section_order
  else jsonb_insert(
    section_order,
    '{4}',
    '"detail_form"'::jsonb,
    true
  )
end
where id = 1;


-- -----------------------------------------------------------------------------
-- Source: 015_customer_form_module_settings.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists text_detail_form_title text not null default 'Fill your details',
  add column if not exists text_detail_form_subtitle text not null default 'Share your contact details so our team can follow up.',
  add column if not exists detail_form_background_color text not null default '#ffffff',
  add column if not exists detail_form_text_color text not null default '#52605c',
  add column if not exists detail_form_button_color text not null default '#111111',
  add column if not exists detail_form_button_text_color text not null default '#ffffff',
  add column if not exists show_detail_form_name boolean not null default true,
  add column if not exists show_detail_form_phone boolean not null default true,
  add column if not exists show_detail_form_email boolean not null default true,
  add column if not exists show_detail_form_message boolean not null default true,
  add column if not exists detail_form_fields jsonb not null default '[]'::jsonb;

alter table public.review_detail_leads
  add column if not exists extra_fields jsonb not null default '{}'::jsonb;


-- -----------------------------------------------------------------------------
-- Source: 016_admin_module_locks.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists admin_module_locks jsonb not null default '{
    "account": { "enabled": true, "password": "1234" },
    "admin-locks": { "enabled": true, "password": "1234" },
    "brand": { "enabled": true, "password": "1234" },
    "contact": { "enabled": true, "password": "1234" },
    "social": { "enabled": true, "password": "1234" },
    "content": { "enabled": true, "password": "1234" },
    "visibility": { "enabled": true, "password": "1234" },
    "customer-form": { "enabled": true, "password": "1234" },
    "text-labels": { "enabled": true, "password": "1234" },
    "analytics-dashboard": { "enabled": true, "password": "1234" },
    "lead-sources": { "enabled": true, "password": "1234" },
    "follow-up": { "enabled": true, "password": "1234" },
    "crm-export": { "enabled": true, "password": "1234" },
    "chatbot": { "enabled": true, "password": "1234" },
    "chatbot-faqs": { "enabled": true, "password": "1234" },
    "chatbot-products": { "enabled": true, "password": "1234" },
    "chatbot-leads": { "enabled": true, "password": "1234" },
    "review-leads": { "enabled": true, "password": "1234" }
  }'::jsonb;

update public.site_settings
set admin_module_locks = '{
  "account": { "enabled": true, "password": "1234" },
  "admin-locks": { "enabled": true, "password": "1234" },
  "brand": { "enabled": true, "password": "1234" },
  "contact": { "enabled": true, "password": "1234" },
  "social": { "enabled": true, "password": "1234" },
  "content": { "enabled": true, "password": "1234" },
  "visibility": { "enabled": true, "password": "1234" },
  "customer-form": { "enabled": true, "password": "1234" },
  "text-labels": { "enabled": true, "password": "1234" },
  "analytics-dashboard": { "enabled": true, "password": "1234" },
  "lead-sources": { "enabled": true, "password": "1234" },
  "follow-up": { "enabled": true, "password": "1234" },
  "crm-export": { "enabled": true, "password": "1234" },
  "chatbot": { "enabled": true, "password": "1234" },
  "chatbot-faqs": { "enabled": true, "password": "1234" },
  "chatbot-products": { "enabled": true, "password": "1234" },
  "chatbot-leads": { "enabled": true, "password": "1234" },
  "review-leads": { "enabled": true, "password": "1234" }
}'::jsonb
where id = 1
  and (admin_module_locks = '{}'::jsonb or admin_module_locks is null);
