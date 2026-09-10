"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";
import { heroImages, pensionInfo } from "@/data/pension";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

export default function Hero() {
  // cur 와 prev 를 한 상태로 묶어 둔다 — «직전 장»을 알아야 그 장을 불투명하게 깔아 둘 수 있다.
  const [{ cur: index, prev }, setSlide] = useState({ cur: 0, prev: -1 });
  // 자동 전환 콘텐츠는 사용자가 멈출 수 있어야 한다(WCAG 2.2.2)
  const [paused, setPaused] = useState(false);

  // 탭이 가려지면(백그라운드) 슬라이드 진행을 멈춘다 — rAF 가 멈춘 상태에서는
  // 전환 애니메이션이 끝나지 않아 레이어가 어중간한 상태로 남는다.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setSlide((s) => ({ cur: (s.cur + 1) % heroImages.length, prev: s.cur }));
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = heroImages[index];
  const next = (index + 1) % heroImages.length;

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-scrim text-on-image" aria-label="메인 비주얼">
      {/*
        슬라이드는 «항상 한 장만 보이게» 만든다. 렌더 결과에 opacity 를 직접 박고
        전환은 브라우저의 CSS transition 에 맡긴다 — 애니메이션 라이브러리도,
        타이머로 끄는 레이어도, 전환 시점에 붙는 클래스도 없다.

        - 들어오는 장: 0 → 1 (1.2초). 이미 마운트돼 있던 «다음 장»이라 디코딩도 끝나 있다.
        - 나가는 장: 불투명한 채로 그냥 아래에 남는다. 끄지 않는다.
          어차피 완전히 덮이고, 다음 전환 때 통째로 언마운트된다.
        - 그래서 두 장이 동시에 반투명해지는 순간이 «구조적으로» 없다.

        isolate = z-index 가 이 래퍼 밖으로 새지 않게 가둔다(문구·버튼을 덮은 전례).
      */}
      <div className="absolute inset-0 isolate">
        {heroImages.map((img, i) => {
          const active = i === index;
          const under = i === prev;              // 아래 깔려 있는 직전 장
          const ready = i === next;              // 미리 받아 두는 다음 장
          if (!active && !under && !ready) return null;
          return (
            <div
              key={img.src}
              className="absolute inset-0"
              style={{
                zIndex: active ? 2 : under ? 1 : 0,
                opacity: active || under ? 1 : 0,
                transition: "opacity 1.2s ease",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover",
                  !ready && "animate-ken-burns"
                )}
              />
            </div>
          );
        })}
      </div>
      <div className="scrim-b absolute inset-0" />
      <div className="scrim-t absolute inset-x-0 top-0 h-40" />

      <div className="container-x relative flex h-full flex-col justify-end pb-[max(5.5rem,10vh)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="eyebrow text-on-image-muted"
        >
          {pensionInfo.nameEn} · Taean, Garorim Bay
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-4 max-w-4xl font-serif text-fluid-5xl font-medium leading-[1.12] text-balance"
        >
          숲을 지나면,
          <br />
          바다가 열립니다
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 max-w-xl text-fluid-lg text-on-image-muted"
        >
          태안 가로림만 언덕 위, 전 객실 오션뷰 목조 펜션. 일출과 월출을 객실에서 만나고, 개별 월풀형 욕조와 실내 바베큐 테라스에서 하루를 마무리하세요.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <ButtonLink href={pensionInfo.yapenBookingUrl} external size="lg" className="bg-on-image text-scrim hover:bg-on-image/90">
            실시간 예약
          </ButtonLink>
          <ButtonLink href="#rooms" variant="onImage" size="lg">
            객실 둘러보기
          </ButtonLink>
        </motion.div>

        {/* 슬라이드 캡션 + 인디케이터 */}
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-on-image/20 pt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="min-w-0"
            >
              <p className="truncate text-sm font-semibold">{slide.title}</p>
              <p className="truncate text-xs text-on-image-muted">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "슬라이드 재생" : "슬라이드 일시정지"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-on-image/35 text-on-image transition-colors hover:bg-on-image/15"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <span className="tnum font-display text-sm tracking-widest text-on-image-muted">
              {String(index + 1).padStart(2, "0")} / {String(heroImages.length).padStart(2, "0")}
            </span>
            <div className="hidden gap-1.5 sm:flex" role="group" aria-label="슬라이드 선택">
              {heroImages.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={`${i + 1}번 슬라이드`}
                  onClick={() => setSlide((s) => (i === s.cur ? s : { cur: i, prev: s.cur }))}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === index ? "w-7 bg-on-image" : "w-3 bg-on-image/40 hover:bg-on-image/70"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="아래로 스크롤"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-on-image-muted md:block"
      >
        <ChevronDown className="animate-scroll-cue h-6 w-6" />
      </a>
    </section>
  );
}
