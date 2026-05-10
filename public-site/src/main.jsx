import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronLeft,
  ChevronRight,
  AtSign,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  Camera,
  Chrome,
  CircleUserRound,
  Dribbble,
  ExternalLink,
  Facebook,
  Figma,
  FileText,
  Gamepad2,
  Github,
  Globe,
  Hash,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Music,
  Music2,
  Navigation,
  Phone,
  Podcast,
  Plus,
  Radio,
  Rss,
  Send,
  Share2,
  ShoppingBag,
  Slack,
  Star,
  Store,
  Twitch,
  Twitter,
  UsersRound,
  Video,
  Youtube,
} from "lucide-react";
import { hasSupabaseConfig, supabase } from "./supabase";
import "./styles.css";

const fallbackSettings = {
  logo_url: "",
  logo_shape: "circle",
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
  show_whatsapp_social: true,
  show_facebook_social: true,
  show_instagram_social: true,
  show_tiktok_social: true,
  show_website_social: true,
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
  owner_card_background_color: "#ffffff",
  owner_card_border_color: "",
  owner_card_label_color: "",
  owner_card_name_color: "",
  owner_card_title_color: "#17211f",
  owner_card_text_color: "",
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
  show_developer_contact_section: true,
  show_referral_offer: true,
  show_company_video_section: false,
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
    "company_video",
    "primary_cta",
    "location",
    "visitor_count",
    "developer_contact",
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
  developer_contact_label: "Contact Developer",
  developer_contact_whatsapp_number: "+9779827305718",
  developer_contact_message: "Hi developer, I need help with this digital business card.",
  developer_contact_style: "button",
  developer_contact_button_color: "#25d366",
  developer_contact_button_text_color: "#ffffff",
  referral_offer_title: "Special Referral Offer",
  referral_offer_description: "You opened this from a shared link. Show this offer to the business and ask for your referral reward.",
  referral_offer_button_label: "Claim on WhatsApp",
  referral_offer_button_url: "",
  referral_offer_image_url: "",
  referral_offer_background_color: "#ffffff",
  referral_offer_text_color: "#17211f",
  offer_popup_background_color: "#ffffff",
  offer_popup_text_color: "#52605c",
  offer_popup_heading_color: "",
  offer_popup_kicker_color: "",
  offer_countdown_background_color: "",
  offer_countdown_label_color: "#ffffff",
  offer_countdown_box_color: "#ffffff",
  offer_countdown_number_color: "#17211f",
  offer_countdown_unit_color: "#5e6b68",
  company_video_title: "Company Video",
  company_video_description: "",
  company_video_source_mode: "uploaded",
  company_video_url: "",
  company_video_uploaded_url: "",
  company_video_external_url: "",
  company_video_poster_url: "",
};

const orderedSectionDefaults = fallbackSettings.section_order;

function normalizeSectionOrder(value) {
  const parsed = Array.isArray(value) ? value : orderedSectionDefaults;
  return [
    ...parsed.filter((id) => orderedSectionDefaults.includes(id)),
    ...orderedSectionDefaults.filter((id) => !parsed.includes(id)),
  ];
}

function normalizeUrl(value) {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("mailto:") || value.startsWith("tel:")) {
    return value;
  }
  return `https://${value}`;
}

function getYouTubeEmbedUrl(value) {
  const rawUrl = String(value || "").trim();
  if (!rawUrl) return "";

  try {
    const url = new URL(normalizeUrl(rawUrl));
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const parts = url.pathname.split("/").filter(Boolean);
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else if (["embed", "shorts", "live"].includes(parts[0])) {
        videoId = parts[1] || "";
      }
    }

    if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return "";

    const start = url.searchParams.get("start") || url.searchParams.get("t") || "";
    const startSeconds = parseYouTubeStartSeconds(start);
    const params = new URLSearchParams({ rel: "0" });
    if (startSeconds > 0) params.set("start", String(startSeconds));

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return "";
  }
}

