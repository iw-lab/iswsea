"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Maximize2, Phone, Users, X, Bath, Flame, Waves, Wine, AlertCircle } from "lucide-react";
import { rooms, roomCommon, pensionInfo, priceInfo, formatPrice, type Room } from "@/data/pension";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Badge, ButtonLink, Photo, Reveal, useFocusTrap } from "@/components/ui";
import { cn } from "@/lib/utils";

const amenityIcons = [Waves, Bath, Flame, Wine];

function Lightbox({ room, index, onClose, onMove }: { room: Room; index: number; onClose: () => void; onMove: (d: 1 | -1) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);
  const trapRef = useFocusTrap<HTMLDivElement>(true);

  const img = room.images[index];
  return (
    <motion.div
      ref={trapRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${room.name} 사진 크게 보기`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-scrim/95 p-4"
      onClick={onClose}
    >
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-on-image/10 text-on-image hover:bg-on-image/20">
        <X className="h-5 w-5" />
      </button>
      <button type="button" aria-label="이전 사진" onClick={(e) => { e.stopPropagation(); onMove(-1); }} className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-on-image/10 text-on-image hover:bg-on-image/20 sm:left-6">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" aria-label="다음 사진" onClick={(e) => { e.stopPropagation(); onMove(1); }} className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-on-image/10 text-on-image hover:bg-on-image/20 sm:right-6">
        <ChevronRight className="h-5 w-5" />
      </button>
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[86vh] max-w-full rounded-md object-contain shadow-lg"
        />
      </AnimatePresence>
      <p className="tnum absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-sm tracking-widest text-on-image-muted">
        {index + 1} / {room.images.length}
      </p>
    </motion.div>
  );
}

export default function RoomDetailClient({ roomId }: { roomId: string }) {
  const room = rooms.find((r) => r.id === roomId);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const move = useCallback(
    (d: 1 | -1) => {
      if (!room) return;
      setCurrent((c) => (c + d + room.images.length) % room.images.length);
    },
    [room]
  );
  const closeLightbox = useCallback(() => setLightbox(false), []);

  if (!room) {
    return (
      <>
        <Header transparent={false} />
        <main className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
          <p className="eyebrow text-accent-strong">404</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold">객실을 찾을 수 없습니다</h1>
          <ButtonLink href="/#rooms" className="mt-8">
            <ArrowLeft className="h-4 w-4" /> 객실 목록으로
          </ButtonLink>
        </main>
        <Footer />
      </>
    );
  }

  const idx = rooms.findIndex((r) => r.id === room.id);
  const prev = rooms[(idx - 1 + rooms.length) % rooms.length];
  const next = rooms[(idx + 1) % rooms.length];
  const others = rooms.filter((r) => r.id !== room.id).slice(0, 4);
  const priceRows = [
    { label: "주중 (일~목)", value: room.prices.weekday },
    { label: "금요일", value: room.prices.friday },
    { label: "주말 · 공휴일 전날", value: room.prices.weekend, strong: true },
    { label: "일요일", value: room.prices.sunday },
  ];

  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="relative h-[68svh] min-h-[440px] bg-scrim text-on-image">
          <AnimatePresence initial={false}>
            <motion.img
              key={room.images[current].src}
              src={room.images[current].src}
              alt={room.images[current].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="scrim-b absolute inset-0" />
          <div className="scrim-t absolute inset-x-0 top-0 h-40" />
          <div className="container-x relative flex h-full flex-col justify-end pb-8">
            <Link href="/#rooms" className="mb-auto mt-24 inline-flex w-fit items-center gap-1.5 rounded-full border border-on-image/35 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-on-image/15">
              <ArrowLeft className="h-4 w-4" /> 객실 목록
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {room.building && <Badge tone="onImage">{room.building}</Badge>}
                  {room.vip && <Badge tone="onImage" className="border-accent-strong/60 text-accent-strong">VIP</Badge>}
                  <Badge tone="onImage">오션뷰</Badge>
                </div>
                <p className="eyebrow mt-4 text-on-image-muted">{room.nameEn}</p>
                <h1 className="mt-1 font-serif text-fluid-4xl font-medium leading-tight">{room.name}</h1>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-on-image-muted">
                  <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-4 w-4" /> {room.size}</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> 기준 {room.capacity.standard}인 · 최대 {room.capacity.max}인</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="이전 사진" onClick={() => move(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-image/35 backdrop-blur-sm hover:bg-on-image/15">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="tnum font-display text-sm tracking-widest text-on-image-muted">
                  {String(current + 1).padStart(2, "0")} / {String(room.images.length).padStart(2, "0")}
                </span>
                <button type="button" aria-label="다음 사진" onClick={() => move(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-image/35 backdrop-blur-sm hover:bg-on-image/15">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 썸네일 */}
        <div className="container-x -mt-10 relative">
          <ul className="snap-row rounded-lg border border-border bg-card p-2 shadow-md">
            {room.images.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  aria-label={`${i + 1}번 사진`}
                  onClick={() => setCurrent(i)}
                  onDoubleClick={() => setLightbox(true)}
                  className={cn("block overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-card transition", i === current ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100")}
                >
                  <img src={img.src} alt={img.alt} className="h-16 w-24 object-cover sm:h-20 sm:w-32" loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setLightbox(true)} className="mt-2 text-sm text-muted-foreground hover:text-foreground">
            사진 크게 보기 →
          </button>
        </div>

        {/* 본문 */}
        <section className="container-x section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-strong">ABOUT THE ROOM</p>
              <h2 className="mt-3 font-serif text-fluid-2xl font-medium">{roomCommon.invite}</h2>
              <p className="mt-5 text-fluid-base leading-relaxed text-foreground/85">{room.description}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {roomCommon.intro[0]} {roomCommon.intro[1]}
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-10">
              <p className="text-[15px] font-semibold">구비 시설</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {roomCommon.amenities.map((a, i) => {
                  const I = amenityIcons[i % amenityIcons.length];
                  return (
                    <li key={a} className="rounded-lg border border-border bg-card p-4">
                      <I className="h-5 w-5 text-primary" />
                      <p className="mt-3 text-sm font-semibold leading-snug">{a}</p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid gap-3 sm:grid-cols-2">
              {room.images.slice(1, 5).map((img, i) => (
                <button key={img.src} type="button" onClick={() => { setCurrent(i + 1); setLightbox(true); }} className="group overflow-hidden rounded-lg">
                  <Photo src={img.src} alt={img.alt} ratio="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                </button>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-10 rounded-lg border border-warning/40 bg-warning/8 p-5">
              <p className="flex items-center gap-2 text-[15px] font-semibold">
                <AlertCircle className="h-4 w-4 text-warning" /> 이용 시 유의사항
              </p>
              <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-foreground/85">
                <li>· {priceInfo.standardNote}</li>
                {priceInfo.bbqNotes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
                {priceInfo.cautions.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* 요금 사이드바 */}
          <aside className="lg:col-span-5">
            <Reveal delay={0.05} className="rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-baseline justify-between">
                <p className="text-[15px] font-semibold">객실 요금</p>
                <p className="text-xs text-muted-foreground">1박 · 기준 {room.capacity.standard}인</p>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {priceRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between py-3">
                    <span className={cn("text-[15px]", r.strong ? "font-semibold" : "text-muted-foreground")}>{r.label}</span>
                    <span className={cn("tnum text-lg", r.strong ? "font-bold" : "font-semibold")}>{formatPrice(r.value)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                <p>{priceInfo.rateRule}</p>
                <p>{priceInfo.seasonNote} 인원 추가 1인 {formatPrice(priceInfo.extraPerson)} ({priceInfo.freeAge} 무료)</p>
                <p>바베큐 숯+망 {priceInfo.bbqPrices.map((b) => `${b.persons} ${formatPrice(b.price)}`).join(" · ")}</p>
              </div>
              <div className="mt-6 grid gap-2">
                <ButtonLink href={pensionInfo.yapenBookingUrl} external size="lg">
                  <Calendar className="h-4 w-4" /> 실시간 예약
                </ButtonLink>
                <ButtonLink href={pensionInfo.naverBookingUrl} external variant="secondary" size="lg">
                  네이버 예약
                </ButtonLink>
                <ButtonLink href={`tel:${pensionInfo.phone}`} variant="ghost" size="lg">
                  <Phone className="h-4 w-4" /> {pensionInfo.phone}
                </ButtonLink>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                입실 {pensionInfo.checkIn} (연휴·성수기 {pensionInfo.checkInPeak}) · 퇴실 {pensionInfo.checkOut}
              </p>
            </Reveal>
          </aside>
        </section>

        {/* 이전/다음 + 다른 객실 */}
        <section className="border-t border-border bg-secondary/60">
          <div className="container-x py-12 lg:py-16">
            <div className="flex items-center justify-between gap-4">
              <Link href={`/room/${prev.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-4 w-4" /> {prev.name}
              </Link>
              <p className="eyebrow text-[11px] text-muted-foreground">OTHER ROOMS</p>
              <Link href={`/room/${next.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
                {next.name} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {others.map((r) => (
                <li key={r.id}>
                  <Link href={`/room/${r.id}`} className="group block overflow-hidden rounded-lg border border-border bg-card">
                    <Photo src={r.mainImage} alt={r.name} ratio="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="p-4">
                      <p className="font-serif text-lg font-semibold">{r.name}</p>
                      <p className="tnum mt-1 text-sm text-muted-foreground">
                        {r.size} · 주중 {formatPrice(r.prices.weekday)}~
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <AnimatePresence>{lightbox && <Lightbox room={room} index={current} onClose={closeLightbox} onMove={move} />}</AnimatePresence>
    </>
  );
}
