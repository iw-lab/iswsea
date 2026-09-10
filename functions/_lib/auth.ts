// 관리자 인증 — PBKDF2 비밀번호 해시 + HMAC 서명 세션 쿠키 + IP 별 로그인 시도 제한
import type { Env } from "./http";

const enc = new TextEncoder();
const PBKDF2_ITER = 100_000;
export const SESSION_COOKIE = "wa_session";
export const SESSION_TTL_SEC = 12 * 60 * 60; // 12시간
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILS = 5;

/* ---------- base64url ---------- */
function b64u(bytes: ArrayBuffer | Uint8Array): string {
  const u = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of u) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64u(s: string): Uint8Array {
  try {
    const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return new Uint8Array(0); // 손상된 입력은 빈 바이트 → 비교 실패로 귀결(예외 500 방지)
  }
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/* ---------- 비밀번호 ---------- */
async function pbkdf2(password: string, salt: Uint8Array, iter: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, key, 256);
  return new Uint8Array(bits);
}

/** "pbkdf2$<iter>$<salt b64u>$<hash b64u>" */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITER);
  return `pbkdf2$${PBKDF2_ITER}$${b64u(salt)}$${b64u(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iterStr, saltStr, hashStr] = stored.split("$");
  if (scheme !== "pbkdf2" || !iterStr || !saltStr || !hashStr) return false;
  const iter = Number(iterStr);
  if (!Number.isFinite(iter) || iter < 1000 || iter > 1_000_000) return false;
  const expected = unb64u(hashStr);
  const actual = await pbkdf2(password, unb64u(saltStr), iter);
  return timingSafeEqual(actual, expected);
}

/** DB 에 저장된 해시(비밀번호 변경분)가 있으면 그것, 없으면 배포 시크릿 */
export async function currentPasswordHash(env: Env): Promise<string | null> {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'password_hash'").first<{ value: string }>();
  return row?.value ?? env.ADMIN_PASSWORD_HASH ?? null;
}

/* ---------- 세션 ----------
   서버 상태 없는 HMAC 토큰이지만, settings.session_epoch 를 토큰에 박아 두어
   비밀번호를 바꾸면(epoch 갱신) 그 이전에 발급된 모든 세션이 즉시 무효가 된다. */
async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function currentSessionEpoch(env: Env): Promise<string> {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'session_epoch'").first<{ value: string }>();
  return row?.value ?? "0";
}

/** 비밀번호 변경 등 "기존 세션 전부 끊기"가 필요할 때 호출 */
export async function bumpSessionEpoch(env: Env): Promise<void> {
  await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('session_epoch', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(String(Date.now()))
    .run();
}

export async function createSessionToken(env: Env): Promise<string> {
  const payload = {
    v: 2,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
    e: await currentSessionEpoch(env),
    n: b64u(crypto.getRandomValues(new Uint8Array(8))),
  };
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(env.SESSION_SECRET), enc.encode(body));
  return `${body}.${b64u(sig)}`;
}

export async function verifySessionToken(env: Env, token: string | null): Promise<boolean> {
  if (!token || !env.SESSION_SECRET) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(env.SESSION_SECRET), unb64u(sig), enc.encode(body));
    if (!ok) return false;
    const payload = JSON.parse(new TextDecoder().decode(unb64u(body))) as { v?: number; exp?: number; e?: string };
    if (payload.v !== 2 || typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return false;
    return payload.e === (await currentSessionEpoch(env));
  } catch {
    return false;
  }
}

export function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return null;
}

export function sessionCookie(token: string, maxAge = SESSION_TTL_SEC): string {
  // Path=/api 로 좁혀 정적 페이지 요청에는 쿠키가 실리지 않게 한다
  return `${SESSION_COOKIE}=${token}; Path=/api; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearSessionCookie(): string {
  return sessionCookie("", 0);
}

export async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  return verifySessionToken(env, readCookie(request, SESSION_COOKIE));
}

/* ---------- 로그인 시도 제한 ----------
   검증 *전에* 시도 1회를 원자적으로 예약한다(UPSERT + RETURNING). 동시 요청 N개가 검사만 통과하고
   기록은 나중에 남기는 경쟁을 막는다. 성공하면 clearLoginFailures 로 카운터를 지운다. */
export async function reserveLoginAttempt(env: Env, ip: string): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const now = Date.now();
  const row = await env.DB.prepare(
    `INSERT INTO login_attempts (ip, fail_count, window_start) VALUES (?, 1, ?)
     ON CONFLICT(ip) DO UPDATE SET
       fail_count = CASE WHEN ? - window_start > ? THEN 1 ELSE fail_count + 1 END,
       window_start = CASE WHEN ? - window_start > ? THEN ? ELSE window_start END
     RETURNING fail_count, window_start`
  )
    .bind(ip, now, now, LOGIN_WINDOW_MS, now, LOGIN_WINDOW_MS, now)
    .first<{ fail_count: number; window_start: number }>();
  const count = row?.fail_count ?? 1;
  if (count > LOGIN_MAX_FAILS) {
    const elapsed = now - (row?.window_start ?? now);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((LOGIN_WINDOW_MS - elapsed) / 1000)) };
  }
  return { allowed: true, retryAfterSec: 0 };
}

export async function clearLoginFailures(env: Env, ip: string): Promise<void> {
  await env.DB.prepare("DELETE FROM login_attempts WHERE ip = ?").bind(ip).run();
}
