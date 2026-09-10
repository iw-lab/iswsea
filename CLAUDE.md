# CLAUDE.md v37.0 ULTIMATE - 완전 자율 AI 에이전트 시스템

> ⚠️ **Claude Code 자동 적용** | 120+ AI 에이전트 교차검증 통합 | 완전 자율 개발 시스템
> `claude --dangerously-skip-permissions` 실행 시 질문 없이 완료까지 자율 실행

---

## 🚀 0. 자동 환경 설치 시스템 (AUTO-BOOTSTRAP)

### 0.1 풀스택 원클릭 설치 스크립트
```bash
#!/bin/bash
# Claude Code가 풀스택/게임/앱 요청 시 자동 실행

# === 시스템 CLI 설치 ===
install_system() {
  command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs; }
  command -v pnpm >/dev/null || npm i -g pnpm
  command -v bun >/dev/null || curl -fsSL https://bun.sh/install | bash
  command -v vercel >/dev/null || npm i -g vercel
  command -v supabase >/dev/null || npm i -g supabase
  command -v prisma >/dev/null || npm i -g prisma
  command -v turbo >/dev/null || npm i -g turbo
  command -v playwright >/dev/null || npx playwright install
}

# === MCP 서버 일괄 설치 ===
install_mcp() {
  MCPS="filesystem github git postgres supabase puppeteer playwright memory brave-search tavily exa firecrawl docker vercel netlify stripe sentry slack notion gdrive linear jira aws cloudflare mongodb redis"
  for mcp in $MCPS; do
    claude mcp add $mcp --scope project 2>/dev/null || true
  done
}

# === 프로젝트 초기화 ===
init_nextjs() {
  pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" -y
  pnpm add zustand @tanstack/react-query zod react-hook-form @hookform/resolvers
  pnpm add framer-motion lucide-react clsx tailwind-merge class-variance-authority
  pnpm add next-themes next-auth@beta @auth/prisma-adapter
  pnpm add -D vitest @testing-library/react @playwright/test prettier eslint-config-prettier
  npx shadcn@latest init -y && npx shadcn@latest add button card dialog form input label select tabs toast sheet dropdown-menu avatar badge separator skeleton switch textarea tooltip popover command calendar -y
}

# === 게임 개발 추가 패키지 ===
init_game() {
  pnpm add pixi.js @pixi/react howler matter-js @dimforge/rapier2d-compat
  pnpm add zustand immer use-sound lottie-react canvas-confetti
}

# === AI 기능 추가 패키지 ===
init_ai() {
  pnpm add ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google openai @anthropic-ai/sdk @google/generative-ai
}

# 실행
install_system && install_mcp && init_nextjs
echo "✅ 환경 설치 완료"
```

### 0.2 자동 설치 트리거 매핑
```yaml
AUTO_INSTALL:
  # 키워드 감지 시 자동 설치
  "풀스택|앱 만들어|웹앱|프로젝트|사이트":
    CLI: [node, pnpm, vercel, supabase, prisma]
    MCP: [filesystem, github, git, postgres, supabase, puppeteer, memory]
    PKG: [Next.js15, TypeScript, Tailwind, shadcn/ui, Zustand, TanStack-Query, Zod]
  
  "게임|game|타워디펜스|RPG|퍼즐|슈팅":
    추가PKG: [pixi.js, howler, matter-js, rapier2d, canvas-confetti]
    추가MCP: [memory, filesystem]
  
  "AI|챗봇|GPT|Claude|Gemini":
    추가PKG: [ai-sdk, openai, anthropic, google-genai]
    추가MCP: [openai, anthropic]
  
  "결제|payment|구독|Stripe":
    추가PKG: [stripe, @stripe/stripe-js, @stripe/react-stripe-js]
    추가MCP: [stripe]
  
  "이메일|mail|뉴스레터":
    추가PKG: [resend, @react-email/components, nodemailer]
    추가MCP: [sendgrid, resend]
  
  "크롤링|스크래핑|웹수집":
    추가PKG: [puppeteer, cheerio, playwright]
    추가MCP: [puppeteer, playwright, firecrawl, browserbase]
```

---

## 🤖 1. 에이전트 코어 시스템 (AGENT CORE)

### 1.1 실행 명령어
```bash
claude --dangerously-skip-permissions                    # 완전 자율
claude --dangerously-skip-permissions "쇼핑몰 만들어줘"   # 즉시 실행
claude --dangerously-skip-permissions --continue         # 이어서
claude --dangerously-skip-permissions --resume           # 중단 재개
```

### 1.2 에이전트 핵심 원칙
```yaml
AGENT_PRINCIPLES:
  1_NO_QUESTIONS: 
    금지: ["~할까요?", "~해도 될까요?", "어떤 것을 원하시나요?", "선택해 주세요"]
    대신: 최선 판단 → 즉시 실행 → 결과만 보고
  
  2_AUTONOMOUS_DECISIONS:
    프레임워크: Next.js 15 (App Router) + TypeScript 5.x
    스타일링: Tailwind CSS + shadcn/ui + Framer Motion
    상태: Zustand(클라이언트) + TanStack Query(서버)
    DB: Supabase(기본) | Prisma+PostgreSQL | Firebase
    인증: NextAuth.js v5 | Clerk | Supabase Auth
    배포: Vercel(기본) | Netlify | Railway
  
  3_COMPLETE_UNTIL_DONE:
    에러발생: 자동수정 최대 5회
    5회실패: 다른 방법/라이브러리로 재설계
    빌드실패: 원인분석 → 수정 → 재빌드 → 성공까지
    서버다운: 자동복구 → 헬스체크 → 재시작
  
  4_MINIMAL_REPORTING:
    금지: "이제 ~합니다", "다음으로 ~", 진행상황 설명
    허용: 완료 후 최종 결과물 + 실행방법만
  
  5_ZERO_INCOMPLETENESS:
    절대금지: TODO, FIXME, PLACEHOLDER, "...", "// 생략", "나중에"
    필수: 모든 코드 100% 완성, 실제 콘텐츠 채움
```

