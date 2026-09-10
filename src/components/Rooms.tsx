"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Users, Maximize2 } from "lucide-react";
import { rooms, roomCommon, roomMapImage, formatPrice, type Room } from "@/data/pension";
import { Badge, Photo, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

type Filter = "all" | "숲속동" | "바다동" | "vip";
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "숲속동", label: "숲속동" },
  { key: "바다동", label: "바다동" },
  { key: "vip", label: "VIP · 대형" },
];

function matches(room: Room, f: Filter) {
  if (f === "all") return true;
  if (f === "vip") return !!room.vip || room.capacity.max >= 6;
  return room.building === f;
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 0.06}>
      <Link
        href={`/room/${room.id}`}
        className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
      >
        <Photo src={room.mainImage} alt={`${room.name} 객실`} ratio="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]">
          <div className="absolute left-3 top-3 flex gap-1.5">
            {room.building && <Badge tone="onImage">{room.building}</Badge>}
            {room.vip && <Badge tone="onImage" className="border-accent-strong/60 text-accent-strong">VIP</Badge>}
          </div>
          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-on-image text-scrim opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Photo>
        <div className="p-5">
          <p className="eyebrow text-[11px] text-muted-foreground">{room.nameEn}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold">{room.name}</h3>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5" /> {room.size}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> 기준 {room.capacity.standard}인 · 최대 {room.capacity.max}인
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">주중 1박</span>
            <span className="tnum text-lg font-bold">
              {formatPrice(room.prices.weekday)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">~</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Rooms() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = rooms.filter((r) => matches(r, filter));

  return (
    <section id="rooms" className="section-y scroll-mt-16 border-t border-border bg-secondary/60">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="ROOMS"
            title="열두 개의 객실, 모두 바다를 향해"
            lead={`${roomCommon.intro[0]} ${roomCommon.intro[1]}`}
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="객실 필터">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
                    filter === f.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {list.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </ul>

        {/* 배치도 */}
        <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-lg border border-border bg-card lg:mt-20">
          <div className="grid lg:grid-cols-12">
            <div className="p-6 lg:col-span-4 lg:p-10">
              <p className="eyebrow text-accent-strong">PENSION MAP</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">펜션 배치도</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                언덕 위 숲속동과 바다 앞 바다동, 그 사이의 카페와 실내 바베큐장, 오솔길 끝의 포토존과 수영장. 어느 객실에서든 가로림만이 보입니다.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {(["숲속동", "바다동"] as const).map((b) => (
                  <li key={b}>
                    <p className="font-semibold">{b}</p>
                    <p className="text-muted-foreground">
                      {rooms.filter((r) => r.building === b).map((r) => r.name).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <img src={roomMapImage} alt="숲속의바다 펜션 배치도" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
