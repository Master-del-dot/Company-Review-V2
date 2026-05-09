-- Run this file in Supabase SQL Editor.
-- Adds the public Contact Developer button settings and Developer Centre admin lock.

alter table public.site_settings
  add column if not exists show_developer_contact_section boolean not null default true,
  add column if not exists developer_contact_label text not null default 'Contact Developer',
  add column if not exists developer_contact_whatsapp_number text not null default '+9779827305718',
  add column if not exists developer_contact_message text not null default 'Hi developer, I need help with this digital business card.',
  add column if not exists developer_contact_button_color text not null default '#25d366',
  add column if not exists developer_contact_button_text_color text not null default '#ffffff';

update public.site_settings
set
  show_developer_contact_section = coalesce(show_developer_contact_section, true),
  developer_contact_label = coalesce(nullif(developer_contact_label, ''), 'Contact Developer'),
  developer_contact_whatsapp_number = coalesce(nullif(developer_contact_whatsapp_number, ''), '+9779827305718'),
  developer_contact_message = coalesce(nullif(developer_contact_message, ''), 'Hi developer, I need help with this digital business card.'),
  developer_contact_button_color = coalesce(nullif(developer_contact_button_color, ''), '#25d366'),
  developer_contact_button_text_color = coalesce(nullif(developer_contact_button_text_color, ''), '#ffffff')
where id = 1;

update public.site_settings
set admin_module_locks = coalesce(admin_module_locks, '{}'::jsonb)
  || '{"developer-centre": { "enabled": true, "password": "1234" }}'::jsonb
where id = 1
  and not (coalesce(admin_module_locks, '{}'::jsonb) ? 'developer-centre');