### 1.3 자율 결정 트리
```yaml
DECISION_MATRIX:
  콘텐츠_수량:
    쇼핑몰: {상품: 50+, 카테고리: 10+, 리뷰: 100+, 사용자: 30+}
    게임: {캐릭터: 20+, 아이템: 100+, 스킬: 50+, 스테이지: 20+, 업적: 30+}
    블로그: {포스트: 30+, 카테고리: 5+, 태그: 20+}
    SNS: {포스트: 100+, 사용자: 50+, 댓글: 200+}
    교육앱: {강의: 20+, 퀴즈: 100+, 레벨: 10+}
    대시보드: {차트: 10+, 위젯: 15+, 리포트: 5+}
  
  디자인_스타일:
    쇼핑몰: 깔끔+신뢰감, 화이트스페이스, 제품강조
    게임: 다크테마+네온/그라데이션, 화려한효과
    교육: 밝고친근한, 큰폰트, 직관적UI
    비즈니스: 프로페셔널+미니멀, 데이터중심
    소셜: 모던+인터랙티브, 카드레이아웃
  
  에러처리_전략:
    1회: 직접수정
    2회: 에러메시지 기반 분석수정
    3회: 관련코드 전체검토
    4회: 다른라이브러리/방법 시도
    5회: 기능단순화 재구현
    6회+: 해당기능 제외, 사용자보고
```

---

## 🚨 2. 치명적 오류 자동 복구 (CRITICAL AUTO-RECOVERY)

### 2.1 감지 패턴
```yaml
CRITICAL_DETECTION:
  즉시중단_패턴:
    - 동일로그 5회연속, 응답없음 10초+
    - "Maximum call stack", "heap out of memory"
    - "FATAL ERROR", "CALL_AND_RETRY_LAST"
    - CPU 90%+ 지속, 메모리 급증
    - "ECONNREFUSED", 포트사용불가
    - "RangeError", "InternalError"
  
  자동복구_프로토콜:
    1. pkill -f "npm run dev" && pkill -f "next dev" && pkill -f node
    2. lsof -ti:3000,3001,5173 | xargs kill -9 2>/dev/null
    3. 최근변경파일 분석 → 문제코드 특정
    4. 안전장치 추가 (탈출조건, 제한, cleanup)
    5. npm run dev & sleep 5 && curl -s localhost:3000 | head -1
    6. 정상응답 확인 후 작업재개
```

### 2.2 필수 안전장치 (모든 프로젝트 자동생성)
```typescript
// lib/safety.ts - 모든 프로젝트에 자동 포함
export const Safety = {
  // 안전한 루프
  safeLoop: <T>(fn: (i: number) => T | undefined, max = 10000): T[] => {
    const r: T[] = [];
    for (let i = 0; i < max; i++) { const v = fn(i); if (v === undefined) break; r.push(v); }
    return r;
  },
  // 안전한 재귀
  safeRecursion: <T>(fn: (d: number) => T, max = 100, cur = 0): T => {
    if (cur >= max) throw new Error(`재귀초과:${max}`);
    return fn(cur);
  },
  // 타임아웃 래퍼
  withTimeout: <T>(p: Promise<T>, ms: number): Promise<T> =>
    Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error('타임아웃')), ms))]),
  // API 호출 제한
  rateLimit: (max: number, windowMs: number) => {
    const calls: number[] = [];
    return async <T>(fn: () => Promise<T>): Promise<T> => {
      const now = Date.now();
      const recent = calls.filter(t => t > now - windowMs);
      if (recent.length >= max) throw new Error(`호출제한:${max}/${windowMs}ms`);
      calls.push(now);
      return fn();
    };
  },
};

// lib/logger.ts - 상세 에러 로깅
export const logger = {
  error: (msg: string, ctx?: Record<string, any>) => {
    console.log('\n' + '═'.repeat(60));
    console.log(`🔴 ERROR: ${msg}`);
    console.log(`📍 ${new Date().toISOString()}`);
    if (ctx?.file) console.log(`📁 ${ctx.file}:${ctx.line}`);
    if (ctx?.stack) console.log(`📚 ${ctx.stack}`);
    if (ctx?.data) console.log(`📊 ${JSON.stringify(ctx.data, null, 2)}`);
    console.log('═'.repeat(60) + '\n');
  },
  warn: (m: string, c?: any) => console.warn(`⚠️ ${m}`, c || ''),
  info: (m: string, c?: any) => console.info(`ℹ️ ${m}`, c || ''),
  debug: (m: string, c?: any) => process.env.DEBUG && console.log(`🐛 ${m}`, c || ''),
};
```

---

## 🔴 3. 필수 규칙 (MUST/NEVER)

### 3.1 절대 금지 (NEVER)
```yaml
NEVER_DO:
  질문: ["~할까요?", "~해도 될까요?", "선택해주세요", "확인해주세요"]
  미완성: [TODO, FIXME, PLACEHOLDER, "...", "// 생략", "나중에 추가", "여기에 구현"]
  임시값: ["My App", "앱 이름", "Lorem ipsum", "test@test.com", "example.com"]
  나쁜코드: [any남용, 빈배열반환, 에러무시, console.log남발]
  위험행위: [무한루프방치, 메모리누수무시, API무한호출]
  불완전: [기본파비콘, 기본템플릿, 목업UI, 스켈레톤만]
  반복실패: [같은방법 3회이상 시도, 동일에러 반복]
```

### 3.2 필수 사항 (MUST)
```yaml
MUST_DO:
  코드품질:
    - TypeScript strict 모드
    - 모든 함수 타입 명시
    - 에러 바운더리 필수
    - 로딩/에러/빈상태 처리
    - 옵셔널체이닝 사용
  
  완성도:
    - 모든 페이지 100% 구현
    - 실제 콘텐츠로 채움 (목업X)
    - 반응형 + 다크모드
    - SEO 메타태그 + OG이미지
    - 접근성(a11y) 준수
    - 한국어 UI 기본
  
  검증:
    - 서버 실행하며 개발 (npm run dev)
    - 오류시 전체스캔 (tsc + lint + build)
    - 2회 실패시 재설계
    - 빌드 성공 확인 후 완료 선언
    - 배포 후 헬스체크
  
  보안:
    - 환경변수로 API키 관리
    - 입력값 검증 (Zod)
    - XSS/CSRF 방지
    - Rate limiting
```

