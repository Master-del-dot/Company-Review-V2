-- Run this file in Supabase SQL Editor.
-- It adds latest admin locks, offer popup/countdown fields, and visitor reset permission.

alter table public.site_settings
  add column if not exists show_offer_popup boolean not null default true,
  add column if not exists offers_countdown_enabled boolean not null default true,
  add column if not exists text_offer_kicker text not null default 'Offer & Announcement',
  add column if not exists text_offer_countdown_label text not null default 'Offer ends in',
  add column if not exists show_lead_source_tracking boolean not null default true,
  add column if not exists crm_integration_enabled boolean not null default false,
  add column if not exists crm_webhook_url text;

alter table public.offers
  add column if not exists starts_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists show_countdown boolean not null default true;

alter table public.site_settings
  add column if not exists detail_form_fields jsonb not null default '[]'::jsonb;

alter table public.review_detail_leads
  add column if not exists extra_fields jsonb not null default '{}'::jsonb;

update public.site_settings
set
  show_offer_popup = coalesce(show_offer_popup, true),
  offers_countdown_enabled = coalesce(offers_countdown_enabled, true),
  show_lead_source_tracking = coalesce(show_lead_source_tracking, true),
  crm_integration_enabled = coalesce(crm_integration_enabled, false),
  text_offer_kicker = coalesce(nullif(text_offer_kicker, ''), 'Offer & Announcement'),
  text_offer_countdown_label = coalesce(nullif(text_offer_countdown_label, ''), 'Offer ends in')
where id = 1;

update public.offers
set show_countdown = true
where show_countdown is null;

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

insert into public.analytics (id, visitor_count)
values (1, 0)
on conflict (id) do nothing;

drop policy if exists "Admins can update analytics" on public.analytics;
create policy "Admins can update analytics"
on public.analytics for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete analytics events" on public.analytics_events;
create policy "Admins can delete analytics events"
on public.analytics_events for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete chatbot leads" on public.chatbot_leads;
create policy "Admins can delete chatbot leads"
on public.chatbot_leads for delete
to authenticated
using (public.is_admin(auth.uid()));
