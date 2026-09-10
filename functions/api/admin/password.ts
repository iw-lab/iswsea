// PUT /api/admin/password { current, next } — 현재 비밀번호 확인 후 새 해시를 settings 에 저장
import { type Env, clientIp, fail, json, readJson } from "../../_lib/http";
import {
  bumpSessionEpoch,
  clearLoginFailures,
  createSessionToken,
  currentPasswordHash,
  hashPassword,
  reserveLoginAttempt,
  sessionCookie,
  verifyPassword,
} from "../../_lib/auth";

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson(request);
  const current = typeof body?.current === "string" ? body.current : "";
  const next = typeof body?.next === "string" ? body.next : "";
  if (!current || current.length > 200) return fail(400, "현재 비밀번호를 입력하세요");
  if (next.length < 8 || next.length > 100) return fail(400, "새 비밀번호는 8자 이상 100자 이하여야 합니다");
  if (next === current) return fail(400, "현재 비밀번호와 다른 비밀번호를 입력하세요");

  // 현재 비밀번호 확인도 로그인과 같은 시도 제한을 받는다(세션 탈취 후 브루트포스 방지)
  const attempt = await reserveLoginAttempt(env, clientIp(request));
  if (!attempt.allowed) return fail(429, `시도가 너무 많습니다. ${Math.ceil(attempt.retryAfterSec / 60)}분 후 다시 시도하세요`);

  const stored = await currentPasswordHash(env);
  if (!stored || !(await verifyPassword(current, stored))) return fail(401, "현재 비밀번호가 올바르지 않습니다");
  await clearLoginFailures(env, clientIp(request));

  const hash = await hashPassword(next);
  await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('password_hash', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(hash)
    .run();
  // 기존 세션(탈취분 포함)을 전부 끊고, 지금 이 브라우저에만 새 세션을 발급한다
  await bumpSessionEpoch(env);
  const token = await createSessionToken(env);
  return json({ ok: true }, { headers: { "set-cookie": sessionCookie(token) } });
};
