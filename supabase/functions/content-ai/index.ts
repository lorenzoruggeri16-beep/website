import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};

type ContentType = "portfolio" | "article";
type ContentRequest = {
  contentType: ContentType;
  source: Record<string, unknown>;
  imageUrls?: string[];
};

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { ...CORS, "Content-Type": "application/json" },
});

const isObject = (value: unknown): value is Record<string, unknown> => (
  Boolean(value) && typeof value === "object"
);

function hasEditPermission(permissions: Record<string, boolean> | null, type: ContentType) {
  return type === "portfolio"
    ? permissions?.editPortfolio === true
    : permissions?.editArticles === true;
}

function isAiResult(value: unknown) {
  return isObject(value)
    && isObject(value.translations)
    && isObject(value.seo)
    && isObject(value.imageAltText);
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

async function requestGemini(apiKey: string, payload: ContentRequest) {
  const model = Deno.env.get("GEMINI_MODEL") ?? "gemini-3.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `${createPrompt(payload)}\n\nSOURCE:\n${JSON.stringify({
              sourceLocale: "es",
              source: payload.source,
              imageUrls: payload.imageUrls || [],
            })}`,
          }],
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      }),
    },
  );

  const raw = await response.json();

  if (!response.ok) {
    console.error("Gemini request failed", response.status, raw);
    throw new Error("GEMINI_REQUEST_FAILED");
  }

  const output = raw.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text || "")
    .join("");

  if (!output) throw new Error("GEMINI_EMPTY_OUTPUT");

  try {
    const result = JSON.parse(output);
    if (isAiResult(result)) return result;
  } catch {
    // The Function returns a stable error code rather than provider content.
  }

  throw new Error("GEMINI_INVALID_OUTPUT");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (request.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
  const authorization = request.headers.get("Authorization");

  if (!url || !key || !geminiApiKey) {
    return json({ error: "FUNCTION_NOT_CONFIGURED" }, 500);
  }
  if (!authorization) return json({ error: "UNAUTHORIZED" }, 401);

  let payload: ContentRequest;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "INVALID_JSON" }, 400);
  }

  if (!payload?.source || !["portfolio", "article"].includes(payload.contentType)) {
    return json({ error: "INVALID_REQUEST" }, 400);
  }

  const supabase = createClient(url, key, {
    global: { headers: { Authorization: authorization } },
  });
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return json({ error: "UNAUTHORIZED" }, 401);

  const { data: adminUser, error: permissionError } = await supabase
    .from("admin_users")
    .select("permissions")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (permissionError || !hasEditPermission(adminUser?.permissions, payload.contentType)) {
    return json({ error: "FORBIDDEN" }, 403);
  }

  try {
    return json(await requestGemini(geminiApiKey, payload));
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "AI_GENERATION_FAILED" }, 502);
  }
});