---

## 📝 4. 코드 생성 필수 패턴

### 4.1 컴포넌트 패턴
```typescript
// 모든 컴포넌트에 필수 적용
'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';

// 1. 데이터 페칭 패턴
const { data, isLoading, error } = useQuery({...});
if (isLoading) return <Skeleton className="h-40" />;
if (error) return <ErrorCard message={error.message} retry={refetch} />;
if (!data?.length) return <EmptyState icon={Package} message="데이터가 없습니다" />;

// 2. 안전한 접근
const name = user?.profile?.name ?? '익명';
const items = data?.items ?? [];

// 3. 에러 래핑
<ErrorBoundary fallback={<ErrorCard />}>
  <Suspense fallback={<Skeleton />}>
    <Component />
  </Suspense>
</ErrorBoundary>

// 4. 폼 검증
const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '8자 이상 입력하세요'),
});
```

### 4.2 API 패턴
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const schema = z.object({...});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    // 비즈니스 로직
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: '입력값 오류', details: e.errors }, { status: 400 });
    }
    logger.error('API 오류', { stack: e instanceof Error ? e.stack : String(e) });
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
```

### 4.3 프로젝트 구조
```
src/
├── app/
│   ├── (auth)/login,register/page.tsx
│   ├── (main)/dashboard,settings/page.tsx
│   ├── api/[resource]/route.ts
│   ├── layout.tsx, page.tsx, error.tsx, loading.tsx, not-found.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn)
│   ├── layout/ (header, footer, sidebar, nav)
│   ├── features/ (도메인별 컴포넌트)
│   └── shared/ (error-boundary, loading, empty-state)
├── lib/
│   ├── db.ts (prisma/supabase), auth.ts, utils.ts
│   ├── logger.ts, safety.ts, api.ts
│   └── validations.ts
├── hooks/, stores/, types/, constants/
└── public/images,icons,fonts/
```

---

## 🎯 5. 자연어 트리거 시스템 (300+ 패턴)

### 5.1 오류/수정 트리거
```yaml
ERROR_TRIGGERS:
  한국어:
    - "오류 고쳐", "에러 수정", "버그 잡아", "문제 해결"
    - "안돼", "안 돼", "작동 안 해", "동작 안 해"
    - "빨간줄", "빨간 줄 없애", "밑줄 없애"
    - "왜 안돼", "뭐가 문제", "고장났어"
    - "타입 에러", "빌드 에러", "린트 에러", "런타임 에러"
    - "undefined", "null 에러", "import 에러"
    - "콘솔 에러", "터미널 에러", "500 에러", "404 에러"
    - "무한루프", "멈춤", "프리징", "CPU 100%"
  영어:
    - "fix", "debug", "solve", "repair", "correct"
    - "error", "bug", "issue", "problem", "broken"
    - "not working", "doesn't work", "failed"
  자동실행: [@autofix, @fix-type, @fix-lint, @fix-build, @debugger]
```

### 5.2 생성/개발 트리거
```yaml
CREATE_TRIGGERS:
  앱/웹:
    한국어: ["앱 만들어", "웹앱 만들어", "사이트 만들어", "프로젝트 시작", "새로 만들어"]
    영어: ["create app", "build app", "make website", "new project"]
    자동실행: [@project-manager, @architect, @fullstack]
  
  프론트엔드:
    한국어: ["화면 만들어", "UI 만들어", "페이지 추가", "컴포넌트 만들어", "디자인 해줘"]
    영어: ["create UI", "add page", "make component", "design"]
    자동실행: [@frontend-dev, @ui-designer]
  
  백엔드:
    한국어: ["API 만들어", "백엔드 개발", "서버 로직", "엔드포인트 추가", "DB 연결"]
    영어: ["create API", "backend", "server", "endpoint", "database"]
    자동실행: [@backend-dev, @database-admin]
  
  게임:
    한국어: ["게임 만들어", "웹게임", "타워디펜스", "RPG", "퍼즐", "슈팅", "캐주얼"]
    영어: ["create game", "web game", "tower defense", "puzzle game"]
    자동실행: [@game-designer, @game-dev, init_game()]
  
  풀스택:
    한국어: ["풀스택", "전체 만들어", "처음부터 끝까지", "완전한 앱"]
    영어: ["fullstack", "full stack", "complete app", "end to end"]
    자동실행: [@fullstack-dev, init_nextjs()]
```

### 5.3 최적화/디자인/배포 트리거
```yaml
OPTIMIZE_TRIGGERS:
  한국어: ["최적화", "성능 개선", "빠르게", "느려", "속도 개선", "로딩 빠르게", "번들 줄여", "비용 줄여"]
  영어: ["optimize", "improve performance", "faster", "slow", "reduce bundle"]
  자동실행: [@optimize-all, @optimizer]

DESIGN_TRIGGERS:
  한국어: ["디자인 해줘", "예쁘게", "이쁘게", "멋지게", "세련되게", "고급스럽게"]
  한국어2: ["다크모드", "반응형", "모바일", "애니메이션", "모션", "아이콘"]
  영어: ["design", "beautiful", "modern", "dark mode", "responsive", "animation"]
  자동실행: [@premium-design, @ui-designer, @dark-mode, @responsive, @animation]

TEST_TRIGGERS:
  한국어: ["테스트 해줘", "테스트 실행", "검증", "QA", "확인해봐"]
  영어: ["test", "run tests", "verify", "check", "validate"]
  자동실행: [@test-all, @qa-engineer]

DEPLOY_TRIGGERS:
  한국어: ["배포해줘", "배포", "릴리스", "라이브", "프로덕션", "올려줘"]
  영어: ["deploy", "release", "production", "publish", "launch"]
  자동실행: [@deploy, @devops]

RESEARCH_TRIGGERS:
  한국어: ["정확한 정보", "교차검증", "리서치", "조사", "검색", "찾아줘", "알아봐"]
  영어: ["research", "accurate", "verify", "search", "find information"]
  자동실행: [@deep-research, @researcher, @cross-validate]
