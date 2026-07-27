import { createClient } from "npm:@supabase/supabase-js@2";

const DEFAULT_ALLOWED_ORIGINS = new Set([
  "https://goldenlightstudio.es",
  "https://www.goldenlightstudio.es",
  "http://localhost:5173",
]);
const MAX_REQUEST_BYTES = 64_000;
const MAX_SOURCE_CHARS = 20_000;
const MAX_IMAGE_URLS = 30;
const GEMINI_TIMEOUT_MS = 25_000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const recentRequests = new Map<string, number[]>();

type ContentType = "portfolio" | "article";
type ContentRequest = { contentType: ContentType; source: Record<string, unknown>; imageUrls?: string[] };
type LocaleText = { es: string; it: string; en: string };

function allowedOrigins() {
  const configured = Deno.env.get("ALLOWED_ORIGINS")?.split(",").map((origin) => origin.trim()).filter(Boolean);
  return configured?.length ? new Set(configured) : DEFAULT_ALLOWED_ORIGINS;
}

function corsHeaders(request: Request) {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins().has(origin)) return null;
  return {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
  };
}

function json(request: Request, data: unknown, status = 200) {
  const cors = corsHeaders(request);
  return new Response(JSON.stringify(data), { status, headers: { ...(cors || {}), "Content-Type": "application/json" } });
}

const isObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);

function isLocaleText(value: unknown): value is LocaleText {
  return isObject(value) && ["es", "it", "en"].every((locale) => typeof value[locale] === "string");
}

function hasEditPermission(permissions: Record<string, boolean> | null, type: ContentType) {
  return type === "portfolio" ? permissions?.editPortfolio === true : permissions?.editArticles === true;
}

function isAiResult(value: unknown) {
  if (!isObject(value) || !isObject(value.translations) || !isObject(value.seo) || !isObject(value.imageAltText)) return false;
  return ["es", "it", "en"].every((locale) => {
    const seo = value.seo[locale];
    return isObject(value.translations[locale]) && isObject(seo) && typeof seo.title === "string" && typeof seo.description === "string";
  }) && Object.values(value.imageAltText).every(isLocaleText);
}

function isValidImageUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 2_048) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function isValidPayload(value: unknown): value is ContentRequest {
  if (!isObject(value) || !["portfolio", "article"].includes(String(value.contentType)) || !isObject(value.source)) return false;
  const sourceLength = JSON.stringify(value.source).length;
  if (sourceLength === 0 || sourceLength > MAX_SOURCE_CHARS) return false;
  return value.imageUrls === undefined || (Array.isArray(value.imageUrls) && value.imageUrls.length <= MAX_IMAGE_URLS && value.imageUrls.every(isValidImageUrl));
}

function isRateLimited(userId: string) {
  const now = Date.now();
  const recent = (recentRequests.get(userId) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  recent.push(now);
  recentRequests.set(userId, recent);
  return false;
}

function createPrompt(payload: ContentRequest) {
  return [
    "You are the multilingual CMS editor for a luxury photography studio in Tenerife.",
    "Return valid JSON only. Generate natural premium copy in Spanish, Italian and English.",
    "Preserve every image block and image URL exactly as supplied.",
    "Create concise SEO titles, SEO descriptions and descriptive non-keyword-stuffed alt text.",
    "Return exactly this shape:",
    '{ "translations": { "es": {}, "it": {}, "en": {} },',
    '  "seo": { "es": { "title": "", "description": "" }, "it": { "title": "", "description": "" }, "en": { "title": "", "description": "" } },',
    '  "imageAltText": { "image-url": { "es": "", "it": "", "en": "" } } }',
    `Content type: ${payload.contentType}.`,
  ].join("\n");
}

async function requestGemini(apiKey: string, payload: ContentRequest, requestId: string) {
  const model = Deno.env.get("GEMINI_MODEL") ?? "gemini-3.5-flash";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${createPrompt(payload)}\n\nSOURCE:\n${JSON.stringify({ sourceLocale: "es", source: payload.source, imageUrls: payload.imageUrls || [] })}` }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.3 },
      }),
    });

    const rawText = await response.text();
    let raw: Record<string, unknown> = {};
    try { raw = JSON.parse(rawText); } catch { /* Provider response is intentionally not exposed. */ }

    if (!response.ok) {
      console.error("content-ai provider failure", { requestId, status: response.status });
      throw new Error("GEMINI_REQUEST_FAILED");
    }

    const candidates = raw.candidates as Array<{ content?: { parts?: Array<{ text?: string }> } }> | undefined;
    const output = candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    if (!output) throw new Error("GEMINI_EMPTY_OUTPUT");

    try {
      const result = JSON.parse(output);
      if (isAiResult(result)) return result;
    } catch { /* Stable error code; no provider content is exposed. */ }
    throw new Error("GEMINI_INVALID_OUTPUT");
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("content-ai provider timeout", { requestId });
      throw new Error("GEMINI_TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (request) => {
  const requestId = crypto.randomUUID();
  const cors = corsHeaders(request);
  if (!cors) return json(request, { error: "ORIGIN_NOT_ALLOWED", requestId }, 403);
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json(request, { error: "METHOD_NOT_ALLOWED", requestId }, 405);

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) return json(request, { error: "REQUEST_TOO_LARGE", requestId }, 413);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
  const authorization = request.headers.get("Authorization");
  if (!url || !key || !geminiApiKey) return json(request, { error: "FUNCTION_NOT_CONFIGURED", requestId }, 500);
  if (!authorization) return json(request, { error: "UNAUTHORIZED", requestId }, 401);

  let payload: unknown;
  try { payload = await request.json(); } catch { return json(request, { error: "INVALID_JSON", requestId }, 400); }
  if (!isValidPayload(payload)) return json(request, { error: "INVALID_REQUEST", requestId }, 400);

  const supabase = createClient(url, key, { global: { headers: { Authorization: authorization } } });
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return json(request, { error: "UNAUTHORIZED", requestId }, 401);
  if (isRateLimited(userData.user.id)) return json(request, { error: "RATE_LIMITED", requestId }, 429);

  const { data: adminUser, error: permissionError } = await supabase
    .from("admin_users")
    .select("permissions")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (permissionError || !hasEditPermission(adminUser?.permissions, payload.contentType)) return json(request, { error: "FORBIDDEN", requestId }, 403);

  try {
    return json(request, await requestGemini(geminiApiKey, payload, requestId));
  } catch (error) {
    const code = error instanceof Error ? error.message : "AI_GENERATION_FAILED";
    console.error("content-ai failed", { requestId, code });
    return json(request, { error: code, requestId }, 502);
  }
});
