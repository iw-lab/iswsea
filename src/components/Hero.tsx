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
        전환은 «위에서 덮기»다. 두 장을 동시에 반투명하게 만들면(크로스페이드)
        합성 알파가 중간에 0.75 까지 떨어져 뒤의 scrim(hsl 160 30% 6%, 거의 검정)이
        비치고, 그게 매 컷 «반짝임»으로 보인다(2026-09-10 실측).
        그래서 나가는 장은 흐려지지 않고 «불투명한 채로 아래에 깔려» 있다가,
        새 장이 완전히 덮은 뒤에 꺼진다 → 합성 알파가 항상 1.
      */}
      {/*
        isolate = 이 래퍼가 자체 쌓임 맥락을 만든다. 안쪽 레이어의 z-index(0·1·2)가
        바깥으로 새면 이미지가 scrim·문구·버튼·인디케이터를 전부 덮는다(2026-09-10 실측 사고).
        래퍼 자신은 DOM 순서상 맨 앞이라 뒤에 오는 것들이 정상적으로 위에 그려진다.
      */}
      <div className="absolute inset-0 isolate">
      {heroImages.map((img, i) => {
        const active = i === index;
        // «다음 장»은 미리 받아 두기만 한 것이라 켄번즈를 걸지 않는다.
        // 현재·직전에는 계속 걸어 둔다 — 나가는 장에서 클래스를 떼면 scale 1.08 → 1 로
        // 그 자리에서 튄다(그때 그 장은 아직 보이는 레이어다).
        const preload = !active && i !== prev;
        // 현재·직전·다음 세 장만 DOM 에 둔다. 여덟 장을 한꺼번에 올리면
        // 히어로 이미지 합계 1.1MB 가 첫 화면에서 LCP 와 경쟁한다.
        // «다음»을 미리 올려 두는 건 6.5초 뒤 전환 때 이미 디코딩돼 있게 하기 위해서다.
        if (!active && i !== prev && i !== next) return null;
        return (
          <motion.div
            key={img.src}
            className="absolute inset-0"
            style={{ zIndex: active ? 2 : i === prev ? 1 : 0 }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={
              active
                ? { duration: 1.4, ease: "easeInOut" }
                : { duration: 0, delay: 2.4 } // 덮이고도 1초 더 깔려 있다가 꺼진다
            }
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className={cn(
                // will-change 는 «미리 받아 두는 장»에도 걸어 둔다 — 켄번즈 클래스가 전환 시점에
                // 붙으면 승격·재래스터도 그때 일어나기 때문이다. 마운트 때 끝내 놓는다.
                "absolute inset-0 h-full w-full object-cover will-change-transform",
                !preload && "animate-ken-burns"
              )}
            />
          </motion.div>
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