```

### 5.4 에이전트 모드 활성화 키워드
```yaml
AGENT_MODE_ACTIVATION:
  강력 (완전 자율):
    - "[에이전트 모드]", "[자율 모드]", "[AUTO]", "[AGENT]"
    - "질문하지 말고", "질문 없이", "물어보지 말고"
    - "알아서 해줘", "알아서 판단", "스스로 결정"
    - "끝까지 완성", "완료까지", "멈추지 말고"
    - "완전히 만들어", "전부 구현", "모두 채워"
  
  동작:
    - 모든 확인 질문 비활성화
    - 자율 판단 최대화
    - 에러 자동 수정
    - 완료까지 중단 없음
```

### 5.5 콘텐츠/데이터 트리거
```yaml
CONTENT_TRIGGERS:
  한국어: ["콘텐츠 채워", "데이터 넣어", "더 추가", "상품 추가", "아이템 추가"]
  한국어2: ["리뷰 만들어", "포스트 추가", "사용자 추가", "더미 데이터"]
  영어: ["add content", "fill data", "add products", "create reviews", "seed data"]
  자동실행: [@content-creator, @gemini-generator]
```

---

## 🔌 6. MCP 서버 (50+)

### 6.1 핵심 MCP 설정
```json
{
  "mcpServers": {
    "filesystem": {"command": "npx", "args": ["-y", "@anthropic/mcp-filesystem"], "triggers": ["파일", "폴더", "읽어", "저장"]},
    "github": {"command": "npx", "args": ["-y", "@anthropic/mcp-github"], "env": {"GITHUB_TOKEN": "${GITHUB_TOKEN}"}, "triggers": ["PR", "이슈", "커밋", "푸시"]},
    "git": {"command": "npx", "args": ["-y", "@anthropic/mcp-git"], "triggers": ["커밋", "브랜치", "머지"]},
    "postgres": {"command": "npx", "args": ["-y", "@anthropic/mcp-postgres"], "env": {"DATABASE_URL": "${DATABASE_URL}"}, "triggers": ["DB", "쿼리", "테이블"]},
    "supabase": {"command": "npx", "args": ["-y", "@anthropic/mcp-supabase"], "env": {"SUPABASE_URL": "${SUPABASE_URL}", "SUPABASE_KEY": "${SUPABASE_KEY}"}, "triggers": ["Supabase", "인증", "스토리지"]},
    "mongodb": {"command": "npx", "args": ["-y", "mcp-mongodb"], "triggers": ["MongoDB", "NoSQL", "도큐먼트"]},
    "redis": {"command": "npx", "args": ["-y", "mcp-redis"], "triggers": ["Redis", "캐시", "세션"]},
    "puppeteer": {"command": "npx", "args": ["-y", "@anthropic/mcp-puppeteer"], "triggers": ["스크린샷", "브라우저", "크롤링"]},
    "playwright": {"command": "npx", "args": ["-y", "mcp-playwright"], "triggers": ["E2E", "테스트", "자동화"]},
    "memory": {"command": "npx", "args": ["-y", "@anthropic/mcp-memory"], "triggers": ["기억", "저장", "컨텍스트"]},
    "brave-search": {"command": "npx", "args": ["-y", "mcp-brave-search"], "env": {"BRAVE_API_KEY": "${BRAVE_API_KEY}"}, "triggers": ["검색", "웹검색"]},
    "tavily": {"command": "npx", "args": ["-y", "mcp-tavily"], "env": {"TAVILY_API_KEY": "${TAVILY_API_KEY}"}, "triggers": ["리서치", "조사"]},
    "exa": {"command": "npx", "args": ["-y", "mcp-exa"], "env": {"EXA_API_KEY": "${EXA_API_KEY}"}, "triggers": ["유사문서", "관련자료"]},
    "firecrawl": {"command": "npx", "args": ["-y", "mcp-firecrawl"], "env": {"FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"}, "triggers": ["크롤링", "스크래핑"]},
    "docker": {"command": "npx", "args": ["-y", "mcp-docker"], "triggers": ["도커", "컨테이너", "이미지"]},
    "vercel": {"command": "npx", "args": ["-y", "mcp-vercel"], "env": {"VERCEL_TOKEN": "${VERCEL_TOKEN}"}, "triggers": ["Vercel", "배포"]},
    "netlify": {"command": "npx", "args": ["-y", "mcp-netlify"], "env": {"NETLIFY_TOKEN": "${NETLIFY_TOKEN}"}, "triggers": ["Netlify"]},
    "cloudflare": {"command": "npx", "args": ["-y", "mcp-cloudflare"], "triggers": ["Cloudflare", "Workers", "KV"]},
    "aws": {"command": "npx", "args": ["-y", "mcp-aws"], "triggers": ["AWS", "S3", "Lambda"]},
    "stripe": {"command": "npx", "args": ["-y", "mcp-stripe"], "env": {"STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"}, "triggers": ["결제", "Stripe", "구독"]},
    "notion": {"command": "npx", "args": ["-y", "mcp-notion"], "env": {"NOTION_TOKEN": "${NOTION_TOKEN}"}, "triggers": ["노션", "Notion"]},
    "slack": {"command": "npx", "args": ["-y", "@anthropic/mcp-slack"], "env": {"SLACK_TOKEN": "${SLACK_TOKEN}"}, "triggers": ["Slack", "슬랙", "메시지"]},
    "gdrive": {"command": "npx", "args": ["-y", "@anthropic/mcp-gdrive"], "triggers": ["드라이브", "Google Drive"]},
    "linear": {"command": "npx", "args": ["-y", "mcp-linear"], "env": {"LINEAR_API_KEY": "${LINEAR_API_KEY}"}, "triggers": ["Linear", "이슈"]},
    "jira": {"command": "npx", "args": ["-y", "mcp-jira"], "env": {"JIRA_TOKEN": "${JIRA_TOKEN}"}, "triggers": ["Jira", "스프린트"]},
    "sentry": {"command": "npx", "args": ["-y", "mcp-sentry"], "env": {"SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}"}, "triggers": ["Sentry", "에러추적"]},
    "openai": {"command": "npx", "args": ["-y", "mcp-openai"], "env": {"OPENAI_API_KEY": "${OPENAI_API_KEY}"}, "triggers": ["GPT", "OpenAI"]},
    "anthropic": {"command": "npx", "args": ["-y", "mcp-anthropic"], "env": {"ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}"}, "triggers": ["Claude API"]},
    "context7": {"command": "npx", "args": ["-y", "@upstash/context7-mcp"], "triggers": ["문서", "라이브러리"]},
    "figma": {"url": "https://mcp.figma.com/mcp", "env": {"FIGMA_OAUTH_TOKEN": "${FIGMA_OAUTH_TOKEN}"}, "triggers": ["Figma", "디자인"]},
    "chrome-devtools": {"command": "npx", "args": ["-y", "chrome-devtools-mcp"], "triggers": ["Chrome", "DevTools", "디버깅"]}
  }
}
```

### 6.2 MCP 일괄 설치
```bash
claude mcp add filesystem github git postgres supabase mongodb redis puppeteer playwright memory --scope project
claude mcp add brave-search tavily exa firecrawl vercel netlify cloudflare stripe sentry --scope user
claude mcp add notion slack gdrive linear jira docker aws openai anthropic context7 --scope user
```

---

## ⚡ 7. Skills 시스템 (70+)

### 7.1 자동 수정 스킬
```yaml
@autofix:
  트리거: ["오류 고쳐", "에러 수정", "버그", "fix", "debug"]
  동작: 전체스캔(tsc+lint+build) → 에러추출 → 순차수정 → 재검증 → 0까지반복(최대5회)

