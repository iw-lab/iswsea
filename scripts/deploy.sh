#!/usr/bin/env bash
# 숲속의바다 배포 — Cloudflare Pages(정적 out/ + functions/) + D1 마이그레이션
# 사용: bash scripts/deploy.sh            (production = main 브랜치)
#      bash scripts/deploy.sh preview    (preview 배포)
# 전제: wrangler login 완료, wrangler.toml 의 database_id 가 실제 D1 uuid,
#      Pages 시크릿 SESSION_SECRET / ADMIN_PASSWORD_HASH 설정됨(아래 안내 참고)
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT=woodinsea
BRANCH=${1:-main}

# ① 자리표시자 DB id 로 배포하면 /api 가 조용히 죽는다 — 먼저 막는다
if grep -q 'database_id = "00000000-0000-0000-0000-000000000000"' wrangler.toml; then
  echo "✗ wrangler.toml 의 database_id 가 자리표시자다. 먼저:  wrangler d1 create woodinsea  → uuid 를 wrangler.toml 에 넣을 것" >&2
  exit 2
fi

# ② 시크릿 존재 확인(값은 보이지 않는다)
missing=()
for s in SESSION_SECRET ADMIN_PASSWORD_HASH; do
  wrangler pages secret list --project-name "$PROJECT" 2>/dev/null | grep -q "\"$s\"\|$s" || missing+=("$s")
done
if [ ${#missing[@]} -gt 0 ]; then
  echo "✗ Pages 시크릿 없음: ${missing[*]}" >&2
  echo "   SESSION_SECRET:       openssl rand -hex 32 | wrangler pages secret put SESSION_SECRET --project-name $PROJECT" >&2
  echo "   ADMIN_PASSWORD_HASH:  node scripts/hash-password.mjs '초기비밀번호' | wrangler pages secret put ADMIN_PASSWORD_HASH --project-name $PROJECT" >&2
  exit 2
fi

# ③ 빌드 → 원격 D1 마이그레이션(멱등) → 배포
npm run build
wrangler d1 migrations apply woodinsea --remote
wrangler pages deploy out --project-name "$PROJECT" --branch "$BRANCH" --commit-dirty=true

# ④ 헬스체크
URL="https://$PROJECT.pages.dev"
[ "$BRANCH" != "main" ] && URL="https://$BRANCH.$PROJECT.pages.dev"
sleep 5
code=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/content")
echo "헬스체크 $URL/api/content → $code"
[ "$code" = "200" ] || { echo "✗ /api/content 가 200 이 아니다. D1 바인딩·마이그레이션을 확인할 것" >&2; exit 3; }
echo "✓ 배포 완료: $URL"
