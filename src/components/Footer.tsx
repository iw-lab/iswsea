import Link from "next/link";
import { Instagram, Phone, MapPin, Waves } from "lucide-react";
import { navItems, pensionInfo } from "@/data/pension";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      {/* 모바일(sm 미만)에서는 하단 고정 CTA 높이만큼 여백을 더 둬 관리자 링크가 가려지지 않게 한다 */}
      <div className="container-x pt-14 pb-[calc(3.5rem+5.5rem+env(safe-area-inset-bottom))] sm:pb-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl font-semibold">{pensionInfo.name}</p>
            <p className="eyebrow mt-1 text-[11px] text-muted-foreground">{pensionInfo.nameEn}</p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">{pensionInfo.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${pensionInfo.phone}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-accent">
                <Phone className="h-4 w-4" /> {pensionInfo.phone}
              </a>
              <a href={pensionInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-accent">
                <Instagram className="h-4 w-4" /> @{pensionInfo.instagram}
              </a>
              <a href={pensionInfo.tideTableUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-accent">
                <Waves className="h-4 w-4" /> 갯벌체험 시간표
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold">바로가기</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-[15px] text-muted-foreground">
              {navItems.map((i) => (
                <li key={i.href}>
                  <Link href={`/${i.href}`} className="hover:text-foreground">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-semibold">사업자 정보</p>
            <p className="mt-4 flex items-start gap-2 text-[15px] text-muted-foreground">
              <MapPin className="mt-1 h-4 w-4 shrink-0" /> {pensionInfo.address}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {pensionInfo.businesses.map((b) => (
                <li key={b.name}>
                  <p>
                    <span className="font-semibold text-foreground">{b.name}</span> · 상호 {pensionInfo.name} · 대표 {b.owner}
                  </p>
                  <p className="tnum">
                    사업자번호 {b.bizNumber} · 농어촌민박신고증 {b.license}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          {/* 정적 빌드 시점과 방문 시점이 연도 경계를 넘으면 값이 달라질 수 있어 하이드레이션 경고를 억제 */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} Sea in the Forest. All rights reserved.</p>
          <p>
            <Link href="/admin" className="hover:text-foreground">
              관리자 모드
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