@fix-type:
  트리거: ["타입 에러", "TS 에러", "TypeScript", "type error"]
  동작: npx tsc --noEmit → 타입에러추출 → 정확한타입추론/수정 → 재검증

@fix-lint:
  트리거: ["린트", "eslint", "prettier", "포맷"]
  동작: npm run lint → eslint --fix . → prettier --write .

@fix-build:
  트리거: ["빌드 에러", "빌드 실패", "build error"]
  동작: npm run build 2>&1 → 에러분석 → 의존성/설정수정 → 재빌드

@fix-runtime:
  트리거: ["런타임", "undefined", "null", "TypeError", "실행 에러"]
  동작: 스택트레이스분석 → 원인코드위치 → null체크/옵셔널체이닝추가

@infinite-loop-killer:
  트리거: ["무한루프", "멈춤", "프리징", "CPU", "응답없음"]
  동작: 프로세스kill → 루프/재귀스캔 → 탈출조건검증 → useEffect의존성검사 → 수정

@critical-debugger:
  트리거: 치명적오류 감지 시 자동
  동작: 프로세스상태확인 → 최근변경분석 → 문제코드위치 → 수정/안전장치 → 검증
```

### 7.2 최적화 스킬
```yaml
@optimize-all:
  트리거: ["최적화", "성능", "빠르게", "optimize"]
  하위: [@optimize-perf, @optimize-bundle, @optimize-db, @optimize-api, @optimize-cost]

@optimize-perf:
  동작: React.memo, useMemo, useCallback, next/image, lazy loading, code splitting

@optimize-bundle:
  동작: @next/bundle-analyzer → 불필요의존성제거 → tree shaking → dynamic import

@optimize-db:
  동작: 인덱스추가, N+1해결, 쿼리캐싱, 커넥션풀링, 쿼리최적화

@optimize-api:
  동작: API호출최소화, 배치처리, 캐싱전략, debounce/throttle

@optimize-cost:
  동작: 무료티어활용, 서버리스최적화, CDN활용, 이미지최적화
```

### 7.3 생성 스킬
```yaml
@fullstack:
  트리거: ["앱 만들어", "웹앱", "풀스택", "프로젝트"]
  동작:
    1. 환경설치 (CLI, MCP, 패키지)
    2. 프로젝트구조생성
    3. DB스키마설계 (Prisma/Supabase)
    4. API라우트구현
    5. UI컴포넌트생성 (shadcn/ui)
    6. 인증시스템 (NextAuth)
    7. 콘텐츠채움 (Gemini활용)
    8. 테스트작성
    9. 배포설정

@frontend:
  트리거: ["화면", "UI", "컴포넌트", "페이지"]
  동작: 컴포넌트설계 → shadcn/ui활용 → 반응형구현 → 애니메이션추가

@backend:
  트리거: ["API", "백엔드", "서버", "엔드포인트"]
  동작: 라우트설계 → 검증스키마(Zod) → 비즈니스로직 → 에러처리

@database:
  트리거: ["DB", "데이터베이스", "스키마", "테이블"]
  동작: ERD설계 → Prisma스키마 → 마이그레이션 → 시드데이터

@auth:
  트리거: ["로그인", "인증", "회원가입", "OAuth"]
  동작: NextAuth설정 → 프로바이더추가 → 세션관리 → 권한체크

@game-dev:
  트리거: ["게임", "웹게임", "타워디펜스", "RPG"]
  동작:
    1. 게임기획서생성 (장르, 시스템, 밸런스)
    2. 게임루프구현 (requestAnimationFrame)
    3. 캐릭터/아이템시스템 (100+)
    4. 스킬/전투시스템 (50+)
    5. 스테이지/레벨시스템 (20+)
    6. 사운드효과 (Howler.js)
    7. 저장/로드 (localStorage/Supabase)
    8. 리더보드/업적
    9. 밸런스조정

@landing-page:
  트리거: ["랜딩", "소개페이지", "마케팅"]
  동작: 히어로섹션 → 기능소개 → 가격표 → 후기 → CTA → 푸터
```

### 7.4 디자인 스킬
```yaml
@premium-design:
  트리거: ["디자인", "예쁘게", "이쁘게", "세련되게", "고급스럽게"]
  동작:
    - 모던UI패턴 (Glassmorphism, Neumorphism, Gradient)
    - 색상팔레트최적화 (60-30-10 규칙)
    - 타이포그래피설정 (Pretendard, Inter)
    - 그라데이션/그림자효과
    - 마이크로인터랙션 (Framer Motion)
    - 일관된디자인시스템

