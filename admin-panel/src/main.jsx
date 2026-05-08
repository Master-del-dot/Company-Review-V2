import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  Bot,
  Brush,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Contact,
  Eye,
  ImagePlus,
  Link2,
  Lock,
  LogOut,
  MapPinned,
  Megaphone,
  MessageSquareText,
  Package,
  Plus,
  RotateCcw,
  Save,
  Search,
  Share2,
  ShieldCheck,
  Type,
  Trash2,
  Unlock,
  UploadCloud,
  UserCog,
  Users,
} from "lucide-react";
import { hasSupabaseConfig, supabase } from "./supabase";
import "./styles.css";

const defaultSettings = {
  id: 1,
  logo_url: "",
  business_name: "restroelaichi",
  tagline: "Multi Cuisine Food | Cafe | Bar | Music | Karaoke",
  primary_color: "#03736e",
  page_background_color: "#f5f7f4",
  card_background_color: "transparent",
  heading_color: "#03736e",
  body_text_color: "#52605c",
  button_color: "#111111",
  button_text_color: "#ffffff",
  icon_color: "#03736e",
  accent_color: "#03736e",
  phone: "",
  whatsapp_url: "",
  email: "",
  google_review_url: "",
  facebook_url: "",
  instagram_url: "",
  tiktok_url: "",
  website_url: "",
  whatsapp_icon_url: "",
  facebook_icon_url: "",
  instagram_icon_url: "",
  tiktok_icon_url: "",
  website_icon_url: "",
  address_text: "Shivachowk, Lalitpur 44700",
  google_maps_url: "",
  map_embed_code: "",
  vcf_file_url: "",
  contact_download_mode: "single",
  star_rating: 5,
  review_text: "Give us your valuable rating...",
  show_logo: true,
  owner_name: "",
  owner_title: "",
  owner_photo_url: "",
  owner_bio: "",
  visiting_card_image_url: "",
  visiting_card_display_mode: "section",
  show_uploaded_card_section: false,
  page_background_image_url: "",
  show_background_image: false,
  business_hours: "",
  show_business_hours_section: false,
  primary_cta_label: "",
  primary_cta_url: "",
  show_primary_cta_section: false,
  show_identity_section: true,
  show_quick_contact_section: true,
  show_visiting_card_section: false,
  show_reviews_section: true,
  show_detail_form_section: true,
  show_social_section: true,
  show_custom_sections: true,
  show_add_contact_button: true,
  show_location_section: true,
  show_visitor_count: true,
  show_offer_popup: true,
  show_chatbot_section: true,
  section_order: [
    "identity",
    "quick_contact",
    "owner_card",
    "reviews",
    "detail_form",
    "social",
    "custom_sections",
    "add_contact",
    "uploaded_card",
    "business_hours",
    "primary_cta",
    "location",
    "visitor_count",
  ],
  text_owner_card_kicker: "Owner Visiting Card",
  text_add_contact_button: "Add to Contact",
  text_google_review_button: "Review us on Google",
  text_location_heading: "Location",
  text_open_maps_button: "Open in Maps",
  text_map_empty: "Map preview appears after adding an embed code.",
  text_visitor_count_label: "Total Visitors",
  text_business_hours_heading: "Business Hours",
  text_offer_kicker: "Offer & Announcement",
  text_share_copy_button: "Copy Link",
  text_share_copied_button: "Copied",
  text_share_button: "Share",
  text_chat_input_placeholder: "Ask anything...",
  text_chat_send_button: "Send",
  text_chat_whatsapp_button: "Continue on WhatsApp",
  text_chat_online_status: "Online now",
  text_chat_paused_status: "Paused",
  text_lead_name_placeholder: "Name",
  text_lead_phone_placeholder: "Phone",
  text_lead_email_placeholder: "Email",
  text_lead_message_placeholder: "Message",
  text_lead_save_button: "Save",
  show_analytics_feature: true,
  show_lead_source_tracking: true,
  auto_followup_enabled: false,
  auto_followup_message: "Hi, thanks for sharing your details. Our team will follow up shortly.",
  crm_integration_enabled: false,
  crm_webhook_url: "",
  offers_countdown_enabled: true,
  text_offer_countdown_label: "Offer ends in",
  text_detail_form_success: "Thanks. Your details are saved.",
  text_detail_form_required: "Please add your name and phone.",
  text_detail_form_title: "Fill your details",
  text_detail_form_subtitle: "Share your contact details so our team can follow up.",
  detail_form_background_color: "#ffffff",
  detail_form_text_color: "#52605c",
  detail_form_button_color: "#111111",
  detail_form_button_text_color: "#ffffff",
  show_detail_form_name: true,
  show_detail_form_phone: true,
  show_detail_form_email: true,
  show_detail_form_message: true,
  detail_form_fields: [],
  admin_module_locks: {},
};

const sectionControls = [
  { id: "identity", label: "Business Identity", setting: "show_identity_section" },
  { id: "quick_contact", label: "Quick Call / WhatsApp / Email", setting: "show_quick_contact_section" },
  { id: "owner_card", label: "Owner Visiting Card", setting: "show_visiting_card_section" },
  { id: "reviews", label: "Reviews Section", setting: "show_reviews_section" },
  { id: "detail_form", label: "Customer Details Form", setting: "show_detail_form_section" },
  { id: "social", label: "Social Links", setting: "show_social_section" },
  { id: "custom_sections", label: "Custom Blocks", setting: "show_custom_sections" },
  { id: "add_contact", label: "Add Contact Button", setting: "show_add_contact_button" },
  { id: "uploaded_card", label: "Uploaded Visiting Card Image", setting: "show_uploaded_card_section" },
  { id: "business_hours", label: "Business Hours", setting: "show_business_hours_section" },
  { id: "primary_cta", label: "Primary CTA Button", setting: "show_primary_cta_section" },
  { id: "location", label: "Location / Map", setting: "show_location_section" },
  { id: "visitor_count", label: "Visitor Counter", setting: "show_visitor_count" },
];

const defaultModuleOrder = [
  "account",
  "admin-locks",
  "brand",
  "contact",
  "social",
  "content",
  "visibility",
  "customer-form",
  "text-labels",
  "analytics-dashboard",
  "follow-up",
  "crm-export",
  "chatbot",
  "chatbot-faqs",
  "chatbot-products",
  "chatbot-leads",
  "review-leads",
];

const socialIconOptions = [
  { value: "globe", label: "Website" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "snapchat", label: "Snapchat" },
  { value: "pinterest", label: "Pinterest" },
  { value: "reddit", label: "Reddit" },
  { value: "threads", label: "Threads" },
  { value: "github", label: "GitHub" },
  { value: "twitch", label: "Twitch" },
  { value: "slack", label: "Slack" },
  { value: "dribbble", label: "Dribbble" },
  { value: "behance", label: "Behance" },
  { value: "figma", label: "Figma" },
  { value: "spotify", label: "Spotify" },
  { value: "podcast", label: "Podcast" },
  { value: "rss", label: "RSS" },
  { value: "store", label: "Store / Shop" },
  { value: "maps", label: "Maps / Location" },
  { value: "calendar", label: "Calendar" },
  { value: "portfolio", label: "Portfolio" },
  { value: "phone", label: "Phone" },
  { value: "mail", label: "Email" },
  { value: "external", label: "External Link" },
];

