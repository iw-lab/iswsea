// 방문자 화면이 읽는 콘텐츠 스토어.
// 초기값 = src/data/pension.ts(빌드 시점 스냅샷) → 마운트 후 /api/content 로 D1 최신본을 덮어쓴다.
// API 가 없거나(next dev) 실패하면 스냅샷을 그대로 보여준다(정적 폴백 불변식).
import { create } from "zustand";
import { notices as siteNotices, events as siteEvents } from "@/data/pension";
import { getPublicContent, type EventItem, type NoticeItem } from "@/lib/adminApi";

export type { EventItem, NoticeItem };

interface ContentState {
  notices: NoticeItem[];
  events: EventItem[];
  popupEnabled: boolean;
  /** 서버 동기화 상태 — idle: 아직, synced: D1 반영, offline: 실패(스냅샷 유지) */
  sync: "idle" | "synced" | "offline";
  syncFromServer: () => Promise<void>;
}

let inflight: Promise<void> | null = null;

export const useContentStore = create<ContentState>()((set) => ({
  notices: siteNotices,
  events: siteEvents,
  popupEnabled: true,
  sync: "idle",
  syncFromServer: () => {
    if (inflight) return inflight;
    inflight = getPublicContent()
      .then((c) => {
        // 응답 모양을 검증한다 — 장애 페이지(HTML→JSON 실패)나 빈 객체가 스냅샷을 undefined 로 덮지 않도록
        if (!c || c.ok !== true || !Array.isArray(c.notices) || !Array.isArray(c.events)) throw new Error("잘못된 콘텐츠 응답");
        set({ notices: c.notices, events: c.events, popupEnabled: c.popupEnabled !== false, sync: "synced" });
      })
      .catch(() => set({ sync: "offline" }))
      .finally(() => {
        inflight = null;
      });
    return inflight;
  },
}));

/** 옛 이름 호환 — 예전 localStorage 기반 관리자 스토어를 쓰던 컴포넌트용 */
export const useAdminStore = useContentStore;

/** 예전 localStorage 영속 데이터는 더 이상 읽지 않는다 — 한 번 지워 혼동을 없앤다 */
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("woodinsea-admin-storage");
  } catch {
    /* storage 차단 환경 */
  }
}