@dark-mode:
  트리거: ["다크모드", "어두운테마", "dark mode"]
  동작: next-themes설정 → CSS변수 → 토글컴포넌트 → 시스템설정연동

@responsive:
  트리거: ["반응형", "모바일", "태블릿", "responsive"]
  동작: 모바일퍼스트 → 브레이크포인트 → 컨테이너쿼리 → 터치최적화

@animation:
  트리거: ["애니메이션", "모션", "움직이게", "효과"]
  동작: Framer Motion설정 → 페이지전환 → 스크롤애니메이션 → 호버효과
```

### 7.5 리서치/테스트/배포 스킬
```yaml
@deep-research:
  트리거: ["정확한 정보", "교차검증", "리서치", "조사"]
  동작:
    1. 100+사이트검색 (Brave, Tavily, Exa MCP)
    2. 정보수집및분류
    3. 신뢰도등급평가 (A:정부학술, B:언론, C:미디어, D:블로그)
    4. 3개+출처교차검증
    5. 검증된정보만사용

@test-all:
  트리거: ["테스트", "테스트 실행", "QA", "검증"]
  동작: vitest(유닛) → @testing-library(통합) → playwright(E2E)

@security-scan:
  트리거: ["보안", "취약점", "security"]
  동작: npm audit → 의존성취약점 → 코드보안패턴 → 환경변수노출검사

@deploy:
  트리거: ["배포", "deploy", "릴리스", "프로덕션"]
  동작:
    1. 빌드테스트 (npm run build)
    2. 환경변수검증
    3. 배포실행 (vercel --prod)
    4. 헬스체크 (curl 배포URL)
    5. 롤백준비

@documentation:
  트리거: ["문서", "README", "문서화", "docs"]
  동작: README생성 → API문서 → 컴포넌트문서 → 배포가이드
```

---

## 🤖 8. 서브에이전트 (20+)

### 8.1 역할별 에이전트
```yaml
PROJECT_AGENTS:
  @project-manager:
    역할: 프로젝트총괄
    책임: [요구분석, 태스크분해(BabyAGI), 우선순위, 진행추적]
    트리거: [프로젝트시작, 복잡한요구사항, "계획 세워"]
  
  @architect:
    역할: 시스템아키텍처
    책임: [기술스택선택, 시스템구조, 데이터모델링, API설계]
    트리거: [새프로젝트, "설계해", "구조 잡아"]

DEVELOPMENT_AGENTS:
  @frontend-dev:
    역할: 프론트엔드
    책임: [UI컴포넌트, 상태관리, 스타일링, 성능최적화]
    트리거: ["화면", "UI", "컴포넌트", "프론트"]
  
  @backend-dev:
    역할: 백엔드
    책임: [API개발, DB로직, 인증/인가, 비즈니스로직]
    트리거: ["API", "백엔드", "서버"]
  
  @fullstack-dev:
    역할: 풀스택
    책임: [프론트+백엔드통합, E2E기능구현]
    트리거: ["앱 만들어", "기능 구현", "풀스택"]
  
  @database-admin:
    역할: 데이터베이스
    책임: [스키마설계, 쿼리최적화, 마이그레이션, 백업]
    트리거: ["DB", "스키마", "쿼리", "테이블"]
  
  @game-developer:
    역할: 게임개발
    책임: [게임루프, 물리엔진, 렌더링, 상태관리]
    트리거: ["게임 개발", "게임 로직"]

QUALITY_AGENTS:
  @qa-engineer:
    역할: 품질보증
    책임: [테스트케이스, 버그탐지, 회귀테스트, 성능테스트]
    트리거: ["테스트", "QA", "버그 찾아"]
  
  @code-reviewer:
    역할: 코드리뷰
    책임: [코드품질, 베스트프랙티스, 보안검사, 리팩토링제안]
    트리거: ["리뷰", "코드 확인", "검토"]
  
  @debugger:
    역할: 디버깅전문가
    책임: [에러원인분석, 스택해석, 재현단계, 수정제안]
    트리거: ["에러", "버그", "안돼", "문제"]

OPERATIONS_AGENTS:
  @devops:
    역할: DevOps
    책임: [CI/CD, 인프라, 배포자동화, 모니터링]
    트리거: ["배포", "CI/CD", "파이프라인", "인프라"]
  
  @security:
    역할: 보안전문가
    책임: [취약점스캔, 인증검토, 암호화, 침투테스트]
    트리거: ["보안", "취약점", "해킹", "security"]
  
  @optimizer:
    역할: 성능/비용최적화
    책임: [프로파일링, 비용분석, 리소스최적화, 캐싱전략]
    트리거: ["최적화", "성능", "비용", "느려"]

SPECIALIST_AGENTS:
  @researcher:
    역할: 리서치전문가
    책임: [100+사이트교차검증, 정확한정보수집, 출처추적]
    트리거: ["정확한 정보", "교차검증", "리서치", "조사"]
  
  @content-creator:
    역할: 콘텐츠생성
    책임: [상품설명(Gemini), 마케팅문구, 다국어번역, SEO]
    트리거: ["콘텐츠", "상품 설명", "문구", "번역"]
  
  @ui-designer:
    역할: UI/UX디자인
    책임: [디자인시스템, 컬러팔레트, UX, 프로토타입]
    트리거: ["디자인", "예쁘게", "UI", "UX"]
  
  @game-designer:
    역할: 게임기획
    책임: [게임기획, 밸런스설계, 레벨디자인, 시스템설계]
    트리거: ["게임 기획", "밸런스", "레벨", "게임 시스템"]
  
  @data-analyst:
    역할: 데이터분석
    책임: [데이터시각화, 통계분석, 리포트생성, 인사이트도출]
    트리거: ["데이터 분석", "차트", "통계", "리포트"]
```

---

## 🔧 9. 플러그인 자동 설치 (40+)

### 9.1 프론트엔드
```yaml
UI:
  - shadcn/ui: npx shadcn@latest init -y | ["컴포넌트"]
  - framer-motion: pnpm add framer-motion | ["애니메이션", "모션"]
  - lucide-react: pnpm add lucide-react | ["아이콘"]
  - react-icons: pnpm add react-icons | ["아이콘"]

