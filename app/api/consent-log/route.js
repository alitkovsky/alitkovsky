import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONSENT_TABLE = process.env.SUPABASE_CONSENT_TABLE || "consent_logs";

const anonymizeIp = (ip) => {
  if (!ip) return null;
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    if (parts.length > 1) {
      parts[parts.length - 1] = "0000";
      return parts.join(":");
    }
  }
  return ip;
};

const normalizeConsent = (value) => {
  if (!value || typeof value !== "object") return null;
  const keys = ["necessary", "functional", "analytics", "marketing"];
  const output = {};
  keys.forEach((key) => {
    if (typeof value[key] === "boolean") {
      output[key] = value[key];
    }
  });
  return Object.keys(output).length ? output : null;
};

const isAllowedOrigin = (headerStore) => {
  const rawAllowed = process.env.CONSENT_LOG_ALLOWED_ORIGINS || "";
  const allowed = rawAllowed
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowed.length === 0) {
    return process.env.NODE_ENV !== "production";
  }

  const origin = headerStore.get("origin");
  return origin ? allowed.includes(origin) : false;
};

export async function POST(request) {
  const headerStore = request.headers;

  if (!isAllowedOrigin(headerStore)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[consent-log] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const payload = await request.json();
    const forwardedFor = headerStore.get("x-forwarded-for");
    const rawIp = forwardedFor ? forwardedFor.split(",")[0]?.trim() : headerStore.get("x-real-ip");

    const consent = normalizeConsent(payload?.consent);
    const previousConsent = normalizeConsent(payload?.previousConsent);
    const action = ["initial", "update", "clear"].includes(payload?.action) ? payload.action : "update";
    const source = typeof payload?.source === "string" ? payload.source.slice(0, 64) : null;
    const consentIdRaw = payload?.consentId || payload?.consent_id;
    const consentId = typeof consentIdRaw === "string" ? consentIdRaw.slice(0, 64) : null;

    if (!consent) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const entry = {
      action,
      consent,
      previous_consent: previousConsent,
      consent_version: typeof payload?.version === "string" ? payload.version : null,
      consent_timestamp: payload?.timestamp ? Number(payload.timestamp) : null,
      page_url: typeof payload?.pageUrl === "string" ? payload.pageUrl.slice(0, 2048) : null,
      language: typeof payload?.language === "string" ? payload.language.slice(0, 16) : null,
      consent_id: consentId,
      source,
      ip: anonymizeIp(rawIp),
      user_agent: headerStore.get("user-agent")?.slice(0, 512) || null,
      received_at: new Date().toISOString(),
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/${CONSENT_TABLE}`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[consent-log] Supabase insert failed", response.status, errorText);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[consent-log] Invalid payload", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
