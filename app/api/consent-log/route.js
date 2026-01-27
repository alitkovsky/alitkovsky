import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const DEFAULT_LOG_PATH = path.join(process.cwd(), "data", "consent-log.jsonl");

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

export async function POST(request) {
  try {
    const payload = await request.json();
    const headerStore = headers();
    const forwardedFor = headerStore.get("x-forwarded-for");
    const rawIp = forwardedFor ? forwardedFor.split(",")[0]?.trim() : headerStore.get("x-real-ip");

    const entry = {
      receivedAt: new Date().toISOString(),
      ip: anonymizeIp(rawIp),
      userAgent: headerStore.get("user-agent") || null,
      ...payload,
    };

    const logPath = process.env.CONSENT_LOG_PATH || DEFAULT_LOG_PATH;

    try {
      await mkdir(path.dirname(logPath), { recursive: true });
      await appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
    } catch (fileError) {
      console.warn("[consent-log] Failed to write file, falling back to console", fileError);
      console.info("[consent-log]", JSON.stringify(entry));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[consent-log] Invalid payload", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