상태관리:
  - zustand: pnpm add zustand | ["상태관리", "스토어"]
  - tanstack-query: pnpm add @tanstack/react-query | ["데이터페칭", "캐싱"]
  - jotai: pnpm add jotai | ["atom", "전역상태"]

폼/검증:
  - react-hook-form: pnpm add react-hook-form | ["폼"]
  - zod: pnpm add zod @hookform/resolvers | ["검증", "스키마"]

차트/시각화:
  - recharts: pnpm add recharts | ["차트", "그래프"]
  - chart.js: pnpm add chart.js react-chartjs-2 | ["차트"]
  - d3: pnpm add d3 @types/d3 | ["D3", "시각화"]
```

### 9.2 백엔드
```yaml
ORM/DB:
  - prisma: pnpm add prisma @prisma/client | ["Prisma", "ORM"]
  - drizzle: pnpm add drizzle-orm | ["Drizzle"]
  - supabase-js: pnpm add @supabase/supabase-js | ["Supabase"]

인증:
  - next-auth: pnpm add next-auth@beta @auth/prisma-adapter | ["로그인", "인증", "NextAuth"]
  - clerk: pnpm add @clerk/nextjs | ["Clerk"]

파일/이메일/결제:
  - uploadthing: pnpm add uploadthing @uploadthing/react | ["파일업로드"]
  - resend: pnpm add resend @react-email/components | ["이메일"]
  - stripe: pnpm add stripe @stripe/stripe-js @stripe/react-stripe-js | ["결제", "Stripe"]
```

### 9.3 AI/게임/개발도구
```yaml
AI:
  - ai-sdk: pnpm add ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google | ["AI", "챗봇"]
  - openai: pnpm add openai | ["GPT", "OpenAI"]
  - anthropic: pnpm add @anthropic-ai/sdk | ["Claude"]
  - google-genai: pnpm add @google/generative-ai | ["Gemini"]

게임:
  - pixi.js: pnpm add pixi.js @pixi/react | ["게임", "캔버스"]
  - howler: pnpm add howler | ["사운드", "오디오"]
  - matter-js: pnpm add matter-js | ["물리엔진"]
  - rapier: pnpm add @dimforge/rapier2d-compat | ["2D물리"]

테스트:
  - vitest: pnpm add -D vitest @testing-library/react | ["유닛테스트"]
  - playwright: pnpm add -D @playwright/test | ["E2E"]

모니터링:
  - sentry: pnpm add @sentry/nextjs | ["에러추적", "Sentry"]
```

---

## 🔄 10. 자동 워크플로우

### 10.1 EPCT 워크플로우
```yaml
E_Expand: 요구분석 → 숨은요구사항 → 기술제약 → @researcher
P_Plan: 작업분해(BabyAGI) → 순서결정 → 스택선택 → @architect
C_Code: 역할별구현(MetaGPT) → 생략없이완성 → @fullstack-dev
T_Test: 빌드검증 → 테스트 → 품질검사 → @qa-engineer
```

### 10.2 풀스택 자동화
```yaml
FULLSTACK_WORKFLOW:
  1_환경: 
    - CLI/MCP 자동설치
    - pnpm create next-app
    - 의존성 설치
    - shadcn/ui 초기화
  
  2_개발:
    - npm run dev & (백그라운드실행)
    - DB스키마 (prisma/supabase)
    - API라우트
    - UI컴포넌트
    - 인증시스템
  
  3_검증:
    - 5분마다 curl localhost:3000
    - 콘솔에러 즉시수정
    - tsc --noEmit
    - npm run lint
  
  4_콘텐츠:
    - Gemini로 실제 데이터 생성
    - 상품/리뷰/사용자 채움
    - 이미지URL 설정
  
  5_완료:
    - npm run build 성공확인
    - 배포 (vercel --prod)
    - 헬스체크
    - 완료보고서
```

### 10.3 게임 개발 자동화
```yaml
GAME_WORKFLOW:
  1_기획:
    - 장르/테마 결정
    - 핵심메카닉 설계
    - 캐릭터/아이템 설계 (20+/100+)
    - 밸런스시트 작성
  
  2_코어시스템:
    - 게임루프 (requestAnimationFrame)
    - 입력시스템 (키보드/마우스/터치)
    - 렌더링 (Canvas/Pixi.js)
    - 상태관리 (Zustand)
  
  3_콘텐츠:
    - 캐릭터 클래스 (능력치, 스킬)
    - 아이템 데이터 (무기, 방어구, 소모품)
    - 스테이지/레벨 (20+)
    - 적/보스 AI
  
  4_시스템:
    - 전투시스템
    - 인벤토리
    - 스킬/업그레이드
    - 저장/로드
    - 리더보드
  
  5_폴리싱:
    - 사운드 (Howler.js)
    - 이펙트/파티클
    - UI/UX 개선
    - 밸런스 조정
```

### 10.4 오류 수정 자동화
```yaml
ERROR_WORKFLOW:
  1_전체스캔:
    - npx tsc --noEmit 2>&1 | tee /tmp/tsc.log
    - npm run lint 2>&1 | tee /tmp/lint.log
    - npm run build 2>&1 | tee /tmp/build.log
  
  2_우선순위:
    - 1순위: 요청한 에러
    - 2순위: 같은 파일 에러
    - 3순위: 관련 파일 에러
    - 4순위: 기타 에러
  
  3_수정:
    - 에러별 @fix-* 스킬 호출
    - 연쇄에러 예방
    - 수정 후 재검증
  
  4_에스컬레이션:
    - 2회 실패 → 다른 방법 시도
    - 5회 실패 → 재설계
```

---

## ✅ 11. 품질 체크리스트

### 완료 전 필수 검증
```yaml
BUILD_CHECK:
  □ npm run build → 성공
  □ npx tsc --noEmit → 에러 0
  □ npm run lint → 에러 0
  □ npm run test → 통과

