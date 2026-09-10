"use client";

import { Calendar, Gift, Phone, Sandwich, Sparkles, type LucideIcon } from "lucide-react";
import { pensionInfo, prologue, services } from "@/data/pension";
import { useContentStore } from "@/stores/adminStore";
import { Badge, ButtonLink, Reveal } from "@/components/ui";

const serviceIcons: Record<string, LucideIcon> = { Gift, Sandwich };

export default function Reservation() {
  const events = useContentStore((s) => s.events).filter((e) => e.active);

  return (
    <section id="reservation" className="relative scroll-mt-16 overflow-hidden bg-scrim text-on-image">
      <img src="/images/gallery/special1/7.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-60" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-b from-scrim/70 via-scrim/80 to-scrim" />

      <div className="container-x section-y relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-on-image-muted">RESERVATION · {prologue.mottoEn}</p>
          <h2 className="mt-4 font-serif text-fluid-4xl font-medium leading-[1.15] text-balance">{prologue.motto}</h2>
          <p className="mt-5 text-fluid-base text-on-image-muted">
            실시간 예약 달력에서 빈 객실과 요금을 확인하시고, 연박·직접 예약 할인은 {pensionInfo.landline}로 문의해 주세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={pensionInfo.yapenBookingUrl} external size="lg" className="bg-on-image text-scrim hover:bg-on-image/90">
              <Calendar className="h-4 w-4" /> 실시간 예약 (NOL)
            </ButtonLink>
            <ButtonLink href={pensionInfo.naverBookingUrl} external size="lg" variant="onImage">
              네이버 예약
            </ButtonLink>
            <ButtonLink href={`tel:${pensionInfo.landline}`} size="lg" variant="onImage">
              <Phone className="h-4 w-4" /> {pensionInfo.landline}
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-on-image-muted">
            입실 {pensionInfo.checkIn} (연휴·성수기 {pensionInfo.checkInPeak}) · 퇴실 {pensionInfo.checkOut} (비수기 평일 {pensionInfo.checkOutOffSeasonWeekday})
          </p>
        </Reveal>

        {/* 무료 서비스 */}
        <Reveal delay={0.1} className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
          {services.map((s) => {
            const I = serviceIcons[s.icon] ?? Gift;
            return (
              <div key={s.id} className="rounded-lg border border-on-image/15 bg-on-image/8 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-on-image/12">
                    <I className="h-5 w-5" />
                  </span>
                  <div>
                    <Badge tone="onImage" className="mb-1">무료</Badge>
                    <p className="text-[15px] font-semibold">{s.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-on-image-muted">{s.description}</p>
              </div>
            );
          })}
        </Reveal>

        {/* 이벤트 */}
        {events.length > 0 && (
          <Reveal delay={0.15} className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-strong" />
              <p className="eyebrow text-[12px] text-on-image-muted">EVENTS &amp; OFFERS</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <li key={e.id} className="flex flex-col rounded-lg border border-on-image/15 bg-on-image/8 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-2">
                    {e.badge && <Badge tone="onImage">{e.badge}</Badge>}
                    {e.highlight && <span className="font-display text-sm tracking-wide text-accent-strong">{e.highlight}</span>}
                  </div>
                  <p className="mt-3 text-[15px] font-semibold leading-snug">{e.title}</p>
                  <p className="mt-1 text-xs text-on-image-muted">{e.period}</p>
                  <p className="mt-3 text-sm leading-relaxed text-on-image-muted">{e.description}</p>
                  {e.conditions.length > 0 && (
                    <ul className="mt-auto space-y-0.5 pt-3 text-xs text-on-image-muted/80">
                      {e.conditions.map((c) => (
                        <li key={c}>* {c}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
