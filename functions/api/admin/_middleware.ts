// /api/admin/* 공통 가드 — 로그인 외 전부 세션 필수, 변경 요청은 같은 출처만
import { type Env, fail, sameOrigin } from "../../_lib/http";
import { isAuthenticated } from "../../_lib/auth";

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;
  const path = new URL(request.url).pathname;
  const mutating = request.method !== "GET" && request.method !== "HEAD";

  if (mutating && !sameOrigin(request)) return fail(403, "잘못된 요청 출처입니다");
  if (path.endsWith("/api/admin/login")) return ctx.next();
  if (!(await isAuthenticated(request, env))) return fail(401, "로그인이 필요합니다");
  return ctx.next();
};
