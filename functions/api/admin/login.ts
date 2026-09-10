// POST /api/admin/login { password } → 세션 쿠키. 실패 5회/15분(IP) 제한.
import { type Env, clientIp, fail, json, readJson } from "../../_lib/http";
import { clearLoginFailures, createSessionToken, currentPasswordHash, reserveLoginAttempt, sessionCookie, verifyPassword } from "../../_lib/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.SESSION_SECRET) return fail(500, "서버 설정(SESSION_SECRET)이 없습니다");
  const ip = clientIp(request);

  const body = await readJson(request);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!password || password.length > 200) return fail(400, "비밀번호를 입력하세요");

  // 검증 전에 시도를 원자적으로 예약 — 동시 요청으로 한도를 넘길 수 없다
  const attempt = await reserveLoginAttempt(env, ip);
  if (!attempt.allowed) {
    return fail(429, `로그인 시도가 너무 많습니다. ${Math.ceil(attempt.retryAfterSec / 60)}분 후 다시 시도하세요`, {
      retryAfterSec: attempt.retryAfterSec,
    });
  }

  const stored = await currentPasswordHash(env);
  if (!stored) return fail(500, "관리자 비밀번호가 설정되지 않았습니다");

  const ok = await verifyPassword(password, stored);
  if (!ok) return fail(401, "비밀번호가 올바르지 않습니다");
  await clearLoginFailures(env, ip);
  const token = await createSessionToken(env);
  return json({ ok: true }, { headers: { "set-cookie": sessionCookie(token) } });
};
