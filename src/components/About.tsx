"use client";

import { prologue, pensionInfo, aboutStats as stats } from "@/data/pension";
import { Photo, Reveal } from "@/components/ui";

export default function About() {
  return (
    <section id="about" className="section-y scroll-mt-16 bg-background">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 텍스트 */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-accent-strong">{prologue.label}</p>
              <h2 className="mt-4 font-serif text-fluid-3xl font-medium leading-[1.2] whitespace-pre-line text-balance">
                {prologue.title}
              </h2>
              <p className="mt-2 font-display text-lg italic text-muted-foreground">{prologue.titleEn}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-fluid-base leading-relaxed text-foreground/85">
              <p className="font-medium text-foreground">{prologue.intro}</p>
              {prologue.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-8 border-l-2 border-accent-strong/60 pl-5">
              {prologue.invitation.map((line) => (
                <p key={line} className="text-[15px] leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-8 text-sm text-muted-foreground">
              {pensionInfo.address} · 클래식 스타일 목조 펜션
            </Reveal>
          </div>

          {/* 사진 콜라주 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <Reveal className="col-span-12 sm:col-span-8">
                <Photo src="/images/gallery/main/2.webp" alt="언덕 위 숲속의바다 펜션 전경" ratio="aspect-[4/3]" className="rounded-lg shadow-md" />
              </Reveal>
              <Reveal delay={0.1} className="col-span-6 sm:col-span-4 sm:pt-16">
                <Photo src="/images/gallery/special7/1.webp" alt="바다꽃정원" ratio="aspect-[3/4]" className="rounded-lg shadow-md" />
              </Reveal>
              <Reveal delay={0.15} className="col-span-6 sm:col-span-4 sm:-mt-12">
                <Photo src="/images/gallery/special6/2.webp" alt="소나무 숲 산책로" ratio="aspect-[3/4]" className="rounded-lg shadow-md" />
              </Reveal>
              <Reveal delay={0.2} className="col-span-12 sm:col-span-8 sm:-mt-12">
                <Photo src="/images/gallery/special1/5.webp" alt="객실 테라스에서 보는 가로림만" ratio="aspect-[16/10]" className="rounded-lg shadow-md" />
              </Reveal>
            </div>
          </div>
        </div>

        {/* 숫자 */}
        <Reveal delay={0.1} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:mt-24 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 lg:p-8">
              <p className="font-display text-4xl font-medium text-primary">{s.value}</p>
              <p className="mt-2 text-[15px] font-semibold">{s.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
