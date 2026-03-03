import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONSENT_TABLE = process.env.SUPABASE_CONSENT_TABLE || "consent_logs";
const MAX_ERROR_TEXT_LENGTH = 280;
const PAUSE_ERROR_HINTS = [
  "paused",
  "project is paused",
  "project has been paused",
  "inactivity",
  "restore",
];

const truncate = (value, maxLength = MAX_ERROR_TEXT_LENGTH) => {
  if (typeof value !== "string") return null;
  return value.slice(0, maxLength);
};

const parseProjectRefFromUrl = (supabaseUrl) => {
  if (!supabaseUrl) return null;
  try {
    const host = new URL(supabaseUrl).hostname;
    return host.split(".")[0] || null;
  } catch {
    return null;
  }
};

const getProjectRef = () => {
  const explicitRef = process.env.SUPABASE_PROJECT_REF?.trim();
  if (explicitRef) return explicitRef;
  return parseProjectRefFromUrl(process.env.SUPABASE_URL);
};

const isAuthorizedCronCall = (request) => {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return process.env.NODE_ENV !== "production";
  }

  const authorization = request.headers.get("authorization");
  return authorization === `Bearer ${cronSecret}`;
};

const isPausedProjectError = (status, responseText) => {
  const normalized = (responseText || "").toLowerCase();
  if (status === 540) return true;
  if (status >= 500 && normalized.includes("paused")) return true;
  return PAUSE_ERROR_HINTS.some((hint) => normalized.includes(hint));
};

const runSupabaseHeartbeat = async ({ supabaseUrl, serviceRoleKey }) => {
  const response = await fetch(`${supabaseUrl}/rest/v1/${CONSENT_TABLE}?select=id&limit=1`, {
    method: "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    errorText: truncate(text),
  };
};

const requestProjectRestore = async ({ projectRef, managementToken }) => {
  const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/restore`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${managementToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    errorText: truncate(text),
  };
};

const json = (body, status = 200) => NextResponse.json(body, { status });

const handleKeepalive = async (request) => {
  if (!isAuthorizedCronCall(request)) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[supabase-keepalive] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return json({ ok: false, error: "Missing Supabase credentials" }, 500);
  }

  try {
    const heartbeat = await runSupabaseHeartbeat({ supabaseUrl, serviceRoleKey });
    const checkedAt = new Date().toISOString();

    if (heartbeat.ok) {
      return json({
        ok: true,
        status: "active",
        supabaseStatus: heartbeat.status,
        checkedAt,
      });
    }

    const paused = isPausedProjectError(heartbeat.status, heartbeat.errorText);
    if (!paused) {
      return json(
        {
          ok: false,
          status: "heartbeat_failed",
          supabaseStatus: heartbeat.status,
          error: heartbeat.errorText,
          checkedAt,
        },
        502
      );
    }

    const autoRestoreEnabled = process.env.SUPABASE_AUTO_RESTORE_ON_PAUSE === "true";
    if (!autoRestoreEnabled) {
      return json(
        {
          ok: false,
          status: "paused",
          restoreAttempted: false,
          reason: "auto_restore_disabled",
          supabaseStatus: heartbeat.status,
          error: heartbeat.errorText,
          checkedAt,
        },
        503
      );
    }

    const managementToken = process.env.SUPABASE_MANAGEMENT_ACCESS_TOKEN;
    const projectRef = getProjectRef();

    if (!managementToken || !projectRef) {
      return json(
        {
          ok: false,
          status: "paused",
          restoreAttempted: false,
          reason: "missing_restore_credentials",
          projectRef: projectRef || null,
          supabaseStatus: heartbeat.status,
          checkedAt,
        },
        503
      );
    }

    const restore = await requestProjectRestore({ projectRef, managementToken });

    if (!restore.ok) {
      console.error(
        "[supabase-keepalive] Supabase restore failed",
        restore.status,
        restore.errorText
      );
      return json(
        {
          ok: false,
          status: "paused_restore_failed",
          restoreAttempted: true,
          projectRef,
          supabaseStatus: heartbeat.status,
          restoreStatus: restore.status,
          error: restore.errorText,
          checkedAt,
        },
        502
      );
    }

    return json(
      {
        ok: true,
        status: "restore_requested",
        restoreAttempted: true,
        projectRef,
        supabaseStatus: heartbeat.status,
        restoreStatus: restore.status,
        checkedAt,
      },
      202
    );
  } catch (error) {
    console.error("[supabase-keepalive] Unexpected error", error);
    return json({ ok: false, error: "Unexpected keepalive failure" }, 500);
  }
};

export async function GET(request) {
  return handleKeepalive(request);
}

export async function POST(request) {
  return handleKeepalive(request);
}
