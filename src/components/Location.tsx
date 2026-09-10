"use client";

import { Bus, Car, Copy, ExternalLink, MapPin, Navigation, Phone, Waves } from "lucide-react";
import { useState } from "react";
import { pensionInfo, transport, nearby } from "@/data/pension";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";

export default function Location() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pensionInfo.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard 미지원 */
    }
  };

  return (
    <section id="location" className="section-y scroll-mt-16 bg-background">
      <div className="container-x">
        <SectionHeading eyebrow="LOCATION" title="오시는 길" lead="충남 태안군 이원면, 가로림만이 내려다보이는 언덕 위. 태안시외버스터미널에서 만대행 시내버스로도 오실 수 있습니다." />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12">
          {/* 지도 카드 */}
          <Reveal className="lg:col-span-7">
            <a
              href={pensionInfo.kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm"
              aria-label="카카오맵에서 크게 보기"
            >
              <div className="grid sm:grid-cols-2">
                <div className="relative aspect-square bg-muted">
                  <img src="/images/map/kakao-roughmap.png" alt="숲속의바다펜션 위치 약도" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute inset-x-0 bottom-0 bg-scrim/70 px-4 py-2 text-xs text-on-image-muted">
                    약도 · 클릭하면 카카오맵이 열립니다
                  </span>
                </div>
                <div className="relative aspect-square sm:aspect-auto">
                  <img src="/images/gallery/main/3.webp" alt="펜션 진입로" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                  <div className="scrim-b absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-on-image">
                    <p className="eyebrow text-[11px] text-on-image-muted">SEA IN THE FOREST</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                      카카오맵에서 크게 보기 <ExternalLink className="h-3.5 w-3.5" />
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              <ButtonLink href={pensionInfo.kakaoRouteUrl} external variant="primary">
                <Navigation className="h-4 w-4" /> 카카오맵 길찾기
              </ButtonLink>
              <ButtonLink href={pensionInfo.kakaoRoadviewUrl} external variant="ghost">
                로드뷰
              </ButtonLink>
              <ButtonLink href={pensionInfo.naverMapUrl} external variant="ghost">
                네이버 지도
              </ButtonLink>
            </div>
          </Reveal>

          {/* 정보 */}
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.05} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">주소</p>
                  <p className="mt-1 text-[15px] font-semibold">{pensionInfo.address}</p>
                  <p className="text-sm text-muted-foreground">{pensionInfo.addressJibun}</p>
                </div>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold hover:bg-accent"
                >
                  <Copy className="h-3.5 w-3.5" /> {copied ? "복사됨" : "복사"}
                </button>
              </div>
              <div className="mt-5 flex items-start gap-3 border-t border-border pt-5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">문의</p>
                  <a href={`tel:${pensionInfo.phone}`} className="mt-1 block text-[15px] font-semibold hover:text-primary">
                    {pensionInfo.phone}
                  </a>
                  <a href={`tel:${pensionInfo.landline}`} className="block text-sm text-muted-foreground hover:text-primary">
                    {pensionInfo.landline} (관리실)
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <Car className="h-4 w-4 text-primary" /> {transport.car.title}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {transport.car.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <Bus className="h-4 w-4 text-primary" /> {transport.bus.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{transport.bus.lines.join(" ")}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 주변 시설 거리 */}
        <Reveal delay={0.1} className="mt-10 rounded-lg border border-border bg-card p-6 lg:mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] font-semibold">펜션에서 가까운 곳</p>
            <a href={pensionInfo.tideTableUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sea hover:underline">
              <Waves className="h-4 w-4" /> 태안 물때표(갯벌체험 시간) 보기
            </a>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((n) => (
              <li key={n.name} className="flex items-baseline justify-between border-b border-dashed border-border py-2 text-sm">
                <span>{n.name}</span>
                <span className="tnum shrink-0 text-muted-foreground">차량 {n.minutes}분</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
