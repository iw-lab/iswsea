// Pages Functions(/api/*) 클라이언트 — 공개 콘텐츠 조회와 관리자 CRUD
import type { EventData, NoticeData } from "@/data/pension";

export type NoticeItem = NoticeData;
export type EventItem = EventData;

export interface PublicContent {
  notices: NoticeItem[];
  events: EventItem[];
  popupEnabled: boolean;
}

export class ApiError extends Error {
  status: number;
  retryAfterSec?: number;
  constructor(status: number, message: string, retryAfterSec?: number) {
    super(message);
    this.status = status;
    this.retryAfterSec = retryAfterSec;
  }
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "same-origin",
    headers: { ...(init.body ? { "content-type": "application/json" } : {}), ...(init.headers ?? {}) },
  });
  let data: Record<string, unknown> = {};
  try {
    data = (await res.json()) as Record<string, unknown>;
  } catch {
    /* 본문 없음 */
  }
  if (!res.ok || data.ok === false) {
    throw new ApiError(res.status, typeof data.error === "string" ? data.error : `요청 실패 (${res.status})`, typeof data.retryAfterSec === "number" ? data.retryAfterSec : undefined);
  }
  return data as T;
}

const j = (body: unknown) => JSON.stringify(body);

/* ---------- 공개 ---------- */
export const getPublicContent = () => call<{ ok: true } & PublicContent>("/api/content");

/* ---------- 인증 ---------- */
export const login = (password: string) => call<{ ok: true }>("/api/admin/login", { method: "POST", body: j({ password }) });
export const logout = () => call<{ ok: true }>("/api/admin/logout", { method: "POST", body: j({}) });
export const me = () => call<{ ok: true }>("/api/admin/me");
export const changePassword = (current: string, next: string) =>
  call<{ ok: true }>("/api/admin/password", { method: "PUT", body: j({ current, next }) });

/* ---------- 공지 ---------- */
export const listNotices = () => call<{ ok: true; notices: NoticeItem[] }>("/api/admin/notices");
export const createNotice = (n: Omit<NoticeItem, "id">) =>
  call<{ ok: true; notice: NoticeItem }>("/api/admin/notices", { method: "POST", body: j(n) });
export const updateNotice = (id: string, patch: Partial<Omit<NoticeItem, "id">>) =>
  call<{ ok: true; notice: NoticeItem }>(`/api/admin/notices/${encodeURIComponent(id)}`, { method: "PUT", body: j(patch) });
export const deleteNotice = (id: string) =>
  call<{ ok: true }>(`/api/admin/notices/${encodeURIComponent(id)}`, { method: "DELETE" });

/* ---------- 이벤트 ---------- */
export const listEvents = () => call<{ ok: true; events: EventItem[] }>("/api/admin/events");
export const createEvent = (e: Omit<EventItem, "id">) =>
  call<{ ok: true; event: EventItem }>("/api/admin/events", { method: "POST", body: j(e) });
export const updateEvent = (id: string, patch: Partial<Omit<EventItem, "id">>) =>
  call<{ ok: true; event: EventItem }>(`/api/admin/events/${encodeURIComponent(id)}`, { method: "PUT", body: j(patch) });
export const deleteEvent = (id: string) =>
  call<{ ok: true }>(`/api/admin/events/${encodeURIComponent(id)}`, { method: "DELETE" });

/* ---------- 설정 ---------- */
export const getSettings = () => call<{ ok: true; popupEnabled: boolean }>("/api/admin/settings");
export const setPopupEnabled = (popupEnabled: boolean) =>
  call<{ ok: true; popupEnabled: boolean }>("/api/admin/settings", { method: "PUT", body: j({ popupEnabled }) });
