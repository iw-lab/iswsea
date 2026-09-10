// Pages Functions 공용 HTTP 유틸 — 응답 형식·본문 파싱·출처 검사

export interface Env {
  DB: D1Database;
  /** HMAC 세션 서명 키 (wrangler pages secret put SESSION_SECRET) */
  SESSION_SECRET: string;
  /** 초기 관리자 비밀번호 해시 — settings.password_hash 가 있으면 그것이 우선 */
  ADMIN_PASSWORD_HASH?: string;
}

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), { ...init, headers: { ...JSON_HEADERS, ...(init.headers ?? {}) } });
}

export function fail(status: number, message: string, extra: Record<string, unknown> = {}): Response {
  return json({ ok: false, error: message, ...extra }, { status });
}

const MAX_BODY = 64 * 1024;

/** 본문을 스트림으로 읽되 한도를 넘는 순간 중단한다 — Content-Length 없는 큰 본문도 메모리에 쌓이지 않는다 */
async function readBodyCapped(request: Request, max: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const buf = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    buf.set(c, off);
    off += c.byteLength;
  }
  return new TextDecoder().decode(buf);
}

/** JSON 본문을 64KB 한도로 읽는다. 형식이 아니면 null. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  const len = Number(request.headers.get("content-length") ?? 0);
  if (len > MAX_BODY) return null;
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return null;
  try {
    const text = await readBodyCapped(request, MAX_BODY);
    if (text === null) return null;
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** 변경 요청은 같은 출처에서만 — 브라우저는 POST/PUT/DELETE 에 Origin 을 붙인다 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}

export function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/* ---------- 입력 검증 (외부 라이브러리 없이) ---------- */

export class ValidationError extends Error {}

export function str(v: unknown, field: string, max: number, { required = false } = {}): string {
  if (v === undefined || v === null) {
    if (required) throw new ValidationError(`${field} 은(는) 필수입니다`);
    return "";
  }
  if (typeof v !== "string") throw new ValidationError(`${field} 형식이 잘못되었습니다`);
  const s = v.trim();
  if (required && s.length === 0) throw new ValidationError(`${field} 을(를) 입력하세요`);
  if (s.length > max) throw new ValidationError(`${field} 은(는) ${max}자 이하여야 합니다`);
  return s;
}

export function bool(v: unknown, fallback: boolean): boolean {
  if (typeof v === "boolean") return v;
  if (v === 1 || v === "1" || v === "true") return true;
  if (v === 0 || v === "0" || v === "false") return false;
  return fallback;
}

export function strList(v: unknown, field: string, maxItems: number, maxLen: number): string[] {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) throw new ValidationError(`${field} 형식이 잘못되었습니다`);
  if (v.length > maxItems) throw new ValidationError(`${field} 은(는) ${maxItems}개 이하여야 합니다`);
  return v.map((x, i) => str(x, `${field}[${i}]`, maxLen)).filter((s) => s.length > 0);
}

export function hexColor(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : fallback;
}

export function idParam(v: unknown): string {
  const s = typeof v === "string" ? v : "";
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(s)) throw new ValidationError("잘못된 id");
  return s;
}
