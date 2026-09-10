// GET /api/content — 방문자용 공개 콘텐츠(활성 공지·이벤트·팝업 설정). 인증 없음, 읽기 전용.
import { type Env, json } from "../_lib/http";
import { type EventRow, type NoticeRow, eventFromRow, noticeFromRow } from "../_lib/content";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const [notices, events, popup] = await Promise.all([
    env.DB.prepare("SELECT * FROM notices WHERE active = 1 ORDER BY sort ASC, updated_at DESC").all<NoticeRow>(),
    env.DB.prepare("SELECT * FROM events WHERE active = 1 ORDER BY sort ASC, updated_at DESC").all<EventRow>(),
    env.DB.prepare("SELECT value FROM settings WHERE key = 'popup_enabled'").first<{ value: string }>(),
  ]);
  return json(
    {
      ok: true,
      notices: notices.results.map(noticeFromRow),
      events: events.results.map(eventFromRow),
      popupEnabled: popup ? popup.value === "1" : true,
    },
    // 관리자 수정이 곧바로 보이도록 CDN 캐시 없이, 브라우저만 30초
    { headers: { "cache-control": "public, max-age=30, s-maxage=0" } }
  );
};
