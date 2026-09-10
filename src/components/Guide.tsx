"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ChevronDown, Clock, Flame, Users } from "lucide-react";
import { rooms, pensionInfo, priceInfo, guideSteps, refundPolicy, formatPrice } from "@/data/pension";
import { Badge, ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

type Tab = "price" | "rules" | "refund";
const tabs: { key: Tab; label: string }[] = [
  { key: "price", label: "요금 안내" },
  { key: "rules", label: "이용 안내" },
  { key: "refund", label: "환불 규정" },
];

function PriceTab() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" /> 입실 · 퇴실
          </p>
          <p className="mt-2 text-[15px] font-semibold">
            입실 {pensionInfo.checkIn} <span className="text-muted-foreground">(연휴·성수기 {pensionInfo.checkInPeak})</span>
          </p>
          <p className="text-[15px] font-semibold">
            퇴실 {pensionInfo.checkOut} <span className="text-muted-foreground">(비수기 평일 {pensionInfo.checkOutOffSeasonWeekday})</span>
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" /> 인원 추가
          </p>
          <p className="mt-2 text-[15px] font-semibold">1인 · 1일 {formatPrice(priceInfo.extraPerson)}</p>
          <p className="text-sm text-muted-foreground">{priceInfo.freeAge} 무료 · 찰스톤 기준 4인</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" /> 바베큐 (숯+망)
          </p>
          <ul className="mt-2 space-y-0.5 text-[15px]">
            {priceInfo.bbqPrices.map((b) => (
              <li key={b.persons} className="flex justify-between">
                <span>{b.persons}</span>
                <span className="tnum font-semibold">{formatPrice(b.price)}</span>
              </li>
            ))}
            <li className="flex justify-between text-muted-foreground">
              <span>{priceInfo.bbqGrill.name}</span>
              <span className="tnum">{formatPrice(priceInfo.bbqGrill.price)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="text-[15px] font-semibold">객실 요금표</p>
            <p className="text-xs text-muted-foreground">{priceInfo.rateRule}</p>
          </div>
          <Badge tone="gold">NOL 실시간 요금 기준 · 성수기 별도</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">객실</th>
                <th className="px-3 py-3 text-left font-medium">평수 · 정원</th>
                <th className="px-3 py-3 text-right font-medium">주중(일~목)</th>
                <th className="px-3 py-3 text-right font-medium">금요일</th>
                <th className="px-5 py-3 text-right font-medium">주말·공휴일 전날</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-5 py-3">
                    <Link href={`/room/${r.id}`} className="font-semibold hover:text-primary">
                      {r.name}
                    </Link>
                    {r.building && <span className="ml-2 text-xs text-muted-foreground">{r.building}</span>}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {r.size} · {r.capacity.standard}/{r.capacity.max}인
                  </td>
                  <td className="tnum px-3 py-3 text-right">{formatPrice(r.prices.weekday)}</td>
                  <td className="tnum px-3 py-3 text-right">{formatPrice(r.prices.friday)}</td>
                  <td className="tnum px-5 py-3 text-right font-semibold">{formatPrice(r.prices.weekend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-1 border-t border-border px-5 py-4 text-sm text-muted-foreground">
          <p>{priceInfo.standardNote}</p>
          <p>{priceInfo.seasonNote}</p>
          {priceInfo.bbqNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-warning/40 bg-warning/8 p-5">
        <p className="flex items-center gap-2 text-[15px] font-semibold">
          <AlertCircle className="h-4 w-4 text-warning" /> 유의사항
        </p>
        <ul className="mt-2 space-y-1 text-[15px] text-foreground/85">
          {priceInfo.cautions.map((c) => (
            <li key={c}>· {c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RulesTab() {
  const [open, setOpen] = useState<string | null>(guideSteps[0].no);
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
      {guideSteps.map((s) => {
        const on = open === s.no;
        return (
          <li key={s.no}>
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : s.no)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-sm tracking-widest text-accent-strong">{s.no}</span>
              <span className="text-[15px] font-semibold">{s.title}</span>
              <ChevronDown className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", on && "rotate-180")} />
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
                  <div className="space-y-2 px-5 pb-5 pl-[3.6rem] text-[15px] leading-relaxed text-foreground/85">
                    {s.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                    {s.highlight && (
                      <p className="rounded-md border border-accent-strong/30 bg-accent-strong/8 px-4 py-3 text-sm">{s.highlight}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function RefundTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="space-y-3 text-[15px] leading-relaxed text-foreground/85">
          {refundPolicy.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-4 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground">{refundPolicy.note}</p>
      </div>
      <ul className="overflow-hidden rounded-lg border border-border bg-card lg:col-span-7">
        {refundPolicy.rows.map((r) => (
          <li key={r.when} className="flex items-center gap-4 border-b border-border px-5 py-3 last:border-b-0">
            <span className="w-28 shrink-0 text-sm font-semibold">{r.when}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div className={cn("h-full rounded-full", r.deduct >= 70 ? "bg-destructive" : r.deduct >= 40 ? "bg-warning" : "bg-primary")} style={{ width: `${r.deduct}%` }} />
            </div>
            <span className="tnum w-20 shrink-0 text-right text-sm sm:w-28">
              <b>{r.deduct}%</b> 공제
              <span className="block text-xs text-muted-foreground">{100 - r.deduct}% 환불</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Guide() {
  const [tab, setTab] = useState<Tab>("price");
  return (
    <section id="guide" className="section-y scroll-mt-16 border-t border-border bg-secondary/60">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="GUIDE" title="이용 안내" lead="요금·입퇴실·바베큐·환불 규정을 한곳에 정리했습니다. 성수기·준성수기 요금은 실시간 예약 달력에서 확인해 주세요." />
          <ButtonLink href={pensionInfo.yapenBookingUrl} external>
            실시간 요금 확인
          </ButtonLink>
        </div>

        <Reveal delay={0.05} className="mt-10 lg:mt-14">
          <div
            className="flex gap-1 rounded-full border border-border bg-card p-1"
            role="tablist"
            aria-label="이용 안내 탭"
            onKeyDown={(e) => {
              // WAI-ARIA 탭 패턴: 좌우 방향키·Home/End 로 탭 이동
              const i = tabs.findIndex((t) => t.key === tab);
              let next = -1;
              if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
              else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = tabs.length - 1;
              if (next < 0) return;
              e.preventDefault();
              setTab(tabs[next].key);
              (e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next])?.focus();
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`guide-tab-${t.key}`}
                aria-selected={tab === t.key}
                aria-controls={`guide-panel-${t.key}`}
                tabIndex={tab === t.key ? 0 : -1}
                onClick={() => setTab(t.key)}
                className={cn(
                  "h-10 flex-1 rounded-full text-sm font-semibold transition-colors sm:text-[15px]",
                  tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* mode="wait" 는 exit 완료를 기다린다 — rAF 가 멈춘 백그라운드 탭에서 패널 교체가 영영 안 끝나므로 쓰지 않는다 */}
          <AnimatePresence initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              id={`guide-panel-${tab}`}
              aria-labelledby={`guide-tab-${tab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              {tab === "price" && <PriceTab />}
              {tab === "rules" && <RulesTab />}
              {tab === "refund" && <RefundTab />}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
