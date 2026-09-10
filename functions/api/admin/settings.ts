// GET /api/admin/settings · PUT { popupEnabled }
import { type Env, fail, json, readJson } from "../../_lib/http";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'popup_enabled'").first<{ value: string }>();
  return json({ ok: true, popupEnabled: row ? row.value === "1" : true });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  // 엄격 검증 — 오타 문자열이 조용히 true 로 저장되지 않게 boolean 만 받는다
  if (!body || typeof body.popupEnabled !== "boolean") return fail(400, "popupEnabled 는 true/false 여야 합니다");
  const enabled = body.popupEnabled;
  await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('popup_enabled', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(enabled ? "1" : "0")
    .run();
  return json({ ok: true, popupEnabled: enabled });
};
