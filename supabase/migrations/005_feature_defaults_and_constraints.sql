-- Run this file in Supabase SQL Editor after 004_feature_schema_and_permissions.sql.
-- Combined defaults/cleanup/constraints migration for features that used to live in 004-014.

update public.site_settings
set
  show_offer_popup = coalesce(show_offer_popup, true),
  offers_countdown_enabled = coalesce(offers_countdown_enabled, true),
  show_lead_source_tracking = coalesce(show_lead_source_tracking, true),
  crm_integration_enabled = coalesce(crm_integration_enabled, false),
  text_offer_kicker = coalesce(nullif(text_offer_kicker, ''), 'Offer & Announcement'),
  text_offer_countdown_label = coalesce(nullif(text_offer_countdown_label, ''), 'Offer ends in'),
  show_developer_contact_section = coalesce(show_developer_contact_section, true),
  developer_contact_label = coalesce(nullif(developer_contact_label, ''), 'Contact Developer'),
  developer_contact_whatsapp_number = coalesce(nullif(developer_contact_whatsapp_number, ''), '+9779827305718'),
  developer_contact_message = coalesce(nullif(developer_contact_message, ''), 'Hi developer, I need help with this digital business card.'),
  developer_contact_button_color = coalesce(nullif(developer_contact_button_color, ''), '#25d366'),
  developer_contact_button_text_color = coalesce(nullif(developer_contact_button_text_color, ''), '#ffffff'),
  developer_contact_style = coalesce(nullif(developer_contact_style, ''), 'button'),
  show_referral_offer = coalesce(show_referral_offer, true),
  referral_offer_title = coalesce(nullif(referral_offer_title, ''), 'Special Referral Offer'),
  referral_offer_description = coalesce(nullif(referral_offer_description, ''), 'You opened this from a shared link. Show this offer to the business and ask for your referral reward.'),
  referral_offer_button_label = coalesce(nullif(referral_offer_button_label, ''), 'Claim on WhatsApp'),
  referral_offer_background_color = coalesce(nullif(referral_offer_background_color, ''), '#ffffff'),
  referral_offer_text_color = coalesce(nullif(referral_offer_text_color, ''), '#17211f'),
  show_company_video_section = coalesce(show_company_video_section, false),
  company_video_title = coalesce(nullif(company_video_title, ''), 'Company Video'),
  company_video_source_mode = coalesce(nullif(company_video_source_mode, ''), 'uploaded'),
  company_video_uploaded_url = coalesce(nullif(company_video_uploaded_url, ''), nullif(company_video_url, '')),
  offer_popup_background_color = coalesce(nullif(offer_popup_background_color, ''), '#ffffff'),
  offer_popup_text_color = coalesce(nullif(offer_popup_text_color, ''), '#52605c'),
  offer_countdown_label_color = coalesce(nullif(offer_countdown_label_color, ''), '#ffffff'),
  offer_countdown_box_color = coalesce(nullif(offer_countdown_box_color, ''), '#ffffff'),
  offer_countdown_number_color = coalesce(nullif(offer_countdown_number_color, ''), '#17211f'),
  offer_countdown_unit_color = coalesce(nullif(offer_countdown_unit_color, ''), '#5e6b68'),
  show_whatsapp_social = coalesce(show_whatsapp_social, true),
  show_facebook_social = coalesce(show_facebook_social, true),
  show_instagram_social = coalesce(show_instagram_social, true),
  show_tiktok_social = coalesce(show_tiktok_social, true),
  show_website_social = coalesce(show_website_social, true),
  logo_shape = coalesce(nullif(logo_shape, ''), 'circle'),
  owner_card_background_color = coalesce(nullif(owner_card_background_color, ''), '#ffffff'),
  owner_card_title_color = coalesce(nullif(owner_card_title_color, ''), '#17211f')
where id = 1;

update public.offers
set show_countdown = true
where show_countdown is null;

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

update public.site_settings
set admin_module_locks = coalesce(admin_module_locks, '{}'::jsonb)
  || '{"developer-centre": { "enabled": true, "password": "1234" }}'::jsonb
where id = 1
  and not (coalesce(admin_module_locks, '{}'::jsonb) ? 'developer-centre');

update public.site_settings
set section_order = case
  when section_order ? 'company_video' then section_order
  else jsonb_insert(section_order, '{9}', '"company_video"', false)
end
where id = 1;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_settings_logo_shape_check'
  ) then
    alter table public.site_settings
      add constraint site_settings_logo_shape_check
      check (logo_shape in ('circle', 'rounded_square', 'square'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_settings_company_video_source_mode_check'
  ) then
    alter table public.site_settings
      add constraint site_settings_company_video_source_mode_check
      check (company_video_source_mode in ('uploaded', 'url'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_settings_developer_contact_style_check'
  ) then
    alter table public.site_settings
      add constraint site_settings_developer_contact_style_check
      check (developer_contact_style in ('button', 'text'));
  end if;
end $$;

