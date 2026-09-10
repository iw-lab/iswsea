"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { useContentStore } from "@/stores/adminStore";
import { pensionInfo } from "@/data/pension";
import { useFocusTrap } from "@/components/ui";

const KEY = "woodinsea-popup-hide-until";

export default function EventPopup() {
  const { events, notices, popupEnabled, sync } = useContentStore();
  const [open, setOpen] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  const activeEvents = events.filter((e) => e.active);
  const pinned = notices.find((n) => n.active && n.important);

  // 서버 동기화(D1)가 끝난 뒤에만 판단한다 — 관리자가 팝업을 껐는데 스냅샷 기준으로 먼저 떠 버리는 것을 막는다.
  // API 가 없는 환경(next dev)은 sync 가 "offline" 이 되어 스냅샷으로 진행한다.
  const hasContent = sync !== "idle" && popupEnabled && (activeEvents.length > 0 || !!pinned);
  useEffect(() => {
    if (!hasContent) return;
    try {
      const until = Number(localStorage.getItem(KEY) ?? 0);
      if (Date.now() < until) return;
    } catch {
      /* storage 차단 환경 */
    }
    const t = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(t);
  }, [hasContent]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = (hideToday: boolean) => {
    if (hideToday) {
      try {
        localStorage.setItem(KEY, String(Date.now() + 24 * 60 * 60 * 1000));
      } catch {
        /* noop */
      }
    }
    setOpen(false);
  };

  const goNotice = () => {
    close(false);
    document.getElementById("notice")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[var(--z-modal)] flex items-end justify-center bg-scrim/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => close(false)}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            ref={trapRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg outline-none"
          >
            <div className="relative h-36">
              <img src="/images/gallery/special7/2.webp" alt="" aria-hidden className="h-full w-full object-cover" />
              <div className="scrim-b absolute inset-0" />
              <button
                type="button"
                aria-label="닫기"
                onClick={() => close(false)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-scrim/50 text-on-image hover:bg-scrim/70"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 text-on-image">
                <p className="eyebrow text-[11px] text-on-image-muted">{pensionInfo.nameEn}</p>
                <h2 id="popup-title" className="mt-1 font-serif text-xl font-semibold">
                  이벤트 · 이용 안내
                </h2>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-5">
              {activeEvents.length > 0 && (
                <ul className="space-y-3">
                  {activeEvents.slice(0, 5).map((e) => (
                    <li key={e.id} className="flex gap-3">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent-strong" />
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-snug">
                          {e.title}
                          {e.highlight && <span className="ml-2 font-display text-sm text-accent-strong">{e.highlight}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{e.period}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {pinned && (
                <p className="mt-4 rounded-md border border-border bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  📌 {pinned.title}
                </p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                입실 {pensionInfo.checkIn}(연휴·성수기 {pensionInfo.checkInPeak}) · 퇴실 {pensionInfo.checkOut} · 직접 예약 문의 {pensionInfo.landline}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
              <button type="button" onClick={() => close(true)} className="text-sm text-muted-foreground hover:text-foreground">
                오늘 하루 보지 않기
              </button>
              <button type="button" onClick={goNotice} className="inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                자세히 보기 <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
