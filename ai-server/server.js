const http = require("http");

loadLocalEnv();

const PORT = process.env.PORT || 10000;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:1b";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const AI_PROVIDER = (process.env.AI_PROVIDER || (GEMINI_API_KEY ? "gemini" : "ollama")).toLowerCase();

function loadLocalEnv() {
  try {
    const fs = require("fs");
    const path = require("path");
    const envPath = path.join(__dirname, ".env");
    if (!fs.existsSync(envPath)) return;
    const envText = fs.readFileSync(envPath, "utf8");
    envText.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const separator = trimmed.indexOf("=");
      if (separator === -1) return;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) process.env[key] = value;
    });
  } catch {
    // Environment loading is optional. Hosting providers should use real env vars.
  }
}

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error("Body too large"));
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function compactList(items = [], formatter) {
  return items.slice(0, 12).map(formatter).filter(Boolean).join("\n");
}

function buildPrompt(payload) {
  const business = payload.business || {};
  const knowledge = payload.knowledge || {};
  const faqs = compactList(knowledge.faqs, (faq) => `Q: ${faq.question}\nA: ${faq.answer}`);
  const products = compactList(
    knowledge.products,
    (item) => `- ${item.name}${item.price ? ` (${item.price})` : ""}: ${item.description || item.category || ""}`,
  );
  const offers = compactList(knowledge.offers, (offer) => `- ${offer.title}: ${offer.description || ""}`);

  return `${payload.systemPrompt || "You are a helpful sales assistant."}

Business:
Name: ${business.name || "Business"}
Tagline: ${business.tagline || ""}
Phone: ${business.phone || ""}
Email: ${business.email || ""}
Address: ${business.address || ""}
Website: ${business.website || ""}

Q&A:
${faqs || "No Q&A added."}

Products/services:
${products || "No products/services added."}

Offers:
${offers || "No offers added."}

Customer question:
${payload.message}

Reply rules:
- Sound like a real helpful person.
- Keep reply under 90 words.
- Use only the business knowledge above.
- If exact answer is missing, say what you can help with and ask one short follow-up question.
- End with a gentle next step when useful: WhatsApp, save details, or ask another question.`;
}

function hasAny(text, words) {
  const lower = String(text || "").toLowerCase();
  return words.some((word) => lower.includes(word));
}

function fallbackReply(payload) {
  const message = String(payload.message || "");
  const business = payload.business || {};
  const knowledge = payload.knowledge || {};
  const businessName = business.name || "the team";

  if (hasAny(message, ["location", "address", "where", "map", "direction"])) {
    return business.address
      ? `${businessName} is located at ${business.address}. You can check the map on this page or continue on WhatsApp if you want directions.`
      : `I can help with location details, but the address is not added yet. Would you like to continue on WhatsApp?`;
  }

  if (hasAny(message, ["phone", "call", "contact", "email", "whatsapp"])) {
    const contact = [business.phone ? `Phone: ${business.phone}` : "", business.email ? `Email: ${business.email}` : ""].filter(Boolean);
    return contact.length
      ? `Sure. ${contact.join(" | ")}. You can also continue on WhatsApp for a faster reply.`
      : `You can continue on WhatsApp or save your details so ${businessName} can follow up.`;
  }

  if (hasAny(message, ["price", "cost", "quote", "rate", "booking", "book"])) {
    return `I can help with that. Please share what you need, your preferred time, and your phone number so ${businessName} can give the right quote.`;
  }

  if (hasAny(message, ["service", "product", "menu", "package", "available", "offer"])) {
    const first = knowledge.products?.[0];
    if (first) {
      return `${businessName} offers ${first.name}${first.price ? ` (${first.price})` : ""}. ${first.description || ""} Which service are you interested in?`;
    }
    return `${businessName} can help with service details. What exactly are you looking for today?`;
  }

  return `I understand. ${businessName} can help you with details, pricing, support, offers, or WhatsApp connection. Could you tell me one more detail about what you need?`;
}

async function askOllama(payload) {
  if (!OLLAMA_BASE_URL) return null;
  const response = await fetch(`${OLLAMA_BASE_URL.replace(/\/$/, "")}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: buildPrompt(payload),
      stream: false,
      options: {
        temperature: 0.35,
        num_predict: 160,
      },
    }),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.response?.trim() || null;
}

async function askGemini(payload) {
  if (!GEMINI_API_KEY) return null;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildPrompt(payload) }],
        },
      ],
      generationConfig: {
        temperature: 0.55,
        topP: 0.9,
        maxOutputTokens: 180,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    }),
  });
  if (!response.ok) return null;
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  return text || null;
}

async function askAi(payload) {
  if (AI_PROVIDER === "gemini") {
    return (await askGemini(payload).catch(() => null)) || (await askOllama(payload).catch(() => null));
  }
  return (await askOllama(payload).catch(() => null)) || (await askGemini(payload).catch(() => null));
}

function scoreLead(message) {
  if (hasAny(message, ["price", "quote", "book", "buy", "urgent", "today", "call"])) return "hot";
  if (hasAny(message, ["service", "support", "info", "offer", "interested"])) return "warm";
  return "cold";
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    send(res, 200, {
      ok: true,
      provider: AI_PROVIDER,
      gemini: Boolean(GEMINI_API_KEY),
      geminiModel: GEMINI_MODEL,
      ollama: Boolean(OLLAMA_BASE_URL),
      ollamaModel: OLLAMA_MODEL,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    try {
      const payload = await readBody(req);
      const aiReply = await askAi(payload).catch(() => null);
      const reply = aiReply || fallbackReply(payload);
      send(res, 200, {
        reply,
        intent: aiReply ? "ai" : "ai-fallback",
        tag: scoreLead(payload.message),
        replies: ["WhatsApp", "Save details", "Ask more"],
      });
    } catch (error) {
      send(res, 400, { error: error.message });
    }
    return;
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`AI bridge running on port ${PORT}`);
});
