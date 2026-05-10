
create table if not exists public.chatbot_settings (
  id int primary key default 1 check (id = 1),
  enabled boolean not null default true,
  assistant_name text not null default 'AI Sales Assistant',
  welcome_message text not null default 'Hi, I am your AI assistant. Do you want a quote, support, or more information?',
  lead_prompt text not null default 'Share your name, phone, and email so the team can follow up quickly.',
  whatsapp_prompt text not null default 'Continue on WhatsApp for the fastest reply.',
  offline_message text not null default 'The assistant is paused right now, but you can still leave your details.',
  whatsapp_number text,
  accent_color text not null default '#03736e',
  heading_color text not null default '#03736e',
  ai_enabled boolean not null default true,
  ai_api_url text,
  ai_system_prompt text not null default 'You are a warm human-like business assistant. Answer naturally using only the business knowledge provided. Keep replies short, friendly, and useful. If the answer is uncertain, ask one short follow-up question and offer WhatsApp.',
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  active boolean not null default true,
  hits int not null default 0,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  price text,
  description text,
  active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_leads (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  name text,
  phone text,
  email text,
  message text,
  tag text not null default 'warm' check (tag in ('hot', 'warm', 'cold')),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.chatbot_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  message text,
  intent text,
  tag text not null default 'warm' check (tag in ('hot', 'warm', 'cold')),
  created_at timestamptz not null default now()
);

insert into public.chatbot_settings (id)
values (1)
on conflict (id) do nothing;

update public.chatbot_settings
set
  ai_enabled = true,
  ai_api_url = nullif(ai_api_url, ''),
  ai_system_prompt = coalesce(nullif(ai_system_prompt, ''), 'You are a warm human-like business assistant. Answer naturally using only the business knowledge provided. Keep replies short, friendly, and useful. If the answer is uncertain, ask one short follow-up question and offer WhatsApp.')
where id = 1;

insert into public.chatbot_faqs (question, answer, sort_order)
values
  ('What services do you provide?', 'We can answer business questions, collect leads, guide visitors to offers, and connect them on WhatsApp.', 10),
  ('How can I get a quote?', 'Share your requirement and contact details. The team can follow up with a quote.', 20),
  ('Can I talk on WhatsApp?', 'Yes. Click Continue on WhatsApp and your message will be pre-filled.', 30)
on conflict do nothing;

insert into public.chatbot_products (name, category, price, description, sort_order)
values
  ('Lead Capture Assistant', 'Automation', 'Free stack', 'Captures name, phone, email, and customer intent from website visitors.', 10),
  ('WhatsApp Conversion Flow', 'Messaging', 'Free wa.me link', 'Sends warm leads to WhatsApp with a pre-filled message.', 20)
on conflict do nothing;

insert into public.chatbot_offers (title, description, sort_order)
values
  ('Priority Callback', 'Hot leads can request a quick callback from the team.', 10)
on conflict do nothing;

drop trigger if exists set_chatbot_settings_updated_at on public.chatbot_settings;
create trigger set_chatbot_settings_updated_at
before update on public.chatbot_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_chatbot_faqs_updated_at on public.chatbot_faqs;
create trigger set_chatbot_faqs_updated_at
before update on public.chatbot_faqs
for each row execute function public.set_updated_at();

drop trigger if exists set_chatbot_products_updated_at on public.chatbot_products;
create trigger set_chatbot_products_updated_at
before update on public.chatbot_products
for each row execute function public.set_updated_at();

drop trigger if exists set_chatbot_offers_updated_at on public.chatbot_offers;
create trigger set_chatbot_offers_updated_at
before update on public.chatbot_offers
for each row execute function public.set_updated_at();

alter table public.chatbot_settings enable row level security;
alter table public.chatbot_faqs enable row level security;
alter table public.chatbot_products enable row level security;
alter table public.chatbot_offers enable row level security;
alter table public.chatbot_leads enable row level security;
alter table public.chatbot_events enable row level security;

drop policy if exists "Public can read chatbot settings" on public.chatbot_settings;
create policy "Public can read chatbot settings"
on public.chatbot_settings for select
to anon, authenticated
using (true);

drop policy if exists "Admins can update chatbot settings" on public.chatbot_settings;
create policy "Admins can update chatbot settings"
on public.chatbot_settings for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read active chatbot faqs" on public.chatbot_faqs;
create policy "Public can read active chatbot faqs"
on public.chatbot_faqs for select
to anon, authenticated
using (active = true or public.is_admin(auth.uid()));

drop policy if exists "Admins can manage chatbot faqs" on public.chatbot_faqs;
create policy "Admins can manage chatbot faqs"
on public.chatbot_faqs for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read active chatbot products" on public.chatbot_products;
create policy "Public can read active chatbot products"
on public.chatbot_products for select
to anon, authenticated
using (active = true or public.is_admin(auth.uid()));

drop policy if exists "Admins can manage chatbot products" on public.chatbot_products;
create policy "Admins can manage chatbot products"
on public.chatbot_products for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read active chatbot offers" on public.chatbot_offers;
create policy "Public can read active chatbot offers"
on public.chatbot_offers for select
to anon, authenticated
using (active = true or public.is_admin(auth.uid()));

drop policy if exists "Admins can manage chatbot offers" on public.chatbot_offers;
create policy "Admins can manage chatbot offers"
on public.chatbot_offers for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can submit chatbot leads" on public.chatbot_leads;
create policy "Public can submit chatbot leads"
on public.chatbot_leads for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read chatbot leads" on public.chatbot_leads;
create policy "Admins can read chatbot leads"
on public.chatbot_leads for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can update chatbot leads" on public.chatbot_leads;
create policy "Admins can update chatbot leads"
on public.chatbot_leads for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete chatbot leads" on public.chatbot_leads;
create policy "Admins can delete chatbot leads"
on public.chatbot_leads for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Public can submit chatbot events" on public.chatbot_events;
create policy "Public can submit chatbot events"
on public.chatbot_events for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read chatbot events" on public.chatbot_events;
create policy "Admins can read chatbot events"
on public.chatbot_events for select
to authenticated
using (public.is_admin(auth.uid()));


-- -----------------------------------------------------------------------------
-- Source: 007_visiting_card_visibility_controls.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists owner_name text,
  add column if not exists owner_title text,
  add column if not exists owner_photo_url text,
  add column if not exists owner_bio text,
  add column if not exists show_identity_section boolean not null default true,
  add column if not exists show_quick_contact_section boolean not null default true,
  add column if not exists show_visiting_card_section boolean not null default false,
  add column if not exists show_reviews_section boolean not null default true,
  add column if not exists show_social_section boolean not null default true,
  add column if not exists show_custom_sections boolean not null default true,
  add column if not exists show_add_contact_button boolean not null default true,
  add column if not exists show_location_section boolean not null default true,
  add column if not exists show_visitor_count boolean not null default true,
  add column if not exists show_offer_popup boolean not null default true,
  add column if not exists show_chatbot_section boolean not null default true;


-- -----------------------------------------------------------------------------
-- Source: 008_card_background_order_controls.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists show_logo boolean not null default true,
  add column if not exists visiting_card_image_url text,
  add column if not exists visiting_card_display_mode text not null default 'section',
  add column if not exists show_uploaded_card_section boolean not null default false,
  add column if not exists page_background_image_url text,
  add column if not exists show_background_image boolean not null default false,
  add column if not exists business_hours text,
  add column if not exists show_business_hours_section boolean not null default false,
  add column if not exists primary_cta_label text,
  add column if not exists primary_cta_url text,
  add column if not exists show_primary_cta_section boolean not null default false,
  add column if not exists section_order jsonb not null default
    '["identity","quick_contact","owner_card","reviews","social","custom_sections","add_contact","uploaded_card","business_hours","primary_cta","location","visitor_count"]'::jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_settings_visiting_card_display_mode_check'
  ) then
    alter table public.site_settings
      add constraint site_settings_visiting_card_display_mode_check
      check (visiting_card_display_mode in ('section', 'background'));
  end if;
