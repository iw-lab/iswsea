"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Waves, Bath, Shell, Flame, Droplets, Coffee, Flower2, AlertTriangle, ChevronDown, type LucideIcon } from "lucide-react";
import { specials, specialsIntro } from "@/data/pension";
import { Photo, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { Waves, Bath, Shell, Flame, Droplets, Coffee, Flower2 };

export default function Special() {
  const [active, setActive] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const sp = specials[active];
  const Icon = icons[sp.icon] ?? Waves;

  const select = (i: number) => {
    setActive(i);
    setNotesOpen(false);
  };

  return (
    <section id="special" className="section-y scroll-mt-16 bg-background">
      <div className="container-x">
        <SectionHeading eyebrow="SPECIAL" title="숲속의바다만의 특별함" lead={specialsIntro} />

        {/* 모바일: 가로 스크롤 탭 */}
        <div className="snap-row mt-8 -mx-5 px-5 lg:hidden" role="group" aria-label="특별함 선택">
          {specials.map((s, i) => {
            const I = icons[s.icon] ?? Waves;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => select(i)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold",
                  i === active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
                )}
              >
                <I className="h-4 w-4" /> {s.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* 데스크톱: 세로 목록 */}
          <ul className="hidden lg:col-span-4 lg:block" role="group" aria-label="특별함 선택">
            {specials.map((s, i) => {
              const I = icons[s.icon] ?? Waves;
              const on = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-border py-4 text-left transition-colors",
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className={cn("font-display text-sm tracking-widest", on ? "text-accent-strong" : "text-muted-foreground/70")}>
                      {s.number}
                    </span>
                    <span className={cn("font-serif text-xl font-medium", on && "translate-x-1 transition-transform")}>{s.name}</span>
                    <I className={cn("ml-auto h-5 w-5 transition-opacity", on ? "opacity-100 text-primary" : "opacity-40")} />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* 콘텐츠 */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={sp.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <Photo src={sp.images[0].src} alt={sp.images[0].alt} ratio="aspect-[4/3]" className="col-span-3 rounded-lg shadow-md sm:col-span-2 sm:aspect-[16/10]" />
                  <div className="col-span-3 grid grid-cols-2 gap-2 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
                    <Photo src={sp.images[1].src} alt={sp.images[1].alt} ratio="aspect-[4/3]" className="rounded-lg sm:aspect-[16/10]" />
                    <Photo src={sp.images[2].src} alt={sp.images[2].alt} ratio="aspect-[4/3]" className="rounded-lg sm:aspect-[16/10]" />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="eyebrow text-[11px] text-accent-strong">
                      SPECIAL {sp.number} · {sp.nameEn}
                    </p>
                    <h3 className="font-serif text-2xl font-semibold">{sp.name}</h3>
                  </div>
                </div>

                <div className="mt-5 space-y-4 text-fluid-base leading-relaxed text-foreground/85">
                  {sp.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {sp.bullets && (
                  <ul className="mt-6 grid gap-2 rounded-lg border border-border bg-card p-5 text-[15px] leading-relaxed sm:grid-cols-1">
                    {sp.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sp.notes && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-warning/40 bg-warning/8">
                    <button
                      type="button"
                      onClick={() => setNotesOpen((v) => !v)}
                      aria-expanded={notesOpen}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left text-[15px] font-semibold"
                    >
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      안전·유의사항 {sp.notes.length}건
                      <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", notesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {notesOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {sp.notes.map((n) => (
                            <li key={n} className="border-t border-warning/20 px-5 py-3 text-sm leading-relaxed text-foreground/85">
                              {n}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* 전체 갤러리 스트립 */}
        <Reveal delay={0.1} className="mt-14 lg:mt-20">
          <div className="snap-row -mx-5 px-5 sm:mx-0 sm:px-0">
            {specials.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  select(i);
                  document.getElementById("special")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group relative w-[220px] overflow-hidden rounded-lg sm:w-[260px]"
              >
                <Photo src={s.images[3]?.src ?? s.images[0].src} alt={s.name} ratio="aspect-[4/5]" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]">
                  <div className="scrim-b absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left text-on-image">
                    <p className="font-display text-xs tracking-widest text-on-image-muted">{s.number}</p>
                    <p className="font-serif text-lg font-medium">{s.name}</p>
                  </div>
                </Photo>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
