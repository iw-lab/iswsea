// GET /api/admin/events (전체) · POST (생성 — 맨 위에 추가)
import { type Env, ValidationError, fail, json, readJson } from "../../../_lib/http";
import { type EventRow, eventFromRow, newId, parseEvent } from "../../../_lib/content";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const rows = await env.DB.prepare("SELECT * FROM events ORDER BY sort ASC, updated_at DESC").all<EventRow>();
  return json({ ok: true, events: rows.results.map(eventFromRow) });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  if (!body) return fail(400, "JSON 본문이 필요합니다");
  try {
    const ev = parseEvent(body);
    const id = newId("e");
    const min = await env.DB.prepare("SELECT COALESCE(MIN(sort), 0) AS m FROM events").first<{ m: number }>();
    await env.DB.prepare(
      "INSERT INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES (?,?,?,?,?,?,?,?,?,?)"
    )
      .bind(id, ev.title, ev.period, ev.description, ev.highlight ?? null, JSON.stringify(ev.conditions), ev.badge ?? null, ev.color, ev.active ? 1 : 0, (min?.m ?? 0) - 1)
      .run();
    return json({ ok: true, event: { id, ...ev } }, { status: 201 });
  } catch (e) {
    if (e instanceof ValidationError) return fail(400, e.message);
    throw e;
  }
};
