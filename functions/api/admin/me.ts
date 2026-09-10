// GET /api/admin/me — 세션 유효 여부(미들웨어를 통과했으면 유효)
import { type Env, json } from "../../_lib/http";

export const onRequestGet: PagesFunction<Env> = async () => json({ ok: true });
