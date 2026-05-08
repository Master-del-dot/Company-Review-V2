const http = require("http");

const PORT = process.env.PORT || 10000;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:1b";

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
    send(res, 200, { ok: true, ollama: Boolean(OLLAMA_BASE_URL), model: OLLAMA_MODEL });
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    try {
      const payload = await readBody(req);
      const aiReply = await askOllama(payload).catch(() => null);
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
