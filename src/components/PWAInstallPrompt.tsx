"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

const DISMISS_KEY = "woodinsea-pwa-dismissed-until";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * 서비스워커 등록 + 설치 배너(조용한 버전).
 * - 첫 방문 30초 뒤 1회만, 닫으면 14일 숨김
 * - "Update Available" 토스트는 제거(첫 화면 가림 원인)
 */
export default function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      // 데스크톱에는 "홈 화면에 추가" 배너를 띄우지 않는다(첫 화면 가림 방지)
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      try {
        if (Date.now() < Number(localStorage.getItem(DISMISS_KEY) ?? 0)) return;
      } catch {
        /* noop */
      }
      setDeferred(e as BeforeInstallPromptEvent);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setShow(true), 30000);
    };
    let timer = 0;
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 14 * 24 * 60 * 60 * 1000));
    } catch {
      /* noop */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && deferred && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-20 right-4 z-[var(--z-toast)] w-[calc(100%-2rem)] max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg sm:bottom-6"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Download className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold">홈 화면에 추가</p>
              <p className="text-sm text-muted-foreground">앱처럼 빠르게 예약 정보를 확인하세요.</p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={install} className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">
                  설치
                </button>
                <button type="button" onClick={dismiss} className="h-9 rounded-md border border-border px-4 text-sm font-semibold">
                  나중에
                </button>
              </div>
            </div>
            <button type="button" aria-label="닫기" onClick={dismiss} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