function parseYouTubeStartSeconds(value) {
  const time = String(value || "").trim().toLowerCase();
  if (!time) return 0;
  if (/^\d+$/.test(time)) return Number(time);

  const hours = Number(time.match(/(\d+)h/)?.[1] || 0);
  const minutes = Number(time.match(/(\d+)m/)?.[1] || 0);
  const seconds = Number(time.match(/(\d+)s/)?.[1] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function buildWhatsAppUrl(number, message) {
  const digits = String(number || "").replace(/[^\d]/g, "");
  if (!digits) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

function getMapSrc(embedCode) {
  const match = embedCode?.match(/src=["']([^"']+)["']/i);
  return match?.[1] || "";
}

function getVisibleOffers(offers) {
  const current = Date.now();
  return offers.filter((offer) => {
    const startsAt = offer.starts_at ? new Date(offer.starts_at).getTime() : 0;
    const expiresAt = offer.expires_at ? new Date(offer.expires_at).getTime() : Infinity;
    const safeStartsAt = Number.isFinite(startsAt) ? startsAt : 0;
    const safeExpiresAt = Number.isFinite(expiresAt) ? expiresAt : Infinity;
    return current >= safeStartsAt && current <= safeExpiresAt;
  });
}

function normalizeDetailFormFields(value) {
  const parsed = Array.isArray(value) ? value : [];
  return parsed
    .filter((field) => field && field.active !== false && field.label)
    .map((field) => ({
      id: String(field.id || field.label).replace(/[^a-z0-9_-]/gi, "-").toLowerCase(),
      label: String(field.label || ""),
      type: ["text", "textarea", "select", "number", "date", "email", "phone"].includes(field.type) ? field.type : "text",
      placeholder: String(field.placeholder || field.label || ""),
      options: Array.isArray(field.options) ? field.options : String(field.options || "").split("\n").map((item) => item.trim()).filter(Boolean),
      required: Boolean(field.required),
      sort_order: Number(field.sort_order || 100),
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

function escapeVcardText(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function downloadVcard(settings) {
  if (settings.contact_download_mode === "vcf_file" && settings.vcf_file_url) {
    const link = document.createElement("a");
    link.href = settings.vcf_file_url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVcardText(settings.owner_name || settings.business_name)}`,
    `ORG:${escapeVcardText(settings.business_name)}`,
  ];

  if (settings.owner_title) lines.push(`TITLE:${escapeVcardText(settings.owner_title)}`);
  if (settings.phone) lines.push(`TEL;TYPE=WORK,VOICE:${settings.phone}`);
  if (settings.email) lines.push(`EMAIL;TYPE=WORK:${settings.email}`);
  if (settings.address_text) lines.push(`ADR;TYPE=WORK:;;${escapeVcardText(settings.address_text)};;;;`);
  if (settings.website_url) lines.push(`URL:${settings.website_url}`);
  if (settings.tagline) lines.push(`NOTE:${escapeVcardText(settings.tagline)}`);

  lines.push("END:VCARD");

  const blob = new Blob([`${lines.join("\n")}\n`], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = String(settings.business_name || "contact").replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
  link.href = url;
  link.download = `${safeName}.vcf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function IconLink({ href, label, children, dark }) {
  if (!href) {
    return (
      <span className={dark ? "quick-icon disabled dark" : "quick-icon disabled"} aria-label={label}>
        {children}
      </span>
    );
  }

  return (
    <a className={dark ? "quick-icon dark" : "quick-icon"} href={href} aria-label={label}>
      {children}
    </a>
  );
}

function SocialLink({ href, label, icon, imageUrl, onClick }) {
  return (
    <a className="social-link" href={href || "#"} aria-label={label} onClick={onClick}>
      {imageUrl ? <img src={imageUrl} alt="" /> : icon}
    </a>
  );
}

function getDynamicIcon(iconName) {
  const iconMap = {
    behance: <BriefcaseBusiness size={22} />,
    calendar: <Calendar size={22} />,
    discord: <MessagesSquare size={22} />,
    dribbble: <Dribbble size={22} />,
    external: <ExternalLink size={22} />,
    facebook: <Facebook size={22} />,
    figma: <Figma size={22} />,
    github: <Github size={22} />,
    globe: <Globe size={22} />,
    instagram: <Instagram size={22} />,
    linkedin: <Linkedin size={22} />,
    mail: <Mail size={22} />,
    maps: <Navigation size={22} />,
    messenger: <MessageCircle size={22} />,
    phone: <Phone size={22} />,
    pinterest: <Hash size={22} />,
    podcast: <Podcast size={22} />,
    portfolio: <BookOpen size={22} />,
    reddit: <CircleUserRound size={22} />,
    rss: <Rss size={22} />,
    shop: <ShoppingBag size={22} />,
    shopping: <ShoppingBag size={22} />,
    slack: <Slack size={22} />,
    snapchat: <Camera size={22} />,
    spotify: <Radio size={22} />,
    store: <Store size={22} />,
    telegram: <Send size={22} />,
    threads: <AtSign size={22} />,
    tiktok: <Music2 size={22} />,
    twitch: <Twitch size={22} />,
    twitter: <Twitter size={22} />,
    video: <Video size={22} />,
    website: <Globe size={22} />,
    whatsapp: <MessageCircle size={22} />,
    x: <Twitter size={22} />,
    youtube: <Youtube size={22} />,
    teams: <UsersRound size={22} />,
    zoom: <Video size={22} />,
    chrome: <Chrome size={22} />,
    music: <Music size={22} />,
    message: <MessageSquare size={22} />,
  };

  return iconMap[String(iconName || "").toLowerCase()] || <ExternalLink size={22} />;
}

const fallbackChatbot = {
  settings: {
    enabled: true,
    assistant_name: "AI Sales Assistant",
    welcome_message: "Hi, I am your AI assistant. Do you want a quote, support, or more information?",
    lead_prompt: "Share your name and phone so the team can follow up quickly.",
    whatsapp_prompt: "Continue on WhatsApp for the fastest reply.",
    offline_message: "The assistant is paused right now, but you can still leave your details.",
    whatsapp_number: "",
    accent_color: "#03736e",
    heading_color: "#03736e",
    ai_enabled: true,
    ai_api_url: "",
    ai_system_prompt:
      "You are a warm human-like business assistant. Answer naturally using only the business knowledge provided. Keep replies short, friendly, and useful. If the answer is uncertain, ask one short follow-up question and offer WhatsApp.",
  },
  faqs: [
    {
      question: "How can I get a quote?",
      answer: "Share your requirement and contact details. The team can follow up with a quote.",
    },
  ],
  products: [],
  offers: [],
};

function scoreLead(text = "") {
  const lower = text.toLowerCase();
  if (["quote", "price", "buy", "book", "call", "urgent", "today"].some((word) => lower.includes(word))) return "hot";
  if (["interested", "info", "support", "service", "offer"].some((word) => lower.includes(word))) return "warm";
  return "cold";
}

const chatStopWords = new Set([
  "what",
  "when",
  "where",
  "which",
  "your",
  "you",
  "are",
  "can",
  "could",
  "would",
  "have",
  "with",
  "that",
  "this",
  "tell",
  "about",
  "please",
  "need",
  "want",
  "give",
  "show",
  "know",
]);

function tokenizeChatText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !chatStopWords.has(token));
}

function hasAny(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word));
}

function findBestFaq(message, faqs) {
  const messageTokens = tokenizeChatText(message);
  if (messageTokens.length === 0) return null;

  const ranked = faqs
    .map((faq) => {
      const questionTokens = tokenizeChatText(faq.question);
      const answerTokens = tokenizeChatText(faq.answer);
      const searchable = new Set([...questionTokens, ...answerTokens.slice(0, 8)]);
      const hits = messageTokens.filter((token) => searchable.has(token)).length;
      const score = hits / Math.max(messageTokens.length, questionTokens.length, 1);
      return { faq, hits, score };
    })
    .sort((a, b) => b.score - a.score || b.hits - a.hits);

  const best = ranked[0];
  if (!best) return null;
  if (best.hits >= 2 || best.score >= 0.42) return best.faq;
  return null;
}

function findBestProduct(message, products) {
  const tokens = tokenizeChatText(message);
  return products.find((product) => {
    const productTokens = tokenizeChatText(`${product.name} ${product.category} ${product.description}`);
    return tokens.some((token) => productTokens.includes(token));
  });
}

function getWhatsAppNumber(chatSettings, siteSettings) {
  const raw = chatSettings.whatsapp_number || siteSettings.whatsapp_url || siteSettings.phone || "";
  return String(raw).replace("https://wa.me/", "").replace(/[^\d]/g, "");
}

function getLeadSource() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    referral_id: params.get("ref") || "",
    referrer: document.referrer || "",
    page_url: window.location.href,
  };
}

function getCountdownParts(target, currentTime) {
  if (!target) return null;
  const diff = new Date(target).getTime() - currentTime;
  if (Number.isNaN(diff) || diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];
}

function AutomationChat({ settings }) {
  const [open, setOpen] = useState(false);
  const [chatSettings, setChatSettings] = useState(fallbackChatbot.settings);
  const [faqs, setFaqs] = useState(fallbackChatbot.faqs);
  const [products, setProducts] = useState(fallbackChatbot.products);
  const [chatOffers, setChatOffers] = useState(fallbackChatbot.offers);
  const [messages, setMessages] = useState([]);
  const [quickReplies, setQuickReplies] = useState(["Quote", "Support", "Products", "WhatsApp"]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });
  const [lastMessage, setLastMessage] = useState("I need more information");
  const [lastTag, setLastTag] = useState("warm");
  const [visitorId] = useState(() => {
    const existing = localStorage.getItem("conversionVisitorId");
    if (existing) return existing;
    const next = `vis-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("conversionVisitorId", next);
    return next;
  });
  const leadSource = useMemo(() => getLeadSource(), []);

  useEffect(() => {
    async function loadChatbot() {
      if (!hasSupabaseConfig) return;
      const [settingsResult, faqResult, productsResult, offersResult] = await Promise.all([
        supabase.from("chatbot_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("chatbot_faqs").select("*").eq("active", true).order("sort_order", { ascending: true }),
        supabase.from("chatbot_products").select("*").eq("active", true).order("sort_order", { ascending: true }),
        supabase.from("chatbot_offers").select("*").eq("active", true).order("sort_order", { ascending: true }),
      ]);
      if (settingsResult.data) setChatSettings({ ...fallbackChatbot.settings, ...settingsResult.data });
      if (faqResult.data) setFaqs(faqResult.data);
      if (productsResult.data) setProducts(productsResult.data);
      if (offersResult.data) setChatOffers(offersResult.data);
    }

    loadChatbot();
    if (!hasSupabaseConfig) return undefined;

    const channel = supabase
      .channel("public-chatbot-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "chatbot_settings" }, loadChatbot)
      .on("postgres_changes", { event: "*", schema: "public", table: "chatbot_faqs" }, loadChatbot)
      .on("postgres_changes", { event: "*", schema: "public", table: "chatbot_products" }, loadChatbot)
      .on("postgres_changes", { event: "*", schema: "public", table: "chatbot_offers" }, loadChatbot)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const whatsappUrl = useMemo(() => {
    const number = getWhatsAppNumber(chatSettings, settings);
    const text = `Hi ${settings.business_name || "team"}, I visited your website and need help with: ${lastMessage}`;
    return number ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : "#";
  }, [chatSettings, lastMessage, settings]);

  function addMessage(text, type = "bot") {
    setMessages((current) => [...current, { id: `${Date.now()}-${Math.random()}`, text, type }]);
  }

  function openChat() {
    setOpen(true);
    if (messages.length === 0) {
      addMessage(chatSettings.enabled ? chatSettings.welcome_message : chatSettings.offline_message);
    }
  }

  function buildResponse(text) {
    const lower = text.toLowerCase();
    const businessName = settings.business_name || "our team";
    const matchedFaq = findBestFaq(text, faqs);
    const matchedProduct = findBestProduct(text, products);

    if (matchedFaq) {
      return {
        intent: "faq",
        tag: scoreLead(text),
        reply: `${matchedFaq.answer}\n\nIf you want, I can also connect you with ${businessName} directly.`,
        replies: ["WhatsApp", "Save details", "Ask more"],
      };
    }

    if (hasAny(lower, ["hi", "hello", "hey", "namaste", "good morning", "good evening"])) {
      return {
        intent: "greeting",
        tag: "warm",
        reply: `Hi, welcome to ${businessName}. I can help with details, pricing, location, offers, reviews, or connect you on WhatsApp. What are you looking for today?`,
        replies: ["Quote", "Services", "Location", "WhatsApp"],
      };
    }

    if (hasAny(lower, ["thank", "thanks", "ok", "okay", "great", "nice"])) {
      return {
        intent: "thanks",
        tag: "warm",
        reply: "You are welcome. I am here if you need anything else.",
        replies: ["Ask more", "WhatsApp", "Save details"],
      };
    }

    if (hasAny(lower, ["location", "address", "map", "where", "direction", "visit"])) {
      return {
        intent: "location",
        tag: "warm",
        reply: settings.address_text
          ? `${businessName} is located at ${settings.address_text}. You can use the map section on this page for directions.`
          : `I can help with the location. Please check the map section or contact ${businessName} directly.`,
        replies: ["WhatsApp", "Call", "Save details"],
      };
    }

    if (hasAny(lower, ["phone", "number", "call", "contact", "email", "whatsapp"])) {
      const contactParts = [
        settings.phone ? `Phone: ${settings.phone}` : "",
        settings.email ? `Email: ${settings.email}` : "",
      ].filter(Boolean);
      return {
        intent: "contact",
        tag: "hot",
        reply: contactParts.length
          ? `Sure. ${contactParts.join(" | ")}. You can also continue on WhatsApp from here.`
          : chatSettings.whatsapp_prompt,
        replies: ["WhatsApp", "Save details"],
      };
    }

    if (hasAny(lower, ["review", "rating", "google", "feedback", "rate"])) {
      return {
        intent: "review",
        tag: "warm",
        reply: settings.google_review_url
          ? `You can leave a Google review from the review button on this page. ${businessName} really appreciates customer feedback.`
          : `You can share your feedback with ${businessName}. If you need help, I can connect you on WhatsApp.`,
        replies: ["WhatsApp", "Ask more"],
      };
    }

    if (hasAny(lower, ["quote", "price", "cost", "rate", "book", "booking", "buy", "order", "reservation"])) {
      return {
        intent: "quote",
        tag: "hot",
        reply: `Sure. To give the right answer, ${businessName} will need your requirement, preferred time, and contact number. Share your details here or continue on WhatsApp for the fastest reply.`,
        replies: ["Save details", "WhatsApp", "Products"],
      };
    }

    if (matchedProduct) {
      return {
        intent: "product",
        tag: "warm",
        reply: `${matchedProduct.name}${matchedProduct.price ? ` - ${matchedProduct.price}` : ""}\n${matchedProduct.description || "This is available from the team."}\n\nWould you like details or a quote?`,
        replies: ["Quote", "WhatsApp", "Save details"],
      };
    }

    if (hasAny(lower, ["product", "service", "menu", "package", "provide", "available", "do you do", "offer"])) {
      const productText = products.length
        ? products.map((product) => `${product.name}${product.price ? ` - ${product.price}` : ""}`).join("\n")
        : settings.tagline || "The team can explain available services and packages directly.";
      return {
        intent: "products",
        tag: "warm",
        reply: `Here is what I can help with:\n${productText}\n\nTell me which one you are interested in and I will guide you.`,
        replies: ["Quote", "WhatsApp", "Save details"],
      };
    }

    if (hasAny(lower, ["offer", "discount", "deal", "announcement", "promo", "promotion"])) {
      const offer = chatOffers[0];
      return {
        intent: "offer",
        tag: "warm",
        reply: offer
          ? `${offer.title}: ${offer.description}\n\nWant me to connect you with ${businessName}?`
          : "No special offer is active right now, but the team can still help you with the best available option.",
        replies: ["WhatsApp", "Save details"],
      };
    }

    if (hasAny(lower, ["support", "help", "problem", "issue", "urgent", "complaint", "not working"])) {
      return {
        intent: "support",
        tag: lower.includes("urgent") ? "hot" : "warm",
        reply: "I understand. Please tell me a little more about the issue. If it is urgent, continue on WhatsApp so the team can respond faster.",
        replies: ["Save details", "WhatsApp"],
      };
    }

    return {
      intent: "inquiry",
      tag: scoreLead(text),
      reply: `I understand you are asking about "${text}". I do not want to guess wrong, so tell me one detail: is this about pricing, service details, location, support, or booking?`,
      replies: ["Pricing", "Services", "Location", "Support"],
    };
  }

  async function askAiBridge(text) {
    if (!chatSettings.ai_enabled || !chatSettings.ai_api_url) return null;
    const apiBaseUrl = chatSettings.ai_api_url.replace(/\/$/, "");
    const isLocalPage = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const isLocalApi = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?/i.test(apiBaseUrl);
    if (isLocalApi && !isLocalPage) return null;
    try {
      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          systemPrompt: chatSettings.ai_system_prompt,
          business: {
            name: settings.business_name,
            tagline: settings.tagline,
            phone: settings.phone,
            email: settings.email,
            address: settings.address_text,
            website: settings.website_url,
          },
          knowledge: {
            faqs: faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
            products: products.map((product) => ({
              name: product.name,
              category: product.category,
              price: product.price,
              description: product.description,
            })),
            offers: chatOffers.map((offer) => ({ title: offer.title, description: offer.description })),
          },
        }),
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (!data.reply) return null;
      return {
        intent: data.intent || "ai",
        tag: data.tag || scoreLead(text),
        reply: data.reply,
        replies: data.replies || ["WhatsApp", "Save details", "Ask more"],
      };
    } catch {
      return null;
    }
  }

  async function sendMessage(text = input) {
    const clean = text.trim();
    if (!clean) return;
    if (!chatSettings.enabled) {
      addMessage(chatSettings.offline_message);
      return;
    }
    setInput("");
    setLastMessage(clean);
    addMessage(clean, "user");
    setQuickReplies([]);
    setTyping(true);
    const fallbackResponse = buildResponse(clean);
    const response = (await askAiBridge(clean)) || fallbackResponse;
    setLastTag(response.tag);

    if (hasSupabaseConfig) {
      await supabase.from("chatbot_events").insert({
        visitor_id: visitorId,
        message: clean,
        intent: response.intent,
        tag: response.tag,
      });
    }

    window.setTimeout(() => {
      setTyping(false);
      addMessage(response.reply);
      setQuickReplies(response.replies);
    }, 650);
  }

  async function saveLead(event) {
    event.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim()) {
      addMessage("Please add at least your name and phone number.");
      return;
    }
    const payload = {
      visitor_id: visitorId,
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      email: lead.email.trim(),
      message: lastMessage,
      tag: lastTag,
      ...(settings.show_lead_source_tracking !== false ? leadSource : {}),
    };

    if (hasSupabaseConfig) {
      await supabase.from("chatbot_leads").insert(payload);
    } else {
      const leads = JSON.parse(localStorage.getItem("chatbotLeads") || "[]");
      localStorage.setItem("chatbotLeads", JSON.stringify([...leads, payload]));
    }

    await sendCrmWebhook({ type: "chatbot_lead", lead: payload, business: settings.business_name });
    setLead({ name: "", phone: "", email: "" });
    setLeadOpen(false);
    addMessage("Thanks. Your details are saved. You can also continue on WhatsApp for a faster reply.");
    setQuickReplies(["WhatsApp", "Ask again"]);
  }

  function handleQuickReply(reply) {
    const lower = reply.toLowerCase();
    if (lower.includes("whatsapp")) {
      window.open(whatsappUrl, "_blank", "noreferrer");
      return;
    }
    if (lower.includes("call")) {
      if (settings.phone) window.location.href = `tel:${settings.phone}`;
      else addMessage("Phone number is not added yet. You can use WhatsApp or save your details.");
      return;
    }
    if (lower.includes("save")) {
      setLeadOpen(true);
      addMessage(chatSettings.lead_prompt);
      return;
    }
    if (lower.includes("ask")) {
      addMessage("Sure. Type your question and I will help.");
      return;
    }
    sendMessage(reply);
  }

  return (
    <>
      <button
        className="ai-chat-button"
        style={{ "--chat-accent": chatSettings.accent_color, "--chat-heading": chatSettings.heading_color }}
        onClick={openChat}
        type="button"
        aria-label="Open AI chat"
      >
        <MessageCircle size={22} />
      </button>

      <aside
        className={open ? "ai-chat-panel open" : "ai-chat-panel"}
        style={{ "--chat-accent": chatSettings.accent_color, "--chat-heading": chatSettings.heading_color }}
        aria-hidden={!open}
      >
        <header className="ai-chat-header">
          <div>
            <strong>{chatSettings.assistant_name}</strong>
            <span>
              {chatSettings.enabled
                ? settings.text_chat_online_status || fallbackSettings.text_chat_online_status
                : settings.text_chat_paused_status || fallbackSettings.text_chat_paused_status}
            </span>
          </div>
          <button onClick={() => setOpen(false)} type="button" aria-label="Close chat">
            ×
          </button>
        </header>

        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div className={`ai-message ${message.type}`} key={message.id}>
              {message.text}
            </div>
          ))}
          {typing && (
            <div className="ai-message bot">
              <span className="ai-typing"><span /><span /><span /></span>
            </div>
          )}
        </div>

        <div className="ai-quick-replies">
          {quickReplies.map((reply) => (
            <button key={reply} onClick={() => handleQuickReply(reply)} type="button">
              {reply}
            </button>
          ))}
        </div>

        {leadOpen && (
          <form className="ai-lead-form" onSubmit={saveLead}>
            <input placeholder={settings.text_lead_name_placeholder || fallbackSettings.text_lead_name_placeholder} value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} />
            <input placeholder={settings.text_lead_phone_placeholder || fallbackSettings.text_lead_phone_placeholder} value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} />
            <input placeholder={settings.text_lead_email_placeholder || fallbackSettings.text_lead_email_placeholder} value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} />
            <button type="submit">{settings.text_lead_save_button || fallbackSettings.text_lead_save_button}</button>
          </form>
        )}

        <form className="ai-chat-input" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={settings.text_chat_input_placeholder || fallbackSettings.text_chat_input_placeholder} />
          <button type="submit" aria-label={settings.text_chat_send_button || fallbackSettings.text_chat_send_button}>
            {settings.text_chat_send_button || fallbackSettings.text_chat_send_button}
          </button>
        </form>

        <a className="ai-whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">
          {settings.text_chat_whatsapp_button || fallbackSettings.text_chat_whatsapp_button}
        </a>
      </aside>
    </>
  );
}

function App() {
  const [settings, setSettings] = useState(fallbackSettings);
  const [offers, setOffers] = useState([]);
  const [customLinks, setCustomLinks] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState(fallbackSettings.text_share_copy_button);
  const [offerPopupOpen, setOfferPopupOpen] = useState(false);
  const [referralOfferOpen, setReferralOfferOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(new URLSearchParams(window.location.search).get("ref"));
  });
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [detailLead, setDetailLead] = useState({ name: "", phone: "", email: "", message: "" });
  const [detailExtraFields, setDetailExtraFields] = useState({});
  const [detailLeadStatus, setDetailLeadStatus] = useState("");
  const [visitorId] = useState(() => {
    const existing = localStorage.getItem("siteVisitorId");
    if (existing) return existing;
    const next = `site-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("siteVisitorId", next);
    return next;
  });
  const leadSource = useMemo(() => getLeadSource(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    async function loadSite() {
      if (!hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      const [settingsResult, offersResult, linksResult, sectionsResult, analyticsResult] = await Promise.all([
        supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("offers").select("*").eq("active", true).order("created_at", { ascending: false }),
        supabase.from("custom_links").select("*").eq("active", true).order("sort_order", { ascending: true }),
        supabase.from("custom_sections").select("*").eq("active", true).order("sort_order", { ascending: true }),
        supabase.rpc("increment_visitor_count"),
      ]);

      if (settingsResult.data) {
        const loadedSettings = { ...fallbackSettings, ...settingsResult.data };
        setSettings(loadedSettings);
        if (offersResult.data) {
          const visibleOffers = getVisibleOffers(offersResult.data);
          setOfferPopupOpen(loadedSettings.show_offer_popup !== false && visibleOffers.length > 0);
        }
      }
      if (offersResult.data) {
        const visibleOffers = getVisibleOffers(offersResult.data);
        setOffers(visibleOffers);
        if (!settingsResult.data) {
          setOfferPopupOpen(fallbackSettings.show_offer_popup !== false && visibleOffers.length > 0);
        }
      }
      if (linksResult.data) {
        setCustomLinks(linksResult.data);
      }
      if (sectionsResult.data) {
        setCustomSections(sectionsResult.data);
      }
      if (typeof analyticsResult.data === "number") {
        setVisitorCount(analyticsResult.data);
      }
      setLoading(false);
    }

    loadSite();
  }, []);

  useEffect(() => {
    if (!offerPopupOpen || offers.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveOfferIndex((index) => (index + 1) % offers.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [offerPopupOpen, offers.length]);

  useEffect(() => {
    if (activeOfferIndex >= offers.length) {
      setActiveOfferIndex(0);
    }
  }, [activeOfferIndex, offers.length]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const brandColor = settings.primary_color || fallbackSettings.primary_color;
  const stars = useMemo(
    () => Array.from({ length: Math.max(0, Math.min(Number(settings.star_rating || 5), 5)) }),
    [settings.star_rating],
  );
  const phoneHref = settings.phone ? `tel:${settings.phone}` : "";
  const emailHref = settings.email ? `mailto:${settings.email}` : "";
  const whatsappHref = normalizeUrl(settings.whatsapp_url);
  const mapSrc = getMapSrc(settings.map_embed_code);
  const activeOffer = offers[activeOfferIndex] || offers[0];
  const showIdentity = settings.show_identity_section !== false;
  const showQuickContact = settings.show_quick_contact_section !== false;
  const showVisitingCard = settings.show_visiting_card_section !== false && Boolean(settings.owner_name || settings.owner_title || settings.owner_photo_url || settings.owner_bio);
  const showReviews = settings.show_reviews_section !== false;
  const showDetailForm = settings.show_detail_form_section !== false;
  const showSocial = settings.show_social_section !== false;
  const showCustomSections = settings.show_custom_sections !== false;
  const showAddContact = settings.show_add_contact_button !== false;
  const showLocation = settings.show_location_section !== false;
  const showVisitorCount = settings.show_visitor_count !== false;
  const showOfferPopup = settings.show_offer_popup !== false;
  const showChatbot = settings.show_chatbot_section !== false;
  const showDeveloperContact = settings.show_developer_contact_section !== false && Boolean(settings.developer_contact_whatsapp_number);
  const showReferralOffer = settings.show_referral_offer !== false && Boolean(leadSource.referral_id);
  const showUploadedCard =
    settings.show_uploaded_card_section !== false &&
    settings.visiting_card_display_mode !== "background" &&
    Boolean(settings.visiting_card_image_url);
  const showBusinessHours = settings.show_business_hours_section !== false && Boolean(settings.business_hours);
  const showPrimaryCta = settings.show_primary_cta_section !== false && Boolean(settings.primary_cta_label && settings.primary_cta_url);
  const selectedCompanyVideoUrl =
    settings.company_video_source_mode === "url"
      ? settings.company_video_external_url || settings.company_video_url
      : settings.company_video_uploaded_url || settings.company_video_url;
  const showCompanyVideo = settings.show_company_video_section !== false && Boolean(selectedCompanyVideoUrl);
  const orderedSectionIds = normalizeSectionOrder(settings.section_order);
  const detailFormFields = normalizeDetailFormFields(settings.detail_form_fields);
  const pageBackgroundImage =
    settings.show_background_image && settings.page_background_image_url
      ? settings.page_background_image_url
      : settings.show_uploaded_card_section !== false && settings.visiting_card_display_mode === "background"
        ? settings.visiting_card_image_url
        : "";
  const baseShareUrl = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
  const referralShareUrl = useMemo(() => {
    if (!baseShareUrl) return "";
    const url = new URL(baseShareUrl);
    url.searchParams.set("ref", visitorId);
    return url.toString();
  }, [baseShareUrl, visitorId]);
  const shareUrl = settings.show_referral_offer === false ? baseShareUrl : referralShareUrl;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
  const shareDisplayLinks = [
    {
      href: settings.show_whatsapp_social === false ? "" : whatsappHref,
      label: "WhatsApp",
      imageUrl: settings.whatsapp_icon_url,
      icon: <MessageCircle size={22} />,
    },
    {
      href: settings.show_facebook_social === false ? "" : normalizeUrl(settings.facebook_url),
      label: "Facebook",
      imageUrl: settings.facebook_icon_url,
      icon: <Facebook size={22} />,
    },
    {
      href: settings.show_instagram_social === false ? "" : normalizeUrl(settings.instagram_url),
      label: "Instagram",
      imageUrl: settings.instagram_icon_url,
      icon: <Instagram size={22} />,
    },
    {
      href: settings.show_tiktok_social === false ? "" : normalizeUrl(settings.tiktok_url),
      label: "TikTok",
      imageUrl: settings.tiktok_icon_url,
      icon: <Music2 size={22} />,
    },
    {
      href: settings.show_website_social === false ? "" : normalizeUrl(settings.website_url),
      label: "Website",
      imageUrl: settings.website_icon_url,
      icon: <Globe size={22} />,
    },
    ...customLinks.map((link) => ({
      href: normalizeUrl(link.url),
      label: link.label,
      imageUrl: link.icon_image_url,
      icon: getDynamicIcon(link.icon_name),
    })),
  ].filter((link) => link.href);
  const customStyle = {
    "--brand": brandColor,
    "--page-bg": settings.page_background_color || fallbackSettings.page_background_color,
    "--card-bg": settings.card_background_color || fallbackSettings.card_background_color,
    "--heading": settings.heading_color || brandColor,
    "--body-text": settings.body_text_color || fallbackSettings.body_text_color,
    "--button-bg": settings.button_color || fallbackSettings.button_color,
    "--button-text": settings.button_text_color || fallbackSettings.button_text_color,
    "--icon": settings.icon_color || brandColor,
    "--accent": settings.accent_color || brandColor,
    "--page-bg-media": pageBackgroundImage ? `url("${pageBackgroundImage}")` : "none",
  };
  const developerContactHref = buildWhatsAppUrl(
    settings.developer_contact_whatsapp_number,
    settings.developer_contact_message,
  );

  async function createQrShareFile() {
    if (typeof File === "undefined" || typeof navigator.canShare !== "function") return null;
    const response = await fetch(qrUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    const businessFileName = (settings.business_name || "business-card")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return new File([blob], `${businessFileName || "business-card"}-qr.png`, {
      type: blob.type || "image/png",
    });
  }

  async function shareSite({ openFallback = true } = {}) {
    trackEvent("share_open", "share", { referral_url: settings.show_referral_offer !== false });
    if (openFallback) {
      setShareOpen(true);
      return;
    }
    const title = settings.business_name || "Digital Business Card";
    const shareTextWithUrl = [settings.tagline || "", shareUrl].filter(Boolean).join("\n");
    if (navigator.share) {
      try {
        const qrFile = await createQrShareFile();
        if (qrFile) {
          const qrShareData = {
            title,
            text: shareTextWithUrl,
            url: shareUrl,
            files: [qrFile],
          };
          const canShareQrWithUrl = navigator.canShare(qrShareData);
          const qrShareDataWithoutUrl = {
            title,
            text: shareTextWithUrl,
            files: [qrFile],
          };
          if (canShareQrWithUrl || navigator.canShare(qrShareDataWithoutUrl)) {
            await navigator.share(canShareQrWithUrl ? qrShareData : qrShareDataWithoutUrl);
            return;
          }
        }
      } catch (error) {
        if (error.name === "AbortError") return;
      }
      try {
        await navigator.share({
          title,
          text: settings.tagline || "",
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopyLabel(settings.text_share_copied_button || fallbackSettings.text_share_copied_button);
    setTimeout(() => setCopyLabel(settings.text_share_copy_button || fallbackSettings.text_share_copy_button), 1400);
  }

  async function copyLink() {
    trackEvent("share_copy", "share", { referral_url: settings.show_referral_offer !== false });
    await navigator.clipboard.writeText(shareUrl);
    setCopyLabel(settings.text_share_copied_button || fallbackSettings.text_share_copied_button);
    setTimeout(() => setCopyLabel(settings.text_share_copy_button || fallbackSettings.text_share_copy_button), 1400);
  }

  async function trackEvent(eventName, eventType = "interaction", metadata = {}) {
    if (!hasSupabaseConfig || settings.show_analytics_feature === false) return;
    await supabase.from("analytics_events").insert({
      visitor_id: visitorId,
      event_name: eventName,
      event_type: eventType,
      source: leadSource.utm_source || "direct",
      metadata: {
        ...metadata,
        ...leadSource,
      },
    });
  }

  async function sendCrmWebhook(payload) {
    if (!settings.crm_integration_enabled || !settings.crm_webhook_url) return;
    const body = JSON.stringify({
      ...payload,
      sent_at: new Date().toISOString(),
      page_url: window.location.href,
    });
    try {
      if (navigator.sendBeacon) {
        const delivered = navigator.sendBeacon(settings.crm_webhook_url, new Blob([body], { type: "text/plain" }));
        if (delivered) return;
      }
      await fetch(settings.crm_webhook_url, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body,
      });
    } catch {
      // Ignore webhook delivery failures so the visitor flow is never blocked.
    }
  }

  async function submitDetailLead(event) {
    event.preventDefault();
    const missingCustomField = detailFormFields.find((field) => field.required && !String(detailExtraFields[field.id] || "").trim());
    if ((settings.show_detail_form_name !== false && !detailLead.name.trim()) || (settings.show_detail_form_phone !== false && !detailLead.phone.trim())) {
      setDetailLeadStatus(settings.text_detail_form_required || fallbackSettings.text_detail_form_required);
      return;
    }
    if (missingCustomField) {
      setDetailLeadStatus(`${missingCustomField.label} is required.`);
      return;
    }

    setDetailLeadStatus("Saving...");
    const extraFields = detailFormFields.reduce((values, field) => {
      values[field.label] = String(detailExtraFields[field.id] || "").trim();
      return values;
    }, {});
    const payload = {
      name: detailLead.name.trim(),
      phone: detailLead.phone.trim(),
      email: detailLead.email.trim(),
      message: detailLead.message.trim(),
      extra_fields: extraFields,
      source: "review_details",
      ...(settings.show_lead_source_tracking !== false ? leadSource : {}),
    };

    if (hasSupabaseConfig) {
      const { error } = await supabase.from("review_detail_leads").insert(payload);
      if (error) {
        setDetailLeadStatus(error.message);
        return;
      }
    } else {
      const existing = JSON.parse(localStorage.getItem("reviewDetailLeads") || "[]");
      localStorage.setItem("reviewDetailLeads", JSON.stringify([...existing, { ...payload, created_at: new Date().toISOString() }]));
    }

    await trackEvent("review_detail_lead", "lead", { phone: Boolean(payload.phone), email: Boolean(payload.email) });
    await sendCrmWebhook({ type: "review_detail_lead", lead: payload, business: settings.business_name });
    setDetailLead({ name: "", phone: "", email: "", message: "" });
    setDetailExtraFields({});
    setDetailLeadStatus(settings.text_detail_form_success || fallbackSettings.text_detail_form_success);
  }

  function renderPageSection(sectionId) {
    switch (sectionId) {
      case "identity":
        if (!showIdentity) return null;
        return (
          <header className="identity" key={sectionId}>
            {settings.show_logo !== false && (
              <div className={`logo-ring ${settings.logo_shape === "square" ? "square" : settings.logo_shape === "rounded_square" ? "rounded-square" : "circle"}`}>
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt={`${settings.business_name} logo`} />
                ) : (
                  <span>{settings.business_name?.slice(0, 1) || "R"}</span>
                )}
              </div>
            )}
            <h1>{settings.business_name}</h1>
            <p>{settings.tagline}</p>
          </header>
        );
      case "quick_contact":
        if (!showQuickContact) return null;
        return (
          <nav className="quick-row" aria-label="Quick contact" key={sectionId}>
            <span onClick={() => trackEvent("phone_click", "click")}><IconLink href={phoneHref} label="Call"><Phone size={22} /></IconLink></span>
            <span onClick={() => trackEvent("whatsapp_click", "click")}><IconLink href={whatsappHref} label="WhatsApp"><MessageCircle size={22} /></IconLink></span>
            <span onClick={() => trackEvent("email_click", "click")}><IconLink href={emailHref} label="Email"><Mail size={22} /></IconLink></span>
          </nav>
        );
      case "owner_card":
        if (!showVisitingCard) return null;
        return (
          <section
            className="owner-card"
            aria-label="Owner visiting card"
            key={sectionId}
            style={{
              "--owner-card-bg": settings.owner_card_background_color || fallbackSettings.owner_card_background_color,
              "--owner-card-border": settings.owner_card_border_color || `color-mix(in srgb, var(--accent) 18%, transparent)`,
              "--owner-card-label": settings.owner_card_label_color || "var(--accent)",
              "--owner-card-name": settings.owner_card_name_color || "var(--heading)",
              "--owner-card-title": settings.owner_card_title_color || fallbackSettings.owner_card_title_color,
              "--owner-card-text": settings.owner_card_text_color || "var(--body-text)",
            }}
          >
            <div className="owner-photo">
              {settings.owner_photo_url ? (
                <img src={settings.owner_photo_url} alt={`${settings.owner_name || settings.business_name} profile`} />
              ) : (
                <span>{(settings.owner_name || settings.business_name || "O").slice(0, 1)}</span>
              )}
            </div>
            <div>
              <p className="owner-kicker">{settings.text_owner_card_kicker || fallbackSettings.text_owner_card_kicker}</p>
              {settings.owner_name && <h2>{settings.owner_name}</h2>}
              {settings.owner_title && <strong>{settings.owner_title}</strong>}
              {settings.owner_bio && <p>{settings.owner_bio}</p>}
            </div>
          </section>
        );
      case "reviews":
        if (!showReviews) return null;
        return (
          <section className="rating-block" aria-label="Ratings and reviews" key={sectionId}>
            <div className="stars">
              {stars.map((_, index) => (
                <Star key={index} size={22} fill="#ffc107" stroke="#ffc107" />
              ))}
            </div>
            <p>{settings.review_text || fallbackSettings.review_text}</p>
            <a className="google-button" href={settings.google_review_url || "#"} onClick={() => trackEvent("google_review_click", "click")}>
              <span>G</span>
              {settings.text_google_review_button || fallbackSettings.text_google_review_button}
            </a>
          </section>
        );
      case "detail_form":
        if (!showDetailForm) return null;
        return (
          <form
            className="detail-lead-form"
            style={{
              "--detail-form-bg": settings.detail_form_background_color || fallbackSettings.detail_form_background_color,
              "--detail-form-text": settings.detail_form_text_color || fallbackSettings.detail_form_text_color,
              "--detail-form-button": settings.detail_form_button_color || fallbackSettings.detail_form_button_color,
              "--detail-form-button-text": settings.detail_form_button_text_color || fallbackSettings.detail_form_button_text_color,
            }}
            onSubmit={submitDetailLead}
            key={sectionId}
          >
            <div className="detail-lead-heading">
              <h2>{settings.text_detail_form_title || fallbackSettings.text_detail_form_title}</h2>
              {settings.text_detail_form_subtitle && <p>{settings.text_detail_form_subtitle}</p>}
            </div>
            {settings.show_detail_form_name !== false && (
              <input
                placeholder={settings.text_lead_name_placeholder || fallbackSettings.text_lead_name_placeholder}
                value={detailLead.name}
                onChange={(event) => setDetailLead((current) => ({ ...current, name: event.target.value }))}
              />
            )}
            {settings.show_detail_form_phone !== false && (
              <input
                placeholder={settings.text_lead_phone_placeholder || fallbackSettings.text_lead_phone_placeholder}
                value={detailLead.phone}
                onChange={(event) => setDetailLead((current) => ({ ...current, phone: event.target.value }))}
              />
            )}
            {settings.show_detail_form_email !== false && (
              <input
                placeholder={settings.text_lead_email_placeholder || fallbackSettings.text_lead_email_placeholder}
                value={detailLead.email}
                onChange={(event) => setDetailLead((current) => ({ ...current, email: event.target.value }))}
              />
            )}
            {settings.show_detail_form_message !== false && (
              <textarea
                placeholder={settings.text_lead_message_placeholder || fallbackSettings.text_lead_message_placeholder}
                value={detailLead.message}
                onChange={(event) => setDetailLead((current) => ({ ...current, message: event.target.value }))}
                rows={3}
              />
            )}
            {detailFormFields.map((field) => {
              const commonProps = {
                value: detailExtraFields[field.id] || "",
                onChange: (event) => setDetailExtraFields((current) => ({ ...current, [field.id]: event.target.value })),
                required: field.required,
                "aria-label": field.label,
              };

              if (field.type === "textarea") {
                return <textarea key={field.id} placeholder={field.placeholder} rows={3} {...commonProps} />;
              }

              if (field.type === "select") {
                return (
                  <select key={field.id} {...commonProps}>
                    <option value="">{field.placeholder || field.label}</option>
                    {field.options.map((option) => (
                      <option value={option} key={option}>{option}</option>
                    ))}
                  </select>
                );
              }

              const inputType = field.type === "phone" ? "tel" : field.type;
              return <input key={field.id} type={inputType} placeholder={field.placeholder} {...commonProps} />;
            })}
            <button type="submit">{settings.text_lead_save_button || fallbackSettings.text_lead_save_button}</button>
            {detailLeadStatus && <p>{detailLeadStatus}</p>}
          </form>
        );
      case "social":
        if (!showSocial) return null;
        return (
          <section className="socials" aria-label="Social media" key={sectionId}>
            {settings.show_whatsapp_social !== false && <SocialLink href={whatsappHref} label="WhatsApp" imageUrl={settings.whatsapp_icon_url} icon={<MessageCircle size={22} />} onClick={() => trackEvent("social_whatsapp_click", "click")} />}
            {settings.show_facebook_social !== false && <SocialLink href={normalizeUrl(settings.facebook_url)} label="Facebook" imageUrl={settings.facebook_icon_url} icon={<Facebook size={22} />} onClick={() => trackEvent("social_facebook_click", "click")} />}
            {settings.show_instagram_social !== false && <SocialLink href={normalizeUrl(settings.instagram_url)} label="Instagram" imageUrl={settings.instagram_icon_url} icon={<Instagram size={22} />} onClick={() => trackEvent("social_instagram_click", "click")} />}
            {settings.show_tiktok_social !== false && <SocialLink href={normalizeUrl(settings.tiktok_url)} label="TikTok" imageUrl={settings.tiktok_icon_url} icon={<Music2 size={22} />} onClick={() => trackEvent("social_tiktok_click", "click")} />}
            {settings.show_website_social !== false && <SocialLink href={normalizeUrl(settings.website_url)} label="Website" imageUrl={settings.website_icon_url} icon={<Globe size={22} />} onClick={() => trackEvent("social_website_click", "click")} />}
            {customLinks.map((link) => (
              <SocialLink key={link.id} href={normalizeUrl(link.url)} label={link.label} imageUrl={link.icon_image_url} icon={getDynamicIcon(link.icon_name)} onClick={() => trackEvent("custom_link_click", "click", { label: link.label })} />
            ))}
          </section>
        );
      case "custom_sections":
        if (!showCustomSections || customSections.length === 0) return null;
        return (
          <section className="custom-sections" aria-label="More information" key={sectionId}>
            {customSections.map((section) => (
              <article
                className={`custom-section ${section.layout || "card"}`}
                key={section.id}
                style={{
                  "--custom-section-bg": section.background_color || "#ffffff",
                  "--custom-section-border": section.border_color || "color-mix(in srgb, var(--accent) 16%, transparent)",
                  "--custom-section-title": section.title_color || "var(--heading)",
                  "--custom-section-text": section.text_color || "var(--body-text)",
                  "--custom-section-button-bg": section.button_background_color || "transparent",
                  "--custom-section-button-text": section.button_text_color || "var(--accent)",
                }}
              >
                {section.image_url && <img src={section.image_url} alt="" />}
                <div>
                  {section.title && <h2>{section.title}</h2>}
                  {section.body && <p>{section.body}</p>}
                  {section.button_url && section.button_label && (
                    <a className="section-link" href={normalizeUrl(section.button_url)} onClick={() => trackEvent("custom_section_button_click", "click", { title: section.title })}>
                      {section.button_label}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </section>
        );
      case "add_contact":
        if (!showAddContact) return null;
        return (
          <button className="contact-button" onClick={() => { trackEvent("add_contact_click", "click", { mode: settings.contact_download_mode }); downloadVcard(settings); }} type="button" key={sectionId}>
            <Plus size={20} />
            {settings.text_add_contact_button || fallbackSettings.text_add_contact_button}
          </button>
        );
      case "uploaded_card":
        if (!showUploadedCard) return null;
        return (
          <section className="uploaded-card-section" aria-label="Uploaded visiting card" key={sectionId}>
            <img src={settings.visiting_card_image_url} alt={`${settings.business_name} visiting card`} />
          </section>
        );
      case "business_hours":
        if (!showBusinessHours) return null;
        return (
          <section className="info-panel" aria-label="Business hours" key={sectionId}>
            <h2>{settings.text_business_hours_heading || fallbackSettings.text_business_hours_heading}</h2>
            <p>{settings.business_hours}</p>
          </section>
        );
      case "company_video":
        if (!showCompanyVideo) return null;
        const youtubeEmbedUrl = getYouTubeEmbedUrl(selectedCompanyVideoUrl);
        return (
          <section className="company-video-section" aria-label="Company video" key={sectionId}>
            <div>
              <h2>{settings.company_video_title || fallbackSettings.company_video_title}</h2>
              {settings.company_video_description && <p>{settings.company_video_description}</p>}
            </div>
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={settings.company_video_title || fallbackSettings.company_video_title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => trackEvent("company_video_embed_load", "media")}
              />
            ) : (
              <video controls playsInline poster={settings.company_video_poster_url || ""} onPlay={() => trackEvent("company_video_play", "media")}>
                <source src={selectedCompanyVideoUrl} />
              </video>
            )}
          </section>
        );
      case "primary_cta":
        if (!showPrimaryCta) return null;
        return (
          <a className="contact-button primary-cta" href={normalizeUrl(settings.primary_cta_url)} onClick={() => trackEvent("primary_cta_click", "click")} key={sectionId}>
            {settings.primary_cta_label}
          </a>
        );
      case "location":
        if (!showLocation) return null;
        return (
          <section className="location" key={sectionId}>
            <div className="location-heading">
              <MapPin size={22} />
              <div>
                <h2>{settings.text_location_heading || fallbackSettings.text_location_heading}</h2>
                <p>{settings.address_text}</p>
              </div>
            </div>
            <a className="maps-link" href={settings.google_maps_url || "#"} onClick={() => trackEvent("maps_click", "click")}>
              {settings.text_open_maps_button || fallbackSettings.text_open_maps_button}
            </a>
            <div className="map-frame">
              {mapSrc ? (
                <iframe title="Business location" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="map-empty">{settings.text_map_empty || fallbackSettings.text_map_empty}</div>
              )}
            </div>
          </section>
        );
      case "visitor_count":
        if (!showVisitorCount) return null;
        return (
          <footer className="visitor-count" key={sectionId}>
            <span>{settings.text_visitor_count_label || fallbackSettings.text_visitor_count_label}</span>
            <strong>{loading ? "..." : visitorCount.toLocaleString()}</strong>
          </footer>
        );
      case "developer_contact":
        if (!showDeveloperContact) return null;
        return (
          <footer className="developer-contact-footer" key={sectionId}>
            <a
              className={settings.developer_contact_style === "text" ? "text-only" : "button-style"}
              href={developerContactHref}
              onClick={() => trackEvent("developer_contact_click", "click")}
              style={{
                "--developer-contact-bg": settings.developer_contact_button_color || fallbackSettings.developer_contact_button_color,
                "--developer-contact-text": settings.developer_contact_style === "text"
                  ? settings.developer_contact_button_text_color || settings.accent_color || settings.heading_color || fallbackSettings.accent_color
                  : settings.developer_contact_button_text_color || fallbackSettings.developer_contact_button_text_color,
              }}
            >
              {settings.developer_contact_label || fallbackSettings.developer_contact_label}
            </a>
          </footer>
        );
      default:
        return null;
    }
  }

  function renderOfferCountdown(offer) {
    const countdownParts = getCountdownParts(offer.expires_at, now);
    if (settings.offers_countdown_enabled === false || offer.show_countdown === false || !countdownParts) return null;

    return (
      <div
        className="offer-countdown"
        style={{
          "--offer-countdown-bg": settings.offer_countdown_background_color || `linear-gradient(135deg, color-mix(in srgb, var(--accent) 86%, #111111), #17211f)`,
          "--offer-countdown-label": settings.offer_countdown_label_color || fallbackSettings.offer_countdown_label_color,
          "--offer-countdown-box": settings.offer_countdown_box_color || fallbackSettings.offer_countdown_box_color,
          "--offer-countdown-number": settings.offer_countdown_number_color || fallbackSettings.offer_countdown_number_color,
          "--offer-countdown-unit": settings.offer_countdown_unit_color || fallbackSettings.offer_countdown_unit_color,
        }}
      >
        <span>{settings.text_offer_countdown_label || fallbackSettings.text_offer_countdown_label}</span>
        <div className="offer-countdown-grid" aria-label="Offer countdown">
          {countdownParts.map((part) => (
            <strong key={part.label}>
              {String(part.value).padStart(2, "0")}
              <small>{part.label}</small>
            </strong>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <main className="site-loading-screen" aria-live="polite">
        <div className="site-loading-card">
          <span />
          <strong>Loading...</strong>
        </div>
      </main>
    );
  }

  return (
    <main className="page" style={customStyle}>
      <section className="business-card">
        <button className="share-button" onClick={shareSite} type="button" aria-label="Share this website">
          <Share2 size={20} />
        </button>

        {orderedSectionIds.map((sectionId) => renderPageSection(sectionId))}
      </section>

      {shareOpen && (
        <div className="share-dialog" role="dialog" aria-modal="true" aria-label="Share this website">
          <div className="share-panel">
            <button className="share-close" onClick={() => setShareOpen(false)} type="button" aria-label="Close">
              ×
            </button>
            <div className="share-logo">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt={`${settings.business_name} logo`} />
              ) : (
                <span>{settings.business_name?.slice(0, 1) || "R"}</span>
              )}
            </div>
            <img className="share-qr" src={qrUrl} alt="QR code for this website" />
            <h2>{settings.business_name}</h2>
            {shareDisplayLinks.length > 0 && (
              <div className="share-socials" aria-label="Share links">
                {shareDisplayLinks.map((link) => (
                  <SocialLink key={`${link.label}-${link.href}`} href={link.href} label={link.label} imageUrl={link.imageUrl} icon={link.icon} />
                ))}
              </div>
            )}
            <div className="share-link-row">
              <p>{shareUrl}</p>
              <button onClick={copyLink} type="button" aria-label="Copy link">
                {copyLabel || settings.text_share_copy_button || fallbackSettings.text_share_copy_button}
              </button>
            </div>
            <button className="copy-button" onClick={() => shareSite({ openFallback: false })} type="button">
              <Share2 size={18} />
              {settings.text_share_button || fallbackSettings.text_share_button}
            </button>
          </div>
        </div>
      )}

      {showOfferPopup && offerPopupOpen && activeOffer && (
        <div className="offer-popup" role="dialog" aria-modal="true" aria-label="Offers and announcements">
          <section
            className="offer-popup-panel"
            style={{
              "--offer-popup-bg": settings.offer_popup_background_color || fallbackSettings.offer_popup_background_color,
              "--offer-popup-text": settings.offer_popup_text_color || fallbackSettings.offer_popup_text_color,
              "--offer-popup-heading": settings.offer_popup_heading_color || "var(--heading)",
              "--offer-popup-kicker": settings.offer_popup_kicker_color || "var(--accent)",
            }}
          >
            <button className="offer-close" onClick={() => setOfferPopupOpen(false)} type="button" aria-label="Close offers">
              ×
            </button>
            <div className="offer-slider" style={{ transform: `translateX(-${activeOfferIndex * 100}%)` }}>
              {offers.map((offer) => (
                <article className={offer.image_url ? "offer-slide" : "offer-slide no-image"} key={offer.id}>
                  {offer.image_url && <img src={offer.image_url} alt="" />}
                  <div>
                    <p className="offer-kicker">{settings.text_offer_kicker || fallbackSettings.text_offer_kicker}</p>
                    <h2>{offer.title}</h2>
                    <p>{offer.description}</p>
                    {offer.button_label && offer.button_url && (
                      <a className="offer-cta" href={normalizeUrl(offer.button_url)} onClick={() => trackEvent("offer_cta_click", "click", { offer: offer.title })}>
                        {offer.button_label}
                      </a>
                    )}
                    {renderOfferCountdown(offer)}
                  </div>
                </article>
              ))}
            </div>
            {offers.length > 1 && (
              <div className="offer-controls">
                <button
                  type="button"
                  aria-label="Previous offer"
                  onClick={() => setActiveOfferIndex((index) => (index - 1 + offers.length) % offers.length)}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="offer-dots" aria-label="Offer pages">
                  {offers.map((offer, index) => (
                    <button
                      className={index === activeOfferIndex ? "active" : ""}
                      key={offer.id}
                      type="button"
                      aria-label={`Show offer ${index + 1}`}
                      onClick={() => setActiveOfferIndex(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next offer"
                  onClick={() => setActiveOfferIndex((index) => (index + 1) % offers.length)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {showReferralOffer && referralOfferOpen && (
        <div className="referral-popup" role="dialog" aria-modal="true" aria-label="Referral offer">
          <section
            className="referral-panel"
            style={{
              "--referral-bg": settings.referral_offer_background_color || fallbackSettings.referral_offer_background_color,
              "--referral-text": settings.referral_offer_text_color || fallbackSettings.referral_offer_text_color,
            }}
          >
            <button className="offer-close" onClick={() => setReferralOfferOpen(false)} type="button" aria-label="Close referral offer">
              x
            </button>
            {settings.referral_offer_image_url && <img src={settings.referral_offer_image_url} alt="" />}
            <p className="offer-kicker">Referral Offer</p>
            <h2>{settings.referral_offer_title || fallbackSettings.referral_offer_title}</h2>
            <p>{settings.referral_offer_description || fallbackSettings.referral_offer_description}</p>
            {(settings.referral_offer_button_url || whatsappHref) && (
              <a
                className="offer-cta"
                href={normalizeUrl(settings.referral_offer_button_url) || whatsappHref}
                onClick={() => trackEvent("referral_offer_claim", "click", { referral_id: leadSource.referral_id })}
              >
                {settings.referral_offer_button_label || fallbackSettings.referral_offer_button_label}
              </a>
            )}
          </section>
        </div>
      )}

      {showChatbot && <AutomationChat settings={settings} />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