const detailFormFieldTypes = [
  { value: "text", label: "Text Box" },
  { value: "textarea", label: "Long Text Box" },
  { value: "select", label: "Dropdown" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

function normalizeDetailFormFields(value) {
  return (Array.isArray(value) ? value : []).map((field, index) => ({
    id: field.id || `field-${Date.now()}-${index}`,
    label: field.label || "",
    type: field.type || "text",
    placeholder: field.placeholder || "",
    options: Array.isArray(field.options) ? field.options : String(field.options || "").split("\n").map((item) => item.trim()).filter(Boolean),
    required: Boolean(field.required),
    active: field.active !== false,
    sort_order: Number(field.sort_order || (index + 1) * 10),
  })).sort((a, b) => a.sort_order - b.sort_order);
}

function normalizeModuleOrder(value) {
  const parsed = Array.isArray(value) ? value : defaultModuleOrder;
  return [
    ...parsed.filter((id) => defaultModuleOrder.includes(id)),
    ...defaultModuleOrder.filter((id) => !parsed.includes(id)),
  ];
}

function normalizeSectionOrder(value) {
  const defaultOrder = defaultSettings.section_order;
  const parsed = Array.isArray(value) ? value : defaultOrder;
  return [
    ...parsed.filter((id) => sectionControls.some((section) => section.id === id)),
    ...defaultOrder.filter((id) => !parsed.includes(id)),
  ];
}

function humanizeKey(key) {
  return String(key || "")
    .replace(/^text_/, "")
    .replace(/^show_/, "show ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSettingSearchSection(key) {
  if (key.includes("chat")) return "chatbot";
  if (key.includes("lead") || key.includes("analytics") || key.includes("visitor") || key.includes("countdown")) return "analytics-dashboard";
  if (key.includes("followup") || key.includes("follow_up") || key.includes("auto_followup")) return "follow-up";
  if (key.includes("crm") || key.includes("webhook")) return "crm-export";
  if (key.includes("detail_form")) return "customer-form";
  if (key.startsWith("text_")) return "text-labels";
  if (key.startsWith("show_") || key.includes("section_order")) return "visibility";
  if (key.includes("color") || key.includes("logo") || key.includes("owner") || key.includes("card") || key.includes("background")) return "brand";
  if (key.includes("phone") || key.includes("email") || key.includes("address") || key.includes("map") || key.includes("hours") || key.includes("cta")) return "contact";
  return "brand";
}

const DEFAULT_ADMIN_LOCK_PASSWORD = "1234";

function normalizeAdminModuleLocks(value, modules) {
  const parsed = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return modules.reduce((locks, module) => {
    const current = parsed[module.id] && typeof parsed[module.id] === "object" ? parsed[module.id] : {};
    locks[module.id] = {
      enabled: current.enabled !== false,
      password: String(current.password || DEFAULT_ADMIN_LOCK_PASSWORD),
    };
    return locks;
  }, {});
}

const defaultChatbotSettings = {
  id: 1,
  enabled: true,
  assistant_name: "AI Sales Assistant",
  welcome_message: "Hi, I am your AI assistant. Do you want a quote, support, or more information?",
  lead_prompt: "Share your name, phone, and email so the team can follow up quickly.",
  whatsapp_prompt: "Continue on WhatsApp for the fastest reply.",
  offline_message: "The assistant is paused right now, but you can still leave your details.",
  whatsapp_number: "",
  accent_color: "#03736e",
  heading_color: "#03736e",
  ai_enabled: false,
  ai_api_url: "",
  ai_system_prompt:
    "You are a helpful sales assistant. Answer naturally using only the business knowledge provided. If the answer is uncertain, ask one short follow-up question and offer WhatsApp.",
};

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [developerPopupOpen, setDeveloperPopupOpen] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setMessage("Checking...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("");
    onLogin();
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Sign in</h1>
        </div>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        <button className="primary-button" type="submit">
          Sign in
        </button>
        <button className="link-button" type="button" onClick={() => setDeveloperPopupOpen(true)}>
          Forgot password?
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>

      {developerPopupOpen && (
        <div className="developer-dialog" role="dialog" aria-modal="true" aria-label="Contact developer">
          <section className="developer-panel">
            <button className="developer-close" onClick={() => setDeveloperPopupOpen(false)} type="button" aria-label="Close">
              ×
            </button>
            <div>
              <p className="eyebrow">Password Help</p>
              <h2>Contact Developer</h2>
            </div>
            <p className="form-message">Ask the developer to help reset your admin login.</p>
            <a className="primary-button" href="https://wa.me/9779827305718?text=I%20forgot%20my%20admin%20password.%20Please%20help%20me%20reset%20it.">
              Open WhatsApp
            </a>
          </section>
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false }) {
  return (
    <label>
      {label}
      {textarea ? (
        <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} rows={5} />
      ) : (
        <input value={value || ""} onChange={(event) => onChange(event.target.value)} type={type} />
      )}
    </label>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="toggle-label">
      <input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function UploadField({ label, path, onUploaded, accept, keepLast = 5 }) {
  const [busy, setBusy] = useState(false);

  async function cleanupOldFiles(currentFilePath) {
    if (!keepLast) return;

    const { data, error } = await supabase.storage.from("site-assets").list(path, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error || !data) return;

    const files = data
      .filter((item) => item.name && item.id)
      .map((item) => ({
        name: item.name,
        fullPath: `${path}/${item.name}`,
        createdAt: item.created_at || item.updated_at || item.name,
      }))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    const protectedFiles = new Set(files.slice(0, keepLast).map((file) => file.fullPath));
    protectedFiles.add(currentFilePath);

    const oldFiles = files.filter((file) => !protectedFiles.has(file.fullPath)).map((file) => file.fullPath);

    if (oldFiles.length > 0) {
      await supabase.storage.from("site-assets").remove(oldFiles);
    }
  }

  async function upload(file) {
    if (!file) return;
    setBusy(true);
    const safeName = file.name.replace(/[^a-z0-9.\-_]/gi, "-").toLowerCase();
    const filePath = `${path}/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("site-assets").upload(filePath, file, { upsert: true });
    if (error) {
      alert(error.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);
    onUploaded(data.publicUrl);
    await cleanupOldFiles(filePath);
    setBusy(false);
  }

  return (
    <label className="upload-field">
      <UploadCloud size={18} />
      <span>{busy ? "Uploading..." : label}</span>
      <input type="file" accept={accept} onChange={(event) => upload(event.target.files?.[0])} />
    </label>
  );
}

function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [settings, setSettings] = useState(defaultSettings);
  const [offers, setOffers] = useState([]);
  const [customLinks, setCustomLinks] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [analytics, setAnalytics] = useState(0);
  const [chatbotSettings, setChatbotSettings] = useState(defaultChatbotSettings);
  const [chatbotFaqs, setChatbotFaqs] = useState([]);
  const [chatbotProducts, setChatbotProducts] = useState([]);
  const [chatbotOffers, setChatbotOffers] = useState([]);
  const [chatbotLeads, setChatbotLeads] = useState([]);
  const [reviewDetailLeads, setReviewDetailLeads] = useState([]);
  const [analyticsEvents, setAnalyticsEvents] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [chatbotStatus, setChatbotStatus] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [dashboardArrangeMode, setDashboardArrangeMode] = useState(false);
  const [draggingModuleId, setDraggingModuleId] = useState("");
  const [unlockedAdminModules, setUnlockedAdminModules] = useState({});
  const [lockDialog, setLockDialog] = useState({ moduleId: "", password: "", message: "" });
  const [lockPasswordDrafts, setLockPasswordDrafts] = useState({});
  const [oldLockPasswordDrafts, setOldLockPasswordDrafts] = useState({});
  const [moduleOrder, setModuleOrder] = useState(() => {
    try {
      return normalizeModuleOrder(JSON.parse(localStorage.getItem("adminModuleOrder") || "[]"));
    } catch {
      return defaultModuleOrder;
    }
  });
  const longPressTimer = useRef(null);
  const [accountForm, setAccountForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    image_url: "",
    button_label: "",
    button_url: "",
    active: true,
    starts_at: "",
    expires_at: "",
    show_countdown: true,
  });
  const [newLink, setNewLink] = useState({ label: "", url: "", icon_name: "globe", icon_image_url: "", active: true, sort_order: 100 });
  const [newSection, setNewSection] = useState({
    title: "",
    body: "",
    image_url: "",
    button_label: "",
    button_url: "",
    layout: "card",
    active: true,
    sort_order: 100,
  });
  const [newChatbotFaq, setNewChatbotFaq] = useState({ question: "", answer: "", active: true, sort_order: 100 });
  const [newChatbotProduct, setNewChatbotProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    active: true,
    sort_order: 100,
  });
  const [newChatbotOffer, setNewChatbotOffer] = useState({ title: "", description: "", active: true, sort_order: 100 });
  const [newDetailField, setNewDetailField] = useState({
    label: "",
    type: "text",
    placeholder: "",
    optionsText: "",
    required: false,
    active: true,
    sort_order: 100,
  });

  const previewColor = useMemo(() => settings.primary_color || "#03736e", [settings.primary_color]);
  const orderedSectionIds = useMemo(() => normalizeSectionOrder(settings.section_order), [settings.section_order]);
  const moduleCards = [
    { id: "account", label: "Admin Account", description: "Email and password settings", icon: <UserCog size={28} /> },
    { id: "admin-locks", label: "Admin Locks", description: "Lock toggles and section passwords", icon: <ShieldCheck size={28} /> },
    { id: "brand", label: "Branding", description: "Logo, colors, owner card, backgrounds", icon: <Brush size={28} /> },
    { id: "contact", label: "Contact", description: "Phone, email, map, hours, CTA", icon: <Contact size={28} /> },
    { id: "social", label: "Social", description: "Social links and custom icons", icon: <Share2 size={28} /> },
    { id: "content", label: "Content", description: "Offers and custom page blocks", icon: <Megaphone size={28} /> },
    { id: "visibility", label: "Visibility", description: "Toggles and section ordering", icon: <Eye size={28} /> },
    { id: "customer-form", label: "Customer Form", description: "Fields, colors, submit messages", icon: <Contact size={28} /> },
    { id: "text-labels", label: "Text Labels", description: "Edit every public button and label", icon: <Type size={28} /> },
    { id: "analytics-dashboard", label: "Analytics", description: "Views, clicks, lead sources", icon: <BarChart3 size={28} /> },
    { id: "follow-up", label: "Follow-Up", description: "WhatsApp auto follow-up settings", icon: <MessageSquareText size={28} /> },
    { id: "crm-export", label: "CRM Export", description: "CSV export and webhook integration", icon: <Package size={28} /> },
    { id: "chatbot", label: "AI Chatbot", description: "Assistant settings and AI reply", icon: <Bot size={28} /> },
    { id: "chatbot-faqs", label: "Q&A", description: "Chatbot questions and answers", icon: <MessageSquareText size={28} /> },
    { id: "chatbot-products", label: "Products", description: "Services and offer knowledge", icon: <Package size={28} /> },
    { id: "chatbot-leads", label: "Leads", description: "Captured customer inquiries", icon: <Users size={28} /> },
    { id: "review-leads", label: "Detail Leads", description: "Review area customer details", icon: <Users size={28} /> },
  ];
  const orderedModuleCards = useMemo(
    () => normalizeModuleOrder(moduleOrder).map((id) => moduleCards.find((item) => item.id === id)).filter(Boolean),
    [moduleOrder],
  );
  const activeModule = moduleCards.find((item) => item.id === activeSection);
  const adminModuleLocks = useMemo(
    () => normalizeAdminModuleLocks(settings.admin_module_locks, moduleCards),
    [settings.admin_module_locks],
  );
  const lockedModuleCount = useMemo(
    () => Object.values(adminModuleLocks).filter((lock) => lock.enabled).length,
    [adminModuleLocks],
  );
  const detailFormFields = useMemo(() => normalizeDetailFormFields(settings.detail_form_fields), [settings.detail_form_fields]);
  const searchResults = useMemo(() => {
    const query = dashboardSearch.trim().toLowerCase();
    if (query.length < 2) return [];

    const moduleById = Object.fromEntries(moduleCards.map((item) => [item.id, item]));
    const items = [];
    const addItem = ({ sectionId, type, title, path, excerpt, keywords = [] }) => {
      const section = moduleById[sectionId];
      const sectionLabel = section?.label || "Dashboard";
      const haystack = [sectionLabel, type, title, path, excerpt, ...keywords].filter(Boolean).join(" ").toLowerCase();
      if (!haystack.includes(query)) return;
      items.push({
        id: `${sectionId}-${type}-${title}-${items.length}`,
        sectionId,
        sectionLabel,
        type,
        title,
        path: path || sectionLabel,
        excerpt,
      });
    };

    moduleCards.forEach((module) => {
      addItem({
        sectionId: module.id,
        type: "Module",
        title: module.label,
        path: `Dashboard grid > ${module.label}`,
        excerpt: module.description,
        keywords: [module.id],
      });
    });

    Object.entries(settings).forEach(([key, value]) => {
      const sectionId = getSettingSearchSection(key);
      addItem({
        sectionId,
        type: "Setting",
        title: humanizeKey(key),
        path: `${moduleById[sectionId]?.label || "Settings"} > ${humanizeKey(key)}`,
        excerpt: typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : String(value || "").slice(0, 120),
        keywords: [key],
      });
    });

    offers.forEach((offer) => {
      addItem({
        sectionId: "content",
        type: "Offer",
        title: offer.title || "Untitled offer",
        path: "Content > Offers",
        excerpt: [offer.description, offer.button_label, offer.button_url].filter(Boolean).join(" | "),
        keywords: [offer.active ? "active" : "inactive", offer.starts_at, offer.expires_at],
      });
    });

    customLinks.forEach((link) => {
      addItem({
        sectionId: "social",
        type: "Social Link",
        title: link.label || link.url || "Social link",
        path: "Social > Custom Links",
        excerpt: [link.url, link.icon_name].filter(Boolean).join(" | "),
      });
    });

    customSections.forEach((section) => {
      addItem({
        sectionId: "content",
        type: "Custom Block",
        title: section.title || "Custom block",
        path: "Content > Custom Page Blocks",
        excerpt: [section.body, section.button_label, section.button_url].filter(Boolean).join(" | "),
      });
    });

    detailFormFields.forEach((field) => {
      addItem({
        sectionId: "customer-form",
        type: "Form Field",
        title: field.label || "Custom form field",
        path: "Customer Form > Custom Fields",
        excerpt: [field.type, field.placeholder, field.options?.join(", ")].filter(Boolean).join(" | "),
        keywords: [field.required ? "required" : "optional", field.active ? "active" : "inactive"],
      });
    });

    chatbotFaqs.forEach((faq) => {
      addItem({
        sectionId: "chatbot-faqs",
        type: "Q&A",
        title: faq.question || "Chatbot question",
        path: "Q&A > Chatbot Questions",
        excerpt: faq.answer,
      });
    });

    chatbotProducts.forEach((product) => {
      addItem({
        sectionId: "chatbot-products",
        type: "Product",
        title: product.name || "Product/service",
        path: "Products > Chatbot Knowledge",
        excerpt: [product.category, product.price, product.description].filter(Boolean).join(" | "),
      });
    });

    chatbotOffers.forEach((offer) => {
      addItem({
        sectionId: "chatbot-products",
        type: "Chatbot Offer",
        title: offer.title || "Chatbot offer",
        path: "Products > Chatbot Offers",
        excerpt: offer.description,
      });
    });

    chatbotLeads.forEach((lead) => {
      addItem({
        sectionId: "chatbot-leads",
        type: "AI Lead",
        title: lead.name || lead.phone || "AI lead",
        path: "Leads > AI Leads",
        excerpt: [lead.phone, lead.email, lead.tag, lead.message].filter(Boolean).join(" | "),
      });
    });

    reviewDetailLeads.forEach((lead) => {
      addItem({
        sectionId: "review-leads",
        type: "Detail Lead",
        title: lead.name || lead.phone || "Detail lead",
        path: "Detail Leads > Review Detail Leads",
        excerpt: [lead.phone, lead.email, lead.status, lead.message].filter(Boolean).join(" | "),
      });
    });

    analyticsEvents.forEach((event) => {
      addItem({
        sectionId: "analytics-dashboard",
        type: "Analytics Event",
        title: humanizeKey(event.event_name || "event"),
        path: "Analytics > Events",
        excerpt: [event.source, event.campaign, event.created_at].filter(Boolean).join(" | "),
      });
    });

    return items.slice(0, 18);
  }, [
    dashboardSearch,
    settings,
    offers,
    customLinks,
    customSections,
    detailFormFields,
    chatbotFaqs,
    chatbotProducts,
    chatbotOffers,
    chatbotLeads,
    reviewDetailLeads,
    analyticsEvents,
  ]);

  useEffect(() => {
    loadAll();
    supabase.auth.getUser().then(({ data }) => {
      setAccountForm((current) => ({ ...current, email: data.user?.email || "" }));
    });
  }, []);

  useEffect(() => {
    if (!["crm-export", "chatbot-leads", "review-leads", "analytics-dashboard"].includes(activeSection)) return undefined;
    loadLeadTables();
    const interval = window.setInterval(loadLeadTables, 4000);
    const refreshOnFocus = () => loadLeadTables();
    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", refreshOnFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshOnFocus);
      document.removeEventListener("visibilitychange", refreshOnFocus);
    };
  }, [activeSection]);

  async function loadAll() {
    setDashboardLoading(true);
    const [
      settingsResult,
      offersResult,
      linksResult,
      sectionsResult,
      analyticsResult,
      chatbotSettingsResult,
      chatbotFaqsResult,
      chatbotProductsResult,
      chatbotOffersResult,
      chatbotLeadsResult,
      reviewDetailLeadsResult,
      analyticsEventsResult,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("offers").select("*").order("created_at", { ascending: false }),
      supabase.from("custom_links").select("*").order("sort_order", { ascending: true }),
      supabase.from("custom_sections").select("*").order("sort_order", { ascending: true }),
      supabase.from("analytics").select("visitor_count").eq("id", 1).maybeSingle(),
      supabase.from("chatbot_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("chatbot_faqs").select("*").order("sort_order", { ascending: true }),
      supabase.from("chatbot_products").select("*").order("sort_order", { ascending: true }),
      supabase.from("chatbot_offers").select("*").order("sort_order", { ascending: true }),
      supabase.from("chatbot_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("review_detail_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("analytics_events").select("*").order("created_at", { ascending: false }).limit(500),
    ]);

    if (settingsResult.data) setSettings({ ...defaultSettings, ...settingsResult.data });
    if (offersResult.data) setOffers(offersResult.data);
    if (linksResult.data) setCustomLinks(linksResult.data);
    if (sectionsResult.data) setCustomSections(sectionsResult.data);
    if (analyticsResult.data) setAnalytics(analyticsResult.data.visitor_count || 0);
    if (chatbotSettingsResult.data) setChatbotSettings({ ...defaultChatbotSettings, ...chatbotSettingsResult.data });
    if (chatbotFaqsResult.data) setChatbotFaqs(chatbotFaqsResult.data);
    if (chatbotProductsResult.data) setChatbotProducts(chatbotProductsResult.data);
    if (chatbotOffersResult.data) setChatbotOffers(chatbotOffersResult.data);
    if (chatbotLeadsResult.data) setChatbotLeads(chatbotLeadsResult.data);
    if (reviewDetailLeadsResult.data) setReviewDetailLeads(reviewDetailLeadsResult.data);
    if (analyticsEventsResult.data) setAnalyticsEvents(analyticsEventsResult.data);
    setDashboardLoading(false);
  }

  async function loadLeadTables() {
    const [chatbotLeadsResult, reviewDetailLeadsResult, analyticsEventsResult] = await Promise.all([
      supabase.from("chatbot_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("review_detail_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("analytics_events").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (chatbotLeadsResult.data) setChatbotLeads(chatbotLeadsResult.data);
    if (reviewDetailLeadsResult.data) setReviewDetailLeads(reviewDetailLeadsResult.data);
    if (analyticsEventsResult.data) setAnalyticsEvents(analyticsEventsResult.data);
  }

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function updateAdminModuleLock(moduleId, patch) {
    setSettings((current) => {
      const currentLocks = normalizeAdminModuleLocks(current.admin_module_locks, moduleCards);
      return {
        ...current,
        admin_module_locks: {
          ...currentLocks,
          [moduleId]: {
            ...currentLocks[moduleId],
            ...patch,
          },
        },
      };
    });
  }

  function openAdminModule(moduleId) {
    const lock = adminModuleLocks[moduleId];
    if (lock?.enabled && !unlockedAdminModules[moduleId]) {
      setLockDialog({ moduleId, password: "", message: "" });
      return;
    }
    setActiveSection(moduleId);
  }

  function openSearchResult(result) {
    setDashboardSearch("");
    openAdminModule(result.sectionId);
  }

  function unlockAdminModule(event) {
    event.preventDefault();
    const lock = adminModuleLocks[lockDialog.moduleId];
    if (!lock || lockDialog.password !== lock.password) {
      setLockDialog((current) => ({ ...current, message: "Wrong password." }));
      return;
    }
    setUnlockedAdminModules((current) => ({ ...current, [lockDialog.moduleId]: true }));
    setActiveSection(lockDialog.moduleId);
    setLockDialog({ moduleId: "", password: "", message: "" });
  }

  function saveAdminLockPassword(moduleId) {
    const oldPassword = oldLockPasswordDrafts[moduleId] || "";
    const password = (lockPasswordDrafts[moduleId] || "").trim();
    const currentPassword = adminModuleLocks[moduleId]?.password || DEFAULT_ADMIN_LOCK_PASSWORD;

    if (oldPassword !== currentPassword) {
      setStatus("Old password does not match.");
      return;
    }
    if (!password) {
      setStatus("Add a password first.");
      return;
    }
    updateAdminModuleLock(moduleId, { password });
    setLockPasswordDrafts((current) => ({ ...current, [moduleId]: "" }));
    setOldLockPasswordDrafts((current) => ({ ...current, [moduleId]: "" }));
    setUnlockedAdminModules((current) => ({ ...current, [moduleId]: true }));
    setStatus("Password updated. Save settings to keep it.");
  }

  function addDetailFormField() {
    if (!newDetailField.label.trim()) {
      setStatus("Add a field label first.");
      return;
    }
    const nextField = {
      id: `field-${Date.now()}`,
      label: newDetailField.label.trim(),
      type: newDetailField.type,
      placeholder: newDetailField.placeholder.trim() || newDetailField.label.trim(),
      options: newDetailField.optionsText.split("\n").map((item) => item.trim()).filter(Boolean),
      required: newDetailField.required,
      active: newDetailField.active,
      sort_order: Number(newDetailField.sort_order || 100),
    };
    updateSetting("detail_form_fields", [...detailFormFields, nextField]);
    setNewDetailField({ label: "", type: "text", placeholder: "", optionsText: "", required: false, active: true, sort_order: 100 });
    setStatus("Field added. Save form to keep it.");
  }

  function updateDetailFormField(fieldId, patch) {
    updateSetting(
      "detail_form_fields",
      detailFormFields.map((field) => (field.id === fieldId ? { ...field, ...patch } : field)),
    );
  }

  function deleteDetailFormField(fieldId) {
    updateSetting("detail_form_fields", detailFormFields.filter((field) => field.id !== fieldId));
  }

  function moveSection(sectionId, direction) {
    setSettings((current) => {
      const order = normalizeSectionOrder(current.section_order);
      const index = order.indexOf(sectionId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return current;
      const nextOrder = [...order];
      [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
      return { ...current, section_order: nextOrder };
    });
  }

  function saveModuleOrder(nextOrder) {
    const normalized = normalizeModuleOrder(nextOrder);
    setModuleOrder(normalized);
    localStorage.setItem("adminModuleOrder", JSON.stringify(normalized));
  }

  function moveModule(moduleId, direction) {
    const order = normalizeModuleOrder(moduleOrder);
    const index = order.indexOf(moduleId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
    const nextOrder = [...order];
    [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
    saveModuleOrder(nextOrder);
  }

  function startDashboardLongPress() {
    window.clearTimeout(longPressTimer.current);
    longPressTimer.current = window.setTimeout(() => {
      setDashboardArrangeMode(true);
    }, 5000);
  }

  function cancelDashboardLongPress() {
    window.clearTimeout(longPressTimer.current);
  }

  function dropModule(targetId) {
    if (!draggingModuleId || draggingModuleId === targetId) return;
    const order = normalizeModuleOrder(moduleOrder);
    const fromIndex = order.indexOf(draggingModuleId);
    const toIndex = order.indexOf(targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const nextOrder = [...order];
    const [moved] = nextOrder.splice(fromIndex, 1);
    nextOrder.splice(toIndex, 0, moved);
    saveModuleOrder(nextOrder);
    setDraggingModuleId("");
  }

  async function saveSettings() {
    setStatus("Saving...");
    const { error } = await supabase.from("site_settings").upsert(settings).eq("id", 1);
    setStatus(error ? error.message : "Saved.");
  }

  function updateChatbotSetting(key, value) {
    setChatbotSettings((current) => ({ ...current, [key]: value }));
  }

  async function saveChatbotSettings() {
    setChatbotStatus("Saving...");
    const payload = {
      enabled: chatbotSettings.enabled,
      assistant_name: chatbotSettings.assistant_name,
      welcome_message: chatbotSettings.welcome_message,
      lead_prompt: chatbotSettings.lead_prompt,
      whatsapp_prompt: chatbotSettings.whatsapp_prompt,
      offline_message: chatbotSettings.offline_message,
      whatsapp_number: chatbotSettings.whatsapp_number,
      accent_color: chatbotSettings.accent_color,
      heading_color: chatbotSettings.heading_color,
      ai_enabled: chatbotSettings.ai_enabled,
      ai_api_url: chatbotSettings.ai_api_url,
      ai_system_prompt: chatbotSettings.ai_system_prompt,
    };
    const { data, error } = await supabase
      .from("chatbot_settings")
      .update(payload)
      .eq("id", 1)
      .select()
      .maybeSingle();
    if (error) {
      setChatbotStatus(error.message);
      return;
    }
    if (data) setChatbotSettings({ ...defaultChatbotSettings, ...data });
    setChatbotStatus(data ? "Chatbot saved." : "Chatbot settings row missing. Run migration 006 again.");
  }

  async function addChatbotFaq() {
    if (!newChatbotFaq.question.trim() || !newChatbotFaq.answer.trim()) return;
    const { error } = await supabase.from("chatbot_faqs").insert(newChatbotFaq);
    if (error) {
      alert(error.message);
      return;
    }
    setNewChatbotFaq({ question: "", answer: "", active: true, sort_order: 100 });
    loadAll();
  }

  async function updateChatbotFaq(id, patch) {
    setChatbotFaqs((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    const { error } = await supabase.from("chatbot_faqs").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteChatbotFaq(id) {
    const { error } = await supabase.from("chatbot_faqs").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setChatbotFaqs((current) => current.filter((item) => item.id !== id));
  }

  async function addChatbotProduct() {
    if (!newChatbotProduct.name.trim()) return;
    const { error } = await supabase.from("chatbot_products").insert(newChatbotProduct);
    if (error) {
      alert(error.message);
      return;
    }
    setNewChatbotProduct({ name: "", category: "", price: "", description: "", active: true, sort_order: 100 });
    loadAll();
  }

  async function updateChatbotProduct(id, patch) {
    setChatbotProducts((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    const { error } = await supabase.from("chatbot_products").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteChatbotProduct(id) {
    const { error } = await supabase.from("chatbot_products").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setChatbotProducts((current) => current.filter((item) => item.id !== id));
  }

  async function addChatbotOffer() {
    if (!newChatbotOffer.title.trim()) return;
    const { error } = await supabase.from("chatbot_offers").insert(newChatbotOffer);
    if (error) {
      alert(error.message);
      return;
    }
    setNewChatbotOffer({ title: "", description: "", active: true, sort_order: 100 });
    loadAll();
  }

  async function updateChatbotOffer(id, patch) {
    setChatbotOffers((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    const { error } = await supabase.from("chatbot_offers").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteChatbotOffer(id) {
    const { error } = await supabase.from("chatbot_offers").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setChatbotOffers((current) => current.filter((item) => item.id !== id));
  }

  async function addOffer() {
    if (!newOffer.title.trim()) return;
    const { error } = await supabase.from("offers").insert(newOffer);
    if (error) {
      alert(error.message);
      return;
    }
    setNewOffer({ title: "", description: "", image_url: "", button_label: "", button_url: "", active: true, starts_at: "", expires_at: "", show_countdown: true });
    loadAll();
  }

  async function updateOffer(id, patch) {
    const nextOffers = offers.map((offer) => (offer.id === id ? { ...offer, ...patch } : offer));
    setOffers(nextOffers);
    const { error } = await supabase.from("offers").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteOffer(id) {
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setOffers((current) => current.filter((offer) => offer.id !== id));
  }

  async function addLink() {
    if (!newLink.label.trim() || !newLink.url.trim()) return;
    const { error } = await supabase.from("custom_links").insert(newLink);
    if (error) {
      alert(error.message);
      return;
    }
    setNewLink({ label: "", url: "", icon_name: "globe", icon_image_url: "", active: true, sort_order: 100 });
    loadAll();
  }

  async function updateLink(id, patch) {
    setCustomLinks((current) => current.map((link) => (link.id === id ? { ...link, ...patch } : link)));
    const { error } = await supabase.from("custom_links").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteLink(id) {
    const { error } = await supabase.from("custom_links").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setCustomLinks((current) => current.filter((link) => link.id !== id));
  }

  async function addSection() {
    if (!newSection.title.trim() && !newSection.body.trim() && !newSection.image_url) return;
    const { error } = await supabase.from("custom_sections").insert(newSection);
    if (error) {
      alert(error.message);
      return;
    }
    setNewSection({
      title: "",
      body: "",
      image_url: "",
      button_label: "",
      button_url: "",
      layout: "card",
      active: true,
      sort_order: 100,
    });
    loadAll();
  }

  async function updateSection(id, patch) {
    setCustomSections((current) => current.map((section) => (section.id === id ? { ...section, ...patch } : section)));
    const { error } = await supabase.from("custom_sections").update(patch).eq("id", id);
    if (error) alert(error.message);
  }

  async function deleteSection(id) {
    const { error } = await supabase.from("custom_sections").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setCustomSections((current) => current.filter((section) => section.id !== id));
  }

  async function resetVisitorCount() {
    const confirmed = window.confirm("Reset visitor count to 0?");
    if (!confirmed) return;

    setStatus("Resetting visitors...");
    const { error } = await supabase.from("analytics").update({ visitor_count: 0 }).eq("id", 1);
    if (error) {
      setStatus(error.message);
      return;
    }
    setAnalytics(0);
    setStatus("Visitor count reset.");
  }

  async function resetTableData({ table, label, onReset, statusSetter = setStatus }) {
    const confirmed = window.confirm(`Reset all ${label}? This cannot be undone.`);
    if (!confirmed) return;

    statusSetter(`Resetting ${label}...`);
    const { error } = await supabase.from(table).delete().not("id", "is", null);
    if (error) {
      statusSetter(error.message);
      return;
    }
    onReset();
    statusSetter(`${label} reset.`);
  }

  async function resetAnalyticsEvent(eventName) {
    const label = eventName.replace(/_/g, " ");
    const confirmed = window.confirm(`Reset ${label} count? This will delete only this analytics event type.`);
    if (!confirmed) return;

    setStatus(`Resetting ${label}...`);
    const { error } = await supabase.from("analytics_events").delete().eq("event_name", eventName);
    if (error) {
      setStatus(error.message);
      return;
    }
    setAnalyticsEvents((current) => current.filter((event) => event.event_name !== eventName));
    setStatus(`${label} reset.`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  async function updateAdminAccount(event) {
    event.preventDefault();
    setAccountStatus("Updating...");

    if (accountForm.password && accountForm.password !== accountForm.confirmPassword) {
      setAccountStatus("Passwords do not match.");
      return;
    }

    const updates = {};
    if (accountForm.email.trim()) updates.email = accountForm.email.trim();
    if (accountForm.password) updates.password = accountForm.password;

    if (!updates.email && !updates.password) {
      setAccountStatus("Add an email or password first.");
      return;
    }

    const redirectTo = window.location.href.split("#")[0].split("?")[0];
    const { error } = await supabase.auth.updateUser(updates, {
      emailRedirectTo: redirectTo,
    });

    if (error) {
      setAccountStatus(error.message);
      return;
    }

    setAccountForm((current) => ({ ...current, password: "", confirmPassword: "" }));
    setAccountStatus(
      updates.email
        ? "Updated."
        : "Password updated.",
    );
  }

  function downloadCsv(filename, rows, headers) {
    const csvRows = rows.map((row) =>
      headers
        .map((key) => `"${String(row[key] || "").replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[headers.join(","), ...csvRows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function escapeExportHtml(value) {
    return String(value ?? "").replace(/[<>&"']/g, (char) => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "\"": "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function exportRowsPdf(title, rows, headers) {
    const htmlRows = rows
      .map((row) => `<tr>${headers.map((key) => `<td>${escapeExportHtml(row[key])}</td>`).join("")}</tr>`)
      .join("");
    const iframe = document.createElement("iframe");
    iframe.title = `${title} PDF export`;
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${escapeExportHtml(title)}</title>
          <style>
            @page { size: A4 landscape; margin: 12mm; }
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; margin: 0; color: #16211f; }
            h1 { font-size: 22px; margin: 0 0 6px; }
            .export-meta { margin: 0 0 16px; color: #64726f; font-size: 11px; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 10px; }
            th, td { border: 1px solid #c9d8d5; padding: 7px; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
            th { background: #03736e; color: #fff; font-size: 10px; text-transform: capitalize; }
            tr { break-inside: avoid; page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <h1>${escapeExportHtml(title)}</h1>
          <p class="export-meta">Generated ${escapeExportHtml(new Date().toLocaleString())}</p>
          <table>
            <thead><tr>${headers.map((key) => `<th>${escapeExportHtml(key.replace(/_/g, " "))}</th>`).join("")}</tr></thead>
            <tbody>${htmlRows || `<tr><td colspan="${headers.length}">No records</td></tr>`}</tbody>
          </table>
        </body>
      </html>`;

    iframe.onload = () => {
      const printWindow = iframe.contentWindow;
      if (!printWindow) return;
      printWindow.focus();
      printWindow.print();
      window.setTimeout(() => iframe.remove(), 1000);
    };

    document.body.appendChild(iframe);
    iframe.srcdoc = html;
  }

  async function exportLeadsCsv() {
    const leads = (await getFreshLeadRows()).map(formatLeadExportRow);
    const headers = ["lead_type", "name", "phone", "email", "message", "extra_fields", "tag", "status", "utm_source", "utm_medium", "utm_campaign", "referrer", "page_url", "created_at"];
    downloadCsv(`leads-${new Date().toISOString().slice(0, 10)}.csv`, leads, headers);
  }

  function formatLeadExportRow(lead) {
    const extraFields = lead.extra_fields && typeof lead.extra_fields === "object"
      ? Object.entries(lead.extra_fields).map(([key, value]) => `${key}: ${value}`).join(" | ")
      : "";
    return { ...lead, extra_fields: extraFields };
  }

  function getAllLeadRows() {
    return [
      ...reviewDetailLeads.map((lead) => ({ ...lead, lead_type: "review_details" })),
      ...chatbotLeads.map((lead) => ({ ...lead, lead_type: "chatbot" })),
    ];
  }

  function getFollowUpHref(phone) {
    const number = String(phone || "").replace(/[^\d]/g, "");
    if (!number) return "";
    const message = settings.auto_followup_message || defaultSettings.auto_followup_message;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  async function getFreshLeadRows() {
    const [reviewDetailLeadsResult, chatbotLeadsResult] = await Promise.all([
      supabase.from("review_detail_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("chatbot_leads").select("*").order("created_at", { ascending: false }),
    ]);
    const freshReviewLeads = reviewDetailLeadsResult.data || reviewDetailLeads;
    const freshChatbotLeads = chatbotLeadsResult.data || chatbotLeads;
    setReviewDetailLeads(freshReviewLeads);
    setChatbotLeads(freshChatbotLeads);
    return [
      ...freshReviewLeads.map((lead) => ({ ...lead, lead_type: "review_details" })),
      ...freshChatbotLeads.map((lead) => ({ ...lead, lead_type: "chatbot" })),
    ];
  }

  function exportLeadGroupCsv(type, leads) {
    const headers = ["name", "phone", "email", "message", "extra_fields", "tag", "status", "utm_source", "utm_medium", "utm_campaign", "referrer", "page_url", "created_at"];
    downloadCsv(`${type}-${new Date().toISOString().slice(0, 10)}.csv`, leads.map(formatLeadExportRow), headers);
  }

  function exportLeadGroupPdf(title, leads) {
    const headers = ["name", "phone", "email", "message", "extra_fields", "tag", "status", "utm_source", "utm_medium", "utm_campaign", "created_at"];
    exportRowsPdf(title, leads.map(formatLeadExportRow), headers);
  }

  const analyticsSummary = useMemo(() => {
    const counts = analyticsEvents.reduce((acc, event) => {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [analyticsEvents]);

  const sourceSummary = useMemo(() => {
    const leads = [...reviewDetailLeads, ...chatbotLeads];
    const counts = leads.reduce((acc, lead) => {
      const source = lead.utm_source || (lead.referrer ? "referral" : "direct");
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
  }, [reviewDetailLeads, chatbotLeads]);

  if (dashboardLoading) {
    return <main className="loading-screen">Loading dashboard...</main>;
  }

  return (
    <main className="admin-shell" style={{ "--brand": previewColor }}>
      <header className="topbar">
        <div>
          <p className="eyebrow">Digital Business Card</p>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="topbar-actions">
          <div className="dashboard-search">
            <Search size={18} />
            <input
              aria-label="Search dashboard"
              placeholder="Search anything..."
              value={dashboardSearch}
              onChange={(event) => setDashboardSearch(event.target.value)}
            />
            {dashboardSearch && (
              <button className="search-clear-button" onClick={() => setDashboardSearch("")} type="button" aria-label="Clear search">
                x
              </button>
            )}
            {dashboardSearch.trim().length >= 2 && (
              <div className="dashboard-search-results">
                <div className="search-results-head">
                  <span>{searchResults.length ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}` : "No matches"}</span>
                  <small>Module, grid, field, lead, offer</small>
                </div>
                {searchResults.map((result) => (
                  <button key={result.id} onClick={() => openSearchResult(result)} type="button">
                    <span className="search-result-type">{result.type}</span>
                    <strong>{result.title}</strong>
                    <small>{result.path}</small>
                    {result.excerpt && <em>{result.excerpt}</em>}
                  </button>
                ))}
                {searchResults.length === 0 && (
                  <p>Try a field name, phone, offer title, lead source, button label, or module name.</p>
                )}
              </div>
            )}
          </div>
          <button className="ghost-button" onClick={signOut} type="button">
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </header>

      <section className="dashboard-section" hidden={activeSection !== "overview"}>
        <div className="dashboard-arrange-bar">
          <span>{dashboardArrangeMode ? "Arrange mode is on. Drag tiles or use arrows." : "Hold any tile for 5 seconds to arrange dashboard."}</span>
          {dashboardArrangeMode && (
            <button className="ghost-button" onClick={() => setDashboardArrangeMode(false)} type="button">
              Done
            </button>
          )}
        </div>
        <div className={dashboardArrangeMode ? "module-launcher arranging" : "module-launcher"} aria-label="Admin modules">
          {orderedModuleCards.map((item, index) => (
            <article
              className={draggingModuleId === item.id ? "module-tile dragging" : "module-tile"}
              draggable={dashboardArrangeMode}
              key={item.id}
              onDragStart={() => setDraggingModuleId(item.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => dropModule(item.id)}
              onPointerDown={startDashboardLongPress}
              onPointerLeave={cancelDashboardLongPress}
              onPointerUp={cancelDashboardLongPress}
            >
              <button
                onClick={() => {
                  if (!dashboardArrangeMode) openAdminModule(item.id);
                }}
                type="button"
              >
                {adminModuleLocks[item.id]?.enabled && (
                  <span className="module-lock-badge" aria-label={`${item.label} is locked`}>
                    {unlockedAdminModules[item.id] ? <Unlock size={14} /> : <Lock size={14} />}
                  </span>
                )}
                <span className="module-icon">{item.icon}</span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </button>
              {dashboardArrangeMode && (
                <div className="module-arrange-actions">
                  <button className="ghost-button" onClick={() => moveModule(item.id, -1)} type="button" disabled={index === 0} aria-label={`Move ${item.label} earlier`}>
                    <ChevronUp size={16} />
                  </button>
                  <button className="ghost-button" onClick={() => moveModule(item.id, 1)} type="button" disabled={index === orderedModuleCards.length - 1} aria-label={`Move ${item.label} later`}>
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {lockDialog.moduleId && (
        <div className="developer-dialog" role="dialog" aria-modal="true" aria-label="Unlock admin module">
          <form className="developer-panel" onSubmit={unlockAdminModule}>
            <button
              className="developer-close"
              onClick={() => setLockDialog({ moduleId: "", password: "", message: "" })}
              type="button"
              aria-label="Close"
            >
              x
            </button>
            <div>
              <p className="eyebrow">Admin Lock</p>
              <h2>
                <Lock size={20} />
                {moduleCards.find((item) => item.id === lockDialog.moduleId)?.label || "Locked Section"}
              </h2>
            </div>
            <label>
              Section Password
              <input
                autoFocus
                type="password"
                value={lockDialog.password}
                onChange={(event) => setLockDialog((current) => ({ ...current, password: event.target.value, message: "" }))}
              />
            </label>
            <button className="primary-button" type="submit">
              <Unlock size={18} />
              Unlock
            </button>
            {lockDialog.message && <p className="form-message">{lockDialog.message}</p>}
          </form>
        </div>
      )}

      {activeSection !== "overview" && activeModule && (
        <section className="module-detail-bar">
          <button className="ghost-button" onClick={() => setActiveSection("overview")} type="button">
            <ArrowLeft size={18} />
            Dashboard
          </button>
          <div>
            <p className="eyebrow">Manage Feature</p>
            <h2>{activeModule.icon}{activeModule.label}</h2>
          </div>
        </section>
      )}

      <section className="stats-band dashboard-section" hidden>
        <div>
          <span>Total Visitors</span>
          <strong>{analytics.toLocaleString()}</strong>
        </div>
        <div>
          <span>Active Offers</span>
          <strong>{offers.filter((offer) => offer.active).length}</strong>
        </div>
        <div>
          <span>Custom Items</span>
          <strong>{customLinks.length + customSections.length}</strong>
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "account"}>
        <div className="panel-heading">
          <h2><UserCog size={20} /> Admin Account</h2>
        </div>
        <form className="form-grid" onSubmit={updateAdminAccount}>
          <Field
            label="Admin Email"
            type="email"
            value={accountForm.email}
            onChange={(value) => setAccountForm((current) => ({ ...current, email: value }))}
          />
          <Field
            label="New Password"
            type="password"
            value={accountForm.password}
            onChange={(value) => setAccountForm((current) => ({ ...current, password: value }))}
          />
          <Field
            label="Confirm New Password"
            type="password"
            value={accountForm.confirmPassword}
            onChange={(value) => setAccountForm((current) => ({ ...current, confirmPassword: value }))}
          />
          <label className="form-action-label">
            Save Login Details
            <button className="primary-button" type="submit">
              <Save size={18} />
              Update Account
            </button>
          </label>
        </form>
        {accountStatus && <p className="form-message">{accountStatus}</p>}
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "admin-locks"}>
        <div className="panel-heading">
          <h2><ShieldCheck size={20} /> Admin Locks</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Locks
          </button>
        </div>
        <p className="form-message">
          Lock any admin module with its own password. Default password is {DEFAULT_ADMIN_LOCK_PASSWORD}; change it before sharing the panel.
        </p>
        <div className="admin-lock-grid">
          {moduleCards.map((module) => {
            const lock = adminModuleLocks[module.id] || { enabled: true, password: DEFAULT_ADMIN_LOCK_PASSWORD };
            return (
              <article className="admin-lock-card" key={module.id}>
                <div className="admin-lock-title">
                  <span className="module-icon">{module.icon}</span>
                  <div>
                    <strong>{module.label}</strong>
                    <small>{lock.enabled ? "Password required" : "Open without password"}</small>
                  </div>
                </div>
                <ToggleField
                  label="Admin Lock"
                  checked={lock.enabled}
                  onChange={(value) => updateAdminModuleLock(module.id, { enabled: value })}
                />
                <div className="admin-lock-password">
                  <Field
                    label="Old Password"
                    type="password"
                    value={oldLockPasswordDrafts[module.id] || ""}
                    onChange={(value) => setOldLockPasswordDrafts((current) => ({ ...current, [module.id]: value }))}
                  />
                  <Field
                    label="New Password"
                    type="password"
                    value={lockPasswordDrafts[module.id] || ""}
                    onChange={(value) => setLockPasswordDrafts((current) => ({ ...current, [module.id]: value }))}
                  />
                  <button className="ghost-button" onClick={() => saveAdminLockPassword(module.id)} type="button">
                    <Save size={16} />
                    Set
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="stats-band compact-stats">
          <div>
            <span>Locked Modules</span>
            <strong>{lockedModuleCount}</strong>
          </div>
          <div>
            <span>Unlocked This Session</span>
            <strong>{Object.keys(unlockedAdminModules).length}</strong>
          </div>
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "brand"}>
        <div className="panel-heading">
          <h2><ImagePlus size={20} /> Branding Setup</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Settings
          </button>
        </div>
        <div className="form-grid">
          <div className="logo-preview">
            {settings.logo_url ? <img src={settings.logo_url} alt="" /> : <ImagePlus size={34} />}
            <UploadField label="Upload Logo" path="logos" accept="image/*" onUploaded={(url) => updateSetting("logo_url", url)} />
          </div>
          <Field label="Business Name" value={settings.business_name} onChange={(value) => updateSetting("business_name", value)} />
          <Field label="Tagline / Services" value={settings.tagline} onChange={(value) => updateSetting("tagline", value)} />
          <Field label="Primary Brand Color" type="color" value={settings.primary_color} onChange={(value) => updateSetting("primary_color", value)} />
          <Field label="Review Text" value={settings.review_text} onChange={(value) => updateSetting("review_text", value)} />
          <Field label="Star Rating" type="number" value={settings.star_rating} onChange={(value) => updateSetting("star_rating", value)} />
          <ToggleField label="Show Logo" checked={settings.show_logo} onChange={(value) => updateSetting("show_logo", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "brand"}>
        <div className="panel-heading">
          <h2><Contact size={20} /> Owner Visiting Card</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Card
          </button>
        </div>
        <div className="form-grid">
          <div className="logo-preview">
            {settings.owner_photo_url ? <img src={settings.owner_photo_url} alt="" /> : <Contact size={34} />}
            <UploadField label="Upload Owner Photo" path="owner-card" accept="image/*" onUploaded={(url) => updateSetting("owner_photo_url", url)} />
          </div>
          <Field label="Owner Name" value={settings.owner_name} onChange={(value) => updateSetting("owner_name", value)} />
          <Field label="Owner Title / Role" value={settings.owner_title} onChange={(value) => updateSetting("owner_title", value)} />
          <Field label="Owner Short Bio" textarea value={settings.owner_bio} onChange={(value) => updateSetting("owner_bio", value)} />
          <ToggleField label="Show Owner Visiting Card" checked={settings.show_visiting_card_section} onChange={(value) => updateSetting("show_visiting_card_section", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "brand"}>
        <div className="panel-heading">
          <h2><ImagePlus size={20} /> Uploaded Visiting Card Image</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Image Card
          </button>
        </div>
        <div className="form-grid">
          <div className="logo-preview card-preview">
            {settings.visiting_card_image_url ? <img src={settings.visiting_card_image_url} alt="" /> : <ImagePlus size={34} />}
            <UploadField label="Upload Visiting Card Picture" path="visiting-card" accept="image/*" onUploaded={(url) => updateSetting("visiting_card_image_url", url)} />
          </div>
          <label>
            Card Display Option
            <select value={settings.visiting_card_display_mode || "section"} onChange={(event) => updateSetting("visiting_card_display_mode", event.target.value)}>
              <option value="section">Show before map</option>
              <option value="background">Use as full background</option>
            </select>
          </label>
          <ToggleField label="Show Uploaded Visiting Card" checked={settings.show_uploaded_card_section} onChange={(value) => updateSetting("show_uploaded_card_section", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "brand"}>
        <h2><Brush size={20} /> Visual Colors</h2>
        <div className="form-grid color-grid">
          <Field label="Page Background" type="color" value={settings.page_background_color} onChange={(value) => updateSetting("page_background_color", value)} />
          <Field label="Card Background" value={settings.card_background_color} onChange={(value) => updateSetting("card_background_color", value)} />
          <div className="logo-preview card-preview">
            {settings.page_background_image_url ? <img src={settings.page_background_image_url} alt="" /> : <ImagePlus size={34} />}
            <UploadField label="Upload Page Background Image" path="backgrounds" accept="image/*" onUploaded={(url) => updateSetting("page_background_image_url", url)} />
          </div>
          <Field label="Heading Text" type="color" value={settings.heading_color} onChange={(value) => updateSetting("heading_color", value)} />
          <Field label="Body Text" type="color" value={settings.body_text_color} onChange={(value) => updateSetting("body_text_color", value)} />
          <Field label="Button Background" type="color" value={settings.button_color} onChange={(value) => updateSetting("button_color", value)} />
          <Field label="Button Text" type="color" value={settings.button_text_color} onChange={(value) => updateSetting("button_text_color", value)} />
          <Field label="Icon Color" type="color" value={settings.icon_color} onChange={(value) => updateSetting("icon_color", value)} />
          <Field label="Accent / Link Color" type="color" value={settings.accent_color} onChange={(value) => updateSetting("accent_color", value)} />
          <ToggleField label="Use Background Image" checked={settings.show_background_image} onChange={(value) => updateSetting("show_background_image", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "visibility"}>
        <div className="panel-heading">
          <h2><Eye size={20} /> Page Visibility</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Visibility
          </button>
        </div>
        <div className="visibility-grid">
          <ToggleField label="Offer Popup" checked={settings.show_offer_popup} onChange={(value) => updateSetting("show_offer_popup", value)} />
          <ToggleField label="AI Chatbot Button" checked={settings.show_chatbot_section} onChange={(value) => updateSetting("show_chatbot_section", value)} />
          <ToggleField label="Logo" checked={settings.show_logo} onChange={(value) => updateSetting("show_logo", value)} />
          <ToggleField label="Background Image" checked={settings.show_background_image} onChange={(value) => updateSetting("show_background_image", value)} />
        </div>
        <div className="section-order-list">
          {orderedSectionIds.map((sectionId, index) => {
            const section = sectionControls.find((item) => item.id === sectionId);
            if (!section) return null;
            return (
              <article className="section-order-row" key={section.id}>
                <span>{index + 1}</span>
                <ToggleField label={section.label} checked={settings[section.setting]} onChange={(value) => updateSetting(section.setting, value)} />
                <div className="order-actions">
                  <button className="ghost-button" onClick={() => moveSection(section.id, -1)} type="button" aria-label={`Move ${section.label} up`} disabled={index === 0}>
                    <ChevronUp size={16} />
                  </button>
                  <button className="ghost-button" onClick={() => moveSection(section.id, 1)} type="button" aria-label={`Move ${section.label} down`} disabled={index === orderedSectionIds.length - 1}>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "text-labels"}>
        <div className="panel-heading">
          <h2><Type size={20} /> Public Text Labels</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Text
          </button>
        </div>
        <div className="form-grid">
          <Field label="Owner Card Label" value={settings.text_owner_card_kicker} onChange={(value) => updateSetting("text_owner_card_kicker", value)} />
          <Field label="Add Contact Button" value={settings.text_add_contact_button} onChange={(value) => updateSetting("text_add_contact_button", value)} />
          <Field label="Google Review Button" value={settings.text_google_review_button} onChange={(value) => updateSetting("text_google_review_button", value)} />
          <Field label="Location Heading" value={settings.text_location_heading} onChange={(value) => updateSetting("text_location_heading", value)} />
          <Field label="Open Maps Button" value={settings.text_open_maps_button} onChange={(value) => updateSetting("text_open_maps_button", value)} />
          <Field label="Map Empty Text" value={settings.text_map_empty} onChange={(value) => updateSetting("text_map_empty", value)} />
          <Field label="Visitor Count Label" value={settings.text_visitor_count_label} onChange={(value) => updateSetting("text_visitor_count_label", value)} />
          <Field label="Business Hours Heading" value={settings.text_business_hours_heading} onChange={(value) => updateSetting("text_business_hours_heading", value)} />
          <Field label="Offer Popup Label" value={settings.text_offer_kicker} onChange={(value) => updateSetting("text_offer_kicker", value)} />
          <Field label="Offer Countdown Label" value={settings.text_offer_countdown_label} onChange={(value) => updateSetting("text_offer_countdown_label", value)} />
          <Field label="Details Form Success" value={settings.text_detail_form_success} onChange={(value) => updateSetting("text_detail_form_success", value)} />
          <Field label="Details Form Required" value={settings.text_detail_form_required} onChange={(value) => updateSetting("text_detail_form_required", value)} />
          <Field label="Share Copy Button" value={settings.text_share_copy_button} onChange={(value) => updateSetting("text_share_copy_button", value)} />
          <Field label="Share Copied Button" value={settings.text_share_copied_button} onChange={(value) => updateSetting("text_share_copied_button", value)} />
          <Field label="Native Share Button" value={settings.text_share_button} onChange={(value) => updateSetting("text_share_button", value)} />
          <Field label="Chat Input Placeholder" value={settings.text_chat_input_placeholder} onChange={(value) => updateSetting("text_chat_input_placeholder", value)} />
          <Field label="Chat Send Button" value={settings.text_chat_send_button} onChange={(value) => updateSetting("text_chat_send_button", value)} />
          <Field label="Chat WhatsApp Button" value={settings.text_chat_whatsapp_button} onChange={(value) => updateSetting("text_chat_whatsapp_button", value)} />
          <Field label="Chat Online Status" value={settings.text_chat_online_status} onChange={(value) => updateSetting("text_chat_online_status", value)} />
          <Field label="Chat Paused Status" value={settings.text_chat_paused_status} onChange={(value) => updateSetting("text_chat_paused_status", value)} />
          <Field label="Lead Name Placeholder" value={settings.text_lead_name_placeholder} onChange={(value) => updateSetting("text_lead_name_placeholder", value)} />
          <Field label="Lead Phone Placeholder" value={settings.text_lead_phone_placeholder} onChange={(value) => updateSetting("text_lead_phone_placeholder", value)} />
          <Field label="Lead Email Placeholder" value={settings.text_lead_email_placeholder} onChange={(value) => updateSetting("text_lead_email_placeholder", value)} />
          <Field label="Lead Message Placeholder" value={settings.text_lead_message_placeholder} onChange={(value) => updateSetting("text_lead_message_placeholder", value)} />
          <Field label="Lead Save Button" value={settings.text_lead_save_button} onChange={(value) => updateSetting("text_lead_save_button", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "customer-form"}>
        <div className="panel-heading">
          <h2><Contact size={20} /> Customer Details Form</h2>
          <div className="panel-actions">
            <button className="ghost-button" onClick={() => exportLeadGroupCsv("detail-leads", reviewDetailLeads)} type="button">Export Excel</button>
            <button className="ghost-button" onClick={() => exportLeadGroupPdf("Review Detail Leads", reviewDetailLeads)} type="button">Export PDF</button>
            <button className="danger-text-button" onClick={() => { if (window.confirm("Reset custom form fields? Existing leads will stay saved.")) updateSetting("detail_form_fields", []); }} type="button">Reset Fields</button>
            <button className="primary-button" onClick={saveSettings} type="button">
              <Save size={18} />
              Save Form
            </button>
          </div>
        </div>
        <div className="form-grid">
          <ToggleField label="Show Customer Form" checked={settings.show_detail_form_section} onChange={(value) => updateSetting("show_detail_form_section", value)} />
          <Field label="Form Title" value={settings.text_detail_form_title} onChange={(value) => updateSetting("text_detail_form_title", value)} />
          <Field label="Form Subtitle" textarea value={settings.text_detail_form_subtitle} onChange={(value) => updateSetting("text_detail_form_subtitle", value)} />
          <Field label="Name Placeholder" value={settings.text_lead_name_placeholder} onChange={(value) => updateSetting("text_lead_name_placeholder", value)} />
          <Field label="Phone Placeholder" value={settings.text_lead_phone_placeholder} onChange={(value) => updateSetting("text_lead_phone_placeholder", value)} />
          <Field label="Email Placeholder" value={settings.text_lead_email_placeholder} onChange={(value) => updateSetting("text_lead_email_placeholder", value)} />
          <Field label="Message Placeholder" value={settings.text_lead_message_placeholder} onChange={(value) => updateSetting("text_lead_message_placeholder", value)} />
          <Field label="Button Text" value={settings.text_lead_save_button} onChange={(value) => updateSetting("text_lead_save_button", value)} />
          <Field label="Success Message" value={settings.text_detail_form_success} onChange={(value) => updateSetting("text_detail_form_success", value)} />
          <Field label="Required Message" value={settings.text_detail_form_required} onChange={(value) => updateSetting("text_detail_form_required", value)} />
          <Field label="Form Background" type="color" value={settings.detail_form_background_color} onChange={(value) => updateSetting("detail_form_background_color", value)} />
          <Field label="Form Text" type="color" value={settings.detail_form_text_color} onChange={(value) => updateSetting("detail_form_text_color", value)} />
          <Field label="Button Background" type="color" value={settings.detail_form_button_color} onChange={(value) => updateSetting("detail_form_button_color", value)} />
          <Field label="Button Text Color" type="color" value={settings.detail_form_button_text_color} onChange={(value) => updateSetting("detail_form_button_text_color", value)} />
          <ToggleField label="Show Name Field" checked={settings.show_detail_form_name} onChange={(value) => updateSetting("show_detail_form_name", value)} />
          <ToggleField label="Show Phone Field" checked={settings.show_detail_form_phone} onChange={(value) => updateSetting("show_detail_form_phone", value)} />
          <ToggleField label="Show Email Field" checked={settings.show_detail_form_email} onChange={(value) => updateSetting("show_detail_form_email", value)} />
          <ToggleField label="Show Message Field" checked={settings.show_detail_form_message} onChange={(value) => updateSetting("show_detail_form_message", value)} />
        </div>
        <div className="panel-heading">
          <h2><Plus size={20} /> Extra Form Fields</h2>
          <button className="primary-button" onClick={addDetailFormField} type="button">
            <Plus size={18} />
            Add Field
          </button>
        </div>
        <div className="detail-field-builder">
          <Field label="Field Label" value={newDetailField.label} onChange={(value) => setNewDetailField((field) => ({ ...field, label: value }))} />
          <label>
            Field Type
            <select value={newDetailField.type} onChange={(event) => setNewDetailField((field) => ({ ...field, type: event.target.value }))}>
              {detailFormFieldTypes.map((type) => (
                <option value={type.value} key={type.value}>{type.label}</option>
              ))}
            </select>
          </label>
          <Field label="Placeholder" value={newDetailField.placeholder} onChange={(value) => setNewDetailField((field) => ({ ...field, placeholder: value }))} />
          <Field label="Sort" type="number" value={newDetailField.sort_order} onChange={(value) => setNewDetailField((field) => ({ ...field, sort_order: Number(value) }))} />
          <Field label="Dropdown Options (one per line)" textarea value={newDetailField.optionsText} onChange={(value) => setNewDetailField((field) => ({ ...field, optionsText: value }))} />
          <ToggleField label="Required" checked={newDetailField.required} onChange={(value) => setNewDetailField((field) => ({ ...field, required: value }))} />
          <ToggleField label="Active" checked={newDetailField.active} onChange={(value) => setNewDetailField((field) => ({ ...field, active: value }))} />
        </div>
        <div className="detail-field-list">
          {detailFormFields.map((field) => (
            <article className="detail-field-row" key={field.id}>
              <input value={field.label} onChange={(event) => updateDetailFormField(field.id, { label: event.target.value })} placeholder="Label" />
              <select value={field.type} onChange={(event) => updateDetailFormField(field.id, { type: event.target.value })}>
                {detailFormFieldTypes.map((type) => (
                  <option value={type.value} key={type.value}>{type.label}</option>
                ))}
              </select>
              <input value={field.placeholder} onChange={(event) => updateDetailFormField(field.id, { placeholder: event.target.value })} placeholder="Placeholder" />
              <textarea
                value={(field.options || []).join("\n")}
                onChange={(event) => updateDetailFormField(field.id, { options: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })}
                placeholder="Dropdown options"
                rows={2}
              />
              <input type="number" value={field.sort_order} onChange={(event) => updateDetailFormField(field.id, { sort_order: Number(event.target.value) })} />
              <ToggleField label="Required" checked={field.required} onChange={(value) => updateDetailFormField(field.id, { required: value })} />
              <ToggleField label="Active" checked={field.active} onChange={(value) => updateDetailFormField(field.id, { active: value })} />
              <button className="danger-button" onClick={() => deleteDetailFormField(field.id)} type="button" aria-label="Delete field">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
          {detailFormFields.length === 0 && <p className="form-message">Add text boxes, dropdowns, dates, numbers, email, or phone fields. Dropdown options go one per line.</p>}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "contact"}>
        <div className="panel-heading">
          <h2><Contact size={20} /> Contact Information</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Contact
          </button>
        </div>
        <div className="form-grid">
          <Field label="Phone Number" value={settings.phone} onChange={(value) => updateSetting("phone", value)} />
          <Field label="WhatsApp Number / Link" value={settings.whatsapp_url} onChange={(value) => updateSetting("whatsapp_url", value)} />
          <Field label="Email Address" type="email" value={settings.email} onChange={(value) => updateSetting("email", value)} />
          <Field label="Google Review URL" value={settings.google_review_url} onChange={(value) => updateSetting("google_review_url", value)} />
          <label>
            Add to Contact Mode
            <select value={settings.contact_download_mode || "single"} onChange={(event) => updateSetting("contact_download_mode", event.target.value)}>
              <option value="single">Single generated contact</option>
              <option value="vcf_file">Uploaded company VCF file</option>
            </select>
          </label>
          <UploadField label="Upload Company VCF File" path="vcf" accept=".vcf,text/vcard" onUploaded={(url) => updateSetting("vcf_file_url", url)} />
          {settings.vcf_file_url && (
            <a className="ghost-button" href={settings.vcf_file_url} target="_blank" rel="noreferrer">
              Open uploaded VCF
            </a>
          )}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "social"}>
        <h2><Share2 size={20} /> Social Media Links</h2>
        <div className="form-grid">
          <Field label="WhatsApp Number / Link" value={settings.whatsapp_url} onChange={(value) => updateSetting("whatsapp_url", value)} />
          <Field label="Facebook URL" value={settings.facebook_url} onChange={(value) => updateSetting("facebook_url", value)} />
          <Field label="Instagram URL" value={settings.instagram_url} onChange={(value) => updateSetting("instagram_url", value)} />
          <Field label="TikTok URL" value={settings.tiktok_url} onChange={(value) => updateSetting("tiktok_url", value)} />
          <Field label="Website URL" value={settings.website_url} onChange={(value) => updateSetting("website_url", value)} />
        </div>
        <div className="icon-upload-grid">
          <div className="icon-upload-card">
            {settings.whatsapp_icon_url && <img src={settings.whatsapp_icon_url} alt="" />}
            <UploadField label="Upload WhatsApp Logo" path="social-icons/whatsapp" accept="image/*" onUploaded={(url) => updateSetting("whatsapp_icon_url", url)} />
          </div>
          <div className="icon-upload-card">
            {settings.facebook_icon_url && <img src={settings.facebook_icon_url} alt="" />}
            <UploadField label="Upload Facebook Logo" path="social-icons/facebook" accept="image/*" onUploaded={(url) => updateSetting("facebook_icon_url", url)} />
          </div>
          <div className="icon-upload-card">
            {settings.instagram_icon_url && <img src={settings.instagram_icon_url} alt="" />}
            <UploadField label="Upload Instagram Logo" path="social-icons/instagram" accept="image/*" onUploaded={(url) => updateSetting("instagram_icon_url", url)} />
          </div>
          <div className="icon-upload-card">
            {settings.tiktok_icon_url && <img src={settings.tiktok_icon_url} alt="" />}
            <UploadField label="Upload TikTok Logo" path="social-icons/tiktok" accept="image/*" onUploaded={(url) => updateSetting("tiktok_icon_url", url)} />
          </div>
          <div className="icon-upload-card">
            {settings.website_icon_url && <img src={settings.website_icon_url} alt="" />}
            <UploadField label="Upload Website Logo" path="social-icons/website" accept="image/*" onUploaded={(url) => updateSetting("website_icon_url", url)} />
          </div>
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "social"}>
        <div className="panel-heading">
          <h2><Link2 size={20} /> Extra Links</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "custom_links", label: "extra links", onReset: () => setCustomLinks([]) })} type="button">Reset Links</button>
            <button className="primary-button" onClick={addLink} type="button">
              <Plus size={18} />
              Add Link
            </button>
          </div>
        </div>
        <div className="dynamic-editor">
          <Field label="Label" value={newLink.label} onChange={(value) => setNewLink((link) => ({ ...link, label: value }))} />
          <Field label="URL" value={newLink.url} onChange={(value) => setNewLink((link) => ({ ...link, url: value }))} />
          <label>
            Icon
            <select value={newLink.icon_name} onChange={(event) => setNewLink((link) => ({ ...link, icon_name: event.target.value }))}>
              {socialIconOptions.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <Field label="Sort" type="number" value={newLink.sort_order} onChange={(value) => setNewLink((link) => ({ ...link, sort_order: Number(value) }))} />
          <UploadField label="Upload Logo" path="custom-link-icons" accept="image/*" onUploaded={(url) => setNewLink((link) => ({ ...link, icon_image_url: url }))} />
          <label className="toggle-label">
            <input type="checkbox" checked={newLink.active} onChange={(event) => setNewLink((link) => ({ ...link, active: event.target.checked }))} />
            Active
          </label>
        </div>
        <div className="dynamic-list">
          {customLinks.map((link) => (
            <article className="dynamic-row" key={link.id}>
              <input value={link.label || ""} onChange={(event) => updateLink(link.id, { label: event.target.value })} />
              <input value={link.url || ""} onChange={(event) => updateLink(link.id, { url: event.target.value })} />
              <select value={link.icon_name || "globe"} onChange={(event) => updateLink(link.id, { icon_name: event.target.value })}>
                {socialIconOptions.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="inline-upload">
                {link.icon_image_url && <img src={link.icon_image_url} alt="" />}
                <UploadField label="Logo" path="custom-link-icons" accept="image/*" onUploaded={(url) => updateLink(link.id, { icon_image_url: url })} />
              </div>
              <input type="number" value={link.sort_order || 0} onChange={(event) => updateLink(link.id, { sort_order: Number(event.target.value) })} />
              <label className="toggle-label">
                <input type="checkbox" checked={link.active} onChange={(event) => updateLink(link.id, { active: event.target.checked })} />
                Active
              </label>
              <button className="danger-button" onClick={() => deleteLink(link.id)} type="button" aria-label="Delete link">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "contact"}>
        <h2><MapPinned size={20} /> Location Management</h2>
        <div className="form-grid">
          <Field label="Address Text" value={settings.address_text} onChange={(value) => updateSetting("address_text", value)} />
          <Field label="Google Maps URL" value={settings.google_maps_url} onChange={(value) => updateSetting("google_maps_url", value)} />
          <Field label="Map Embed Iframe Code" textarea value={settings.map_embed_code} onChange={(value) => updateSetting("map_embed_code", value)} />
          <Field label="Business Hours" textarea value={settings.business_hours} onChange={(value) => updateSetting("business_hours", value)} />
          <ToggleField label="Show Business Hours" checked={settings.show_business_hours_section} onChange={(value) => updateSetting("show_business_hours_section", value)} />
          <Field label="Primary CTA Text" value={settings.primary_cta_label} onChange={(value) => updateSetting("primary_cta_label", value)} />
          <Field label="Primary CTA Link" value={settings.primary_cta_url} onChange={(value) => updateSetting("primary_cta_url", value)} />
          <ToggleField label="Show Primary CTA" checked={settings.show_primary_cta_section} onChange={(value) => updateSetting("show_primary_cta_section", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "content"}>
        <div className="panel-heading">
          <h2><Megaphone size={20} /> Offers & Announcements</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "offers", label: "offers", onReset: () => setOffers([]) })} type="button">Reset Offers</button>
            <button className="primary-button" onClick={addOffer} type="button">
              <Plus size={18} />
              Add Offer
            </button>
          </div>
        </div>
        <div className="offer-editor">
          <Field label="Title" value={newOffer.title} onChange={(value) => setNewOffer((offer) => ({ ...offer, title: value }))} />
          <Field label="Description" value={newOffer.description} onChange={(value) => setNewOffer((offer) => ({ ...offer, description: value }))} />
          <Field label="Button Text" value={newOffer.button_label} onChange={(value) => setNewOffer((offer) => ({ ...offer, button_label: value }))} />
          <Field label="Button Link" value={newOffer.button_url} onChange={(value) => setNewOffer((offer) => ({ ...offer, button_url: value }))} />
          <Field label="Start Date" type="datetime-local" value={newOffer.starts_at} onChange={(value) => setNewOffer((offer) => ({ ...offer, starts_at: value }))} />
          <Field label="Expiry Date" type="datetime-local" value={newOffer.expires_at} onChange={(value) => setNewOffer((offer) => ({ ...offer, expires_at: value }))} />
          <UploadField label="Upload Offer Image" path="offers" accept="image/*" onUploaded={(url) => setNewOffer((offer) => ({ ...offer, image_url: url }))} />
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={newOffer.active}
              onChange={(event) => setNewOffer((offer) => ({ ...offer, active: event.target.checked }))}
            />
            Active
          </label>
          <ToggleField label="Countdown" checked={newOffer.show_countdown} onChange={(value) => setNewOffer((offer) => ({ ...offer, show_countdown: value }))} />
        </div>

        <div className="offers-list">
          {offers.map((offer) => (
            <article className="offer-row" key={offer.id}>
              <div className="offer-image-control">
                {offer.image_url ? (
                  <img src={offer.image_url} alt="" />
                ) : (
                  <span>No image</span>
                )}
                <UploadField label={offer.image_url ? "Replace Image" : "Upload Image"} path="offers" accept="image/*" onUploaded={(url) => updateOffer(offer.id, { image_url: url })} />
                {offer.image_url && (
                  <button className="danger-text-button" onClick={() => updateOffer(offer.id, { image_url: "" })} type="button">
                    Remove Image
                  </button>
                )}
              </div>
              <input value={offer.title || ""} onChange={(event) => updateOffer(offer.id, { title: event.target.value })} />
              <textarea value={offer.description || ""} onChange={(event) => updateOffer(offer.id, { description: event.target.value })} rows={2} />
              <input value={offer.button_label || ""} onChange={(event) => updateOffer(offer.id, { button_label: event.target.value })} placeholder="Button text" />
              <input value={offer.button_url || ""} onChange={(event) => updateOffer(offer.id, { button_url: event.target.value })} placeholder="Button link" />
              <input type="datetime-local" value={offer.starts_at ? offer.starts_at.slice(0, 16) : ""} onChange={(event) => updateOffer(offer.id, { starts_at: event.target.value || null })} />
              <input type="datetime-local" value={offer.expires_at ? offer.expires_at.slice(0, 16) : ""} onChange={(event) => updateOffer(offer.id, { expires_at: event.target.value || null })} />
              <label className="toggle-label">
                <input type="checkbox" checked={offer.active} onChange={(event) => updateOffer(offer.id, { active: event.target.checked })} />
                Active
              </label>
              <label className="toggle-label">
                <input type="checkbox" checked={offer.show_countdown !== false} onChange={(event) => updateOffer(offer.id, { show_countdown: event.target.checked })} />
                Countdown
              </label>
              <button className="danger-button" onClick={() => deleteOffer(offer.id)} type="button" aria-label="Delete offer">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "content"}>
        <div className="panel-heading">
          <h2><ImagePlus size={20} /> Custom Text / Image Blocks</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "custom_sections", label: "custom blocks", onReset: () => setCustomSections([]) })} type="button">Reset Blocks</button>
            <button className="primary-button" onClick={addSection} type="button">
              <Plus size={18} />
              Add Block
            </button>
          </div>
        </div>
        <div className="section-editor">
          <Field label="Title" value={newSection.title} onChange={(value) => setNewSection((section) => ({ ...section, title: value }))} />
          <Field label="Text" value={newSection.body} onChange={(value) => setNewSection((section) => ({ ...section, body: value }))} />
          <UploadField label="Upload Block Image" path="sections" accept="image/*" onUploaded={(url) => setNewSection((section) => ({ ...section, image_url: url }))} />
          <Field label="Button Label" value={newSection.button_label} onChange={(value) => setNewSection((section) => ({ ...section, button_label: value }))} />
          <Field label="Button URL" value={newSection.button_url} onChange={(value) => setNewSection((section) => ({ ...section, button_url: value }))} />
          <label>
            Layout
            <select value={newSection.layout} onChange={(event) => setNewSection((section) => ({ ...section, layout: event.target.value }))}>
              <option value="card">Full Card</option>
              <option value="inline">Small Inline</option>
            </select>
          </label>
          <Field label="Sort" type="number" value={newSection.sort_order} onChange={(value) => setNewSection((section) => ({ ...section, sort_order: Number(value) }))} />
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={newSection.active}
              onChange={(event) => setNewSection((section) => ({ ...section, active: event.target.checked }))}
            />
            Active
          </label>
        </div>

        <div className="section-list">
          {customSections.map((section) => (
            <article className="section-row" key={section.id}>
              <input value={section.title || ""} onChange={(event) => updateSection(section.id, { title: event.target.value })} />
              <textarea value={section.body || ""} onChange={(event) => updateSection(section.id, { body: event.target.value })} rows={2} />
              <input value={section.button_label || ""} onChange={(event) => updateSection(section.id, { button_label: event.target.value })} placeholder="Button label" />
              <input value={section.button_url || ""} onChange={(event) => updateSection(section.id, { button_url: event.target.value })} placeholder="Button URL" />
              <select value={section.layout || "card"} onChange={(event) => updateSection(section.id, { layout: event.target.value })}>
                <option value="card">Full Card</option>
                <option value="inline">Small Inline</option>
              </select>
              <input type="number" value={section.sort_order || 0} onChange={(event) => updateSection(section.id, { sort_order: Number(event.target.value) })} />
              <label className="toggle-label">
                <input type="checkbox" checked={section.active} onChange={(event) => updateSection(section.id, { active: event.target.checked })} />
                Active
              </label>
              <button className="danger-button" onClick={() => deleteSection(section.id)} type="button" aria-label="Delete section">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "chatbot"}>
        <div className="panel-heading">
          <h2><Bot size={20} /> AI Automation Settings</h2>
          <button className="primary-button" onClick={saveChatbotSettings} type="button">
            <Save size={18} />
            Save Chatbot
          </button>
        </div>
        <div className="form-grid">
          <Field label="Assistant Name" value={chatbotSettings.assistant_name} onChange={(value) => updateChatbotSetting("assistant_name", value)} />
          <Field label="WhatsApp Number" value={chatbotSettings.whatsapp_number} onChange={(value) => updateChatbotSetting("whatsapp_number", value)} />
          <Field label="Button / Accent Color" type="color" value={chatbotSettings.accent_color} onChange={(value) => updateChatbotSetting("accent_color", value)} />
          <Field label="Chatbox Heading Color" type="color" value={chatbotSettings.heading_color} onChange={(value) => updateChatbotSetting("heading_color", value)} />
          <Field label="AI API URL" value={chatbotSettings.ai_api_url} onChange={(value) => updateChatbotSetting("ai_api_url", value)} />
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={chatbotSettings.enabled}
              onChange={(event) => updateChatbotSetting("enabled", event.target.checked)}
            />
            Chatbot Enabled
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={chatbotSettings.ai_enabled}
              onChange={(event) => updateChatbotSetting("ai_enabled", event.target.checked)}
            />
            AI Reply Enabled
          </label>
          <Field label="Welcome Message" textarea value={chatbotSettings.welcome_message} onChange={(value) => updateChatbotSetting("welcome_message", value)} />
          <Field label="Lead Capture Prompt" textarea value={chatbotSettings.lead_prompt} onChange={(value) => updateChatbotSetting("lead_prompt", value)} />
          <Field label="WhatsApp Prompt" textarea value={chatbotSettings.whatsapp_prompt} onChange={(value) => updateChatbotSetting("whatsapp_prompt", value)} />
          <Field label="Offline Message" textarea value={chatbotSettings.offline_message} onChange={(value) => updateChatbotSetting("offline_message", value)} />
          <Field label="AI System Prompt" textarea value={chatbotSettings.ai_system_prompt} onChange={(value) => updateChatbotSetting("ai_system_prompt", value)} />
        </div>
        {chatbotStatus && <p className="form-message">{chatbotStatus}</p>}
      </section>

      <section className="stats-band dashboard-section" hidden={activeSection !== "chatbot"}>
        <div>
          <span>AI Leads</span>
          <strong>{chatbotLeads.length}</strong>
        </div>
        <div>
          <span>Hot Leads</span>
          <strong>{chatbotLeads.filter((lead) => lead.tag === "hot").length}</strong>
        </div>
        <div>
          <span>Active Q&A</span>
          <strong>{chatbotFaqs.filter((faq) => faq.active).length}</strong>
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "chatbot-faqs"}>
        <div className="panel-heading">
          <h2><MessageSquareText size={20} /> Chatbot Questions & Answers</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "chatbot_faqs", label: "chatbot Q&A", onReset: () => setChatbotFaqs([]), statusSetter: setChatbotStatus })} type="button">Reset Q&A</button>
            <button className="primary-button" onClick={addChatbotFaq} type="button">
              <Plus size={18} />
              Add Q&A
            </button>
          </div>
        </div>
        <div className="chatbot-editor">
          <Field label="Question" value={newChatbotFaq.question} onChange={(value) => setNewChatbotFaq((item) => ({ ...item, question: value }))} />
          <Field label="Answer" value={newChatbotFaq.answer} onChange={(value) => setNewChatbotFaq((item) => ({ ...item, answer: value }))} />
          <Field label="Sort" type="number" value={newChatbotFaq.sort_order} onChange={(value) => setNewChatbotFaq((item) => ({ ...item, sort_order: Number(value) }))} />
          <label className="toggle-label">
            <input type="checkbox" checked={newChatbotFaq.active} onChange={(event) => setNewChatbotFaq((item) => ({ ...item, active: event.target.checked }))} />
            Active
          </label>
        </div>
        <div className="dynamic-list">
          {chatbotFaqs.map((faq) => (
            <article className="chatbot-row" key={faq.id}>
              <textarea value={faq.question || ""} onChange={(event) => updateChatbotFaq(faq.id, { question: event.target.value })} rows={2} />
              <textarea value={faq.answer || ""} onChange={(event) => updateChatbotFaq(faq.id, { answer: event.target.value })} rows={2} />
              <input type="number" value={faq.sort_order || 0} onChange={(event) => updateChatbotFaq(faq.id, { sort_order: Number(event.target.value) })} />
              <label className="toggle-label">
                <input type="checkbox" checked={faq.active} onChange={(event) => updateChatbotFaq(faq.id, { active: event.target.checked })} />
                Active
              </label>
              <button className="danger-button" onClick={() => deleteChatbotFaq(faq.id)} type="button" aria-label="Delete Q&A">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "chatbot-products"}>
        <div className="panel-heading">
          <h2><Package size={20} /> Chatbot Products / Services</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "chatbot_products", label: "chatbot products", onReset: () => setChatbotProducts([]), statusSetter: setChatbotStatus })} type="button">Reset Products</button>
            <button className="primary-button" onClick={addChatbotProduct} type="button">
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>
        <div className="chatbot-editor product">
          <Field label="Name" value={newChatbotProduct.name} onChange={(value) => setNewChatbotProduct((item) => ({ ...item, name: value }))} />
          <Field label="Category" value={newChatbotProduct.category} onChange={(value) => setNewChatbotProduct((item) => ({ ...item, category: value }))} />
          <Field label="Price" value={newChatbotProduct.price} onChange={(value) => setNewChatbotProduct((item) => ({ ...item, price: value }))} />
          <Field label="Description" value={newChatbotProduct.description} onChange={(value) => setNewChatbotProduct((item) => ({ ...item, description: value }))} />
          <Field label="Sort" type="number" value={newChatbotProduct.sort_order} onChange={(value) => setNewChatbotProduct((item) => ({ ...item, sort_order: Number(value) }))} />
          <label className="toggle-label">
            <input type="checkbox" checked={newChatbotProduct.active} onChange={(event) => setNewChatbotProduct((item) => ({ ...item, active: event.target.checked }))} />
            Active
          </label>
        </div>
        <div className="dynamic-list">
          {chatbotProducts.map((product) => (
            <article className="chatbot-row product" key={product.id}>
              <input value={product.name || ""} onChange={(event) => updateChatbotProduct(product.id, { name: event.target.value })} />
              <input value={product.category || ""} onChange={(event) => updateChatbotProduct(product.id, { category: event.target.value })} />
              <input value={product.price || ""} onChange={(event) => updateChatbotProduct(product.id, { price: event.target.value })} />
              <textarea value={product.description || ""} onChange={(event) => updateChatbotProduct(product.id, { description: event.target.value })} rows={2} />
              <input type="number" value={product.sort_order || 0} onChange={(event) => updateChatbotProduct(product.id, { sort_order: Number(event.target.value) })} />
              <label className="toggle-label">
                <input type="checkbox" checked={product.active} onChange={(event) => updateChatbotProduct(product.id, { active: event.target.checked })} />
                Active
              </label>
              <button className="danger-button" onClick={() => deleteChatbotProduct(product.id)} type="button" aria-label="Delete product">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "chatbot-products"}>
        <div className="panel-heading">
          <h2><Megaphone size={20} /> Chatbot Offers</h2>
          <div className="panel-actions">
            <button className="danger-text-button" onClick={() => resetTableData({ table: "chatbot_offers", label: "chatbot offers", onReset: () => setChatbotOffers([]), statusSetter: setChatbotStatus })} type="button">Reset Offers</button>
            <button className="primary-button" onClick={addChatbotOffer} type="button">
              <Plus size={18} />
              Add Offer
            </button>
          </div>
        </div>
        <div className="chatbot-editor offer">
          <Field label="Title" value={newChatbotOffer.title} onChange={(value) => setNewChatbotOffer((item) => ({ ...item, title: value }))} />
          <Field label="Description" value={newChatbotOffer.description} onChange={(value) => setNewChatbotOffer((item) => ({ ...item, description: value }))} />
          <Field label="Sort" type="number" value={newChatbotOffer.sort_order} onChange={(value) => setNewChatbotOffer((item) => ({ ...item, sort_order: Number(value) }))} />
          <label className="toggle-label">
            <input type="checkbox" checked={newChatbotOffer.active} onChange={(event) => setNewChatbotOffer((item) => ({ ...item, active: event.target.checked }))} />
            Active
          </label>
        </div>
        <div className="dynamic-list">
          {chatbotOffers.map((offer) => (
            <article className="chatbot-row offer" key={offer.id}>
              <input value={offer.title || ""} onChange={(event) => updateChatbotOffer(offer.id, { title: event.target.value })} />
              <textarea value={offer.description || ""} onChange={(event) => updateChatbotOffer(offer.id, { description: event.target.value })} rows={2} />
              <input type="number" value={offer.sort_order || 0} onChange={(event) => updateChatbotOffer(offer.id, { sort_order: Number(event.target.value) })} />
              <label className="toggle-label">
                <input type="checkbox" checked={offer.active} onChange={(event) => updateChatbotOffer(offer.id, { active: event.target.checked })} />
                Active
              </label>
              <button className="danger-button" onClick={() => deleteChatbotOffer(offer.id)} type="button" aria-label="Delete offer">
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "chatbot-leads"}>
        <div className="panel-heading">
          <h2><Users size={20} /> AI Leads</h2>
          <div className="panel-actions">
            <button className="ghost-button" onClick={() => exportLeadGroupCsv("ai-leads", chatbotLeads)} type="button">Export Excel</button>
            <button className="ghost-button" onClick={() => exportLeadGroupPdf("AI Leads", chatbotLeads)} type="button">Export PDF</button>
            <button className="ghost-button" onClick={loadAll} type="button">Refresh</button>
            <button className="danger-text-button" onClick={() => resetTableData({ table: "chatbot_leads", label: "AI leads", onReset: () => setChatbotLeads([]), statusSetter: setChatbotStatus })} type="button">Reset Leads</button>
          </div>
        </div>
        <div className="lead-table">
          <div className="lead-table-head">
            <span>Name</span>
            <span>Contact</span>
            <span>Tag</span>
            <span>Message</span>
            <span>Date</span>
          </div>
          {chatbotLeads.map((lead) => (
            <article className="lead-table-row" key={lead.id}>
              <strong>{lead.name || "Unknown"}</strong>
              <span>
                {lead.phone || "-"}<br />{lead.email || ""}
                {getFollowUpHref(lead.phone) && (
                  <a className="lead-follow-up" href={getFollowUpHref(lead.phone)} target="_blank" rel="noreferrer">Follow up</a>
                )}
              </span>
              <span className={`lead-tag ${lead.tag}`}>{lead.tag}</span>
              <span>
                {lead.message || "-"}
                {lead.extra_fields && Object.keys(lead.extra_fields).length > 0 && (
                  <small className="lead-extra-fields">
                    {Object.entries(lead.extra_fields).map(([key, value]) => (
                      <em key={key}>{key}: {String(value || "-")}</em>
                    ))}
                  </small>
                )}
              </span>
              <span>{new Date(lead.created_at).toLocaleString()}</span>
            </article>
          ))}
          {chatbotLeads.length === 0 && <p className="form-message">No AI leads yet. Leads will appear here after visitors submit details in the chatbot.</p>}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "review-leads"}>
        <div className="panel-heading">
          <h2><Users size={20} /> Review Detail Leads</h2>
          <div className="panel-actions">
            <button className="ghost-button" onClick={() => exportLeadGroupCsv("detail-leads", reviewDetailLeads)} type="button">Export Excel</button>
            <button className="ghost-button" onClick={() => exportLeadGroupPdf("Review Detail Leads", reviewDetailLeads)} type="button">Export PDF</button>
            <button className="ghost-button" onClick={loadAll} type="button">Refresh</button>
            <button className="danger-text-button" onClick={() => resetTableData({ table: "review_detail_leads", label: "detail leads", onReset: () => setReviewDetailLeads([]) })} type="button">Reset Leads</button>
          </div>
        </div>
        <div className="lead-table">
          <div className="lead-table-head review-leads-head">
            <span>Name</span>
            <span>Contact</span>
            <span>Message</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          {reviewDetailLeads.map((lead) => (
            <article className="lead-table-row review-leads-row" key={lead.id}>
              <strong>{lead.name || "Unknown"}</strong>
              <span>
                {lead.phone || "-"}<br />{lead.email || ""}
                {getFollowUpHref(lead.phone) && (
                  <a className="lead-follow-up" href={getFollowUpHref(lead.phone)} target="_blank" rel="noreferrer">Follow up</a>
                )}
              </span>
              <span>
                {lead.message || "-"}
                {lead.extra_fields && Object.keys(lead.extra_fields).length > 0 && (
                  <small className="lead-extra-fields">
                    {Object.entries(lead.extra_fields).map(([key, value]) => (
                      <em key={key}>{key}: {String(value || "-")}</em>
                    ))}
                  </small>
                )}
              </span>
              <span>{lead.status || "new"}</span>
              <span>{new Date(lead.created_at).toLocaleString()}</span>
            </article>
          ))}
          {reviewDetailLeads.length === 0 && <p className="form-message">No review detail leads yet. They will appear here after visitors fill the details box under the Google review section.</p>}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "analytics-dashboard"}>
        <div className="panel-heading">
          <h2><BarChart3 size={20} /> Analytics Dashboard</h2>
          <div className="panel-actions">
            <button className="ghost-button" onClick={loadAll} type="button">Refresh</button>
            <button className="primary-button" onClick={saveSettings} type="button">
              <Save size={18} />
              Save Analytics
            </button>
            <button className="danger-text-button" onClick={() => resetTableData({ table: "analytics_events", label: "analytics events", onReset: () => setAnalyticsEvents([]) })} type="button">Reset Events</button>
            <button className="danger-text-button" onClick={resetVisitorCount} type="button">
              <RotateCcw size={18} />
              Reset Visitors
            </button>
          </div>
        </div>
        <div className="visibility-grid">
          <ToggleField label="Enable Public Analytics" checked={settings.show_analytics_feature} onChange={(value) => updateSetting("show_analytics_feature", value)} />
          <ToggleField label="Enable Lead Source Tracking" checked={settings.show_lead_source_tracking} onChange={(value) => updateSetting("show_lead_source_tracking", value)} />
          <ToggleField label="Offer Countdown" checked={settings.offers_countdown_enabled} onChange={(value) => updateSetting("offers_countdown_enabled", value)} />
        </div>
        <div className="premium-metric-grid">
          <div><span>Total Visitors</span><strong>{analytics.toLocaleString()}</strong></div>
          <div><span>Total Events</span><strong>{analyticsEvents.length}</strong></div>
          <div><span>Detail Leads</span><strong>{reviewDetailLeads.length}</strong></div>
          <div><span>AI Leads</span><strong>{chatbotLeads.length}</strong></div>
        </div>
        <div className="premium-list">
          {analyticsSummary.map((item) => (
            <article key={item.name}>
              <span>{item.name.replace(/_/g, " ")}</span>
              <div className="analytics-count-action">
                <strong>{item.count}</strong>
                <button className="circle-reset-button" onClick={() => resetAnalyticsEvent(item.name)} type="button" aria-label={`Reset ${item.name.replace(/_/g, " ")}`}>
                  <RotateCcw size={14} />
                </button>
              </div>
            </article>
          ))}
          {analyticsSummary.length === 0 && <p className="form-message">No analytics events yet. Events appear after visitors click buttons on the public card.</p>}
        </div>
        <div className="analytics-subheading">
          <h3><Share2 size={18} /> Lead Sources</h3>
        </div>
        <div className="premium-list">
          {sourceSummary.map((item) => (
            <article key={item.source}>
              <span>{item.source}</span>
              <strong>{item.count}</strong>
            </article>
          ))}
          {sourceSummary.length === 0 && <p className="form-message">No lead sources yet. Use links like `?utm_source=instagram&utm_campaign=may_offer` to track campaigns.</p>}
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "follow-up"}>
        <div className="panel-heading">
          <h2><MessageSquareText size={20} /> Auto Follow-Up</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save Follow-Up
          </button>
        </div>
        <div className="form-grid">
          <ToggleField label="Enable WhatsApp Follow-Up" checked={settings.auto_followup_enabled} onChange={(value) => updateSetting("auto_followup_enabled", value)} />
          <Field label="Follow-Up Message" textarea value={settings.auto_followup_message} onChange={(value) => updateSetting("auto_followup_message", value)} />
        </div>
      </section>

      <section className="panel dashboard-section" hidden={activeSection !== "crm-export"}>
        <div className="panel-heading">
          <h2><Package size={20} /> CRM Export / Integration</h2>
          <button className="primary-button" onClick={saveSettings} type="button">
            <Save size={18} />
            Save CRM
          </button>
        </div>
        <div className="form-grid">
          <ToggleField label="Enable CRM Webhook" checked={settings.crm_integration_enabled} onChange={(value) => updateSetting("crm_integration_enabled", value)} />
          <Field label="CRM Webhook URL" value={settings.crm_webhook_url} onChange={(value) => updateSetting("crm_webhook_url", value)} />
          <label className="form-action-label">
            Export Leads CSV
            <button className="primary-button" onClick={exportLeadsCsv} type="button">
              <Save size={18} />
              Download CSV
            </button>
          </label>
        </div>
      </section>

      <div className="sticky-save">
        <span>{activeSection.startsWith("chatbot") ? chatbotStatus : status}</span>
        <button
          className="primary-button"
          onClick={activeSection.startsWith("chatbot") ? saveChatbotSettings : saveSettings}
          type="button"
        >
          <Save size={18} />
          {activeSection.startsWith("chatbot") ? "Save Chatbot" : "Save Settings"}
        </button>
      </div>
    </main>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setReady(true);
      return undefined;
    }

    let active = true;

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth
      .signOut()
      .catch(() => null)
      .finally(() => {
        if (!active) return;
        setSession(null);
        setReady(true);
      });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!hasSupabaseConfig) {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>Missing Supabase keys</h1>
          <p className="form-message">Create `.env` from `.env.example` and add your project URL and anon key.</p>
        </section>
      </main>
    );
  }

  if (!ready) return <main className="loading-screen">Loading...</main>;
  return session ? <Dashboard /> : <Login onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />;
}

createRoot(document.getElementById("root")).render(<App />);
