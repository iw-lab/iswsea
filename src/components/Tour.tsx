"use client";

import { useRef } from "react";
import { Car, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { tours } from "@/data/pension";
import { Badge, Photo, Reveal, SectionHeading } from "@/components/ui";

export default function Tour() {
  const rowRef = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section id="tour" className="section-y scroll-mt-16 border-t border-border bg-secondary/60">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="TOUR"
            title="태안, 가로림만, 안면도 여행"
            lead="펜션에서 차로 6분이면 꾸지나무골 해변, 10분이면 만대포구. 태안의 바다와 숲을 하루에 다 담을 수 있습니다."
          />
          <div className="hidden gap-2 lg:flex">
            <button type="button" aria-label="이전" onClick={() => scrollBy(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card hover:bg-accent">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="다음" onClick={() => scrollBy(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card hover:bg-accent">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-10 lg:mt-14">
        <ul ref={rowRef} className="snap-row px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-80rem)/2+3rem))]" aria-label="주변 여행지">
          {tours.map((t) => (
            <li key={t.id} className="w-[82vw] max-w-[360px] sm:w-[340px]">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                {t.images.length > 0 ? (
                  <Photo src={t.images[0]} alt={t.name} ratio="aspect-[4/3]">
                    <div className="absolute left-3 top-3">
                      <Badge tone="onImage">
                        <Car className="h-3 w-3" /> {t.distance}
                      </Badge>
                    </div>
                  </Photo>
                ) : (
                  <div className="relative flex aspect-[4/3] items-end bg-gradient-to-br from-primary/15 via-secondary to-accent-strong/15 p-4">
                    <MapPin className="absolute right-4 top-4 h-8 w-8 text-primary/40" />
                    <Badge tone="gold">
                      <Car className="h-3 w-3" /> {t.distance}
                    </Badge>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-xs tracking-widest text-accent-strong">TOUR GUIDE {t.number}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold">{t.name}</h3>
                  <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-muted-foreground">{t.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
