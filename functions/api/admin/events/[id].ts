// PUT /api/admin/events/:id (부분 수정) · DELETE
import { type Env, ValidationError, fail, idParam, json, readJson } from "../../../_lib/http";
import { type EventRow, eventFromRow, parseEvent } from "../../../_lib/content";

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    const id = idParam(params.id);
    const body = await readJson(request);
    if (!body) return fail(400, "JSON 본문이 필요합니다");
    const row = await env.DB.prepare("SELECT * FROM events WHERE id = ?").bind(id).first<EventRow>();
    if (!row) return fail(404, "이벤트를 찾을 수 없습니다");
    const ev = parseEvent(body, eventFromRow(row));
    // 전달된 필드만 갱신한다 — 동시에 들어온 다른 부분 수정을 옛 값으로 되돌리지 않는다
    const cols: Record<string, unknown> = {
      title: ev.title,
      period: ev.period,
      description: ev.description,
      highlight: ev.highlight ?? null,
      conditions: JSON.stringify(ev.conditions),
      badge: ev.badge ?? null,
      color: ev.color,
      active: ev.active ? 1 : 0,
    };
    const keys = Object.keys(cols).filter((k) => Object.prototype.hasOwnProperty.call(body, k));
    if (keys.length > 0) {
      await env.DB.prepare(
        `UPDATE events SET ${keys.map((k) => `${k}=?`).join(", ")}, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?`
      )
        .bind(...keys.map((k) => cols[k]), id)
        .run();
    }
    return json({ ok: true, event: { id, ...ev } });
  } catch (e) {
    if (e instanceof ValidationError) return fail(400, e.message);
    throw e;
  }
};

export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = idParam(params.id);
    const r = await env.DB.prepare("DELETE FROM events WHERE id = ?").bind(id).run();
    if (!r.meta.changes) return fail(404, "이벤트를 찾을 수 없습니다");
    return json({ ok: true });
  } catch (e) {
    if (e instanceof ValidationError) return fail(400, e.message);
    throw e;
  }
};
