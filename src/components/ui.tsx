"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";

/* ---------- Focus trap (dialog 용) ----------
   열릴 때 첫 포커스 가능 요소로 이동, Tab 순환을 내부에 가두고, 닫히면 이전 포커스로 복원한다. */
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const prev = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    (focusables()[0] ?? root).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !root.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [active]);
  return ref;
}

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "ghost" | "accent" | "onImage";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-accent",
  ghost: "bg-transparent text-foreground border border-border hover:bg-accent",
  accent: "bg-accent-strong text-accent-strong-foreground hover:bg-accent-strong/90 shadow-sm",
  onImage: "bg-on-image/12 text-on-image border border-on-image/40 backdrop-blur-md hover:bg-on-image/22",
};
const sizeClass: Record<Size, string> = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors select-none disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={cn(base, variantClass[variant], sizeClass[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  external,
  href,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; external?: boolean }) {
  const cls = cn(base, variantClass[variant], sizeClass[size], className);
  const hrefStr = String(href);
  if (external) {
    return <a href={hrefStr} target="_blank" rel="noopener noreferrer" className={cls} {...(props as ComponentProps<"a">)} />;
  }
  // tel:/mailto: 는 라우터 링크가 아니다 — 프리페치·클라이언트 라우팅 없이 일반 앵커로 렌더
  if (/^(tel|mailto|sms):/i.test(hrefStr)) {
    return <a href={hrefStr} className={cls} {...(props as ComponentProps<"a">)} />;
  }
  return <Link href={href} className={cls} {...props} />;
}

/* ---------- Badge ---------- */
export function Badge({
  tone = "outline",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: "outline" | "solid" | "gold" | "onImage" }) {
  const tones = {
    outline: "border border-border bg-card/60 text-muted-foreground",
    solid: "bg-primary text-primary-foreground",
    gold: "border border-accent-strong/35 bg-accent-strong/12 text-accent-strong",
    onImage: "border border-on-image/40 bg-scrim/40 text-on-image backdrop-blur-sm",
  } as const;
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide", tones[tone], className)}
      {...props}
    />
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  light,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow mb-4", light ? "text-on-image-muted" : "text-accent-strong")}>{eyebrow}</p>
      <h2
        className={cn(
          "font-serif font-medium text-fluid-3xl leading-[1.2] text-balance",
          light ? "text-on-image" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-5 text-fluid-base leading-relaxed", light ? "text-on-image-muted" : "text-muted-foreground")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Photo frame ---------- */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  sizes,
  priority,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", ratio, className)}>
      {/* 정적 export(unoptimized) — 네이티브 img 로 충분 */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
      />
      {children}
    </div>
  );
}
