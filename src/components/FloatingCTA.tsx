"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { pensionInfo } from "@/data/pension";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-border bg-background/90 p-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${pensionInfo.phone}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-card text-[15px] font-semibold">
              <Phone className="h-4 w-4" /> 전화 문의
            </a>
            <a href={pensionInfo.yapenBookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-[15px] font-semibold text-primary-foreground">
              <Calendar className="h-4 w-4" /> 실시간 예약
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