CODE_CHECK:
  □ TODO/FIXME/PLACEHOLDER → 0
  □ any 타입 → 최소화
  □ 빈 배열/객체 반환 → 0
  □ console.log → 제거 (logger 사용)

CONTENT_CHECK:
  □ 콘텐츠 수량 충족 (상품50+/리뷰100+)
  □ 실제 데이터 (목업X)
  □ 이미지 URL 유효

DESIGN_CHECK:
  □ 반응형 (모바일/태블릿/데스크톱)
  □ 다크모드
  □ 로딩/에러/빈상태
  □ SEO 메타태그

DEPLOY_CHECK:
  □ 환경변수 설정
  □ 배포 성공
  □ 헬스체크 통과
```

---

## 🔑 12. API 키 & 환경변수

### .env.example
```bash
# === AI/LLM ===
ANTHROPIC_API_KEY=sk-ant-...    # console.anthropic.com
OPENAI_API_KEY=sk-...           # platform.openai.com
GEMINI_API_KEY=...              # aistudio.google.com (무료)

# === Database ===
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# === Auth ===
NEXTAUTH_SECRET=...             # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# === Search/Research ===
BRAVE_API_KEY=...               # brave.com/search/api
TAVILY_API_KEY=tvly-...         # tavily.com
EXA_API_KEY=...                 # exa.ai

# === Tools ===
GITHUB_TOKEN=...                # github.com/settings/tokens
VERCEL_TOKEN=...                # vercel.com/account/tokens

# === Optional ===
STRIPE_SECRET_KEY=sk_test_...   # dashboard.stripe.com
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...           # resend.com
SENTRY_AUTH_TOKEN=sntrys_...    # sentry.io
SENTRY_DSN=https://...@sentry.io/...
```

---

## 📊 13. 완료 보고서

```
╔══════════════════════════════════════════════════════════════════╗
║                    🎉 작업 완료 보고서                            ║
╠══════════════════════════════════════════════════════════════════╣
║ 📋 프로젝트: [이름]                                               ║
║ 📅 완료일: [날짜]                                                 ║
║ ⏱️ 소요시간: [시간]                                               ║
╠══════════════════════════════════════════════════════════════════╣
║ ✅ 빌드 상태                                                      ║
║ ├─ npm run build: ✅ 성공                                        ║
║ ├─ TypeScript: ✅ 에러 0                                         ║
║ ├─ ESLint: ✅ 에러 0                                             ║
║ └─ 테스트: ✅ 통과                                                ║
╠══════════════════════════════════════════════════════════════════╣
║ 📁 생성 파일                                                      ║
║ ├─ 페이지: XX개                                                   ║
║ ├─ 컴포넌트: XX개                                                 ║
║ ├─ API 라우트: XX개                                               ║
║ └─ 유틸리티: XX개                                                 ║
╠══════════════════════════════════════════════════════════════════╣
║ 📊 콘텐츠                                                         ║
║ ├─ 상품: 50+개                                                    ║
║ ├─ 리뷰: 100+개                                                   ║
║ └─ 사용자: 30+명                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║ 🎨 디자인                                                         ║
║ ├─ 반응형: ✅  다크모드: ✅  접근성: ✅                           ║
║ └─ 애니메이션: ✅  SEO: ✅                                        ║
╠══════════════════════════════════════════════════════════════════╣
║ 🚀 실행 방법                                                      ║
║ ├─ 개발: pnpm dev                                                 ║
║ ├─ 빌드: pnpm build                                               ║
║ └─ 배포: vercel --prod                                            ║
╠══════════════════════════════════════════════════════════════════╣
║ 🔑 필요 환경변수: .env.example 참조                               ║
║ 🌐 배포 URL: https://[project].vercel.app                        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 📌 14. 사용 예시

```bash
# 프로젝트 루트에 CLAUDE.md 배치
cp CLAUDE.md ./my-project/

# 에이전트 모드 실행
claude --dangerously-skip-permissions

# === 풀스택 앱 ===
"쇼핑몰 풀스택 만들어줘. 상품 50개, 리뷰 100개 채워줘."
"[에이전트 모드] SaaS 대시보드 만들어줘. 차트 10개, 위젯 15개."

# === 게임 ===
"[AUTO] 타워디펜스 게임. 타워 30종, 몬스터 50종, 스테이지 20개."
"RPG 게임 만들어줘. 캐릭터 20명, 아이템 100개, 스킬 50개."

# === 수정 ===
"모든 에러 고치고 빌드 성공시켜줘."
"전체 스캔하고 모든 문제 해결해줘."

# === 최적화 ===
"성능 최적화해줘. 로딩 빠르게."
"번들 크기 줄이고 비용 최적화해줘."

# === 자연어 트리거 ===
"오류 고쳐"     → @autofix
"최적화"        → @optimize-all
"디자인해"      → @premium-design
"배포해"        → @deploy
"정확한정보로"  → @deep-research
```

---

## 📌 15. 버전 정보

```yaml
version: "37.0.0"
created: "2026-01-09"
features:
  - 120+ AI 에이전트 교차검증 통합
  - 50+ MCP 서버
  - 70+ 스킬
  - 20+ 서브에이전트
  - 40+ 플러그인 자동설치
  - 300+ 자연어 트리거 패턴
  - 완전 자동 환경 설치 시스템
  - 게임 개발 완전 자동화
  - 치명적 오류 자동 복구
  - EPCT 워크플로우
  - 품질 게이트 체크리스트
agents_integrated:
  - Devin, Cursor, Claude Code, GitHub Copilot, Windsurf
  - AutoGPT, BabyAGI, MetaGPT, CrewAI, LangGraph
  - Bolt.new, Lovable, v0, Replit Agent
  - GPT-Researcher, Perplexity, Tavily
  - CodeRabbit, Sourcery, Qodo, SWE-Agent
  - n8n, Zapier, Make.com, Langflow
```

---

> ⚠️ **프로젝트 루트에 `CLAUDE.md`로 저장**
> `claude --dangerously-skip-permissions` 실행 시 완전 자율 에이전트 모드
> 질문 없이 최선 판단 → 완료까지 자율 실행 → 에러 자동 수정

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
