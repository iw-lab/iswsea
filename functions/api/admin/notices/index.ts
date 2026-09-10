// GET /api/admin/notices (전체) · POST (생성 — 맨 위에 추가)
import { type Env, ValidationError, fail, json, readJson } from "../../../_lib/http";
import { type NoticeRow, newId, noticeFromRow, parseNotice } from "../../../_lib/content";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const rows = await env.DB.prepare("SELECT * FROM notices ORDER BY sort ASC, updated_at DESC").all<NoticeRow>();
  return json({ ok: true, notices: rows.results.map(noticeFromRow) });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  if (!body) return fail(400, "JSON 본문이 필요합니다");
  try {
    const n = parseNotice(body);
    const id = newId("n");
    const min = await env.DB.prepare("SELECT COALESCE(MIN(sort), 0) AS m FROM notices").first<{ m: number }>();
    await env.DB.prepare("INSERT INTO notices (id,title,content,date,important,active,sort) VALUES (?,?,?,?,?,?,?)")
      .bind(id, n.title, n.content, n.date, n.important ? 1 : 0, n.active ? 1 : 0, (min?.m ?? 0) - 1)
      .run();
    return json({ ok: true, notice: { id, ...n } }, { status: 201 });
  } catch (e) {
    if (e instanceof ValidationError) return fail(400, e.message);
    throw e;
  }
};
