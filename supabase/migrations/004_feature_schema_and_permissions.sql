-- Run this file in Supabase SQL Editor after 001-003.
-- Combined schema/permission migration for features that used to live in 004-014.

alter table public.site_settings
  add column if not exists show_offer_popup boolean not null default true,
  add column if not exists offers_countdown_enabled boolean not null default true,
  add column if not exists text_offer_kicker text not null default 'Offer & Announcement',
  add column if not exists text_offer_countdown_label text not null default 'Offer ends in',
  add column if not exists show_lead_source_tracking boolean not null default true,
  add column if not exists crm_integration_enabled boolean not null default false,
  add column if not exists crm_webhook_url text,
  add column if not exists detail_form_fields jsonb not null default '[]'::jsonb,
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
  }'::jsonb,
  add column if not exists show_developer_contact_section boolean not null default true,
  add column if not exists developer_contact_label text not null default 'Contact Developer',
  add column if not exists developer_contact_whatsapp_number text not null default '+9779827305718',
  add column if not exists developer_contact_message text not null default 'Hi developer, I need help with this digital business card.',
  add column if not exists developer_contact_button_color text not null default '#25d366',
  add column if not exists developer_contact_button_text_color text not null default '#ffffff',
  add column if not exists developer_contact_style text not null default 'button',
  add column if not exists show_referral_offer boolean not null default true,
  add column if not exists referral_offer_title text not null default 'Special Referral Offer',
  add column if not exists referral_offer_description text not null default 'You opened this from a shared link. Show this offer to the business and ask for your referral reward.',
  add column if not exists referral_offer_button_label text not null default 'Claim on WhatsApp',
  add column if not exists referral_offer_button_url text,
  add column if not exists referral_offer_image_url text,
  add column if not exists referral_offer_background_color text not null default '#ffffff',
  add column if not exists referral_offer_text_color text not null default '#17211f',
  add column if not exists show_company_video_section boolean not null default false,
  add column if not exists company_video_title text not null default 'Company Video',
  add column if not exists company_video_description text,
  add column if not exists company_video_url text,
  add column if not exists company_video_poster_url text,
  add column if not exists company_video_source_mode text not null default 'uploaded',
  add column if not exists company_video_uploaded_url text,
  add column if not exists company_video_external_url text,
  add column if not exists offer_popup_background_color text not null default '#ffffff',
  add column if not exists offer_popup_text_color text not null default '#52605c',
  add column if not exists offer_popup_heading_color text,
  add column if not exists offer_popup_kicker_color text,
  add column if not exists offer_countdown_background_color text,
  add column if not exists offer_countdown_label_color text not null default '#ffffff',
  add column if not exists offer_countdown_box_color text not null default '#ffffff',
  add column if not exists offer_countdown_number_color text not null default '#17211f',
  add column if not exists offer_countdown_unit_color text not null default '#5e6b68',
  add column if not exists show_whatsapp_social boolean not null default true,
  add column if not exists show_facebook_social boolean not null default true,
  add column if not exists show_instagram_social boolean not null default true,
  add column if not exists show_tiktok_social boolean not null default true,
  add column if not exists show_website_social boolean not null default true,
  add column if not exists logo_shape text not null default 'circle',
  add column if not exists owner_card_background_color text not null default '#ffffff',
  add column if not exists owner_card_border_color text,
  add column if not exists owner_card_label_color text,
  add column if not exists owner_card_name_color text,
  add column if not exists owner_card_title_color text not null default '#17211f',
  add column if not exists owner_card_text_color text;

alter table public.offers
  add column if not exists starts_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists show_countdown boolean not null default true;

alter table public.review_detail_leads
  add column if not exists extra_fields jsonb not null default '{}'::jsonb;

alter table public.custom_sections
  add column if not exists background_color text,
  add column if not exists title_color text,
  add column if not exists text_color text,
  add column if not exists border_color text,
  add column if not exists button_background_color text,
  add column if not exists button_text_color text;

update storage.buckets
set file_size_limit = 209715200
where id = 'site-assets';

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