end $$;


-- -----------------------------------------------------------------------------
-- Source: 009_contact_download_mode.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists contact_download_mode text not null default 'single';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_settings_contact_download_mode_check'
  ) then
    alter table public.site_settings
      add constraint site_settings_contact_download_mode_check
      check (contact_download_mode in ('single', 'vcf_file'));
  end if;
end $$;


-- -----------------------------------------------------------------------------
-- Source: 010_editable_public_copy.sql
-- -----------------------------------------------------------------------------
alter table public.site_settings
  add column if not exists text_owner_card_kicker text not null default 'Owner Visiting Card',
  add column if not exists text_add_contact_button text not null default 'Add to Contact',
  add column if not exists text_google_review_button text not null default 'Review us on Google',
  add column if not exists text_location_heading text not null default 'Location',
  add column if not exists text_open_maps_button text not null default 'Open in Maps',
  add column if not exists text_map_empty text not null default 'Map preview appears after adding an embed code.',
  add column if not exists text_visitor_count_label text not null default 'Total Visitors',
  add column if not exists text_business_hours_heading text not null default 'Business Hours',
  add column if not exists text_offer_kicker text not null default 'Offer & Announcement',
  add column if not exists text_share_copy_button text not null default 'Copy Link',
  add column if not exists text_share_copied_button text not null default 'Copied',
  add column if not exists text_share_button text not null default 'Share',
  add column if not exists text_chat_input_placeholder text not null default 'Ask anything...',
  add column if not exists text_chat_send_button text not null default 'Send',
  add column if not exists text_chat_whatsapp_button text not null default 'Continue on WhatsApp',
  add column if not exists text_chat_online_status text not null default 'Online now',
  add column if not exists text_chat_paused_status text not null default 'Paused',
  add column if not exists text_lead_name_placeholder text not null default 'Name',
  add column if not exists text_lead_phone_placeholder text not null default 'Phone',
  add column if not exists text_lead_email_placeholder text not null default 'Email',
  add column if not exists text_lead_message_placeholder text not null default 'Message',
  add column if not exists text_lead_save_button text not null default 'Save';


-- -----------------------------------------------------------------------------
-- Source: 011_review_detail_leads.sql
-- -----------------------------------------------------------------------------
create table if not exists public.review_detail_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  message text,
  source text not null default 'review_details',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.review_detail_leads enable row level security;

drop policy if exists "Public can submit review detail leads" on public.review_detail_leads;
create policy "Public can submit review detail leads"
on public.review_detail_leads for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read review detail leads" on public.review_detail_leads;
create policy "Admins can read review detail leads"
on public.review_detail_leads for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can update review detail leads" on public.review_detail_leads;
create policy "Admins can update review detail leads"
on public.review_detail_leads for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete review detail leads" on public.review_detail_leads;
create policy "Admins can delete review detail leads"
on public.review_detail_leads for delete
to authenticated
using (public.is_admin(auth.uid()));
