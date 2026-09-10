// 공지·이벤트 행 ↔ API 객체 변환 및 입력 검증
import { ValidationError, bool, hexColor, str, strList } from "./http";

export interface NoticeRow {
  id: string;
  title: string;
  content: string;
  date: string;
  important: number;
  active: number;
  sort: number;
}
export interface EventRow {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight: string | null;
  conditions: string;
  badge: string | null;
  color: string;
  active: number;
  sort: number;
}

export interface NoticeDto {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  active: boolean;
}
export interface EventDto {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight?: string;
  conditions: string[];
  badge?: string;
  color: string;
  active: boolean;
}

export function noticeFromRow(r: NoticeRow): NoticeDto {
  return { id: r.id, title: r.title, content: r.content, date: r.date, important: r.important === 1, active: r.active === 1 };
}

export function eventFromRow(r: EventRow): EventDto {
  let conditions: string[] = [];
  try {
    const v = JSON.parse(r.conditions);
    if (Array.isArray(v)) conditions = v.filter((x): x is string => typeof x === "string");
  } catch {
    conditions = [];
  }
  return {
    id: r.id,
    title: r.title,
    period: r.period,
    description: r.description,
    highlight: r.highlight ?? undefined,
    conditions,
    badge: r.badge ?? undefined,
    color: r.color,
    active: r.active === 1,
  };
}

/** 생성/수정 입력 → 저장 가능한 형태. base 가 있으면 부분 수정(없는 필드는 base 유지). */
export function parseNotice(body: Record<string, unknown>, base?: NoticeDto): Omit<NoticeDto, "id"> {
  const has = (k: string) => Object.prototype.hasOwnProperty.call(body, k);
  return {
    title: has("title") || !base ? str(body.title, "제목", 120, { required: true }) : base.title,
    content: has("content") || !base ? str(body.content, "내용", 4000) : base.content,
    date: has("date") || !base ? str(body.date, "날짜", 40) : base.date,
    important: has("important") ? bool(body.important, false) : (base?.important ?? false),
    active: has("active") ? bool(body.active, true) : (base?.active ?? true),
  };
}

export function parseEvent(body: Record<string, unknown>, base?: EventDto): Omit<EventDto, "id"> {
  const has = (k: string) => Object.prototype.hasOwnProperty.call(body, k);
  const highlight = has("highlight") || !base ? str(body.highlight, "강조 문구", 80) : (base.highlight ?? "");
  const badge = has("badge") || !base ? str(body.badge, "뱃지", 20) : (base.badge ?? "");
  return {
    title: has("title") || !base ? str(body.title, "제목", 120, { required: true }) : base.title,
    period: has("period") || !base ? str(body.period, "기간", 200) : base.period,
    description: has("description") || !base ? str(body.description, "설명", 2000) : base.description,
    highlight: highlight || undefined,
    conditions: has("conditions") || !base ? strList(body.conditions, "조건", 20, 300) : base.conditions,
    badge: badge || undefined,
    color: has("color") || !base ? hexColor(body.color, base?.color ?? "#4f8a8b") : base.color,
    active: has("active") ? bool(body.active, true) : (base?.active ?? true),
  };
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export { ValidationError };
