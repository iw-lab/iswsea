// POST /api/admin/logout — 세션 쿠키 제거
import { type Env, json } from "../../_lib/http";
import { clearSessionCookie } from "../../_lib/auth";

export const onRequestPost: PagesFunction<Env> = async () =>
  json({ ok: true }, { headers: { "set-cookie": clearSessionCookie() } });
