"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Pin, Settings } from "lucide-react";
import { useContentStore } from "@/stores/adminStore";
import { Badge, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function Notice() {
  const notices = useContentStore((s) => s.notices).filter((n) => n.active);
  const [open, setOpen] = useState<string | null>(null);

  if (notices.length === 0) return null;

  return (
    <section id="notice" className="section-y scroll-mt-16 bg-background">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="NOTICE" title="공지사항" />
          <Link href="/admin" className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold text-muted-foreground hover:bg-accent">
            <Settings className="h-3.5 w-3.5" /> 관리자
          </Link>
        </div>

        <Reveal delay={0.05} className="mt-10 lg:mt-14">
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {notices.map((n) => {
              const on = open === n.id;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? null : n.id)}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left sm:items-center"
                  >
                    <span className="mt-0.5 w-8 shrink-0 sm:mt-0">
                      {n.important ? <Pin className="h-4 w-4 text-accent-strong" /> : <span className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        {n.important && <Badge tone="gold">공지</Badge>}
                        <span className={cn("text-[15px] font-semibold leading-snug", on && "text-primary")}>{n.title}</span>
                      </span>
                      <span className="tnum mt-1 block text-xs text-muted-foreground sm:hidden">{n.date}</span>
                    </span>
                    <span className="tnum hidden w-24 shrink-0 text-right text-sm text-muted-foreground sm:block">{n.date}</span>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", on && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="prose-pre border-t border-border bg-muted/50 px-5 py-5 pl-[3.75rem] text-[15px] leading-relaxed text-foreground/85">
                          {n.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
